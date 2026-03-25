import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 这里的地址根据你用的模型服务商来变，这里以 OpenAI 格式为例
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.AI_API_KEY}`, // 这里会自动读取你刚在 Vercel 存的 Key
    },
    body: JSON.stringify({
      model: 'deepseek-chat', 
      messages: [
        { role: "system", content: "你是一位资深的宠物医生和养宠专家。请用亲切、专业的口吻回答用户关于宠物的问题。" },
        ...messages
      ],
      stream: false, // 初学者建议先关掉流式传输，逻辑更简单
    }),
  });

  const data = await response.json();
  return NextResponse.json(data.choices[0].message);
}
