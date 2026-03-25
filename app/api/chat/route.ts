import { NextResponse } from 'next/server';
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.AI_API_KEY || "", 
    });

    // 调用 DeepSeek
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "deepseek-chat",
    });

    // 【核心修改】确保返回的是前端需要的 content 字符串格式
    const aiResponse = completion.choices[0].message.content;
    
    return NextResponse.json({ content: aiResponse });
    
  } catch (error: any) {
    console.error('DeepSeek API Error:', error);
    // 这里会把具体的报错（比如余额不足）返回给前端，方便我们排查
    return NextResponse.json(
      { error: error.message || 'AI 暂时掉线了' }, 
      { status: 500 }
    );
  }
}
