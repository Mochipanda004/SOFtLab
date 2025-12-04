import { useEffect, useMemo, useState } from "react";
import { FAQ } from "@/data/faq";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hola, soy el asistente de Melody Labs. ¿En qué puedo ayudarte?" }
  ]);
  const [input, setInput] = useState("");

  const categories = useMemo(() => {
    const cs = Array.from(new Set(FAQ.map(f => f.categoria)));
    return cs;
  }, []);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    const q = normalize(text);
    const match = FAQ.find(f => normalize(f.pregunta).includes(q) || q.includes(normalize(f.categoria)));
    const fallback = "Puedo ayudarte con Inscripciones, Niveles, Materiales o Horarios. Elige una categoría o escribe tu pregunta.";
    const answer = match ? match.respuesta : fallback;
    setMessages(prev => [...prev, { role: "bot", text: answer }]);
    setInput("");
  };

  useEffect(() => {
    if (!open) return;
    const el = document.getElementById("chatbot-scroll");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {!open && (
        <div className="flex items-center gap-3 mb-3">
          <span className="rounded-full bg-gray-800 text-white text-sm px-4 py-2 opacity-80">¿Tienes dudas?</span>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} className="h-12 w-12 rounded-full bg-blue-600 text-white text-xl flex items-center justify-center">💬</button>
      {open && (
        <div className="mt-3 w-80 rounded-2xl border bg-white shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b">
            <div className="text-sm font-medium text-gray-900">Asistente Melody Labs</div>
            <div className="text-xs text-gray-600">Pregúntame sobre Inscripciones, Niveles, Materiales y Horarios</div>
          </div>
          <div id="chatbot-scroll" className="h-64 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span className={m.role === "user" ? "inline-block max-w-[85%] rounded-lg bg-blue-600 text-white text-sm px-3 py-2" : "inline-block max-w-[85%] rounded-lg bg-gray-100 text-gray-900 text-sm px-3 py-2"}>{m.text}</span>
              </div>
            ))}
          </div>
          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map(c => (
                <button key={c} onClick={() => send(c)} className="rounded-full border px-3 py-1 text-xs text-gray-700">{c}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") send(input); }} className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm" placeholder="Escribe tu pregunta" />
              <button onClick={() => send(input)} className="rounded-lg bg-blue-600 text-white text-sm px-3 py-2">Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

