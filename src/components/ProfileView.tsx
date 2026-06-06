/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, ChevronRight, TrendingUp, ShoppingBag, ClipboardList, ShoppingCart } from 'lucide-react';
import { ScreenPath } from '../types';

interface ProfileViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification: (message: string) => void;
}

export default function ProfileView({ onNavigate, onShowNotification }: ProfileViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-grow flex flex-col"
    >
      {/* Profile summary card */}
      <section className="mb-8">
        <div className="glass-card rounded-xl p-6 relative overflow-hidden border border-[#CCFF00]/20 shadow-2xl bg-white/5">
          {/* Decorative court net pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-transparent via-[#00e3fd]/10 to-transparent -rotate-45 translate-x-12 -translate-y-8 pointer-events-none" />

          <div className="flex items-center gap-4.5 mb-6 relative z-10 animate-fade-in">
            <div className="w-16 h-16 rounded-full border border-primary-container p-0.5 bg-surface-container">
              <img
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
                alt="Chen cliff portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkMkSyHpVhLlozcCPWhGDljizV4X_sxyY1ExBhXHCpQ6eB0H1odnqtPqlvxOM7oGe1SMRrRpqAQ8iVYP8QFuaKejTze7r-aNvzf2Cohpqm09_Cg9S4MmtI9ZAVg3_N7wQqA03cgMizQpLNudF_GnT0z0jMk6kzRY2lsMcXv626GwwjWUhO8YVeUh_ujG0PdXv_KbMgGi48bg5i7vdzHkJeoU_9avmbCEpz2Rj23Ahw4Y7fRVV7id1bxP9dwLlpH7yFk5LU1I77Eko"
              />
            </div>
            <div>
              <h2 className="font-display font-black text-xl italic uppercase text-white tracking-tight">陈克利夫 / CLIFF</h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="font-mono text-[9px] font-black bg-[#CCFF00] text-black px-2 py-0.5 rounded-xs tracking-wider">LEVEL. 04</span>
                <span className="text-on-surface-variant text-xs font-semibold">进阶初级学员 / AMATEUR</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-2">
            <p className="font-mono text-[10px] text-[#00e3fd] tracking-widest font-black uppercase">CURRENT FOCUS / 最近纠正重心</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-xs bg-[#07090C] border border-white/10 text-xs text-white font-medium">
                # 跳杀 / SMASH
              </span>
              <span className="px-2.5 py-1 rounded-xs bg-[#07090C] border border-white/10 text-xs text-white font-medium">
                # 后场高球 / REARCOURT
              </span>
              <span className="px-2.5 py-1 rounded-xs bg-[#07090C] border border-white/10 text-xs text-white font-medium">
                # 4U 极光 X1 / ASTROX
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Action shortcuts grid */}
      <section className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => onNavigate('growth-map')}
          className="glass-card hover:bg-white/10 border border-white/10 p-5 rounded-xl flex flex-col gap-3 group text-left outline-none cursor-pointer bg-white/5"
        >
          <TrendingUp size={24} className="text-[#CCFF00] group-hover:scale-110 transition-transform" />
          <div>
            <h4 className="font-display font-black text-sm uppercase italic text-white tracking-tight">成长图谱 / GROWTH MAP</h4>
            <p className="text-[10px] text-on-surface-variant mt-1.5 leading-relaxed">
              基于你所有的挥拍记录编译的双打评估脑图。
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('manual-equip')}
          className="glass-card hover:bg-white/10 border border-white/10 p-5 rounded-xl flex flex-col gap-3 group text-left outline-none cursor-pointer bg-white/5"
        >
          <ShoppingBag size={24} className="text-secondary-container group-hover:scale-110 transition-transform" />
          <div>
            <h4 className="font-display font-black text-sm uppercase italic text-white tracking-tight">装备建议 / EQUIP MATCH</h4>
            <p className="text-[10px] text-on-surface-variant mt-1.5 leading-relaxed">
              基于你的体能释放及预算大额，匹配推荐的战靴与球线。
            </p>
          </div>
        </button>
      </section>

      {/* Log list of recently analyzed items */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1 border-b border-white/10 pb-2">
          <h3 className="font-display font-black text-base text-white uppercase italic tracking-tight">最近生成的说明书 / HISTORIC</h3>
          <button 
            onClick={() => onNavigate('manuals')}
            className="text-[#CCFF00] font-display text-[10px] font-black flex items-center gap-0.5 tracking-wider italic cursor-pointer uppercase"
          >
            VIEW ALL / 全部 <ChevronRight size={12} />
          </button>
        </div>

        <div className="space-y-3.5">
          {/* Log Item 1 */}
          <div
            onClick={() => onNavigate('manual-action')}
            className="glass-card p-4 rounded-xl flex items-center gap-4 border border-white/10 hover:border-primary-container/20 cursor-pointer transition-all bg-[#07090C]"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black/40 relative flex items-center justify-center">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
                alt="Thumb action"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnqoXv0ZvvKciTXjAk3sK6_gwN5tTxa21h_R-AHspLSQRqcI0LV0RbSd1Dl9P85CufH6zULT-ac59DmSA5DQYKATEm8UnxcJqSn56mWdfiOJhJ1pUiKyWYwsndlAupmuNvaELM16HLp-3BzZvHGMtgT2-vicA-zjY6pE6Awzy7JDg1Ndf616cD6EOwcCzzJ0fU5rWc9b7EX9lKSqOGkIjbOiyD286ureECaVGoVd54caIKb0Lc6ATWV_ohlnK5V3yoXEHqdavFXVw"
              />
              <Award size={18} className="text-[#CCFF00] relative z-10" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-display font-bold text-white text-xs truncate mr-2">后场重杀动作分析 / BACKCOURT</h4>
                <span className="font-mono text-[9px] text-slate-500 shrink-0">10.21</span>
              </div>
              <p className="text-[11px] text-on-surface-variant truncate">动作说明书 · 手肘过低阻碍高点爆发</p>
              <div className="mt-2 flex">
                <span className="text-[9px] bg-primary-container/10 border border-primary-container/20 text-primary-container px-2 py-0.5 rounded font-mono font-black uppercase">高爆发杀伤 / POWER</span>
              </div>
            </div>
          </div>

          {/* Log Item 2 */}
          <div
            onClick={() => onShowNotification('🛡 这是过往实战记录。目前战术板未连接，请保持看见模式畅通！')}
            className="glass-card p-4 rounded-xl flex items-center gap-4 border border-white/10 hover:border-secondary-container/20 cursor-pointer transition-all bg-[#07090C]"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black/40 relative flex items-center justify-center">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
                alt="Thumb tactics"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEF1dTTZ_G0RPp7PsG0G2EdQSQVrnMMJvtXsZkKG8fgJamuIZerpHiVtEvZeMBVsgpRTViD0CWgf1MwTAfTX7EirRxznogqQL_SogOc19ua04rHXx9vO3a7q-WW6mvDz5STJEk5dpCv3K7LnsHluVX5weYs1yeneBYo74frgVkXpuny5mMVPDDDkMKTFjCvJbZ0I7yUw74hRCu2EJ4LKlYwstv2YmkR0BxBBmpJJ3ECOogvsZZnDxzvVTGHkCjIz6IVt6ByYcU1yw"
              />
              <ClipboardList size={18} className="text-secondary-container relative z-10" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-display font-bold text-white text-xs truncate mr-2">周三男双 0-2 对局复盘 / DOUBLES</h4>
                <span className="font-mono text-[9px] text-slate-500 shrink-0">10.19</span>
              </div>
              <p className="text-[11px] text-on-surface-variant truncate">比赛说明书 · 发球段后抢网跟进断层</p>
              <div className="mt-2 flex">
                <span className="text-[9px] bg-secondary-container/10 border border-secondary-container/20 text-[#00daf3] px-2 py-0.5 rounded font-mono font-black uppercase">战术配合 / TACTICAL</span>
              </div>
            </div>
          </div>

          {/* Log Item 3 */}
          <div
            onClick={() => onNavigate('manual-equip')}
            className="glass-card p-4 rounded-xl flex items-center gap-4 border border-white/10 hover:border-primary-container/20 cursor-pointer transition-all bg-[#07090C]"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black/40 relative flex items-center justify-center">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
                alt="Thumb gear"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSjI575KDQJ9nbSoE5iEOZJCODI9OCgGmwYz5fM70-3yLTm1sKTKmyz4xqG5iIMXqsjkPI063ytY9AP9miEWZig8yOXxXzt0C8ije737MXLOZlLWOlvJWifgxPcsiYkzS0ckS3Kos1UuBTGcMXVyoMjY_ZwsZbn6fAYBuVrCZNHiGgDujCJSK_IGfU9ttqfQjmzTtL6_hrsnSW5vY4yPvM3XfLwEy-ZGusStX5af-XJsMRnA328ngQyKnij_EtHEF1nBFEbFJBgSs"
              />
              <ShoppingCart size={18} className="text-secondary-container relative z-10" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-display font-bold text-white text-xs truncate mr-2">天斧 100ZZ 配重适配 / RADAR</h4>
                <span className="font-mono text-[9px] text-slate-500 shrink-0">10.15</span>
              </div>
              <p className="text-[11px] text-on-surface-variant truncate">装备说明书 · 重头拍配合高爆发打法完美</p>
              <div className="mt-2 flex">
                <span className="text-[9px] bg-primary-container/10 border border-primary-container/20 text-[#CCFF00] px-2 py-0.5 rounded font-mono font-black uppercase">92% 重合 / FIT</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
