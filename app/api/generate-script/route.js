import { NextResponse } from "next/server"
import OpenAI from "openai"

export  async function POST(req){
   

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:process.env.OPENROUTER_API_KEY ,
 
})


  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",
    messages: [
      { role: "user", content: "Say this is a test" }
    ],
  })

  console.log(completion.choices[0].message)
return NextResponse.json(completion.choices[0].message?.content)


}