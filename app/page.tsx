'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: '您好，我是您的专属宠物健康管理专家。请详细描述伴侣生物目前的生理状态或行为异常，我将为您提供专业的临床分析。' }
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
        setMessages(prev => [...prev, { role: 'assistant', content: '专家诊断系统暂时处于维护状态，请稍后重新发起咨询。' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '通讯链路受限，请检查网络环境。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] flex flex-col">
      {/* 顶部标题栏 - 高级感命名 */}
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-orange-100 sticky top-0 z-10 shadow-sm">
        <span className="text-xl font-bold tracking-tight text-gray-800">Pet<span className="text-orange-600">Care</span> 智能管家</span>
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-200 text-lg">🧬</div>
      </header>

      {/* 主体区域 */}
      <main className="flex-1 overflow-y-auto pb-40">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
          
          {/* 专家卡片 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl shadow-inner">👨‍⚕️</div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">生命科学咨询顾问</h2>
                <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  专家实时在线
                </p>
              </div>
            </div>

            {/* 消息对话列表 */}
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-orange-500 text-white rounded-br-none' 
                      : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-xs text-gray-400 animate-pulse tracking-widest">专家正在研判数据...</div>}
            </div>
          </div>

          {/* 核心指南布局 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors cursor-pointer group">
              <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">📑 普适性抚育协议</h3>
              <p className="text-xs text-gray-500 mt-2 leading-loose">跨物种生命关怀的通用准则与核心禁忌。</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors cursor-pointer group">
              <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">🧪 临床前行为分析</h3>
              <p className="text-xs text-gray-500 mt-2 leading-loose">基于生理指标的初步健康风险评估系统。</p>
            </div>
          </section>
        </div>
      </main>

      {/* 底部功能区：输入与导航 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-20">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="请在此输入临床咨询内容..."
              className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder-gray-400"
            />
            <button 
              onClick={sendMessage}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                input.trim() ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-200 text-gray-400'
              }`}
            >
              提交
            </button>
          </div>
        </div>

        {/* 底部导航栏 */}
        <nav className="flex items-center justify-around pb-6 pt-2">
          <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <span className="text-xl">🩺</span>
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-tighter">Clinical</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-30 grayscale cursor-not-allowed">
            <span className="text-xl">📚</span>
            <span className="text-[10px] uppercase tracking-tighter">Library</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-30 grayscale cursor-not-allowed">
            <span className="text-xl">👤</span>
            <span className="text-[10px] uppercase tracking-tighter">Account</span>
          </div>
        </nav>
      </footer>
    </div>
  );
}
