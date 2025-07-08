// app/api/run/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { language, code } = await req.json();

    // Step 1: Get supported runtimes
    const runtimesRes = await fetch('https://emkc.org/api/v2/piston/runtimes');
    const runtimes = await runtimesRes.json();

    // Step 2: Find the latest version for the language
    const runtime = runtimes.find((r: any) => r.language === language);
    if (!runtime) {
      return NextResponse.json({ error: "Unsupported language" }, {
        status: 400,
        headers: corsHeaders,
      });
    }

    const version = runtime.version;

    // Step 3: Send execution request
    const pistonRes = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        version,
        files: [
          {
            name: `main.${language}`,
            content: code,
          },
        ],
        // stdin: "Hello from stdin!",
        run_timeout: 3000,
        compile_timeout: 10000,
      }),
    });

    const result = await pistonRes.json();

    return NextResponse.json(
      {
        stdout: result.run.stdout,
        stderr: result.run.stderr,
        code: result.run.code,
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
