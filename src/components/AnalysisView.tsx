/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MoreVertical, Brain, Mic, Send, Bot, Trash, HelpCircle, Activity } from 'lucide-react';
import { ScreenPath } from '../types';

interface AnalysisViewProps {
  onNavigate: (path: ScreenPath) => void;
  setUserQuery: (query: string) => void;
}

export default function AnalysisView({ onNavigate, setUserQuery }: AnalysisViewProps) {
  const [inputText, setInputString] = useState('');
  const [activeDots, setActiveDots] = useState(true);

  const startAnalysis = (query: string) => {
    if (!query.trim()) return;
    setUserQuery(query);
    onNavigate('loading');
  };

  const selectPreset = (text: string) => {
    setInputString(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-grow flex flex-col relative min-h-[700px] overflow-hidden rounded-3xl"
    >
      {/* Absolute Back Button */}
      <div className="absolute top-4 left-4 z-40">
        <button
          onClick={() => onNavigate('manuals')}
          className="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full text-white cursor-pointer border border-white/15 hover:bg-black/80 hover:border-[#CCFF00]/40 transition-all outline-none active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Background Cinematic Lens */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover brightness-[0.45] contrast-125 transition-all duration-500 scale-100"
          referrerPolicy="no-referrer"
          alt="Athlete smashes badminton"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuxvRxATPT5yFRj6oFBtPxArpZNoewDrB0iauqwFHcf0qVyvmHgkQ8mgmHrdi31PjqqcR9oM7yA6v0bHGTYOLIxsdgtVbFWFgDeJc3TRhjP_4bR-5nrQdVIHIAJHG6DSwT7sBotdVA4meku1vGECuPehQfRwdHF1JNz96-OhGBdB3aweYUZykZqkuXUp_vdasVCzNtdlA5vPOlFY1p4OeEBVW2OgS402TbRY1jkSFsv0WgqSJ6hBUVM-oF5kbEQpyHivwKLRoWzV8"
        />
        {/* Dynamic Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        
        {/* Interactive court grid lines */}
        <div className="absolute inset-0 court-lines opacity-10 pointer-events-none" />

        {/* Scanning Line overlay */}
        <div className="absolute inset-x-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-80 blur-[1px] animate-scan pointer-events-none" />
      </div>

      {/* Dynamic Overlay HUD layers */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 800">
          {/* Tracking Joint Dots */}
          {activeDots && (
            <>
              <motion.circle cx="210" cy="380" fill="#CCFF00" r="5" className="shadow-lg blur-[0.5px]" animate={{ r: [5, 7, 5] }} transition={{ repeat: Infinity, duration: 2 }} />
              <circle cx="250" cy="430" fill="#CCFF00" r="4" />
              <circle cx="170" cy="430" fill="#CCFF00" r="4" />
              <line stroke="#00e3fd" strokeWidth="2" x1="210" y1="380" x2="250" y2="430" />
              <line stroke="#ffe16d" strokeWidth="1.5" x1="210" y1="380" x2="170" y2="430" strokeDasharray="3,3" />

              <path
                d="M 170 340 Q 210 300 250 340"
                fill="none"
                stroke="#CCFF00"
                strokeDasharray="4 2"
                strokeWidth="1.5"
                className="opacity-70"
              />
            </>
          )}
        </svg>
      </div>

      {/* HUD Floating telemetry info */}
      <div className="absolute top-[28%] left-[10%] z-10 max-w-sm pointer-events-auto">
        <div className="glass-card-accent p-3 rounded-xs shadow-lg border border-primary-container/20 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#CCFF00] font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            AI REALTIME SKELETON
          </div>
          <p className="font-display font-black text-white text-xs">SENSORY CAPTURE LOCK</p>
        </div>
      </div>

      <div className="absolute top-[48%] right-[10%] z-10 pointer-events-auto">
        <div className="glass-card p-3 rounded-xs border-l-4 border-[#CCFF00] text-right bg-black/40">
          <p className="text-[10px] font-mono text-[#CCFF00] font-black">HIT POINT SPEED</p>
          <p className="font-mono text-white font-black text-lg">204 KM/H</p>
        </div>
      </div>

      {/* Right-aligned Vertical Action Bubble Controls */}
      <div className="absolute right-4 top-1/3 -translate-y-1/2 flex flex-col gap-5 z-20">
        <button
          onClick={() => setActiveDots(!activeDots)}
          className={`w-12 h-12 rounded-sm glass-card hover:border-[#CCFF00] flex flex-col items-center justify-center gap-0.5 transition-all outline-none cursor-pointer ${activeDots ? 'border-[#CCFF00]/40 bg-[#CCFF00]/10' : ''}`}
        >
          <Activity size={18} className={activeDots ? 'text-[#CCFF00]' : 'text-white'} />
          <span className="text-[8px] font-mono text-white/80">点阵</span>
        </button>

        <button
          onClick={() => selectPreset('为什么这一球能得分？')}
          className="w-12 h-12 rounded-sm glass-card flex flex-col items-center justify-center gap-0.5 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Bot size={18} className="text-[#00e3fd]" />
          <span className="text-[8px] font-mono text-white/80">问 AI</span>
        </button>

        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-sm glass-card flex items-center justify-center">
            <span className="text-white text-xs font-mono font-black">BWF</span>
          </div>
          <span className="text-[8px] font-mono text-white/50">决赛</span>
        </div>
      </div>

      {/* Main interactive bottom canvas */}
      <div className="mt-auto p-5 pb-8 relative z-20 flex flex-col gap-4">
        {/* Helper Question Chips */}
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={() => selectPreset('为什么这一球能得分？')}
            className="px-3 py-1.5 rounded-sm glass-card border border-white/10 hover:border-primary-container/25 text-xs text-white/90 flex items-center gap-1.5 transition-all text-left bg-black/40 cursor-pointer"
          >
            <HelpCircle size={12} className="text-primary-container" />
            为什么这球能得分？
          </button>
          <button
            onClick={() => selectPreset('分析他的高远球动作拉起缺陷')}
            className="px-3 py-1.5 rounded-sm glass-card border border-white/10 hover:border-secondary-container/25 text-xs text-white/90 flex items-center gap-1.5 transition-all text-left bg-black/40 cursor-pointer"
          >
            <HelpCircle size={12} className="text-secondary-container" />
            分析他的高远球动作
          </button>
        </div>

        {/* Video description info card */}
        <div className="p-4 glass-card rounded-xl border-white/10 border bg-black/40">
          <span className="inline-block px-2.5 py-0.5 bg-[#CCFF00] text-black text-[9px] font-display uppercase font-black tracking-wider rounded-xs mb-2">
            BWF FINALS 2024
          </span>
          <h2 className="font-display font-black text-xl italic uppercase text-white tracking-tight">双打精彩回合：后场杀中路得分</h2>
          <p className="text-xs text-on-surface-variant font-sans mt-1">后场发力与姿态纠正同步分析中</p>
        </div>

        {/* Action Panel and Input Form */}
        <div className="space-y-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-[#CCFF00] pointer-events-none">
              <Bot size={18} />
            </span>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputString(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') startAnalysis(inputText);
              }}
              className="w-full h-14 bg-black/60 backdrop-blur-xl border border-white/10 rounded-sm pl-12 pr-16 text-white text-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/30 font-sans shadow-inner"
              placeholder="问动作、装备、或战术..."
            />
            <button
              onClick={() => startAnalysis(inputText)}
              disabled={!inputText.trim()}
              className={`absolute right-1.5 top-1.5 h-11 px-5 rounded-xs font-display font-black uppercase text-xs flex items-center justify-center transition-all cursor-pointer ${inputText.trim() ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:scale-102 active:scale-98' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
            >
              分析
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-on-surface-variant/50 font-mono px-3">
            <span>POWERED BY AI VISION ENGINE V4.0</span>
            <span>按住空格说词</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
