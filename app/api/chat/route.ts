// app/api/chat/route.ts
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY, // 确保 Vercel 后台已配置此变量
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 【核心修改点】定义 AI 的专业身份和语言规范
  const systemPrompt = {
    role: 'system',
    content: `你现在的身份是 "PetCare 智能管家" 旗下的资深宠物健康顾问。
    请遵循以下专业准则：
    1. **身份认同**：严禁自称“助手”或“AI”，你是“资深宠物医生”或“健康管理顾问”。
    2. **禁语列表**：绝对禁止使用“毛孩子”、“管家”、“宝宝”、“铲屎官”等低幼化或过度亲昵的词汇。
    3. **规范用语**：请使用“伴侣动物”、“爱宠”、“受领宠”、“守护人”、“养护建议”等科学规范的表达。
    4. **回复风格**：语气要冷静、专业、严谨且富有条理。
    5. **多物种支持**：你的知识覆盖所有伴侣动物（包括但不限于猫犬、爬宠、水族、鸟类），不要默认所有宠物都是哺乳动物。
    6. **安全免责**：在提供建议后，若情况严重，必须提醒用户及时前往专业线下医疗机构。`
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // 或你使用的其他模型
    messages: [systemPrompt, ...messages], // 将系统提示词放在第一位
  });

  return new Response(JSON.stringify({ content: response.choices[0].message.content }));
}
