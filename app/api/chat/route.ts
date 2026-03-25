import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 注意：这里必须是完整路径
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 确保你在 Vercel 后台填的环境变量名确实叫 AI_API_KEY
        'Authorization': `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        stream: false
      }),
    });

    const data = await response.json();
    
    // 如果 DeepSeek 报错（比如 Key 没钱了），这里能把错误传出来
    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'DeepSeek 报错了' }, { status: response.status });
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
