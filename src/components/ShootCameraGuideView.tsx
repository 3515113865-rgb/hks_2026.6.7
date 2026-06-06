/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Camera, RefreshCw, X, Lightbulb, Zap, Sparkles, Wand2, ShieldAlert } from 'lucide-react';
import { ScreenPath } from '../types';

interface ShootCameraGuideViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification?: (msg: string) => void;
}

export default function ShootCameraGuideView({ onNavigate, onShowNotification }: ShootCameraGuideViewProps) {
  // Mode selection: setup alignment guide vs. live skeleton coaching scan
  const [isRecording, setIsRecording] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [racketAlert, setRacketAlert] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isProcessing, setIsProcessing] = useState(false);

  // Micro-jitter animation for skeleton nodes when active
  const [jitter, setJitter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isRecording && !isProcessing) {
      const interval = setInterval(() => {
        setJitter({
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3,
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isRecording, isProcessing]);

  // Automated recording simulation countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRecording && secondsLeft === 0) {
      compileAISpecs();
    }
    return () => clearTimeout(timer);
  }, [isRecording, secondsLeft]);

  const compileAISpecs = () => {
    setIsProcessing(true);
    if (onShowNotification) {
      onShowNotification("⚡ AI 极解析核心已编译你的挥拍视频！正在解构高空动力链...");
    }
    setTimeout(() => {
      onNavigate('loading'); // Go to generic generator animation progress page
    }, 2000);
  };

  const startStreamingPreview = () => {
    setIsRecording(true);
    setSecondsLeft(5);
    if (onShowNotification) {
      onShowNotification("🎥 4K AI-STREAMING 管道已连接！请开始挥拍，系统正在实时记录骨骼动能。");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 bg-[#000000] flex flex-col justify-between overflow-hidden"
    >
      {/* Top Header Controls Overlay */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 h-16 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (isRecording) {
                setIsRecording(false);
                setSecondsLeft(5);
              } else {
                onNavigate('shoot-entrance');
              }
            }}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-white outline-none cursor-pointer"
          >
            <X size={20} />
          </button>
          <span className="font-display font-black text-sm italic uppercase text-white tracking-widest">
            {isRecording ? "AI 实时解构 / LIVE MONITOR" : "拍动作 / post align"}
          </span>
        </div>

        {/* Technical corner streaming overlay specs info */}
        <div className="text-right">
          <div className="font-mono font-black text-xs text-[#00e3fd] leading-tight">
            60 <span className="text-[9px] font-sans font-light text-white/50">FPS</span>
          </div>
          <div className="font-mono text-[8px] text-white/40 tracking-wider">
            4K AI-STREAMING
          </div>
        </div>
      </header>

      {/* Camera Full-Bleed Viewport Canvas */}
      <div className="absolute inset-0 z-0 bg-neutral-950">
        {!isRecording ? (
          // Setup alignment placeholder court image
          <img
            alt="Badminton court perspective template"
            className="w-full h-full object-cover opacity-65 grayscale-[30%] scale-102 transition-transform duration-1000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdpp69heToxq2zIriOxHIigh2FvxRAwBY9j7q-F2m5QgknWsyEpkItVRJJ8N48XpnRP1tuANuJ4O8LfXD4PAb6IitjaIpVurAH8Q3aJ_imxs2Hmt9xuKhh2sy5HVhvIp3rEcddQqwxoIqGVV9zarEL8ghj9YiMQvryePIm8Us5DwkmMCJuo7YpnKo4jk2mDcixNMTBB-gPChFUQWBxyMsacXqCEBtX2PMT35Msry47iwSVEJCC6kbjdp2ut0K533T4ruMIJodDSD8"
          />
        ) : (
          // Active capturing posture tracking skeleton image
          <img
            alt="Visual skeletal matching analysis active"
            className="w-full h-full object-cover opacity-70 scale-100 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwRRpa9-Xybt7RJpYZkTXuiGdLCQJCHcoKr65gtTa52VZRYludmJvHK8TdTZqTIaudYK1vUWdyin-XRCvR6JjfpPWt_Jv6HZMsa4Z9Wd7PhtQ9Gu1yk9x5iJhwwtIRFJzu-AaXNMCZ7OMQPZJeej_tMeoRT3mLPbItx4iK2kUqsdM22RbggS1BhM-RsT4wey4IMy2aXPU9s7Sowo2Yx-Bd31wJ3kZ7afAiQjSP3pXK1Ks9Q40Ogp6ATj3eQ6FuddFPmgTc8RXrjyU"
          />
        )}

        {/* Dynamic sweeping laser scan line */}
        <div className="camera-overlay-line z-10" />

        {/* Grid court floor line vectors */}
        <div className="absolute inset-0 border-[1px] border-white/5 pointer-events-none grid grid-cols-4">
          <div className="border-r border-white/5" />
          <div className="border-r border-white/5" />
          <div className="border-r border-white/5" />
        </div>
      </div>

      {/* AI Silhouette / Overlay Skeleton Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {!isRecording ? (
            // Human alignment frame guide outline overlays
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="relative w-[280px] h-[480px] border-2 border-dashed border-[#CCFF00]/30 rounded-[28px] flex items-center justify-center"
            >
              {/* Head Circle Overlay */}
              <div className="absolute top-10 w-24 h-24 border-2 border-[#00e3fd]/40 rounded-full" />
              {/* Shoulder guides */}
              <div className="absolute top-36 w-52 h-[1px] border-t border-dashed border-[#00e3fd]/30" />
              {/* Torso Center Safe Zone */}
              <div className="absolute top-1/2 -translate-y-1/2 w-44 h-48 border border-white/10 rounded-2xl bg-white/[0.01]" />
              {/* Feet Curve Guides */}
              <div className="absolute bottom-6 flex justify-between w-48">
                <div className="w-16 h-8 border-b-2 border-r-2 border-[#CCFF00] rounded-br-[12px]" />
                <div className="w-16 h-8 border-b-2 border-l-2 border-[#CCFF00] rounded-bl-[12px]" />
              </div>
            </motion.div>
          ) : (
            // Dynamic Interactive SVG nodes representing joint tracking matching mockup 1
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
              <g style={{ transform: `translate(${jitter.x}px, ${jitter.y}px)` }} className="transition-transform duration-100">
                {/* Simulated Joint Nodes matching image overlay dots */}
                <circle cx="200" cy="300" fill="#CCFF00" r="5" className="shadow-lg animate-pulse" />
                <circle cx="160" cy="320" fill="#CCFF00" r="4.5" />
                <circle cx="240" cy="315" fill="#CCFF00" r="4.5" />
                <circle cx="140" cy="390" fill="#CCFF00" r="4" />
                <circle cx="260" cy="385" fill="#CCFF00" r="4" />
                <circle cx="180" cy="480" fill="#CCFF00" r="4.5" />
                <circle cx="220" cy="475" fill="#CCFF00" r="4.5" />
                
                {/* Connecting bones */}
                <line x1="160" y1="320" x2="240" y2="315" stroke="#00e3fd" strokeWidth="2" />
                <line x1="160" y1="320" x2="140" y2="390" stroke="#00e3fd" strokeWidth="1.5" />
                <line x1="240" y1="315" x2="260" y2="385" stroke="#00e3fd" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="200" y1="300" x2="200" y2="360" stroke="#ffe16d" strokeWidth="1.5" />
              </g>

              {/* Trajectory dotted curve guide */}
              <path
                d="M 140 390 Q 200 240 280 200"
                fill="none"
                stroke="#CCFF00"
                strokeDasharray="4 3"
                strokeWidth="1.5"
                className="opacity-70"
              />
            </svg>
          )}
        </AnimatePresence>
      </div>

      {/* Floating telemetries overlays */}
      <div className="absolute top-20 inset-x-6 z-20 flex flex-col gap-2.5 pointer-events-none">
        
        {/* Status indicator badges */}
        <div className="flex flex-col gap-1.5 items-start">
          <div className="flex items-center gap-2 bg-black/50 border border-[#CCFF00]/25 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]" />
            <span className="font-mono text-[9px] text-[#CCFF00] font-black uppercase">
              BODY INSIDE FRAME
            </span>
          </div>

          {racketAlert && (
            <div className="flex items-center gap-2 bg-black/50 border border-red-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[9px] text-red-400 font-extrabold uppercase">
                RACKET NOT FULLY CAPTURED
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 bg-black/40 border border-white/5 px-3.5 py-1.5 rounded-full backdrop-blur-md opacity-60">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="font-mono text-[9px] text-white/70 uppercase">
              POSE CORRECT
            </span>
          </div>
        </div>

        {/* Dynamic Floatings (Advice prompts & accuracy card) */}
        {isRecording && (
          <div className="absolute top-1 left-28 translate-x-2 flex flex-col gap-2">
            {/* Advice Bubble 1 */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="bg-black/60 backdrop-blur-xl border border-[#CCFF00]/30 px-3 py-1.5 rounded-full flex items-center gap-2 w-fit shadow-lg shadow-black/50"
            >
              <Lightbulb size={12} className="text-[#CCFF00]" />
              <span className="font-mono text-[9px] font-black text-[#CCFF00] uppercase tracking-wide">
                Hit point a bit higher
              </span>
            </motion.div>

            {/* Advice Bubble 2 */}
            <div className="bg-black/60 backdrop-blur-xl border border-[#00e3fd]/30 px-3 py-1.5 rounded-full flex items-center gap-2 w-fit shadow-lg shadow-black/50 ml-6">
              <Zap size={12} className="text-[#00e3fd]" />
              <span className="font-mono text-[9px] font-bold text-[#00e3fd] uppercase tracking-wide">
                Turn more
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Accuracy metric widget */}
      <div className="absolute top-20 right-6 z-20">
        <div className="bg-[#181A20]/80 border border-white/10 rounded-lg p-3 backdrop-blur-md flex flex-col items-end shadow-xl">
          <span className="text-white/40 font-mono text-[8px] uppercase tracking-widest leading-none mb-1">
            Angle Accuracy
          </span>
          <span className="font-mono text-xl font-black text-[#CCFF00] leading-none">
            {isRecording ? "82" : "--"}
            <span className="text-xs font-sans font-light text-white/60 ml-0.5">%</span>
          </span>
        </div>
      </div>

      {/* Instructional text - positioning inside camera wrapper */}
      {!isRecording && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-36 z-20 w-fit text-center px-4 pointer-events-none">
          <div className="bg-black/60 border border-white/5 py-4 px-6 rounded-xl backdrop-blur-md shadow-2xl">
            <h3 className="font-display font-black text-white text-base tracking-tight mb-1 animate-pulse">
              请站进框内，保持全身入镜
            </h3>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed opacity-90">
              确保光电光线充足，且球拍在视野中心
            </p>
          </div>
        </div>
      )}

      {/* Interactive horizontal scrolling Step Guidance indicators */}
      {isRecording && (
        <div className="absolute bottom-[105px] inset-x-0 z-20 px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {/* Step 1 active */}
            <div
              onClick={() => setActiveStep(1)}
              className={`flex-shrink-0 w-36 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeStep === 1
                  ? 'bg-black/80 border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.2)] opacity-100 scale-102'
                  : 'bg-black/40 border-white/10 opacity-60'
              }`}
            >
              <span className={`font-mono text-[8px] font-black block mb-1 ${activeStep === 1 ? 'text-[#CCFF00]' : 'text-white/40'}`}>
                STEP 1
              </span>
              <h5 className="font-display font-bold text-white text-xs leading-none mb-1">Prep / 准备</h5>
              <p className="text-white/70 text-[9px] leading-relaxed">降低重心，力量引导前脚掌。</p>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => setActiveStep(2)}
              className={`flex-shrink-0 w-36 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeStep === 2
                  ? 'bg-black/80 border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.2)] opacity-100 scale-102'
                  : 'bg-black/40 border-white/10 opacity-60'
              }`}
            >
              <span className={`font-mono text-[8px] font-black block mb-1 ${activeStep === 2 ? 'text-[#CCFF00]' : 'text-white/40'}`}>
                STEP 2
              </span>
              <h5 className="font-display font-bold text-white text-xs leading-none mb-1">Lift / 架拍</h5>
              <p className="text-white/70 text-[9px] leading-relaxed">手肘抬高，手腕放松，拍尖朝上。</p>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => setActiveStep(3)}
              className={`flex-shrink-0 w-36 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeStep === 3
                  ? 'bg-black/80 border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.2)] opacity-100 scale-102'
                  : 'bg-black/40 border-white/10 opacity-60'
              }`}
            >
              <span className={`font-mono text-[8px] font-black block mb-1 ${activeStep === 3 ? 'text-[#CCFF00]' : 'text-white/40'}`}>
                STEP 3
              </span>
              <h5 className="font-display font-bold text-white text-xs leading-none mb-1">Turn / 跃起</h5>
              <p className="text-white/70 text-[9px] leading-relaxed">大肌肉群自髋关节转体，爆发送球。</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom control drawers buttons overlay */}
      <footer className="absolute bottom-5 inset-x-0 z-30 px-6 flex items-center justify-between gap-3">
        {!isRecording ? (
          // Setup initial state action bar
          <div className="w-full flex justify-between items-center gap-3">
            <button
              onClick={() => onNavigate('shoot-entrance')}
              className="flex-1 py-4 bg-white/5 border border-white/10 rounded-sm font-display font-black text-xs uppercase tracking-wider text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              退出引导 / CANCEL
            </button>
            <button
              onClick={startStreamingPreview}
              className="flex-[1.5] py-4 bg-[#CCFF00] text-black rounded-sm font-display font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Camera size={14} />
              开始引导 / START GUIDE
            </button>
          </div>
        ) : (
          // Active capturing recording process bar (matching image mockup circular loop)
          <div className="w-full flex justify-between items-center gap-3 bg-black/30 backdrop-blur-lg p-2.5 rounded-xl border border-white/5">
            <button
              onClick={() => {
                setIsRecording(false);
                setSecondsLeft(5);
              }}
              className="flex-1 py-3 bg-white/10 text-white rounded-sm font-display font-black text-[10px] tracking-wider uppercase hover:bg-white/15 cursor-pointer flex items-center justify-center gap-1"
            >
              <X size={12} />
              退出 / EXIT
            </button>

            {/* Big neon floating active trigger bubble slider */}
            <button
              onClick={compileAISpecs}
              disabled={isProcessing}
              className="relative w-14 h-14 rounded-full bg-[#CCFF00] flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.4)] active:scale-95 transition-transform shrink-0 cursor-pointer"
            >
              {isProcessing ? (
                <RefreshCw size={18} className="text-black animate-spin" />
              ) : (
                <div className="text-black font-mono font-black text-xs">
                  {secondsLeft}s
                </div>
              )}
            </button>

            {/* Stepper loop selector matching HTML arrow buttons indicators */}
            <button
              onClick={() => {
                setActiveStep((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)));
                if (onShowNotification) {
                  onShowNotification(`🔄 视频纠正导向已切换至第 ${activeStep === 3 ? 1 : activeStep + 1} 重心，请配合击球发力。`);
                }
              }}
              className="flex-1 py-3 bg-[#00e3fd]/20 text-[#00e3fd] border border-[#00e3fd]/40 rounded-sm font-display font-black text-[10px] tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1 hover:bg-[#00e3fd]/30"
            >
              <span>下一步</span>
              <ChevronRight size={12} />
            </button>
          </div>
        )}
      </footer>
    </motion.div>
  );
}
