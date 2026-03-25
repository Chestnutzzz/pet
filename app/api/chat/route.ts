import { NextResponse } from 'next/server';

// 1. 测试用：让你在浏览器直接访问 /api/chat 时不报 404/405
export async function GET() {
  return NextResponse.json({ 
    status: "✅ API 路径已连通！", 
    tips: "请在网页聊天框输入内容进行测试。" 
  });
}

// 2. 核心逻辑：处理 AI 对话请求
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        stream: false
      }),
    });

    const data = await response.json();
    
    // 如果 API 返回了错误（比如余额不足、Key无效）
    if (!response.ok) {
      return NextResponse.json({ 
        error: data.error?.message || 'DeepSeek 接口返回异常' 
      }, { status: response.status });
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: '服务器内部错误，请检查环境变量' }, { status: 500 });
  }
}
