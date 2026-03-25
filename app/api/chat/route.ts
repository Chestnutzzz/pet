import { NextResponse } from 'next/server';
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 【致命错误修复】：把 DeepSeek 的地址和模型找回来了！
    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com', 
      apiKey: process.env.AI_API_KEY || "", 
    });

    // 专业的系统提示词
    const systemPrompt = {
      role: 'system',
      content: `你现在的身份是 "PetCare" 平台的资深伴侣动物健康顾问。
      1. 语言禁忌：严禁使用“毛孩子”、“管家”、“宝宝”、“铲屎官”等低幼化词汇。
      2. 规范用语：请使用“伴侣动物”、“爱宠”、“受领宠”、“养护建议”等科学表达。
      3. 回复风格：语气冷静、专业、严谨且富有条理。
      4. 多物种支持：你的知识覆盖猫犬、爬宠、水族、鸟类等所有伴侣动物。`
    };

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat", // 必须是这个模型
      messages: [systemPrompt, ...messages],
    });

    return NextResponse.json({ content: completion.choices[0].message.content });
    
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || '接口调用失败' }, { status: 500 });
  }
}
