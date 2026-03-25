'use client';
import { useState } from 'react';

export default function Home() {
  // --- 状态定义区域（确保所有变量都在作用域内）---
  const [activeTab, setActiveTab] = useState('home'); // 默认进入首页推荐
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { 
      role: 'assistant', 
      content: '您好，我是 PetCare 资深健康顾问。为了提供更精准的养护建议，请详细描述伴侣动物的品种、年龄及当前的异常生理表现。' 
    }
  ]);
  const [input, setInput] = useState(''); // 修复：确保 input 变量存在
  const [isLoading, setIsLoading] = useState(false);

  // --- 咨询逻辑处理 ---
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
    // 使用 h-[100dvh] 解决键盘弹出时的视口跳动问题
    <div className="h-[100dvh] bg-[#FDF8F3] flex flex-col overflow-hidden text-gray-800">
      
      {/* 顶部 Header：专业风格 */}
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-orange-100 flex-shrink-0 z-10">
        <span className="text-xl font-bold tracking-tight">Pet<span className="text-orange-600">Care</span> <span className="text-gray-400 font-medium text-sm ml-1">智能健康管家</span></span>
        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-200">🧬</div>
      </header>

      {/* 主体切换区域 */}
      <main className="flex-1 overflow-y-auto bg-gray-50/30 relative">
        
        {/* 1. 首页推荐：用户强相关信息 */}
        {activeTab === 'home' && (
          <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-32">
            <h1 className="text-2xl font-bold">今日养护建议</h1>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase">当前生理评估</p>
                  <p className="text-xl text-green-600 font-bold mt-1">状态：稳健</p>
               </div>
               <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase">下一次免疫提醒</p>
                  <p className="text-xl text-orange-500 font-bold mt-1">剩余 12 天</p>
               </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-orange-50 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📅</span>
                <h3 className="font-bold">每日规范化推荐</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                基于目前的季节气候与伴侣动物的生命阶段，建议今日增加 15% 的水分摄入量。若为多猫家庭，请确保每个生命体拥有独立的摄食区域，以降低环境压力指标。
              </p>
            </div>
          </div>
        )}

        {/* 2. AI 问诊界面 */}
        {activeTab === 'consult' && (
          <div className="p-4 max-w-4xl mx-auto space-y-4 pb-32">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 sticky top-0 z-10">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-3xl">🩺</div>
              <div>
                <h2 className="font-bold">资深健康顾问在线</h2>
                <p className="text-[10px] text-green-500 font-medium">生理指标实时研判系统中</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-xs text-gray-400 pl-4 animate-pulse italic">正在调取专业医学数据库...</div>}
            </div>
          </div>
        )}

        {/* 3. 线上商城 */}
        {activeTab === 'store' && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold">精选优品商城</h2>
            <p className="text-gray-500 text-sm mt-2 mb-8">为您甄选高标准宠物食品与栖息器械</p>
            <a href="https://www.taobao.com" target="_blank" className="px-10 py-4 bg-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-200 active:scale-95 transition-all">
              前往官方认证商城
            </a>
          </div>
        )}

        {/* 4. 个人中心 */}
        {activeTab === 'mine' && (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm mb-6">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-3xl">👤</div>
              <div>
                <h2 className="text-lg font-bold">守护者 ID: 9527</h2>
                <p className="text-xs text-gray-400">已守护伴侣动物生命周期 328 天</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {['历史咨询档案', '智能养护计划', '账号偏好设置', '关于 PetCare'].map((item, i) => (
                <div key={i} className="px-6 py-5 text-sm border-b border-gray-50 last:border-0 active:bg-gray-50 cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 底部输入框（仅在咨询页显示） */}
      {activeTab === 'consult' && (
        <div className="px-4 py-3 bg-white/90 backdrop-blur-md border-t border-gray-100 fixed bottom-20 left-0 right-0 max-w-4xl mx-auto z-20">
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-200">
            {/* 修复：使用 text-base (16px) 防止 iOS 自动缩放 */}
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="请描述症状，如：活动力下降、摄食异常..."
              className="flex-1 bg-transparent px-4 py-2 text-base focus:outline-none placeholder-gray-400"
            />
            <button 
              onClick={sendMessage}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${input.trim() ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-300 text-gray-500'}`}
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
          {[
            { id: 'home', icon: '🏠', label: '首页推荐' },
            { id: 'consult', icon: '🩺', label: 'AI问诊' },
            { id: 'store', icon: '🛒', label: '线上商城' },
            { id: 'mine', icon: '👤', label: '我的' }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === tab.id ? 'text-orange-600' : 'text-gray-400'}`}>
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}
