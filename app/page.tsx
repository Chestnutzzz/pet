'use client';
import { useState } from 'react';

export default function Home() {
  // 状态管理
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: '您好，我是 PetCare 资深健康顾问。为了提供更精准的养护建议，请详细描述伴侣动物的品种、年龄及当前的异常生理表现。' }
  ]);
  const [input, setInput] = useState(''); // 确保 input 被正确定义
  const [isLoading, setIsLoading] = useState(false);

  // 咨询逻辑
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
        setMessages(prev => [...prev, { role: 'assistant', content: '资深顾问目前忙线，请稍后重新发起咨询。' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '通讯链路受限，请检查网络环境。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] bg-[#FDF8F3] flex flex-col overflow-hidden text-gray-800">
      
      {/* 顶部 Header */}
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-orange-100 flex-shrink-0 z-10">
        <span className="text-xl font-bold tracking-tight">Pet<span className="text-orange-600">Care</span> <span className="text-gray-400 font-medium text-sm ml-1">专业养护</span></span>
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-200">🧬</div>
      </header>

      {/* 主体切换区域 */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30 relative">
        
        {/* 1. 首页推荐 */}
        {activeTab === 'home' && (
          <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 pb-32">
            <h1 className="text-2xl font-bold">每日规范养护推荐</h1>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-sm font-bold text-gray-700">伴侣动物体况</p>
                  <p className="text-2xl text-green-600 font-bold mt-1">良好 (A级)</p>
               </div>
               <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-sm font-bold text-gray-700">今日运动建议</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">室内互动 15 分钟，辅助慢走 10 分钟。</p>
               </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <span className="text-3xl">💡</span>
              <div>
                 <h3 className="font-bold text-gray-900">养护贴士：规范水分补充</h3>
                 <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                   伴侣动物每日饮水量对其生理循环至关重要。请根据品种及体况实时微调。如遇精神不振，可采用少食多餐模式。
                 </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. AI 问诊 */}
        {activeTab === 'consult' && (
          <div className="p-4 max-w-4xl mx-auto space-y-4 pb-32">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 mb-6 sticky top-2 z-10">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-3xl">🩺</div>
              <div>
                <h2 className="font-bold">AI 资深医生实时问诊</h2>
                <p className="text-[10px] text-green-500 font-medium italic">基于规范化临床数据的生理指标研判</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-xs text-gray-400 pl-4 animate-pulse">专家诊断系统正在研判生理指标...</div>}
            </div>
          </div>
        )}

        {/* 3. 线上商城 */}
        {activeTab === 'store' && (
          <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold">精选优品商城</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">为您甄选高标准宠物食品与栖息器械</p>
            <a href="https://www.taobao.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-200">
              前往外部官方商城
            </a>
          </div>
        )}

        {/* 4. 我的 */}
        {activeTab === 'mine' && (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">👤</div>
              <div>
                <h2 className="text-lg font-bold">健康守护人</h2>
                <p className="text-xs text-gray-400">ID: 025879</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {['临床记录档案', '生命周期提醒', '规范养育建议表', '关于 PetCare 智能管家'].map((item, i) => (
                <div key={i} className="px-6 py-4 text-sm border-b border-gray-50 last:border-0 active:bg-gray-50">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 底部输入框（仅 AI 问诊显示） */}
      {activeTab === 'consult' && (
        <div className="px-4 py-3 bg-white/80 backdrop-blur-md border-t border-gray-100 fixed bottom-20 left-0 right-0 max-w-4xl mx-auto z-20">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-200 shadow-inner relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)} // 严格修复拼写问题
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="请描述异常症状..."
              className="flex-1 bg-transparent px-4 py-2 text-base focus:outline-none placeholder-gray-400"
            />
            <button 
              onClick={sendMessage}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                input.trim() ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-300 text-gray-500'
              }`}
              disabled={isLoading}
            >
              发送
            </button>
          </div>
        </div>
      )}

      {/* 底部导航栏 */}
      <footer className="bg-white border-t border-gray-100 h-20 flex-shrink-0 z-10 relative">
        <nav className="flex items-center justify-around h-full pb-2">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1.5 ${activeTab === 'home' ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">首页推荐</span>
          </button>
          <button onClick={() => setActiveTab('consult')} className={`flex flex-col items-center gap-1.5 ${activeTab === 'consult' ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-xl">🩺</span>
            <span className="text-[10px] font-bold">AI问诊</span>
          </button>
          <button onClick={() => setActiveTab('store')} className={`flex flex-col items-center gap-1.5 ${activeTab === 'store' ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-xl">🛒</span>
            <span className="text-[10px] font-bold">线上商城</span>
          </button>
          <button onClick={() => setActiveTab('mine')} className={`flex flex-col items-center gap-1.5 ${activeTab === 'mine' ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-bold">我的</span>
          </button>
        </nav>
      </footer>
    </div>
  );
}
