import { type NextRequest, NextResponse } from "next/server"
import { waterLoggingData2025 } from "@/lib/data"

export async function POST(req: NextRequest) {
  let question = ""
  try {
    const body = await req.json()
    question = body.question

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    // Generate context from our data
    const context = waterLoggingData2025
      .map((area) => {
        return `${area.area}: ${area.months.map((m) => `${m.month} - ${m.verdict} risk (${m.rainfall}mm)`).join(", ")}`
      })
      .join("\n")

    const prompt = `You are an AI safety assistant for Telangana's water-logging and flood management system called Jal-Nivaran (జల్-నివారణ). 
Your role is to provide safety information based on weather and water-logging data.

2025 Weather & Risk Data for Telangana Districts:
${context}

Risk levels:
- High: Severe water-logging risk, avoid area if possible
- Mid: Moderate risk, exercise caution
- Low: Minimal risk, safe to travel

User Question: ${question}

Provide a helpful, concise response about safety and water-logging conditions. If asking about a specific area and month, reference the data. If the question is outside the scope of water-logging safety, politely redirect to the topic.

Keep responses under 150 words and be conversational yet professional.`

    // Call Gemini API
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCnXv2Pt2WIDv0FPH-SR_AXycD03JK4N2k"
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I couldn't generate a response."

    return NextResponse.json({ answer })
  } catch (error) {
    console.error("AI Safety Check Error:", error)

    // Fallback: Use local data to answer if API fails
    const lowercaseQuestion = question.toLowerCase()
    const areaMatch = waterLoggingData2025.find(a =>
      lowercaseQuestion.includes(a.area.toLowerCase()) ||
      lowercaseQuestion.includes(a.areaHi.toLowerCase())
    )

    if (areaMatch) {
      const monthMatch = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
        .find(m => lowercaseQuestion.includes(m))

      if (monthMatch) {
        const monthData = areaMatch.months.find(m => m.month.toLowerCase() === monthMatch)
        if (monthData) {
          return NextResponse.json({
            answer: `According to our 2025 data, ${areaMatch.area} has a ${monthData.verdict} risk of water-logging in ${monthData.month} (average rainfall: ${monthData.rainfall}mm). Please exercise caution.`
          })
        }
      }

      const highRiskMonths = areaMatch.months.filter(m => m.verdict === "high").map(m => m.month).join(", ")
      return NextResponse.json({
        answer: `For ${areaMatch.area}, the primary high-risk months are ${highRiskMonths}. During these times, severe water-logging and flooding is expected. Stay safe!`
      })
    }

    if (lowercaseQuestion.includes("risk") || lowercaseQuestion.includes("safe")) {
      return NextResponse.json({
        answer: "Most high-risk districts in Telangana include Hyderabad, Khammam, Adilabad, and Warangal during the monsoon months (July-September) due to heavy rainfall and potential flooding. You can check the Risk Map for live updates."
      })
    }

    return NextResponse.json({
      answer: "I'm currently operating in offline mode. I can tell you about weather risks for specific districts in Telangana like Hyderabad, Warangal, or Khammam. What would you like to know?"
    })
  }
}
