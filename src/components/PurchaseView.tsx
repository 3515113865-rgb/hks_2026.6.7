/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MoreVertical, ShieldAlert, ShoppingCart, HelpCircle, Eye, Star, Sparkles, TrendingUp, Bookmark } from 'lucide-react';
import { ScreenPath } from '../types';

interface PurchaseViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification: (message: string) => void;
}

export default function PurchaseView({ onNavigate, onShowNotification }: PurchaseViewProps) {
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
            onClick={() => onNavigate('manual-equip')}
            className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all"
          >
            <ArrowLeft size={18} className="text-[#c3f400]" />
          </button>
          <h1 className="font-display font-bold text-lg text-white">购买建议</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all">
          <MoreVertical size={18} className="text-white" />
        </button>
      </header>

      {/* Hero Header */}
      <section className="mb-8">
        <span className="font-mono text-xs text-primary-container uppercase tracking-wider font-semibold">GROWTH MAP ANALYSIS</span>
        <p className="font-display text-lg text-[#e5e2e1] mt-1">根据你的成长图谱推荐，不是简单带货</p>

        {/* AI Profile diagnosis recommendation */}
        <div className="mt-5 glass-card-accent rounded-2xl p-6 relative overflow-hidden border border-[#c3f400]/20 shadow-xl">
          <div className="absolute inset-x-0 w-full h-[1px] bg-[#c3f400]/20 animate-scan" style={{ animationDuration: '6s' }} />
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display font-semibold text-primary-container text-base">适合偏向：后场暴力进攻型</h2>
              <p className="mt-2 text-on-surface-variant text-xs leading-relaxed">
                基于你最近 30 场对局的实时重杀频率 (24%) 以及后场跑动热力覆盖区，建议配置能够提供额外弹性传导杠杆及重惯性击球角度的组合。
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="font-mono text-[9px] text-slate-500 mb-1">精度置信度</span>
              <div className="flex gap-0.5">
                <span className="w-1.5 h-3 bg-[#c3f400] rounded-sm" />
                <span className="w-1.5 h-3 bg-[#c3f400] rounded-sm" />
                <span className="w-1.5 h-3 bg-[#c3f400] rounded-sm" />
                <span className="w-1.5 h-3 bg-surface-container-high rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rationale Set A */}
      <section className="mb-10 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-primary-container" />
          <h3 className="font-display font-semibold text-white text-base">组合 A：暴力进攻流 (重火力配置)</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Item 1 */}
          <div className="glass-card p-4 rounded-2xl flex gap-4 hover:border-primary-container/20 group cursor-pointer transition-all">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/40 border border-white/5 relative shrink-0">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                referrerPolicy="no-referrer"
                alt="Offensive carbon racket X1"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdTws3j5O1b1tXv0b4WthYrOz8kfkx0plzxcljbmei-VFjwlXAMNCJHeZYUjc-vted_c5ntPcrNhOvghbvjF9oMgKwmVjLeA0e-Bx-sxBXUXOk475tqvH3XfhNNOIUIIy5qDX0H6JS5Z_3veKt4uJM0vZKYn7SEtob4s_IjkG0IxzU_p2mE27pd1dHGLAmKyhZOR-juYbIeEu-z9tG58XsN3F_GmOgjT4ZBSct7pMA5rjL9gVpyqUHGuEMHjgLBT4oEH1FSsbnskI"
              />
              <span className="absolute top-1.5 right-1.5 px-2 py-0.5 bg-primary-container text-[#161e00] font-mono text-[8px] font-bold rounded-full">CORE ITEM</span>
            </div>
            <div>
              <span className="font-mono text-slate-500 text-[9px] uppercase">RACKET / 球拍</span>
              <h4 className="font-display font-semibold text-white text-sm mt-0.5">极光系列 - X1</h4>
              <p className="text-on-surface-variant text-xs mt-1.5 leading-relaxed">4U 精钢重头，能让你的每一次重杀都携卷厚重的物理下压力度。</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="glass-card p-4 rounded-2xl flex gap-4 hover:border-[#00e3fd]/20 group cursor-pointer transition-all">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                referrerPolicy="no-referrer"
                alt="Fluor string"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiSqh4NsQBnRuumW14y6gM9CSKtikZljDNA-84hRMO4f2wNPj-2U5tdWZBpQebKMgF0rGblzLxpztQykcuwNNYWcPOuDuvBmmBLnccmLP4Lzyaj7O0wQa5aDlFjAE06L3f10zdoisjFNQGcl_rYXLUvWGsiXFItwCFgH85m-46QONVp3GtOL06aJaf14gL0ESS-NQdaEMKIgPXkyFplqfBmiDc9kZ2M_X3qs-7WBgGmLT2b9CEdIlEF3WwYtD5yiwBTvnhonN-ies"
              />
            </div>
            <div>
              <span className="font-mono text-slate-500 text-[9px] uppercase">STRING / 羽线配置</span>
              <h4 className="font-display font-semibold text-white text-sm mt-0.5">高弹力科技细线</h4>
              <p className="text-on-surface-variant text-xs mt-1.5 leading-relaxed">推荐穿线 25-27 磅。增加甜区反触音效，提供高回弹泄力支持。</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="glass-card p-4 rounded-2xl flex gap-4 hover:border-primary-container/20 group cursor-pointer transition-all">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                referrerPolicy="no-referrer"
                alt="PRO shoes specs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXBemd-696yBOddHW-lugzhejJGwNuuH1PKiz8dw5o__0fkTdf0uXywK8TYbX5hS_iYGq4LINu9HXKKBgsE2tS81UIA6w1mFLRnMGKZLnud_es-1cujHz7sS5klB6InFvR8SsbZum94ZZWrE2CQwHC7UKm3aEF5Rn9m09Ww4UcHzP4JtlXpJ4noii_QtU9vdnAp9ibTlEb01WUaK-h3wBhd04BoXHA_bUZNz4kwJuw-jjxxSLkHQBLFhrvXYAldcGGuUR4_5G_Yek"
              />
            </div>
            <div>
              <span className="font-mono text-slate-500 text-[9px] uppercase">SHOES / 专业球鞋</span>
              <h4 className="font-display font-semibold text-white text-sm mt-0.5">瞬影减震战靴</h4>
              <p className="text-on-surface-variant text-xs mt-1.5 leading-relaxed">强化碳板底盘抗扭抗侧移，极大缓冲你高跳杀球后落地的踝骨受挫压力。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rationale match detail card */}
      <section className="glass-card rounded-2xl p-6 border-l-4 border-l-primary-container mb-8">
        <h3 className="font-display font-semibold text-white text-sm flex items-center gap-2">
          <span className="p-1.5 bg-[#c3f400]/10 text-primary-container rounded-lg"><Sparkles size={16} /></span>
          为什么这套组合最适合你？
        </h3>
        <div className="mt-5 space-y-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center shrink-0">
              <span className="text-[#00e3fd] text-xs font-mono">1</span>
            </div>
            <div>
              <p className="text-white font-medium text-xs">对应解决“杀中路落点发飘”</p>
              <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">气动破风截面配合大重头，能强力矫正你高球发力时的卸力摇晃，杀球更稳定。</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center shrink-0">
              <span className="text-[#00e3fd] text-xs font-mono">2</span>
            </div>
            <div>
              <p className="text-white font-medium text-xs">补偿你的“击球爆发速度峰值”</p>
              <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">
                数据提示你的击球发力挥摆速率合标，但缺乏击球瞬间的韧性。X1 的物理回弹杠杆能更轻松放大这种弹性张力。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Avoidance List */}
      <section className="mb-10">
        <h3 className="font-display font-semibold text-base text-error flex items-center gap-2 mb-4">
          <ShieldAlert size={18} />
          避雷防损警告建议 (不建议采纳)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#93000a]/10 border border-[#93000a]/30 rounded-2xl p-4">
            <h4 className="font-bold text-error text-xs uppercase tracking-wide">&gt; 盲目堆配极顶硬度中杆</h4>
            <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">
              职业旗舰硬度对爆发力量有绝对阈值要求。鉴于你正处于进阶初级手腕成长中，强行使用极硬中杆必然诱发网球肘拉伤。
            </p>
          </div>

          <div className="bg-[#93000a]/10 border border-[#93000a]/30 rounded-2xl p-4">
            <h4 className="font-bold text-error text-xs uppercase tracking-wide">&gt; 盲目堆上 30 磅拉线</h4>
            <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">
              超高磅数虽带来指哪打哪的速度感，但极大缩减球线网床弹性。极易出现卸力不均、回球质量断崖下滑的问题，建议以 24-26 磅为宜。
            </p>
          </div>
        </div>
      </section>

      {/* Rationale Set B (Horizontal mini scroll list) */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-secondary-container" />
          <h3 className="font-display font-semibold text-white text-base">组合 B：平抽连贯控制流</h3>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex-none w-56 glass-card rounded-2xl p-4 flex flex-col gap-3">
            <div className="aspect-[16/9] bg-surface-container-high rounded-xl flex items-center justify-center border border-white/5">
              <span className="text-[#00e3fd] text-xs font-mono">LIGHT WEIGHT</span>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white text-xs">极轻型双打控制拍</h4>
              <p className="text-on-surface-variant text-[11px] mt-1">5U 超轻手感，极致激发平抽快挡优势。</p>
            </div>
          </div>

          <div className="flex-none w-56 glass-card rounded-2xl p-4 flex flex-col gap-3">
            <div className="aspect-[16/9] bg-surface-container-high rounded-xl flex items-center justify-center border border-white/5">
              <span className="text-[#00e3fd] text-xs font-mono">ABSORB GRIP</span>
            </div>
            <div>
              <h4 className="font-display font-semibold text-white text-xs">吸水纹路耐磨吸汗手胶</h4>
              <p className="text-on-surface-variant text-[11px] mt-1">防止大范围跑动中湿滑脱手，握持极护感。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sticky buttons */}
      <div className="fixed bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/95 to-transparent border-t border-outline-variant/20 z-20 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onShowNotification('🛒 购买申请成功！已为你自动匹配最优惠渠道加入结算订单。')}
            className="h-13 bg-primary-container text-[#161e00] font-display font-bold text-xs rounded-full shadow-[0_0_15px_rgba(195,244,0,0.25)] flex items-center justify-center gap-1.5"
          >
            <ShoppingCart size={14} />
            查看购买
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onShowNotification('🔖 已成功加入你的心愿单！可在“我的”进行合并结算。')}
            className="h-13 rounded-full bg-surface-container-high/60 border border-outline-variant/30 text-white font-display font-medium text-xs flex items-center justify-center gap-1.5"
          >
            <Bookmark size={14} />
            加入清单
          </motion.button>
        </div>

        <button 
          onClick={() => onNavigate('manual-equip')}
          className="text-on-surface-variant/70 hover:text-white text-xs font-mono tracking-widest text-center mt-1 uppercase"
        >
          返回装备说明书
        </button>
      </div>
    </motion.div>
  );
}
