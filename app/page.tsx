'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: '您好，我是 PetCare 资深健康顾问。请提供伴侣动物的品种与症状。' }
  ]);
  const [input, setInput] = useState(''); // 解决 7c97b9 报错
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
      setMessages(prev => [...prev, { role: 'assistant', content: data.content || '顾问正忙。' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '网络链路异常。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] bg-[#FDF8F3] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-4 border-b border-orange-100 flex-shrink-0">
        <span className="text-xl font-bold italic">PetCare <span className="text-sm font-normal text-gray-400">专业养护</span></span>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50/50">
        {activeTab === 'home' && (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">每日养护推荐</h2>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">基于今日气候，建议加强伴侣动物的环境通风，并观察其饮水频率是否符合规范。</p>
            </div>
          </div>
        )}

        {activeTab === 'consult' && (
          <div className="p-4 space-y-4 pb-32">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-orange-500 text-white' : 'bg-white border border-gray-100'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'store' && (
          <div className="h-full flex flex-col items-center justify-center p-6">
            <p className="mb-4 font-bold">精选官方商城</p>
            <a href="https://www.taobao.com" target="_blank" className="px-8 py-3 bg-orange-500 text-white rounded-full">进入商城</a>
          </div>
        )}

        {activeTab === 'mine' && <div className="p-6 font-bold">个人健康档案</div>}
      </main>

      {/* Input - 仅在 AI 问诊页 */}
      {activeTab === 'consult' && (
        <div className="px-4 py-3 bg-white border-t fixed bottom-20 left-0 right-0">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-2xl">
            <input 
              type="text"
              value={input}
              // 解决 6c41dc 拼写错误，使用 16px 防止 iOS 缩放
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="描述爱宠生理异常..."
              className="flex-1 bg-transparent px-4 py-2 text-base focus:outline-none"
            />
            <button onClick={sendMessage} className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-bold">发送</button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <footer className="bg-white border-t h-20 flex-shrink-0">
        <nav className="flex items-center justify-around h-full">
          {[['home', '🏠', '首页'], ['consult', '🩺', '问诊'], ['store', '🛒', '商城'], ['mine', '👤', '我的']].map(([id, icon, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`flex flex-col items-center ${activeTab === id ? 'text-orange-600' : 'text-gray-400'}`}>
              <span className="text-xl">{icon}</span>
              <span className="text-[10px] font-bold">{label}</span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}
