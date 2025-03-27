"use client"

import { useEffect, useState } from "react"

const QUOTES = [
  "你現在不做，老闆也不會在意。",
  "離職是給自己最大的尊重。",
  "你不是在上班，你是在消耗生命。",
  "每天都想離職，那就不是你想要的生活。",
  "你的 KPI 不是公司的業績，是自己的快樂。",
  "你不快樂，不值得。",
  "如果每天醒來都不想上班，那就該換個夢。",
]

function getRandomQuote(quotes: string[], lastSeen?: string) {
  const availableQuotes = quotes.filter(q => q !== lastSeen)
  return availableQuotes[Math.floor(Math.random() * availableQuotes.length)]
}

export default function Home() {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    const today = new Date().toDateString()
    const stored = JSON.parse(localStorage.getItem("quote-daily") || "{}")
    if (stored.date === today && stored.quote) {
      setQuote(stored.quote)
    } else {
      const newQuote = getRandomQuote(QUOTES, stored.quote)
      setQuote(newQuote)
      localStorage.setItem("quote-daily", JSON.stringify({ date: today, quote: newQuote }))
    }
  }, [])

  const refreshQuote = () => {
    const newQuote = getRandomQuote(QUOTES, quote)
    setQuote(newQuote)
    const today = new Date().toDateString()
    localStorage.setItem("quote-daily", JSON.stringify({ date: today, quote: newQuote }))
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-rose-100 p-4 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md text-xl font-semibold">
        {quote}
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
