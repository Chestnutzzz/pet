import { NextResponse } from 'next/server';
import OpenAI from "openai"; // 引入你截图里的 openai 包

// 按照官方文档初始化
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.AI_API_KEY, // 这里继续用你在 Vercel 填的环境变量名
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 按照官方文档调用对话
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "deepseek-chat",
    });

    // 返回 AI 说的话
    return NextResponse.json(completion.choices[0].message);
    
  } catch (error: any) {
    console.error('API Error:', error);
    // SDK 报错会更智能，能直接返回具体的错误原因
    return NextResponse.json({ error: error.message || '调用失败' }, { status: 500 });
  }
}
