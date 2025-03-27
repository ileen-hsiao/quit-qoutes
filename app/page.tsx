"use client"

import { useEffect, useState } from "react"

const QUOTES = [
  "你現在不做，老闆也不會在意。",
  "離職是給自己最大的尊重。",
  "你不是在上班，你是在消耗生命。",
  "你的 KPI 不是公司的業績，是自己的快樂。",
  "你不快樂，不值得。",
  "如果每天醒來都不想上班，那就該換個夢。",
  "你信老闆，還是信我是秦始皇。",
  "你的人生，你的選擇。" ,
]

function getRandomQuote(quotes: string[], lastSeen?: string) {
  const availableQuotes = quotes.filter(q => q !== lastSeen)
  return availableQuotes[Math.floor(Math.random() * availableQuotes.length)]
}

function getDaysLeft(targetDateStr: string): number {
  const now = new Date()
  const targetDate = new Date(targetDateStr)
  const diff = targetDate.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default function Home() {
  const [quote, setQuote] = useState("")
  const [quitDate, setQuitDate] = useState("")
  const [daysLeft, setDaysLeft] = useState<number | null>(null)
  const [bossMode, setBossMode] = useState(false)

  useEffect(() => {
    const savedDate = localStorage.getItem("quit-date")
    if (savedDate) {
      setQuitDate(savedDate)
      setDaysLeft(getDaysLeft(savedDate))
    }

    const stored = JSON.parse(localStorage.getItem("quote-daily") || "{}")
    const today = new Date().toDateString()
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuitDate(value)
    localStorage.setItem("quit-date", value)
    setDaysLeft(getDaysLeft(value))
  }

  const getCountdownTextClass = () => {
    if (daysLeft === null) return ""
    if (daysLeft > 0) return "text-sky-300"
    if (daysLeft < 0) return "text-green-300"
    return "text-rose-500"
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-rose-100 p-4 text-center relative">
      <button
        onClick={() => setBossMode(!bossMode)}
        className="absolute top-4 right-4 px-3 py-1 text-sm rounded-lg bg-gray-800 text-white hover:bg-gray-700 z-50"
      >
        {bossMode ? "老闆走惹" : "老闆來了"}
      </button>

      {bossMode && (
        <div className="fixed inset-0 z-40">
          <img
            src="/images/fake-chat.png"
            alt="Fake ChatGPT Screenshot"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {!bossMode && (
        <>
          <div className="mb-6">
            <label className="block mb-2 text-sm">離職日期：</label>
            <input
              type="date"
              value={quitDate}
              onChange={handleDateChange}
              className="px-3 py-2 rounded-xl border border-gray-300"
            />
            {daysLeft !== null && (
              <p className={`mt-3 text-2xl font-bold ${getCountdownTextClass()}`}>
                {daysLeft > 0
                  ? `還有 ${daysLeft} 天離職！`
                  : daysLeft === 0
                  ? "今天就是離職日 🎉"
                  : `你已經離職 ${Math.abs(daysLeft)} 天了 🕊️`}
              </p>
            )}
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 max-w-md text-xl font-semibold">
            {quote}
          </div>
          <button
            onClick={refreshQuote}
            className="mt-6 px-4 py-2 rounded-xl bg-rose-300 hover:bg-rose-400 text-white font-medium"
          >
            再來一句
          </button>
        </>
      )}
    </main>
  )
}