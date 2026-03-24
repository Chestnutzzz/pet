'use client';

import React, { useState } from 'react';
import { 
  MessageSquareDot, 
  BookOpenText, 
  ShoppingBag, 
  HeartPulse, 
  Sparkles, 
  SendHorizontal,
  Loader2 
} from 'lucide-react';

// 定义消息的结构，防止 TypeScript 报错
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function PetCareApp() {
  // 1. 状态管理
  const [activeTab, setActiveTab] = useState('咨询');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // 明确告诉它是消息数组
  const [isLoading, setIsLoading] = useState(false);

  // 2. 发送逻辑
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error('API 请求失败');

      const botMsg: Message = await res.json();
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("对话出错了:", error);
      // 如果出错，给用户一个友好的提示
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: '哎呀，网络开小差了，请检查一下 API Key 设置或稍后再试。' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. 静态数据
  const navItems = [
    { name: '咨询', icon: MessageSquareDot },
    { name: '知识', icon: BookOpenText },
    { name: '商城', icon: ShoppingBag },
    { name: '健康', icon: HeartPulse },
  ];

  const knowledgeItems = [
    { title: '幼猫喂养手册', desc: '刚领回家怎么喂？' },
    { title: '新手疫苗避坑', desc: '打几针？什么时间打？' },
    { title: '体内外驱虫常识', desc: '科学驱虫不伤宠。' },
    { title: '猫咪行为读心术', desc: '它在想什么？' },
  ];

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-gray-800 pb-32">
      {/* 头部 */}
      <header className="sticky top-0 z-50 bg-[#FDF9F3]/90 backdrop-blur-sm px-6 py-5 flex justify-between items-center border-b border-orange-50">
        <h1 className="text-2xl font-black text-orange-600 tracking-tight">
          毛孩子<span className="text-gray-900">管家</span>
        </h1>
        <div className="w-10 h-10 border-2 border-orange-100 rounded-full flex items-center justify-center bg-white shadow-sm overflow-hidden">
          <span className="text-xl">🐶</span>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* 对话卡片 */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(254,235,214,0.3)] border border-orange-50 p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center text-white">
              <Sparkles size={24} className={isLoading ? "animate-spin" : ""} />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-950">AI 宠物助手</p>
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                实时在线
              </div>
            </div>
          </div>
          
          {/* 聊天内容区 */}
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="bg-orange-50/70 text-orange-950 rounded-2xl p-4 text-sm font-medium">
                “你好！我是你的 AI 养宠专家。你的猫咪今天胃口怎么样？”
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-orange-500 text-white rounded-tr-none' 
                    : 'bg-orange-50 text-orange-950 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-orange-50 p-3 rounded-2xl flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-orange-500" />
                  <span className="text-xs text-orange-600">AI 正在思考...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* 输入框 */}
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="问问 AI..." 
              className="w-full bg-white border border-gray-100 rounded-full py-3.5 px-5 pr-12 outline-none focus:border-orange-300 shadow-sm text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-3 top-2.5 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center transition hover:bg-orange-600 active:scale-95 disabled:bg-gray-300 shadow-md"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </section>

        {/* 知识卡片区 */}
        <section>
          <h2 className="text-xl font-extrabold text-gray-950 mb-5 flex items-center gap-2.5">
            <BookOpenText size={22} className="text-orange-500" /> 养宠必读
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {knowledgeItems.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-orange-100 transition-all cursor-pointer">
                <p className="text-base font-bold text-gray-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 悬浮导航 */}
      <footer className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center">
        <nav className="w-full max-w-sm bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-100 px-3 py-2.5 flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            const Icon = item.icon;
            return (
              <button 
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isActive ? 'text-white' : 'text-gray-600'}`}
              >
                {isActive && <span className="absolute inset-0 bg-orange-500 rounded-full shadow-md"></span>}
                <Icon size={20} className="relative z-10" />
                {isActive && <span className="relative z-10 text-sm font-bold">{item.name}</span>}
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
