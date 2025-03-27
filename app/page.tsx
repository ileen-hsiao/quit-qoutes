"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [quote, setQuote] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGptQuote = async () => {
      try {
        const res = await fetch("/api/gpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: "離職", style: "療癒系" }),
        })
        const data = await res.json()
        setQuote(data.quote)
      } catch (error) {
        setQuote("今天 GPT 沒有靈感 🥲")
      } finally {
        setLoading(false)
      }
    }

    fetchGptQuote()
  }, [])

  const refreshQuote = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: "離職", style: "療癒系" }),
      })
      const data = await res.json()
      setQuote(data.quote)
    } catch (error) {
      setQuote("今天 GPT 沒有靈感 🥲")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-rose-100 p-4 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md text-xl font-semibold">
        {loading ? "GPT 正在想句子..." : quote}
      </div>
      <button
        onClick={refreshQuote}
        className="mt-6 px-4 py-2 rounded-xl bg-rose-300 hover:bg-rose-400 text-white font-medium"
      >
        再來一句
      </button>
    </main>
  )
}
