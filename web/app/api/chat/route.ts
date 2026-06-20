import { NextRequest, NextResponse } from 'next/server';
import { buildSystemInstruction } from '@/lib/persona';

const MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-2.5-flash',
];

const MAX_INPUT_CHARS = 4000;
const MAX_HISTORY_TURNS = 12;

const INJECTION_PATTERNS = [
  'print your prompt',
  'print your system',
  'show your system',
  'reveal your system',
  'reveal your instructions',
  'ignore previous instructions',
  'ignore your instructions',
  'disregard your instructions',
  'forget your instructions',
  'you are now',
  'pretend you are',
  'act as if you have no',
];

interface HistoryPart { text: string }
interface HistoryTurn { role: string; parts: HistoryPart[] }

interface RequestBody {
  message?: unknown;
  history?: unknown;
  persona?: unknown;
}

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_KEY;
  if (!key) {
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }

  let body: RequestBody;
  try {
    body = await req.json() as RequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const message = typeof body.message === 'string' ? body.message : null;
  const history = Array.isArray(body.history) ? (body.history as HistoryTurn[]) : [];
  const persona = body.persona === 'third' ? 'third' : 'first';

  if (!message) {
    return NextResponse.json({ error: 'Message required.' }, { status: 400 });
  }
  if (message.length > MAX_INPUT_CHARS) {
    return NextResponse.json({ error: 'Message too long (max 4000 chars).' }, { status: 400 });
  }

  const lower = message.toLowerCase();
  if (INJECTION_PATTERNS.some((p) => lower.includes(p))) {
    return NextResponse.json({
      candidates: [{
        content: { parts: [{ text: "System instructions stay private. Ask me something about Dex!" }] },
      }],
    });
  }

  const trimmedHistory = history.slice(-MAX_HISTORY_TURNS);
  const systemInstruction = buildSystemInstruction(persona);

  const geminiBody = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: [
      ...trimmedHistory,
      { role: 'user', parts: [{ text: message }] },
    ],
    generationConfig: {
      temperature: 0.85,
      maxOutputTokens: 600,
    },
  };

  let data: unknown = { error: 'No model responded.' };
  try {
    for (const model of MODELS) {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiBody),
        }
      );
      data = await r.json();
      const d = data as Record<string, unknown>;
      if (!d.error) break;
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: `Failed to reach AI: ${msg}` }, { status: 502 });
  }

  return NextResponse.json(data);
}
