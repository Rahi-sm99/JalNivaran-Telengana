"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Loader2, User, X, MessageCircle } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function FloatingAIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Safety Assistant for Jal-Nivaran. Ask me about weather conditions and risks in Telangana. For example: 'Is Hyderabad safe in July?' or 'Which districts have high risk in August?'",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-safety-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickQuestions = ["Is Hyderabad safe in July?", "Which districts are high risk?", "Tell me about Warangal"]

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-2xl z-50 hover:scale-110 transition-transform duration-300"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[90vw] animate-in slide-in-from-bottom-5 duration-300">
          <Card className="shadow-2xl border-2 border-primary">
            <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bot className="h-6 w-6" />
                  AI Safety Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/80 mt-1">AI భద్రతా సహాయకుడు</p>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages Area */}
              <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-background">
                {messages.map((message, idx) => (
                  <div key={idx} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border"
                        }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <User className="h-5 w-5 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="bg-muted text-foreground p-3 rounded-lg border">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions */}
              <div className="border-t p-3 bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Quick Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(q)}
                      className="text-xs"
                      disabled={isLoading}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-background border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Telangana safety..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
