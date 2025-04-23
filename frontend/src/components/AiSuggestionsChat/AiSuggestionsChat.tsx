"use client"

import { useState, useRef, useEffect, FormEvent } from "react"
import { Send, ChevronDown, Lightbulb, X } from 'lucide-react'
import { sendChatMessage } from "@/api/prediccion/predictionChatbot"


interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AiSuggestionsChat() {
    const [isExpanded, setIsExpanded] = useState(true)
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "¡Hola! Soy tu asistente de huella de carbono. Puedo ayudarte con sugerencias para reducir tu impacto ambiental. ¿En qué puedo ayudarte hoy?",
        },
    ])
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage: Message = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await sendChatMessage(input)
            const botMessage: Message = { role: "assistant", content: response.respuesta }
            setMessages((prev) => [...prev, botMessage])
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `Ocurrió un error. Intenta nuevamente. ${error}` },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mt-4 mb-6 w-full flex flex-col h-[70vh] md:h-[60vh] lg:h-[105vh] bg-[#212226] rounded-lg overflow-hidden">


            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-green-400" />
                    <h2 className="font-bold text-white">Chat de sugerencias hecha por IA</h2>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md flex items-center justify-center"
                >
                    {isExpanded ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
                                        ? "bg-gray-700 text-white self-end"
                                        : "bg-gray-800 text-white self-start border-l-2 border-green-500"
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
                                placeholder="Escribe tu pregunta sobre huella de carbono..."
                                className="min-h-[60px] w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="h-[60px] w-[60px] bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}
