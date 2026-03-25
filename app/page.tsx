'use client';
import { useState } from 'react';

// 模拟数据：养宠必读卡片
const MUST_READ_CARDS = [
  { title: '幼猫喂养手册', desc: '刚接回家的猫咪怎么喂？' },
  { title: '新手接猫避坑', desc: '打几针？什么时间打？' },
  { title: '体内外驱虫常识', desc: '程序是什么？' },
  { title: '猫咪行为读心术', desc: '它在想什么？' },
];

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: '你好！我是躺躺医生，您的专属宠物健康顾问。请问您的毛孩子今天有什么情况？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await response.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: '医生现在有点忙，请稍后再问。' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '网络似乎不太通畅，请检查连接。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-10">
        <header className="flex items-center justify-between pb-4 border-b border-orange-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">毛孩子管家</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">🐶</div>
        </header>

        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10">
          <aside className="md:w-1/3 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">📖 养宠必读</h2>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {MUST_READ_CARDS.map((card, index) => (
                <div key={index} className="bg-white p-5 rounded-3xl border border-orange-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-medium text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-orange-50 shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">👨‍⚕️</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI 宠物助手</h1>
                  <p className="text-sm text-green-600 flex items-center gap-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    躺躺医生 实时在线
                  </p>
                </div>
              </div>

              <div className="space-y-4 h-[400px] md:h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${
                      msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-[#FDF8F3] text-gray-800 rounded-bl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#FDF8F3] text-gray-500 p-4 rounded-2xl rounded-bl-none italic">正在诊断中...</div>
                  </div>
                )}
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto bg-[#FDF8F3] md:bg-transparent p-4 md:p-0">
              <div className="w-full max-w-xl md:max-w-none mx-auto flex items-center gap-2 bg-white p-2 rounded-full border border-orange-100 shadow-lg">
                <input 
                  type="text"
                  value={input}
                  // 【修正位置】这里必须是 e.target.value
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="描述一下毛孩子的情况..."
                  className="flex-1 bg-transparent px-4 py-2 text-gray-800 focus:outline-none"
                  disabled={isLoading}
                />
                <button 
                  onClick={sendMessage}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    input.trim() && !isLoading ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                  disabled={!input.trim() || isLoading}
                >
                  <span className="text-xl text-white">✈️</span>
                </button>
              </div>
            </div>
            <div className="h-24 md:h-0"></div>
          </main>
        </div>
      </div>
    </div>
  );
}
