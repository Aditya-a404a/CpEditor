// app/api/run/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { language, code , input } = await req.json();

    const pistonRes = await fetch('http://16.171.171.154:8000/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        code,
        input,
    })});

    const result = await pistonRes.json();

    return NextResponse.json(
      {
        output: result.output,
        error: result.error,
        execution_time: result.execution_time,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // or restrict to specific origin
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle preflight OPTIONS request
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}
