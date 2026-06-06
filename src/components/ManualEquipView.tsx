/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MoreVertical, ShieldCheck, ShoppingCart, HelpCircle, Eye, Star, Sparkles, TrendingUp } from 'lucide-react';
import { ScreenPath } from '../types';

interface ManualEquipViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification: (message: string) => void;
}

export default function ManualEquipView({ onNavigate, onShowNotification }: ManualEquipViewProps) {
  const [added, setAdded] = useState(false);

  const handleAddToGraph = () => {
    if (added) return;
    setAdded(true);
    onShowNotification('✔ 器材匹配项已并入你的羽毛球成长说明书！AI 诊断模型将在下一拍中为你智能对比。');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-grow flex flex-col pb-36 font-sans text-sm text-[#e5e2e1]"
    >
      {/* Top Header */}
      <header className="sticky top-0 w-full z-10 flex items-center justify-between h-16 bg-[#131313]/90 backdrop-blur-md border-b border-outline-variant/30 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all"
          >
            <ArrowLeft size={18} className="text-[#c3f400]" />
          </button>
          <h1 className="font-display font-bold text-lg text-white">说明书</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all">
            <MoreVertical size={18} className="text-white" />
          </button>
        </div>
      </header>

      {/* Hero: Equipment visual highlighting */}
      <section className="relative overflow-hidden rounded-2xl aspect-video glass-card border border-primary-container/20 mb-8 group shadow-2xl">
        <img
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
          alt="PRO carbon racket zoom"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSa-s9dMl_rbqcxX6f3rgN8kuSM0gqcWMx4lJ15y5CkaLYp93ctUAoz4kylG_6hOgaopznCv3kY6RuRERQcqSp4KiCtx9hYARmOyimgCOpW2yevaxaDRcwNazhC-PnReLMjqVBsqYmRNjjy_dNJZ1atqL4t7G2OmCwMtJEB9kSZaWQ9XdymFA8hg5sLo8Vqq4qGZ0cU6PTDmrEKzGRDqwpl-gOdO6EwGRN7zeFtS7CYRv_GETMGahHdDg8WtB1XqNjv5W1MiC54ys"
        />

        {/* HUD Scanner lines and focal brackets */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c3f400] to-transparent animate-scan" style={{ animationDuration: '4s' }} />
          
          <div className="absolute inset-10 border border-primary-container/30 rounded-xl" />
          <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-primary-container" />
          <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-primary-container" />
          <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-primary-container" />
          <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-primary-container" />
        </div>

        {/* Analyze tag badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-primary-container text-[#161e00] font-mono text-[9px] uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-primary-container/20">
            <Sparkles size={11} /> 实时分析已锁定
          </span>
        </div>

        {/* Model Spec Overlay card */}
        <div className="absolute bottom-5 left-5 glass-card-accent p-3 rounded-xl border-l-[3.5px] border-[#c3f400]">
          <p className="font-mono text-secondary-container text-[9px] uppercase tracking-wider font-semibold">AI MATCHED MODEL</p>
          <h3 className="font-display font-bold text-[#c3f400] text-sm">尤尼克斯 天斧 ASTROX 100ZZ</h3>
        </div>
      </section>

      {/* Specifications grid of racket parameters */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-3.5 rounded-2xl flex flex-col gap-0.5 border-b-2 border-[#c3f400]/40">
          <span className="font-mono text-slate-500 text-[10px] uppercase">类型</span>
          <span className="font-display font-medium text-white text-sm">球拍 / OFFENSIVE</span>
        </div>
        <div className="glass-card p-3.5 rounded-2xl flex flex-col gap-0.5 border-b-2 border-[#00e3fd]/40">
          <span className="font-mono text-slate-500 text-[10px] uppercase">打法</span>
          <span className="font-display font-medium text-white text-sm">强力进攻流</span>
        </div>
        <div className="glass-card p-3.5 rounded-2xl flex flex-col gap-0.5 border-b-2 border-[#c3f400]/40">
          <span className="font-mono text-slate-500 text-[10px] uppercase">场景定位</span>
          <span className="font-display font-medium text-white text-sm">双打中后场</span>
        </div>
        <div className="glass-card p-3.5 rounded-2xl flex flex-col gap-0.5 border-b-2 border-[#00e3fd]/40">
          <span className="font-mono text-slate-500 text-[10px] uppercase">中杆硬度</span>
          <span className="font-display font-medium text-white text-sm">极硬 / EXTRA STIFF</span>
        </div>
      </section>

      {/* Racket design properties pills */}
      <section className="flex flex-wrap gap-2.5 mb-8">
        <span className="bg-[#1c1b1b] border border-outline-variant/30 text-slate-400 px-4 py-2 rounded-full font-mono text-[10px]">&gt; 重头配置</span>
        <span className="bg-[#1c1b1b] border border-outline-variant/30 text-slate-400 px-4 py-2 rounded-full font-mono text-[10px]">&gt; 实心中杆</span>
        <span className="bg-primary-container/10 border border-primary-container/30 text-primary-container px-4 py-2 rounded-full font-mono text-[10px] font-medium tracking-tight">连续进攻能效卓越 (HIGH MAX)</span>
      </section>

      {/* Compatibility Matching Scorecard */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-base text-white flex items-center gap-2">
            <span className="p-1.5 bg-[#c3f400]/10 text-primary-container rounded-lg"><ShieldCheck size={16} /></span>
            用户画像智能匹配度
          </h2>
          <span className="font-mono text-[#c3f400] font-bold text-lg">84%</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-outline-variant/20 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-outline-variant/20">
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase mb-0.5">参考档位数据</p>
              <p className="font-sans font-medium text-white text-xs">陈克利夫: 男 / 双打 / 进阶初级</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-slate-500 uppercase mb-0.5">预算限额</p>
              <p className="font-mono font-medium text-primary-container text-xs">¥800 以内</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">打法适配系数</span>
                <span className="text-primary-container">86%</span>
              </div>
              <div className="h-1.5 w-full bg-[#353534]/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary-container" style={{ width: '86%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">预算吻合度</span>
                <span className="text-[#00e3fd]">38% (旗舰拍溢出)</span>
              </div>
              <div className="h-1.5 w-full bg-[#353534]/50 rounded-full overflow-hidden">
                <div className="h-full bg-[#00e3fd]" style={{ width: '38%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">进阶技能释放潜力</span>
                <span className="text-primary-container">92%</span>
              </div>
              <div className="h-1.5 w-full bg-[#353534]/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary-container" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Diagnostic Verdict and Advice */}
      <section className="glass-card p-5 rounded-2xl border-l-4 border-l-[#00e3fd] bg-[#00e3fd]/5 mb-10">
        <h3 className="font-mono text-xs text-[#00e3fd] uppercase font-semibold mb-2 flex items-center gap-1.5">
          <ShieldCheck size={14} /> AI 判定诊断结论
        </h3>
        <p className="font-sans text-xs text-white/90 leading-relaxed">
          这支球拍是一款 <span className="text-primary-container font-semibold">高爆发重杀重武器</span>，极度契合你的双打后场站位。尽管其中杆极硬、平衡点高对发力小肌肉群有一定负荷阈，但这能够正向反推促进你引拍纠正。<span className="text-[#00daf3] font-semibold">建议：</span>由于该型号全新的专柜价格超过你的 ¥800 计划，建议选择 4U 重量更易卸力爆发。
        </p>
      </section>

      {/* Technical Spec Matrix list */}
      <section className="mb-10">
        <h2 className="font-display font-semibold text-base text-white mb-4">推荐参数定制方向</h2>
        <div className="space-y-3.5">
          <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
            <span className="text-slate-400 font-sans text-xs">推荐重量/手柄规格</span>
            <span className="font-mono text-white text-xs font-bold">4U/G5 (控重版)</span>
          </div>
          <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
            <span className="text-slate-400 font-sans text-xs">拉线网床磅数</span>
            <span className="font-mono text-white text-xs font-bold">24-26 lbs (细柔弹性线)</span>
          </div>
          <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
            <span className="text-slate-400 font-sans text-xs">平衡点 (Balance Point)</span>
            <span className="font-mono text-white text-xs font-bold">305mm ± 2 (重头重合)</span>
          </div>
          <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
            <span className="text-slate-400 font-sans text-xs">挥动重量 (Swing Weight)</span>
            <span className="font-mono text-white text-xs font-bold">88 kg·cm² (杀伤级)</span>
          </div>
        </div>
      </section>

      {/* Floating Actions Panel */}
      <div className="fixed bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/95 to-transparent border-t border-outline-variant/20 z-20 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('purchase')}
            className="h-13 bg-primary-container text-[#161e00] font-display font-bold text-xs rounded-full shadow-[0_0_15px_rgba(195,244,0,0.25)] flex items-center justify-center gap-1.5"
          >
            <ShoppingCart size={14} />
            查看购买建议
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToGraph}
            className={`h-13 rounded-full font-display font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${added ? 'bg-[#ffe16d]/5 border border-[#ffe16d]/40 text-[#ffe16d]' : 'bg-surface-container-high/60 border border-outline-variant/30 text-white'}`}
          >
            <TrendingUp size={14} />
            {added ? '已并入成长说明' : '加入成长图谱'}
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
