'use client';
import { useState } from 'react';

export default function Home() {
  // 状态管理：当前在哪个页面 (consult, knowledge, store, mine)
  const [activeTab, setActiveTab] = useState('consult');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: '您好，我是资深宠物医生。请告诉我关于您伴侣动物的品种和目前的健康状况，我将为您提供专业的建议。' }
  ]);
  const [input, setInput] = useState('');
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
        setMessages(prev => [...prev, { role: 'assistant', content: '医生正在处理急诊，请稍后再试。' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '网络连接异常，请检查环境。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 使用 h-[100dvh] 适配移动端动态高度，解决键盘弹出问题
    <div className="h-[100dvh] bg-[#FDF8F3] flex flex-col overflow-hidden text-gray-800">
      
      {/* 统一顶部 Header */}
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-orange-100 flex-shrink-0">
        <span className="text-xl font-bold tracking-tight">Pet<span className="text-orange-600">Care</span></span>
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-200">🩺</div>
      </header>

      {/* 主体切换区域 */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30 relative">
        
        {/* 1. 咨询界面 */}
        {activeTab === 'consult' && (
          <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-4 pb-32">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">👨‍⚕️</div>
              <div>
                <h2 className="font-bold">资深医生在线咨询</h2>
                <p className="text-[10px] text-green-500 font-medium italic">实时为您分析爱宠健康状况</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-xs text-gray-400 pl-4 animate-pulse">医生正在研判中...</div>}
            </div>
          </div>
        )}

        {/* 2. 知识库界面 */}
        {activeTab === 'knowledge' && (
          <div className="p-6 max-w-4xl mx-auto space-y-4">
            <h2 className="text-lg font-bold">科学养护百科</h2>
            <div className="grid gap-4">
              {[
                { t: '日常营养平衡', d: '不同物种的蛋白质摄入标准' },
                { t: '环境压力识别', d: '如何判断伴侣动物是否处于焦虑状态' },
                { t: '家庭急救常识', d: '常见异物吞食的初步处理' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform">
                  <h3 className="font-bold text-sm">{item.t}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. 商城（外部链接） */}
        {activeTab === 'store' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold">精选优品商城</h2>
            <p className="text-gray-500 text-sm mt-2 mb-6">为您甄选全球高标准宠物食品与器械</p>
            <a 
              href="https://www.taobao.com" 
              target="_blank" 
              className="px-8 py-3 bg-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-200"
            >
              前往外部官方商城
            </a>
          </div>
        )}

        {/* 4. 个人中心 */}
        {activeTab === 'mine' && (
          <div className="p-6">
            <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">👤</div>
              <div>
                <h2 className="text-lg font-bold">爱宠守护人</h2>
                <p className="text-xs text-gray-400">ID: 025879</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              {['我的咨询记录', '养护提醒设置', '意见反馈', '关于 PetCare'].map((item, i) => (
                <div key={i} className="px-6 py-4 text-sm border-b border-gray-50 last:border-0 active:bg-gray-50">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 底部输入框（仅在咨询页显示） */}
      {activeTab === 'consult' && (
        <div className="px-4 py-3 bg-white/80 backdrop-blur-md border-t border-gray-100 fixed bottom-20 left-0 right-0 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-2xl">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="请描述症状，如：精神不振、食欲下降..."
              className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
            />
            <button 
              onClick={sendMessage}
              className={`px-6 py-2 rounded-xl text-sm font-bold ${input.trim() ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'}`}
              disabled={isLoading}
            >
              发送
            </button>
          </div>
        </div>
      )}

      {/* 底部导航栏 */}
      <footer className="bg-white border-t border-gray-100 h-20 flex-shrink-0">
        <nav className="flex items-center justify-around h-full pb-2">
          <button onClick={() => setActiveTab('consult')} className={`flex flex-col items-center gap-1 ${activeTab === 'consult' ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-xl">🩺</span>
            <span className="text-[10px] font-bold">咨询</span>
          </button>
          <button onClick={() => setActiveTab('knowledge')} className={`flex flex-col items-center gap-1 ${activeTab === 'knowledge' ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-xl">📚</span>
            <span className="text-[10px] font-bold">养护</span>
          </button>
          <button onClick={() => setActiveTab('store')} className={`flex flex-col items-center gap-1 ${activeTab === 'store' ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-xl">🛒</span>
            <span className="text-[10px] font-bold">商城</span>
          </button>
          <button onClick={() => setActiveTab('mine')} className={`flex flex-col items-center gap-1 ${activeTab === 'mine' ? 'text-orange-600' : 'text-gray-400'}`}>
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-bold">我的</span>
          </button>
        </nav>
      </footer>
    </div>
  );
}
