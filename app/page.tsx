'use client'; // 告诉 Next.js 这是个客户端组件，支持交互

import React, { useState } from 'react';
import { MessageSquareDot, BookOpenText, ShoppingBag, HeartPulse, Sparkles, SendHorizontal } from 'lucide-react';

export default function PetCareApp() {
  const [activeTab, setActiveTab] = useState('咨询'); // 管理底部导航激活态

  // 导航项数据
  const navItems = [
    { name: '咨询', icon: MessageSquareDot },
    { name: '知识', icon: BookOpenText },
    { name: '商城', icon: ShoppingBag },
    { name: '健康', icon: HeartPulse }, // 把廉价的“医院”改成更有温度的“健康”
  ];

  // 知识卡片数据
  const knowledgeItems = [
    { title: '幼猫喂养手册', desc: '刚领回家怎么喂？' },
    { title: '新手疫苗避坑', desc: '打几针？什么时间打？' },
    { title: '体内外驱虫常识', desc: '科学驱虫不伤宠。' },
    { title: '猫咪行为读心术', desc: '它在想什么？' },
  ];

  return (
    // 整体背景色改为更温暖的米色
    <div className="min-h-screen bg-[#FDF9F3] text-gray-800 pb-32">
      
      {/* 1. 头部 (精装修版) */}
      <header className="sticky top-0 z-50 bg-[#FDF9F3]/90 backdrop-blur-sm px-6 py-5 flex justify-between items-center border-b border-orange-50">
        <h1 className="text-2xl font-black text-orange-600 tracking-tight">
          毛孩子<span className="text-gray-900">管家</span>
        </h1>
        <div className="w-10 h-10 border-2 border-orange-100 rounded-full flex items-center justify-center p-0.5 bg-white shadow-sm overflow-hidden">
          <img src="/avatar.webp" alt="Avatar" className="w-full h-full rounded-full object-cover" />
          {/* 这里我先假设你有个头像图片，如果你没有，可以用之前那个 emoji */}
          {/* <span className="text-xl">🐶</span> */}
        </div>
      </header>

      {/* 2. AI Chat Card (浮动毛玻璃效果) */}
      <main className="px-4 py-6 max-w-lg mx-auto">
        <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(254,235,214,0.3)] border border-orange-50 p-6 mb-8 transition-all hover:shadow-[0_12px_40px_rgb(254,235,214,0.5)]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-inner">
              <Sparkles size={24} className="animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-950">AI 宠物健康顾问</p>
              <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                实时在线
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50/70 text-orange-950 rounded-2xl p-4 text-sm leading-relaxed mb-6 font-medium">
            “你好呀！我是你的 AI 养宠专家。你的猫咪今天胃口怎么样？”
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="输入你的问题，例如：猫咪呕吐怎么办？" 
              className="w-full bg-white border border-gray-100 rounded-full py-3.5 px-5 pr-12 outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-200 transition text-sm shadow-sm placeholder:text-gray-400"
            />
            <button className="absolute right-3 top-2.5 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center transition hover:bg-orange-600 active:scale-95 shadow-md">
              <SendHorizontal size={18} />
            </button>
          </div>
        </section>

        {/* 3. Knowledge Cards (更具设计感) */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-extrabold text-gray-950 flex items-center gap-2.5">
              <BookOpenText size={22} className="text-orange-500" /> 养宠必读
            </h2>
            <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-700">查看更多 →</a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {knowledgeItems.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-orange-100 hover:shadow-[0_4px_12px_rgba(251,146,60,0.1)] cursor-pointer transition-all duration-300">
                <p className="text-base font-bold text-gray-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 4. Bottom Navigation (终极精装修：悬浮胶囊式) */}
      <footer className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center">
        <nav className="w-full max-w-sm bg-white/90 backdrop-blur-lg rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-gray-100 px-3 py-2.5 flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            const Icon = item.icon;
            return (
              <button 
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ease-out
                  ${isActive ? 'text-white' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                {/* 激活态的胶囊背景 */}
                {isActive && (
                  <span className="absolute inset-0 bg-orange-500 rounded-full shadow-md scale-100 opacity-100 transition-transform duration-300"></span>
                )}
                
                {/* 图标和文字 (相对于背景浮起) */}
                <Icon size={20} className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="relative z-10 text-sm font-bold tracking-tight">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
