"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LocalAudioTrack, Room } from "livekit-client";
import { Icon } from "./Icons";

const profiles = [
  {
    id: "physio",
    icon: "physio",
    label: "Physiotherapiepraxis",
    name: "Physiotherapie Code-Studio",
    assistant: "Mira",
    callLabel: "Demo Physiotherapie anrufen",
    hint: "Behandlungen, Verordnungen & Terminwünsche",
  },
  {
    id: "dental",
    icon: "tooth",
    label: "Zahnarztpraxis",
    name: "Zahnarztpraxis Code-Studio",
    assistant: "Clara",
    callLabel: "Demo Zahnarztpraxis anrufen",
    hint: "Vorsorge, Zahnreinigung & Praxisfragen",
  },
  {
    id: "general",
    icon: "cross",
    label: "Hausarztpraxis",
    name: "Hausarztpraxis Code-Studio",
    assistant: "Lea",
    callLabel: "Demo Hausarztpraxis anrufen",
    hint: "Sprechzeiten, Rezepte & Terminorganisation",
  },
];
type Profile = (typeof profiles)[number];
type SessionData = {
  id: string;
  state: string;
  position: number;
  deadline: number;
  connected: number | null;
  token?: string;
  url?: string;
};
type Stage =
  | "intro"
  | "loading"
  | "waiting"
  | "ready"
  | "connecting"
  | "live"
  | "ended"
  | "error";
async function requestDemo(
  action: string,
  extra: Record<string, unknown> = {},
) {
  const r = await fetch("/api/demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...extra }),
    keepalive: action === "cancel",
  });
  const data = await r.json();
  if (!r.ok)
    throw new Error(data.error || "Die Demo ist gerade nicht erreichbar.");
  return data as SessionData;
}

export function DemoExperience() {
  const [selected, setSelected] = useState<Profile | null>(null);
  const [stage, setStage] = useState<Stage>("intro");
  const [consent, setConsent] = useState(false);
  const [data, setData] = useState<SessionData | null>(null);
  const [error, setError] = useState("");
  const [muted, setMuted] = useState(false);
  const [voiceState, setVoiceState] = useState("connecting");
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [remaining, setRemaining] = useState(180);
  const room = useRef<Room | null>(null);
  const microphone = useRef<LocalAudioTrack | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const audioContainer = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const joined = useRef(false);
  const admissionId = useRef<string | null>(null);
  const generation = useRef(0);

  const disconnect = useCallback((reason = "hangup") => {
    generation.current++;
    microphone.current?.stop();
    microphone.current = null;
    if (room.current) {
      void room.current.disconnect();
      room.current = null;
    }
    if (audioContainer.current) audioContainer.current.replaceChildren();
    if (joined.current) {
      joined.current = false;
      const id = admissionId.current;
      admissionId.current = null;
      void requestDemo("cancel", { id, reason }).catch(() => {});
    }
  }, []);
  const close = useCallback(() => {
    disconnect("close_button");
    setSelected(null);
    setData(null);
    opener.current?.focus();
  }, [disconnect]);
  const end = useCallback(
    (reason = "hangup") => {
      disconnect(reason);
      setStage("ended");
    },
    [disconnect],
  );

  useEffect(() => () => disconnect(), [disconnect]);
  useEffect(() => {
    if (!selected) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "Tab") {
        const items = dialog.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled),a[href],input:not(:disabled)",
        );
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === dialog.current)
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            document.activeElement === dialog.current)
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", key);
    const leave = () => disconnect("pagehide");
    window.addEventListener("pagehide", leave);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", key);
      window.removeEventListener("pagehide", leave);
    };
  }, [selected, close, disconnect]);

  useEffect(() => {
    if (
      !selected ||
      !["waiting", "ready", "connecting", "live"].includes(stage)
    )
      return;
    let cancelled = false,
      failures = 0;
    const timer = setInterval(async () => {
      try {
        const update = await requestDemo("status");
        if (cancelled) return;
        failures = 0;
        setData(update);
        if (update.state === "reserved") setStage("ready");
        if (update.state === "closing" || update.state === "ended") {
          disconnect();
          setStage("ended");
        }
      } catch {
        if (!cancelled && ++failures >= 3) {
          disconnect();
          setError(
            "Die Verbindung wurde unterbrochen. Sie können die Demo erneut starten.",
          );
          setStage("error");
        }
      }
    }, 3000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [selected, stage, disconnect]);

  useEffect(() => {
    if (stage !== "live") return;
    const started = Date.now();
    const tick = () => {
      const seconds = data?.connected
        ? Math.ceil((data.deadline * 1000 - Date.now()) / 1000)
        : 180 - Math.floor((Date.now() - started) / 1000);
      setRemaining(Math.max(0, seconds));
      if (seconds <= 0) end("duration_limit");
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [stage, data?.deadline, data?.connected, end]);

  function open(profile: Profile, event: React.MouseEvent<HTMLButtonElement>) {
    opener.current = event.currentTarget;
    setSelected(profile);
    setStage("intro");
    setConsent(false);
    setError("");
    setData(null);
    setMuted(false);
    setRemaining(180);
    setAudioBlocked(false);
  }
  async function join() {
    if (!selected || !consent) return;
    const current = ++generation.current;
    setStage("loading");
    try {
      const next = await requestDemo("join", {
        profile: selected.id,
        consent,
        consentVersion: "2026-10-25-transcript-v1",
      });
      if (generation.current !== current) {
        void requestDemo("cancel", {
          id: next.id,
          reason: "close_button",
        }).catch(() => {});
        return;
      }
      joined.current = true;
      admissionId.current = next.id;
      setData(next);
      setStage(next.state === "reserved" ? "ready" : "waiting");
    } catch (e) {
      if (generation.current === current) {
        setError(
          e instanceof Error ? e.message : "Bitte versuchen Sie es erneut.",
        );
        setStage("error");
      }
    }
  }
  async function connect() {
    const current = ++generation.current;
    setStage("connecting");
    try {
      if (!navigator.mediaDevices?.getUserMedia)
        throw new Error(
          "Ihr Browser unterstützt hier keinen Mikrofonzugriff. Bitte öffnen Sie die Website über HTTPS in einem aktuellen Browser.",
        );
      const { Room, RoomEvent, Track, createLocalAudioTrack } = await import(
        "livekit-client"
      );
      const liveRoom = new Room({ adaptiveStream: true, dynacast: true });
      room.current = liveRoom;
      void liveRoom.startAudio().catch(() => setAudioBlocked(true));
      const mic = await createLocalAudioTrack({
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      });
      microphone.current = mic;
      if (current !== generation.current) {
        mic.stop();
        return;
      }
      const connection = await requestDemo("connect");
      if (current !== generation.current) {
        disconnect();
        return;
      }
      setData(connection);
      liveRoom.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === Track.Kind.Audio) {
          const element = track.attach();
          audioContainer.current?.appendChild(element);
          void element.play().catch(() => setAudioBlocked(true));
        }
      });
      liveRoom.on(
        RoomEvent.ParticipantAttributesChanged,
        (attributes, participant) => {
          if (
            participant.identity !== liveRoom.localParticipant.identity &&
            attributes["lk.agent.state"]
          )
            setVoiceState(attributes["lk.agent.state"]);
        },
      );
      liveRoom.on(RoomEvent.Disconnected, () => {
        if (generation.current === current) end("visitor_disconnected");
      });
      await liveRoom.connect(connection.url!, connection.token!);
      if (current !== generation.current) {
        await liveRoom.disconnect();
        mic.stop();
        return;
      }
      await liveRoom.localParticipant.publishTrack(mic);
      setVoiceState("listening");
      setStage("live");
    } catch (e) {
      if (current !== generation.current) return;
      disconnect("connection_error");
      const denied =
        e instanceof Error &&
        ["NotAllowedError", "PermissionDeniedError"].includes(e.name);
      const missing =
        e instanceof Error &&
        ["NotFoundError", "DevicesNotFoundError"].includes(e.name);
      const busy =
        e instanceof Error &&
        ["NotReadableError", "TrackStartError", "AbortError"].includes(e.name);
      setError(
        denied
          ? "Ihr Mikrofon ist gesperrt. Erlauben Sie den Zugriff in den Browser-Einstellungen und starten Sie die Demo erneut."
          : missing
            ? "Es wurde kein Mikrofon gefunden. Schließen Sie ein Mikrofon an und versuchen Sie es erneut."
            : busy
              ? "Ihr Mikrofon ist gerade nicht verfügbar. Bitte prüfen Sie, ob eine andere Anwendung darauf zugreift."
              : e instanceof Error &&
                  /^(Die |Ihr |Bitte |Zu |Keine |In diesem)/.test(e.message)
                ? e.message
                : "Die Verbindung konnte nicht aufgebaut werden. Bitte versuchen Sie es erneut.",
      );
      setStage("error");
    }
  }
  async function toggleMute() {
    if (!microphone.current) return;
    const next = !muted;
    if (next) await microphone.current.mute();
    else await microphone.current.unmute();
    setMuted(next);
  }
  const voiceLabel = muted
    ? "Mikrofon stumm"
    : voiceState === "speaking"
      ? "Die KI spricht"
      : voiceState === "thinking"
        ? "Einen Moment …"
        : "Die KI hört zu";

  return (
    <>
      <section id="demo" className="demo-section section-pad">
        <div className="section-heading horizontal">
          <div>
            <p className="eyebrow">
              <span className="status-dot" /> LIVE-DEMO · DIREKT IM BROWSER
            </p>
            <h2>
              Rufen Sie Ihre
              <br />
              <span className="muted">KI-Rezeption an.</span>
            </h2>
          </div>
          <p>
            Lernen Sie Mira, Clara und Lea kennen. Drei Beispielpraxen, drei
            spezialisierte Rezeptionistinnen – und Sie sind der Anrufer.
          </p>
        </div>
        <div className="demo-explainer">
          <p>
            Fragen Sie nach Öffnungszeiten, Behandlungen, Anfahrt oder spielen
            Sie einen Terminwunsch durch. Alle Praxisdaten sind erfunden, echte
            Termine werden nicht gebucht.
            <span> Die Wartezimmerlektüre dürfen Sie sich dafür sparen.</span>
          </p>
          <ol aria-label="So starten Sie den Browser-Test">
            <li>
              <Icon name="phone" />
              <span>Praxis wählen</span>
            </li>
            <li>
              <Icon name="mic" />
              <span>Mikrofon erlauben</span>
            </li>
            <li>
              <Icon name="check" />
              <span>Einfach lossprechen</span>
            </li>
          </ol>
        </div>
        <div className="demo-choices">
          {profiles.map((profile, i) => (
            <article className="demo-choice" key={profile.id}>
              <span className="choice-top">
                <Icon name={profile.icon} width="32" height="32" />
                <span>0{i + 1}</span>
              </span>
              <h3>{profile.label}</h3>
              <span className="choice-person">
                Mit {profile.assistant} sprechen
              </span>
              <p>{profile.hint}</p>
              <button
                className="choice-action"
                onClick={(e) => open(profile, e)}
              >
                <Icon name="phone" />
                {profile.callLabel}
              </button>
            </article>
          ))}
        </div>
        <div className="demo-footnote">
          <span>
            <Icon name="clock" width="16" height="16" /> Bis zu 3 Minuten ·
            Kostenloser Browser-Test
          </span>
          <span>Fiktive Praxen. Keine echten Buchungen.</span>
        </div>
      </section>
      {selected && (
        <div
          className="call-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={dialog}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="call-title"
            aria-describedby="call-disclosure"
            className="phone-panel"
          >
            <div className="phone-top">
              <span>
                cod-st <span className="phone-badge">LIVE-DEMO</span>
              </span>
              <button
                className="icon-button"
                aria-label="Demo schließen"
                onClick={close}
              >
                <Icon name="close" />
              </button>
            </div>
            <div className="phone-speaker" />
            <div className="phone-avatar">
              <Icon name={selected.icon} width="34" height="34" />
            </div>
            <p className="phone-kicker">IHRE KI-REZEPTION</p>
            <h2 id="call-title">{selected.name}</h2>
            <p className="phone-description" id="call-disclosure">
              Fiktive Praxis · Gespräch mit einer KI
            </p>
            <div className="phone-screen" aria-live="polite" aria-atomic="true">
              {stage === "intro" && (
                <>
                  <div className="waveform idle" aria-hidden="true">
                    {Array.from({ length: 25 }, (_, i) => (
                      <i key={i} style={{ "--i": i } as React.CSSProperties} />
                    ))}
                  </div>
                  <p>
                    Einfach mal anrufen.
                    <br />
                    Ganz ohne Telefon.
                  </p>
                </>
              )}
              {stage === "loading" && (
                <>
                  <div className="connecting-ring" />
                  <p>Wir prüfen die Demo-Leitungen …</p>
                </>
              )}
              {stage === "waiting" && (
                <>
                  <span className="queue-number">{data?.position || 1}</span>
                  <p>
                    <strong>Alle Demo-Leitungen sind gerade belegt.</strong>
                    <br />
                    Sie befinden sich in der Warteschlange.
                    <br />
                    Ihr Platz: {data?.position || 1}
                  </p>
                  <small>
                    Wir melden uns hier, sobald Sie starten können. Ihr Mikrofon
                    ist noch aus.
                  </small>
                </>
              )}
              {stage === "ready" && (
                <>
                  <span className="ready-mark">
                    <Icon name="check" width="32" height="32" />
                  </span>
                  <p>
                    <strong>Ihre Demo-Leitung ist bereit.</strong>
                    <br />
                    Verbinden Sie sich jetzt und erlauben Sie den
                    Mikrofonzugriff.
                  </p>
                  <small>Die Leitung ist kurz für Sie reserviert.</small>
                </>
              )}
              {stage === "connecting" && (
                <>
                  <div className="connecting-ring" />
                  <p>
                    Verbindung wird aufgebaut …<br />
                    <small>Bitte erlauben Sie den Mikrofonzugriff.</small>
                  </p>
                </>
              )}
              {stage === "live" && (
                <>
                  <span className="call-timer">
                    {Math.floor(remaining / 60)}:
                    {String(remaining % 60).padStart(2, "0")}
                  </span>
                  <div
                    className={`waveform ${voiceState === "speaking" ? "speaking" : ""} ${muted ? "is-muted" : ""}`}
                    aria-hidden="true"
                  >
                    {Array.from({ length: 25 }, (_, i) => (
                      <i key={i} style={{ "--i": i } as React.CSSProperties} />
                    ))}
                  </div>
                  <p className="voice-label">
                    <span className="status-dot" />
                    {voiceLabel}
                  </p>
                  {remaining <= 20 && <small>Die Demo endet gleich.</small>}
                </>
              )}
              {stage === "ended" && (
                <>
                  <span className="ready-mark">
                    <Icon name="check" width="32" height="32" />
                  </span>
                  <p>
                    <strong>So könnte Ihr Empfang klingen.</strong>
                    <br />
                    Danke fürs Ausprobieren.
                  </p>
                  <small>
                    In dieser Demo wurde kein echter Termin gebucht.
                  </small>
                </>
              )}
              {stage === "error" && (
                <>
                  <Icon name="phone" width="32" height="32" />
                  <p role="alert">{error}</p>
                </>
              )}
            </div>
            {stage === "intro" && (
              <label className="demo-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  Ich willige in die Sprachverarbeitung durch LiveKit und OpenAI
                  für diese Demo ein. Die{" "}
                  <Link href="/datenschutz" target="_blank" rel="noopener">
                    Datenschutzhinweise
                  </Link>{" "}
                  habe ich gelesen. Das Gesprächsprotokoll darf gespeichert und
                  an Code-Studio per E-Mail gesendet werden. Ich verwende nur
                  erfundene Angaben.
                </span>
              </label>
            )}
            {stage === "intro" && (
              <button
                className="button phone-primary"
                disabled={!consent}
                onClick={join}
              >
                Demo starten <Icon name="phone" width="19" height="19" />
              </button>
            )}
            {stage === "ready" && (
              <button className="button phone-primary" onClick={connect}>
                Jetzt verbinden <Icon name="phone" width="19" height="19" />
              </button>
            )}
            {stage === "live" && (
              <>
                <div className="call-controls">
                  <button
                    className={`call-control ${muted ? "muted-control" : ""}`}
                    aria-label={
                      muted ? "Mikrofon einschalten" : "Mikrofon stummschalten"
                    }
                    aria-pressed={muted}
                    onClick={() => void toggleMute()}
                  >
                    <Icon name={muted ? "muted" : "mic"} />
                  </button>
                  <button
                    className="call-control hangup"
                    aria-label="Gespräch beenden"
                    onClick={() => end()}
                  >
                    <Icon name="phone" />
                  </button>
                </div>
                {audioBlocked && (
                  <button
                    className="audio-unlock"
                    onClick={() =>
                      void room.current
                        ?.startAudio()
                        .then(() => setAudioBlocked(false))
                    }
                  >
                    Ton einschalten
                  </button>
                )}
              </>
            )}
            {["waiting", "loading", "connecting"].includes(stage) && (
              <button className="phone-cancel" onClick={() => end()}>
                Abbrechen
              </button>
            )}
            {stage === "ended" && (
              <>
                <a
                  className="button phone-primary"
                  href="#kontakt"
                  onClick={close}
                >
                  Über Ihre Praxis sprechen{" "}
                  <Icon name="arrow" width="18" height="18" />
                </a>
                <button
                  className="phone-cancel"
                  onClick={() => {
                    setStage("intro");
                    setData(null);
                  }}
                >
                  Weitere Demo starten
                </button>
              </>
            )}
            {stage === "error" && (
              <button
                className="button phone-primary"
                onClick={() => {
                  setStage("intro");
                  setData(null);
                }}
              >
                Erneut versuchen <Icon name="arrow" />
              </button>
            )}
            <p className="phone-footer">
              Keine medizinische Beratung.{" "}
              <Link href="/demo-hinweise" target="_blank" rel="noopener">
                Demo-Hinweise ↗︎
              </Link>
            </p>
            <div className="home-indicator" />
            <div ref={audioContainer} className="audio-elements" />
          </div>
        </div>
      )}
    </>
  );
}
