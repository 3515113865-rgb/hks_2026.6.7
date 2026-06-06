/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MoreVertical, Brain, Calendar, ShoppingCart, HelpCircle, Activity, Award, Sparkles, TrendingUp } from 'lucide-react';
import { ScreenPath } from '../types';

interface GrowthMapViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification: (message: string) => void;
}

export default function GrowthMapView({ onNavigate, onShowNotification }: GrowthMapViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-grow flex flex-col pb-36 font-sans text-sm text-[#e5e2e1]"
    >
      {/* Dynamic Header */}
      <header className="sticky top-0 w-full z-10 flex items-center justify-between h-16 bg-[#131313]/90 backdrop-blur-md border-b border-outline-variant/30 mb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <h1 className="font-display font-bold text-lg text-white">我的成长图谱</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all">
          <MoreVertical size={18} className="text-white" />
        </button>
      </header>

      {/* Subdescription */}
      <p className="text-on-surface-variant text-xs leading-relaxed opacity-85 p-1 mb-4">
        AI 基于你近期的分析检索历史、挥怕矫正及实战统计，智能编织出你专属的羽毛球成长说明书，标记当前核心短板。
      </p>

      {/* Mind-Map Interactive SVG Canvas */}
      <section className="relative w-full aspect-square flex items-center justify-center mb-6">
        {/* Core Centred Node */}
        <div className="absolute z-20 glass-card p-4 rounded-2xl border-primary-container/30 text-center glow-node shadow-2xl">
          <p className="font-mono text-primary-container text-[9px] mb-1 font-semibold">CORE NODE</p>
          <h3 className="font-display font-semibold text-white leading-tight text-xs">
            我的羽毛球<br />成长说明书
          </h3>
        </div>

        {/* Connections Layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* Mindmap connection beams */}
            <line x1="200" y1="200" x2="105" y2="105" stroke="rgba(195, 244, 0, 0.25)" strokeWidth="2" />
            <line x1="200" y1="200" x2="295" y2="105" stroke="rgba(0, 227, 253, 0.2)" strokeWidth="2" />
            <line x1="200" y1="200" x2="95" y2="295" stroke="rgba(255, 225, 109, 0.2)" strokeWidth="2" />
            <line x1="200" y1="200" x2="305" y2="295" stroke="rgba(195, 244, 0, 0.35)" strokeWidth="2" />

            {/* Pulsing indicator dots */}
            <circle cx="105" cy="105" fill="#c3f400" r="4">
              <animate attributeName="r" dur="2s" repeatCount="indefinite" values="4;6;4" />
              <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1;0.4;1" />
            </circle>
            <circle cx="295" cy="105" fill="#00e3fd" r="4" />
            <circle cx="95" cy="295" fill="#ffe16d" r="4" />
            <circle cx="305" cy="295" fill="#c3f400" r="4" />
          </svg>
        </div>

        {/* Nodes boxes floated via absolute coordinates */}
        {/* Branch 1: Actions */}
        <div className="absolute top-[8%] left-[4%] glass-card p-3 rounded-xl border-primary-container/20 max-w-[150px]">
          <h4 className="font-sans font-semibold text-white text-xs">动作能力</h4>
          <div className="mt-1.5 flex flex-col gap-1 text-[10px] text-on-surface-variant font-medium">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400]" />
              已理解: 挥重惯性
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd]" />
              纠正中: 手肘抬升
            </span>
          </div>
        </div>

        {/* Branch 2: Tactics */}
        <div className="absolute top-[8%] right-[4%] glass-card p-3 rounded-xl border-secondary-container/20 max-w-[150px]">
          <h4 className="font-sans font-semibold text-white text-xs">战术意识</h4>
          <div className="mt-1.5 flex flex-col gap-1 text-[10px] text-on-surface-variant font-medium">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffe16d]" />
              待点亮: 后场防守
            </span>
          </div>
        </div>

        {/* Branch 3: Gear */}
        <div className="absolute bottom-[16%] left-[4%] glass-card p-3 rounded-xl border-tertiary-container/20 max-w-[150px]">
          <h4 className="font-sans font-semibold text-white text-xs">装备匹配</h4>
          <div className="mt-1.5 flex flex-col gap-1 text-[10px] text-on-surface-variant font-medium">
            <span className="flex items-center gap-1 text-error text-[9px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
              核心缺陷: 穿线过松
            </span>
          </div>
        </div>

        {/* Branch 4: Drills */}
        <div 
          onClick={() => onShowNotification('📈 推荐动作：拉高位后摆。已为你加入备忘录。')}
          className="absolute bottom-[16%] right-[4%] glass-card-accent p-3 rounded-xl border-[#c3f400]/40 bg-[#c3f400]/5 cursor-pointer max-w-[150px]"
        >
          <h4 className="font-sans font-semibold text-[#c3f400] text-xs">训练路径</h4>
          <div className="mt-1.5 flex flex-col gap-1 text-[10px] text-[#c3f400] font-medium">
            <span className="flex items-center gap-1">
              <TrendingUp size={11} />
              推荐下一步 ➔
            </span>
          </div>
        </div>
      </section>

      {/* AI Assessment Report Card */}
      <section className="mb-8">
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#c3f400] to-transparent animate-shimmer scale-100" />
          
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} className="text-primary-container" />
            <h3 className="font-display font-semibold text-white text-sm">AI 智能评估报告</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <span className="font-mono text-[9px] text-secondary-container font-semibold uppercase tracking-wider block mb-1">CURRENT PROGRESS</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  你的杀球手臂随挥路线合规，但在实战中<strong>手肘回收高度</strong>仍有些微掣肘。建议加强大圆肌拉伸。
                </p>
              </div>

              <div className="w-[1.5px] bg-slate-500/10 self-stretch" />

              <div className="flex-1">
                <span className="font-mono text-[9px] text-[#ffe16d] font-semibold uppercase tracking-wider block mb-1">EQUIPMENT DATA</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  模型建议：你当前硬拽进攻下的 24 磅数无法完全承载扣杀力矩，容易使网面变形致球路发飘，推荐逐步磨合拉升至 26 磅。
                </p>
              </div>
            </div>

            {/* Core focus block */}
            <div className="bg-[#1c1b1b] p-3 border border-white/5 rounded-xl flex items-center gap-2">
              <Sparkles size={14} className="text-[#c3f400]" />
              <span className="font-sans text-xs text-[#c3f400] font-semibold">
                下周核心进阶指标：提升后场高远球落点纵深稳定性 &gt; 80% 以上
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sticky panel */}
      <div className="fixed bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/95 to-transparent border-t border-outline-variant/20 z-20 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('manual-equip')}
            className="h-13 bg-surface-container-high/60 border border-outline-variant/30 text-white font-display font-medium text-xs flex items-center justify-center gap-1.5"
          >
            <ShoppingCart size={13} className="text-secondary-container" />
            查看装备建议
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onShowNotification('📅 陈克利夫专属 7 天一轴化跃迁计划已开启，请进入移动终端日历同步！')}
            className="h-13 bg-primary-container text-[#161e00] font-display font-bold text-xs rounded-full shadow-[0_0_15px_rgba(195,244,0,0.25)] flex items-center justify-center gap-1.5"
          >
            <Calendar size={13} />
            生成 7 天计划
          </motion.button>
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="text-on-surface-variant/70 hover:text-white text-xs font-mono tracking-widest text-center mt-1 uppercase"
        >
          返回分析视频
        </button>
      </div>
    </motion.div>
  );
}
