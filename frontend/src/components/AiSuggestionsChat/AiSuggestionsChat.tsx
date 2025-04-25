"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, ChevronDown, Lightbulb, X } from "lucide-react";
import { sendChatMessage } from "@/api/prediccion/predictionChatbot";
import Image from "next/image";


interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiSuggestionsChat() {
  const [showOriginalContent, setShowOriginalContent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente de huella de carbono. Puedo ayudarte con sugerencias para reducir tu impacto ambiental. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(input);
      const botMessage: Message = {
        role: "assistant",
        content: response.respuesta,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Ocurrió un error. Intenta nuevamente. ${error}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 mb-6 w-full max-w-xl mx-auto flex flex-col h-[70vh] sm:h-[40vh] md:h-[60vh] lg:h-[100vh] bg-[#212226] rounded-lg overflow-hidden relative">
      {/* Loader */}
      {isLoading && (
        <div className="flex flex-col justify-center items-center absolute inset-0 bg-[#212226] z-10">
          <p className="mb-4 text-white text-base sm:text-lg">Generando...</p>
          <div className="animate-spin rounded-full h-32 w-32 border-[12px] border-[#7A2E09] border-t-[#EA5105]" />
        </div>
      )}
      {/* Sreensaver for Chatbot */}
      {!showOriginalContent ? (
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-xl font-bold text-[#EA5105] mb-4">
            ¿Querés más ideas para mejorar?
          </h1>
          <p className="text-sm text-white text-center mb-4">
            Te mostramos las primeras recomendaciones según tus datos, pero
            todavía hay más cosas que podés hacer. Nuestra IA puede darte nuevas
            sugerencias personalizadas para seguir reduciendo tu impacto
            ambiental.
          </p>
          <Image
            src="/RobotChatBot.svg"
            alt="Robot asistente"
            width={300}
            height={300}
            className="w-full max-w-xs mx-auto mb-4 lg:w-1/2"
          />

          <ul className="list-disc text-sm text-white mb-2 list-inside pl-4">
            <li>Recibí consejos más específicos según cada categoría.</li>
            <li>Descubrí acciones simples que podés aplicar ya mismo.</li>
            <li>Mejorá tus indicadores sin cambiar toda tu operación.</li>
            <li>Accedé a ideas que quizás no habías considerado!</li>
            <li>Tomá decisiones más inteligentes, con datos reales!</li>
            <li>
              Evitá errores comunes con recomendaciones claras y aplicables.
            </li>
            <li>
              Aprovechá todo el potencial de tus datos para tomar mejores
              decisiones.
            </li>
          </ul>
          <p className="text-sm sm:text-xs text-white text-center mb-2"></p>
          <button
            onClick={() => setShowOriginalContent(true)}
            className="bg-[#EA5105] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl cursor-pointer"
          >
            Quiero más recomendaciones
          </button>
        </div>
      ) : (
        <>
        {/* Chat UI */}
          <div className="flex items-center justify-between p-4 border-b border-[#838383]">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[#EA5105]" />
              <h2 className="font-bold text-white">
                Chat de sugerencias hecha por IA
              </h2>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#838383] rounded-md flex items-center justify-center cursor-pointer"
            >
              {isExpanded ? (
                <X className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {isExpanded && (
            <>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`max-w-[85%] rounded-lg p-3 ${message.role === "user"
                        ? "bg-[#838383] text-white self-end"
                        : "bg-[#0B0C0D] text-white self-start border-l-2 border-[#EA5105]"
                        }`}
                    >
                      {message.content}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-4 border-t border-gray-800">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Solicita recomendaciones..."
                    className="min-h-[60px] w-full bg-[#0B0C0D] border border-gray-700 text-white rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-[#EA5105]"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="h-[60px] w-[60px] bg-[#EA5105] hover:bg-orange-700 text-white rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
