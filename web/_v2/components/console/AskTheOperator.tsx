'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

type PersonaMode = 'first' | 'third';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface GeminiResponse {
  candidates?: Array<{ content: { parts: Array<{ text: string }> } }>;
  error?: string | { message: string };
}

export default function AskTheOperator() {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState<PersonaMode>('first');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const historyForApi = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const msg = input.trim();
    if (!msg || loading) return;

    setInput('');
    setError(null);
    const next: ChatMessage[] = [...messages, { role: 'user', text: msg }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: historyForApi, persona }),
      });
      const data: GeminiResponse = await res.json();

      if (!res.ok || data.error) {
        const errMsg = typeof data.error === 'object' ? data.error.message : (data.error ?? 'Service unavailable.');
        setError(errMsg);
        setMessages(next); // keep user message, no model reply
        return;
      }

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '[No response]';
      setMessages([...next, { role: 'model', text: reply }]);
    } catch {
      setError('Connection failed. Check network.');
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  const accentVar = 'var(--hub-accent, #00ccff)';

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close operator console' : 'Ask the Operator — open AI chat'}
        aria-expanded={open}
        style={{
          position: 'fixed',
          bottom: '88px',
          right: '20px',
          zIndex: 200,
          background: open ? 'rgba(0,200,255,0.08)' : accentVar,
          color: open ? accentVar : '#000',
          border: `1px solid ${accentVar}`,
          borderRadius: '4px',
          padding: '8px 14px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.12em',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: open ? 'none' : `0 0 18px color-mix(in srgb, ${accentVar} 40%, transparent)`,
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {open ? '[ CLOSE ]' : '// ASK OPERATOR'}
      </button>

      {/* Console panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Ask the Operator — AI console"
          style={{
            position: 'fixed',
            bottom: '138px',
            right: '20px',
            width: '390px',
            maxWidth: 'calc(100vw - 40px)',
            height: '500px',
            maxHeight: 'calc(100svh - 200px)',
            zIndex: 199,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(8, 10, 16, 0.97)',
            border: `1px solid ${accentVar}`,
            borderRadius: '6px',
            boxShadow: `0 0 48px rgba(0, 200, 255, 0.08), 0 16px 48px rgba(0,0,0,0.7)`,
            backdropFilter: 'blur(20px)',
            fontFamily: 'var(--font-mono)',
            animation: 'ato-slide-in 0.18s cubic-bezier(0.2,0.8,0.2,1)',
          }}
        >
          {/* Header bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px 8px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.12em', color: accentVar, fontWeight: 700 }}>
              // ASK THE OPERATOR
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>
                GEMINI-POWERED
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close console"
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: '0 2px' }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Persona toggle */}
          <div style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            padding: '8px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', marginRight: '2px' }}>MODE:</span>
            {(['first', 'third'] as PersonaMode[]).map((p) => {
              const active = persona === p;
              return (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  style={{
                    background: active ? accentVar : 'transparent',
                    color: active ? '#000' : 'rgba(255,255,255,0.35)',
                    border: `1px solid ${active ? accentVar : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '3px',
                    padding: '3px 10px',
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: active ? 700 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {p === 'first' ? 'AS DEX' : 'BRIEFING'}
                </button>
              );
            })}
            <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.15)', marginLeft: 'auto' }}>
              {persona === 'first' ? '1st person' : '3rd person'}
            </span>
          </div>

          {/* Message thread */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.08) transparent',
          }}>
            {messages.length === 0 && !error && (
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', lineHeight: 1.7 }}>
                <div style={{ color: accentVar, marginBottom: '6px' }}>
                  SYSTEM: OPERATOR ONLINE
                </div>
                Ask about projects, skills, experience — anything Dex is willing to share.
                <div style={{ marginTop: '8px', color: 'rgba(255,255,255,0.12)' }}>
                  Try: "What are you currently building?" or "Tell me about Sowan.id"
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                  alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
                  {m.role === 'user' ? 'YOU' : persona === 'first' ? 'DEX' : 'BRIEFING'}
                </span>
                <div style={{
                  maxWidth: '88%',
                  padding: '8px 11px',
                  borderRadius: '4px',
                  fontSize: '11.5px',
                  lineHeight: 1.6,
                  background: m.role === 'user'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0, 200, 255, 0.05)',
                  border: `1px solid ${m.role === 'user' ? 'rgba(255,255,255,0.07)' : 'rgba(0,200,255,0.1)'}`,
                  color: m.role === 'user' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.9)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
                  {persona === 'first' ? 'DEX' : 'BRIEFING'}
                </span>
                <div style={{ padding: '8px 12px', background: 'rgba(0,200,255,0.05)', border: '1px solid rgba(0,200,255,0.1)', borderRadius: '4px' }}>
                  <span style={{ color: accentVar, animation: 'ato-blink 1s step-end infinite', fontSize: '14px', lineHeight: 1 }}>▋</span>
                </div>
              </div>
            )}

            {error && (
              <div style={{
                padding: '8px 11px',
                background: 'rgba(255,80,80,0.06)',
                border: '1px solid rgba(255,80,80,0.15)',
                borderRadius: '4px',
                fontSize: '10px',
                color: 'rgba(255,120,120,0.8)',
              }}>
                ERROR: {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input form */}
          <form
            onSubmit={send}
            style={{
              display: 'flex',
              gap: '8px',
              padding: '10px 14px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send(); }
              }}
              placeholder="type your question..."
              disabled={loading}
              maxLength={4000}
              aria-label="Message input"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '3px',
                padding: '7px 10px',
                fontSize: '11px',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? 'rgba(255,255,255,0.05)' : accentVar,
                color: loading || !input.trim() ? 'rgba(255,255,255,0.25)' : '#000',
                border: `1px solid ${loading || !input.trim() ? 'rgba(255,255,255,0.08)' : accentVar}`,
                borderRadius: '3px',
                padding: '7px 12px',
                fontSize: '9px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: loading || !input.trim() ? 'default' : 'pointer',
                transition: 'all 0.15s',
                flexShrink: 0,
              }}
            >
              {loading ? '...' : 'SEND'}
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes ato-slide-in {
          from { opacity: 0; transform: translateY(10px) scale(0.99); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes ato-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </>
  );
}
