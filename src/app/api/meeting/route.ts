import { NextRequest, NextResponse } from 'next/server';
import { sendMeetingEmail } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.service || !body.date || !body.time) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendMeetingEmail({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      service: body.service,
      date: body.date,
      time: body.time,
      message: body.message || ''
    });

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Meeting booking sent successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to send meeting booking' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Meeting booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
