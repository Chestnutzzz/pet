import { NextResponse } from 'next/server';
import OpenAI from "openai";

// GET 函数留着，方便你以后在浏览器里测试路径
export async function GET() {
  return NextResponse.json({ status: "API 路径正常，SDK 已就绪" });
}

export async function POST(req: Request) {
  try {
    // 【关键修改】把初始化放进函数内部，并加一个空字符串保底，彻底堵住 Vercel 的嘴
    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.AI_API_KEY || "dummy_key_for_build", 
    });

    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
  messages: [
    { 
      role: "system", 
      content: "你是一位拥有20年经验的资深宠物医生，名字叫『毛孩子管家』。你语气温柔、专业且富有耐心。你会针对猫咪和狗狗的健康、饮食、日常护理提供专业建议。如果遇到紧急情况，你会提醒主人立即送医。请始终以宠物医生的身份回答，不要提及你是AI语言模型。" 
    },
    ...messages // 把用户之前的聊天记录拼在后面
  ],
  model: "deepseek-chat",
});
    return NextResponse.json(completion.choices[0].message);
    
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || '调用失败' }, { status: 500 });
  }
}
