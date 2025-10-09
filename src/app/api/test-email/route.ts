import { NextRequest, NextResponse } from 'next/server';
import { verifySMTP } from '../../../lib/email';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Resend connection...');
    const isConnected = await verifySMTP();
    
    if (isConnected) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Resend connection successful',
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Resend connection failed',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Resend test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
