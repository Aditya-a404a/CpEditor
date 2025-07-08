// app/api/run/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { language, code } = await req.json();

  // Step 1: Get supported runtimes
  const runtimesRes = await fetch('https://emkc.org/api/v2/piston/runtimes');
  const runtimes = await runtimesRes.json();

  // Step 2: Find the latest version for the language
  const runtime = runtimes.find((r: any) => r.language === language);
  if (!runtime) {
    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
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
          name: `main.${language}`, // give a name like main.js, main.py, etc.
          content: code,
        },
      ],
      run_timeout: 3000,
      compile_timeout: 10000,
    }),
  });

  const result = await pistonRes.json();

  return NextResponse.json({
    stdout: result.run.stdout,
    stderr: result.run.stderr,
    code: result.run.code,
  });
}
