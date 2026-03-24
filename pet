import React from 'react';
import { MessageSquare, BookOpen, ShoppingBag, Stethoscope, Send } from 'lucide-react';

export default function PetCareApp() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pb-20">
      {/* Header */}
      <header className="w-full max-w-md py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">毛孩子管家</h1>
        <div className="bg-orange-100 p-2 rounded-full">🐶</div>
      </header>

      {/* AI Chat Preview Card */}
      <section className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-orange-100 p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
            <MessageSquare size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">AI 宠物助手</p>
            <p className="text-xs text-green-500">● 实时在线</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4">
          “你好！我是你的 AI 养宠专家。你的猫咪今天胃口怎么样？”
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="问问 AI..." 
            className="w-full bg-white border border-gray-200 rounded-full py-2 px-4 pr-10 outline-none focus:border-orange-400"
          />
          <Send className="absolute right-3 top-2.5 text-orange-500" size={18} />
        </div>
      </section>

      {/* Knowledge Cards */}
      <section className="w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <BookOpen size={20} className="text-blue-500" /> 养宠必读
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {['幼猫喂养', '疫苗指南', '驱虫常识', '新手避坑'].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-orange-200 cursor-pointer transition">
              <p className="text-sm font-medium text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center">
        <div className="flex flex-col items-center gap-1 text-orange-600">
          <MessageSquare size={24} />
          <span className="text-[10px]">咨询</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <BookOpen size={24} />
          <span className="text-[10px]">知识</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <ShoppingBag size={24} />
          <span className="text-[10px]">商城</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <Stethoscope size={24} />
          <span className="text-[10px]">医院</span>
        </div>
      </nav>
    </div>
  );
}
