// app/api/chat/route.ts
import { OpenAI } from 'openai';

const openai = new OpenAI({
  // 【核心修改】对齐您的环境变量名
  apiKey: process.env.AI_API_KEY, 
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = {
    role: 'system',
    content: `你是 PetCare 平台的资深伴侣动物健康顾问。
    1. **语言禁忌**：严禁使用“毛孩子”、“管家”、“铲屎官”等非正式词汇。
    2. **规范表达**：请使用“伴侣动物”、“爱宠”、“健康守护人”等科学用语。
    3. **风格**：专业、严谨、客观，提供基于规范化养护数据的建议。
    4. **立场**：你是具备医学素养的专家，而非低幼化的助手。`
  };

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
    });
    return new Response(JSON.stringify({ content: response.choices[0].message.content }));
  } catch (error) {
    // 这里的报错处理能帮你在 Vercel 日志里看清到底是 Key 没对上还是别的问题
    return new Response(JSON.stringify({ error: '接口调用异常' }), { status: 500 });
  }
}
