import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { topic = "離職療癒", style = "療癒系" } = await req.json()

  const prompt = `請用「${style}」的語氣，寫一句「${topic}」的語錄，語氣可以帶點情緒，限制在 30 字內。`

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
      max_tokens: 100,
    }),
  })

  const data = await res.json()
  const gptQuote = data.choices?.[0]?.message?.content?.trim()

  console.log("GPT 回傳:", JSON.stringify(data, null, 2))

  return NextResponse.json({ quote: gptQuote || "今天 GPT 沒有靈感 🥲" })
}
