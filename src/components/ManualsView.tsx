/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Camera, Shield, ChevronRight, HelpCircle, Sparkles, Database } from 'lucide-react';
import { ScreenPath } from '../types';

interface ManualsViewProps {
  onNavigate: (path: ScreenPath) => void;
}

export default function ManualsView({ onNavigate }: ManualsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-grow flex flex-col"
    >
      {/* Header */}
      <section className="mb-8 pt-4">
        <h2 className="font-display font-black text-3xl text-white tracking-tight italic uppercase mb-2">
          说明书清单 / MANUALS INDEX
        </h2>
        <p className="font-sans text-xs text-on-surface-variant leading-relaxed opacity-85">
          AI 帮你存储所有检测分析出的个人生理运动学、装备限制以及战术缺陷档案库。
        </p>
      </section>

      {/* Manuals Stack */}
      <div className="flex flex-col gap-6">
        {/* Card 1: 比赛说明书 */}
        <div 
          onClick={() => onNavigate('analysis')}
          className="glass-card rounded-xl overflow-hidden group cursor-pointer border border-white/10 active:scale-[0.99] transition-transform bg-[#07090C]"
        >
          <div className="relative h-48 w-full overflow-hidden bg-surface-container-low">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              referrerPolicy="no-referrer"
              alt="Badminton doubles analysis" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBntIwJ3dTtr_5oXi9DiykCoOGmPyT2nLfS7to7gOXa79L77d_JuXT3yophs0chXQKkr07dtRm0Du6h6swaDcIJFldB5V3OTYst6rrjSOAxz5ZVIW9unS_PsuKhXipqSSuIlDgO6HCio8CWTz8jf5xySJu0uOZaNbYKEDkwDKrnHVfIkKjGajc4ILiKpQhbXNUBpxQzvjP9WJgLAkhEElJVtmr08gKfkhfjS1V_p_gtx6p-PR-NQ8L0dueUxmJnj3CrXdmI8slCn4E"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-secondary-container text-black font-display text-[9px] uppercase font-black tracking-wider rounded-xs">
              比赛说明书 / MATCH REPORT
            </div>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 border border-white/10 rounded-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd] animate-pulse" />
              <span className="font-mono text-[8px] text-white/90">TACTICAL AI v2</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-display font-bold text-base text-white leading-tight">双打精彩回合：杀中路得分战术纠错</h5>
              <ChevronRight size={16} className="text-white/40 group-hover:text-[#CCFF00] transition-colors" />
            </div>
            <p className="text-on-surface-variant text-xs mb-3 leading-relaxed opacity-80">
              实战对局热力跑动图谱解析，解码您的发接发习惯、空档防守破绽以及双打防守起扣战术缝隙。
            </p>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-mono">
              <span className="text-[#CCFF00] font-bold">1.2k</span>
              <span>人正在复盘分析中</span>
            </div>
          </div>
        </div>

        {/* Card 2: 动作说明书 */}
        <div 
          onClick={() => onNavigate('manual-action')}
          className="glass-card rounded-xl overflow-hidden group cursor-pointer border border-white/10 active:scale-[0.99] transition-transform bg-[#07090C]"
        >
          <div className="relative h-48 w-full overflow-hidden bg-surface-container-low">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              referrerPolicy="no-referrer"
              alt="Badminton smash biomechanics" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCczQAL1GJK9mElAhxI9xojwnicG_5cxuM2Ca9Wx1RQPAg6xNUEqxw9e8DvFglrLlvYjL20o0dJ6GMG0_tr59CkghMDkBrfs_otx8poDhrk6kVH8dcrIApqKJ5OnNR3rftCsnwNFbh2cT1ClAqbHXMEvWea9SqjjQxfV5v4s0m627VPB2yleVu81dRXVylt_puxbqO9MxZXQuFgSYFi-zMy0lZqQXb6oSAagPuFIYDi9Y7rH_JSelWpT8H6GyNiPEzFSeoSiK2CN94"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#CCFF00] text-black font-display text-[9px] uppercase font-black tracking-wider rounded-xs">
              动作说明书 / BIOMECHANICS
            </div>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 border border-white/10 rounded-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="font-mono text-[8px] text-white/90">KINEMATICS v4</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-display font-bold text-base text-white leading-tight">高空跃杀极致滞空与动力链传导慢析</h5>
              <ChevronRight size={16} className="text-white/40 group-hover:text-[#CCFF00] transition-colors" />
            </div>
            <p className="text-on-surface-variant text-xs mb-3 leading-relaxed opacity-80">
              基于高维智能视觉对你的重杀动作进行骨骼纠正，解构起跳、引拍、击球至随前的动力链能量流转缺陷。
            </p>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-mono">
              <span className="text-[#CCFF00] font-bold">2.8k</span>
              <span>人已生成并深度纠错</span>
            </div>
          </div>
        </div>

        {/* Card 3: 装备说明书 */}
        <div 
          onClick={() => onNavigate('manual-equip')}
          className="glass-card rounded-xl overflow-hidden group cursor-pointer border border-white/10 active:scale-[0.99] transition-transform bg-[#07090C]"
        >
          <div className="relative h-48 w-full overflow-hidden bg-surface-container-low">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
              referrerPolicy="no-referrer"
              alt="Badminton racket equipment setup" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9rbb2yBuztnCXHJIXsz7psma_mWrCH_ZI98J9ghG8qNBhkfKts-JdeUtSFct7rUI81uLdcE07qojb8qScZd4PJ8U7Q_Hk5rZHzJoGgk-1gkTgoj0mmv4d0yC3uqwTeTunaLzVDlHIC7llSOI64SwWHFuJ3wRAQ57g8PtOjrkZHkdiqQUnfgbYzF1x49js4I6QIpklztPGRhKryoeE20iaO2tMM36uiZqaYbxSA8RAKjK2kuApiU61muDyl-_B0LlmzuDBYlI0BOw"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#ffe16d] text-black font-display text-[9px] uppercase font-black tracking-wider rounded-xs">
              装备说明书 / EQUIPMENT TUNING
            </div>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 border border-white/10 rounded-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffe16d] animate-pulse" />
              <span className="font-mono text-[8px] text-white/90">PHYSICS TUNE v1</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-display font-bold text-base text-white leading-tight">3U/4U重头进攻型神拍性能及落点偏差诊断</h5>
              <ChevronRight size={16} className="text-white/40 group-hover:text-[#CCFF00] transition-colors" />
            </div>
            <p className="text-on-surface-variant text-xs mb-3 leading-relaxed opacity-80">
              球拍拉线线衣、磅硬度系数、物理配重偏差及落点击球深度诊断，最大程度定制最称手狂暴利器。
            </p>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-mono">
              <span className="text-[#CCFF00] font-bold">856</span>
              <span>人进行智能磅数适配与推荐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative footer Watermark */}
      <section className="mt-8 mb-4 border-t border-outline-variant/20 pt-6 opacity-30">
        <div className="flex justify-between font-mono text-[9px] text-primary-container font-semibold">
          <span>YUREN.SYSTEM: LOCKED</span>
          <span>DOCK BUILD ENGINES v4.4-BETA</span>
        </div>
      </section>
    </motion.div>
  );
}
