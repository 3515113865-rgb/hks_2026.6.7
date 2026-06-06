/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MoreVertical, Mic, ArrowRight, Play, Pause, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import { ScreenPath } from '../types';

interface WatchAskViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification?: (msg: string) => void;
  customVideoUrl?: string | null;
}

// Biomechanical joint kinematics generator mapping cycle millisecond (0-3000)
// to 2D coordinates representing body outline of the closer athlete.
function getJoints(frameTime: number) {
  const p = frameTime / 3000;
  const PI = Math.PI;

  let pelvisX = 125;
  let pelvisY = 220;
  let rShoulderYShift = 0;
  let rWristXShift = 0;
  let rWristYShift = 0;
  let rElbowXShift = 0;
  let rElbowYShift = 0;
  let lWristYShift = 0;
  let kneeFlexY = 0;
  let legExtendY = 0;
  let jumpY = 0;
  let headTilt = 0;

  if (p < 0.35) {
    const localP = p / 0.35;
    const bounce = Math.sin(localP * PI * 2);
    pelvisY = 220 + bounce * 4;
    pelvisX = 125 + bounce * 3;
    rWristXShift = 10 + bounce * 2;
    rWristYShift = -5;
    lWristYShift = 15;
  } else if (p < 0.50) {
    const localP = (p - 0.35) / 0.15;
    pelvisY = 220 + localP * 18;
    pelvisX = 125 - localP * 4;
    kneeFlexY = localP * 8;
    rWristXShift = -15 * localP;
    rWristYShift = -15 * localP;
    rElbowYShift = 10 * localP;
  } else if (p < 0.65) {
    const localP = (p - 0.50) / 0.15;
    const jumpCurve = Math.sin(localP * PI);
    jumpY = jumpCurve * 62;
    pelvisY = 238 - jumpY;
    pelvisX = 121 + localP * 18;
    legExtendY = localP * 10;

    if (localP < 0.4) {
      const innerP = localP / 0.4;
      rWristXShift = -15 + innerP * 40;
      rWristYShift = -15 - innerP * 55;
      headTilt = -8;
    } else {
      const innerP = (localP - 0.4) / 0.6;
      rWristXShift = 25 - innerP * 18;
      rWristYShift = -70 + innerP * 115;
      rElbowYShift = 10 + innerP * 28;
      headTilt = 10;
    }
    lWristYShift = 25 * localP;
  } else if (p < 0.85) {
    const localP = (p - 0.65) / 0.20;
    pelvisY = 220 + (1 - localP) * 18;
    pelvisX = 139 - localP * 14;
    kneeFlexY = (1 - localP) * 10;
    rWristYShift = 45 - localP * 38;
    rWristXShift = 8 - localP * 8;
  } else {
    const localP = (p - 0.85) / 0.15;
    pelvisY = 220;
    pelvisX = 125;
  }

  const pelvis = { x: pelvisX, y: pelvisY };
  const neck = { x: pelvisX - 2, y: pelvisY - 90 };
  const head = { x: neck.x + headTilt * 0.4, y: neck.y - 22 };
  
  const lShoulder = { x: neck.x - 30, y: neck.y + 12 };
  const rShoulder = { x: neck.x + 30, y: neck.y + 12 };

  const lElbow = { x: lShoulder.x - 18, y: lShoulder.y + 16 + lWristYShift * 0.3 };
  const lWrist = { x: lElbow.x - 10, y: lElbow.y + 18 + lWristYShift * 0.7 };

  const rElbow = { x: rShoulder.x + 16 + rElbowXShift, y: rShoulder.y - 10 + rElbowYShift + rWristYShift * 0.2 };
  const rWrist = { x: rShoulder.x + 26 + rWristXShift, y: rShoulder.y - 30 + rWristYShift };

  const lHip = { x: pelvis.x - 15, y: pelvis.y + 10 };
  const rHip = { x: pelvis.x + 15, y: pelvis.y + 10 };

  const lKnee = { 
    x: lHip.x - 4 - kneeFlexY * 0.4, 
    y: lHip.y + 48 + legExtendY * 0.4 - kneeFlexY * 0.2 
  };
  const rKnee = { 
    x: rHip.x + 4 + kneeFlexY * 0.3, 
    y: rHip.y + 48 + legExtendY * 0.4 - kneeFlexY * 0.2 
  };

  const lAnkle = { 
    x: lKnee.x + (jumpY > 0 ? 4 : 1), 
    y: lKnee.y + 48 + legExtendY * 0.4 - kneeFlexY * 0.3 
  };
  const rAnkle = { 
    x: rKnee.x + (jumpY > 0 ? -3 : 1), 
    y: rKnee.y + 48 + legExtendY * 0.4 - kneeFlexY * 0.3 
  };

  let kneeAngle = 165;
  if (p >= 0.35 && p < 0.50) kneeAngle = 110 + (1 - (p-0.35)/0.15) * 55;
  else if (p >= 0.50 && p < 0.65) kneeAngle = 160 + ((p-0.5)/0.15) * 18;
  else if (p >= 0.65 && p < 0.85) kneeAngle = 115 + ((p-0.65)/0.2) * 50;
  
  let shoulderAngle = 45;
  if (p >= 0.35 && p < 0.5) shoulderAngle = 45 + ((p-0.35)/0.15) * 115;
  else if (p >= 0.50 && p < 0.65) shoulderAngle = 160 + ((p-0.5)/0.15) * 85;
  else if (p >= 0.65 && p < 0.85) shoulderAngle = 245 - ((p-0.65)/0.2) * 190;

  let speed = 42;
  if (p >= 0.55 && p <= 0.62) {
    speed = 212 + Math.floor(Math.sin((p - 0.55) / 0.07 * PI) * 58);
  } else {
    speed = 32 + Math.floor(Math.sin(p * PI * 2) * 10);
  }

  return {
    joints: {
      head, neck, pelvis,
      lShoulder, rShoulder,
      lElbow, rElbow,
      lWrist, rWrist,
      lHip, rHip,
      lKnee, rKnee,
      lAnkle, rAnkle
    },
    metrics: {
      kneeAngle: Math.round(kneeAngle),
      shoulderAngle: Math.round(shoulderAngle),
      speed,
      heightYOffset: Math.round(jumpY)
    }
  };
}

export default function WatchAskView({ onNavigate, onShowNotification, customVideoUrl }: WatchAskViewProps) {
  // Navigation states: 'listening' (State 1) vs 'query-locked' (State 2)
  const [viewState, setViewState] = useState<'listening' | 'locked'>('listening');
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [frameTime, setFrameTime] = useState(0);
  const [lockedQuestion, setLockedQuestion] = useState('为什么这一球能得分？');
  const [customInput, setCustomInput] = useState('');
  const [waveJitter, setWaveJitter] = useState<number[]>([12, 24, 16, 20, 8]);

  // Sync state variable with video player object
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused]);

  // Real-time animation physics runner mimicking live YOLOv8 skeleton detection
  useEffect(() => {
    let animFrame: number;
    let lastTime = Date.now();
    const tick = () => {
      if (!isPaused) {
        setFrameTime((prev) => (prev + (Date.now() - lastTime)) % 3000);
      }
      lastTime = Date.now();
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isPaused]);

  // Jitter for voice soundwave representation
  useEffect(() => {
    if (viewState === 'listening') {
      const interval = setInterval(() => {
        setWaveJitter([
          Math.floor(Math.random() * 20) + 6,
          Math.floor(Math.random() * 28) + 10,
          Math.floor(Math.random() * 24) + 8,
          Math.floor(Math.random() * 32) + 12,
          Math.floor(Math.random() * 16) + 4,
          Math.floor(Math.random() * 24) + 8,
        ]);
      }, 180);
      return () => clearInterval(interval);
    }
  }, [viewState]);

  const handleApplyPresetQuestion = (query: string) => {
    setLockedQuestion(query);
    setViewState('locked');
    if (onShowNotification) {
      onShowNotification(`🎤 已捕获语音提问："${query}"`);
    }
  };

  const handleVoiceBarClick = () => {
    handleApplyPresetQuestion('为什么这一球能得分？');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      handleApplyPresetQuestion(customInput);
      setCustomInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 bg-black flex flex-col justify-between overflow-hidden text-[#E2E8F0]"
    >
      {/* Top Header App Bar */}
      <header className="absolute top-0 inset-x-0 z-40 flex items-center justify-between px-6 h-16 bg-gradient-to-b from-black/85 via-black/30 to-transparent">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full active:scale-95 transition-all text-white outline-none cursor-pointer"
          >
            <ChevronLeft size={22} className="stroke-[2.5]" />
          </button>
          <span className="font-display font-black text-sm italic uppercase text-primary-container tracking-widest">
            AI 边看边问 / WATCH & ASK
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsPaused(!isPaused);
              if (onShowNotification) {
                onShowNotification(isPaused ? '▶️ 智能球局捕获重置播放中' : '⏸️ 智能画框捕获已暂停');
              }
            }}
            className="px-3.5 py-1.5 rounded-full border border-[#CCFF00]/35 bg-black/60 backdrop-blur-md text-[#CCFF00] font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:bg-[#CCFF00]/10"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-red-500 animate-pulse' : 'bg-[#CCFF00] animate-ping'}`} />
            <span>{isPaused ? "AI PAUSED" : "AI RAW LIVE"}</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full active:opacity-75 transition-opacity text-white cursor-pointer">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Dimmed Background Video Layer */}
      <div className="absolute inset-0 z-0 bg-neutral-950">
        <video
          ref={videoRef}
          src={customVideoUrl || "/222.mp4"}
          className={`w-full h-full object-cover transition-all duration-500 will-change-transform ${viewState === 'listening' ? 'opacity-95 brightness-105 contrast-100' : 'opacity-75 brightness-80 contrast-100'}`}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Ambient sweep line & backdrop decorations */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="scanning-line z-10" />
          {/* Badminton grid lines layout decoration */}
          <div className="absolute inset-0 border-[1px] border-white/5 grid grid-cols-4 select-none opacity-40">
            <div className="border-r border-white/5" />
            <div className="border-r border-white/5" />
            <div className="border-r border-white/10" />
          </div>
        </div>
      </div>

      {/* Main Analysis Overlay Canvas */}
      <main className="relative z-10 flex-grow p-6 flex flex-col justify-between pointer-events-none">
        
        {/* Dynamic Overlays View Switcher */}
        <div className="flex-grow relative mt-16 pb-36">
          {(() => {
            const { joints, metrics } = getJoints(frameTime);
            const dx = joints.rWrist.x - joints.rElbow.x;
            const dy = joints.rWrist.y - joints.rElbow.y;
            const rLen = Math.sqrt(dx * dx + dy * dy) || 1;
            const rShaftX = joints.rWrist.x + (dx / rLen) * 35;
            const rShaftY = joints.rWrist.y + (dy / rLen) * 35;
            const hoopX = rShaftX + (dx / rLen) * 15;
            const hoopY = rShaftY + (dy / rLen) * 15;

            return (
              <AnimatePresence mode="wait">
                {viewState === 'listening' ? (
                  // -- STATE 1: Bounding Box player pose & floating specifications chips --
                  <motion.div
                    key="overlay-listening"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* 2. Shuttlecock Trajectory */}
                    <div className="absolute top-[8%] right-[5%] flex flex-col items-end pointer-events-auto">
                      <svg className="w-56 h-48 overflow-visible" viewBox="0 0 220 180">
                        <path
                          d="M10,160 Q100,20 200,90"
                          fill="none"
                          stroke="url(#cyanGrad1)"
                          strokeWidth="3"
                          strokeDasharray="6 4"
                        />
                        <defs>
                          <linearGradient id="cyanGrad1" x1="0%" x2="100%" y1="100%" y2="0%">
                            <stop offset="0%" stopColor="#00e3fd" stopOpacity="0.0" />
                            <stop offset="100%" stopColor="#00e3fd" stopOpacity="1.0" />
                          </linearGradient>
                        </defs>
                        <circle cx="200" cy="90" fill="#CCFF00" r="6" className="shadow-[0_0_15px_#CCFF00]" />
                      </svg>
                    </div>

                    {/* 3. Multi-layer floating detection specification chips */}
                    <div className="absolute bottom-[2%] left-2 flex flex-col gap-2.5 pointer-events-auto">
                      <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black/60 border border-[#00e3fd]/20 rounded-full w-fit hover:border-[#00e3fd]/40 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#00e3fd] shadow-[0_0_8px_#00e3fd]" />
                        <span className="font-mono text-[8px] font-black tracking-widest text-[#E2E8F0]">
                          KNEE ANGLE: {metrics.kneeAngle}°
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black/60 border border-[#CCFF00]/20 rounded-full w-fit hover:border-[#CCFF00]/40 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]" />
                        <span className="font-mono text-[8px] font-black tracking-widest text-[#E2E8F0]">
                          SHOULDER EXT: {metrics.shoulderAngle}°
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-full w-fit hover:border-[#00e3fd]/40 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-[#00e3fd]" />
                        <span className="font-mono text-[8px] font-black tracking-widest text-[#E2E8F0]">
                          JUMP STATE: {metrics.heightYOffset > 0 ? `LEAP (+${metrics.heightYOffset}px)` : 'READY'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // -- STATE 2: Target Locked Selection Confirmation interface --
                  <motion.div
                    key="overlay-locked"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="absolute inset-[5%] flex flex-col justify-between"
                  >
                    {/* 1. Pulse Active focal scanning bracket box */}
                    <div className="absolute top-[12%] left-[10%] w-[80%] h-[55%] border-2 border-[#CCFF00] rounded-xl pulse-border shadow-[0_0_40px_rgba(204,255,0,0.25)] flex flex-col justify-start">
                      
                      {/* Floating active chip inside block */}
                      <div className="m-3 bg-[#CCFF00] text-black px-2.5 py-1 rounded-sm flex items-center gap-1.5 w-fit">
                        <Sparkles size={11} className="text-black" />
                        <span className="font-mono text-[8px] font-black uppercase tracking-wider">
                          TRACKING FOCUS ACTIVE
                        </span>
                      </div>

                      {/* Intersect graph details with current state skeleton wireframe inside target focus box */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 250 360">
                        <circle cx="125" cy="180" fill="none" stroke="#CCFF00" strokeWidth="1" strokeDasharray="3 3" r="50" className="shuttle-glow animate-pulse" />
                        <path d="M 50 220 Q 125 100 200 200" fill="none" stroke="#00e3fd" strokeDasharray="4 4" strokeWidth="1.5" />
                        <rect fill="none" height="60" stroke="#CCFF00" strokeWidth="1.5" width="60" x="95" y="150" />
                      </svg>
                    </div>

                    {/* 2. Lock notification overlay card */}
                    <div className="absolute bottom-[-16%] left-0 w-full flex flex-col gap-3">
                      {/* Core Voice Readout Panel */}
                      <div className="bg-black/80 border border-white/10 p-5 rounded-md flex flex-col gap-1.5 shadow-2xl">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                          <span className="font-mono text-[8px] tracking-widest text-[#CCFF00]/80 font-black uppercase">
                            VOICE-TO-TEXT LOCK
                          </span>
                        </div>
                        
                        <h2 className="font-display font-bold text-normal text-white">
                          你问：<span className="text-[#CCFF00]">“{lockedQuestion}”</span>
                        </h2>
                      </div>

                      {/* Compile state text */}
                      <div className="flex items-center justify-center gap-2 text-[#00e3fd] text-[10px] font-mono tracking-wider uppercase bg-black/60 py-1.5 px-4 rounded-full border border-[#00e3fd]/20 w-fit mx-auto">
                        <Sparkles size={12} className="animate-spin duration-3000" />
                        <span>即将生成：比赛深度说明书</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })()}
        </div>
      </main>

      {/* Preset interactive fast questions drawer */}
      {viewState === 'listening' && (
        <section className="absolute bottom-[185px] inset-x-6 z-30 flex flex-col gap-2 pointer-events-auto">
          <p className="font-mono text-[8px] text-white/40 tracking-wider uppercase mb-1">
            快速提问 / PRESETS:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleApplyPresetQuestion('为什么这一球能得分？')}
              className="py-1.5 px-3 bg-black/70 rounded-xs border border-white/10 text-xs text-white/90 hover:border-[#CCFF00] transition-colors cursor-pointer"
            >
              为什么这一球能得分？
            </button>
            <button
              onClick={() => handleApplyPresetQuestion('分析我的杀球落点与装备偏差')}
              className="py-1.5 px-3 bg-black/70 rounded-xs border border-white/10 text-xs text-white/90 hover:border-[#00e3fd] transition-colors cursor-pointer"
            >
              分析杀球落点与配重
            </button>
          </div>
        </section>
      )}

      {/* Dynamic Voice Panel & Actions Footer */}
      <footer className="absolute bottom-5 inset-x-0 z-30 px-6 flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {viewState === 'listening' ? (
            // State 1 active: Voice Hold feedback row + cancels
            <motion.div
              key="panel-listening"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="w-full max-w-lg mx-auto flex flex-col gap-4"
            >
              {/* Core interactive Speech Hold controller */}
              <div
                onClick={handleVoiceBarClick}
                className="w-full h-15 bg-[#181A20]/80 border border-[#CCFF00]/25 rounded-md flex items-center px-4 gap-3 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.6)] active:scale-[0.98] transition-transform hover:border-[#CCFF00]/40 group"
              >
                <div className="p-1.5 bg-[#CCFF00]/10 rounded-full text-[#CCFF00] border border-[#CCFF00]/25">
                  <Mic size={16} />
                </div>
                
                <span className="text-white/60 font-sans text-xs flex-grow font-semibold text-left">
                  点击测试语音提问（或选择上方快捷问题）
                </span>

                {/* Wave form visual animations representation */}
                <div className="flex items-center gap-1">
                  {waveJitter.map((height, index) => (
                    <motion.div
                      key={index}
                      style={{ height: `${height}px` }}
                      className="w-1 rounded-full bg-[#CCFF00]"
                      animate={{ height: [height - 3, height + 4, height] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: index * 0.1 }}
                    />
                  ))}
                </div>
              </div>

              {/* Lower level trigger list */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => onNavigate('home')}
                  className="py-3.5 bg-white/5 border border-white/10 rounded-xs font-display font-bold uppercase text-[10px] tracking-wider text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    if (onShowNotification) {
                      onShowNotification("🚀 比赛说明书生成完毕！已为您直连击球动作深度说明书...");
                    }
                    onNavigate('manual-action');
                  }}
                  className="col-span-2 py-3.5 bg-[#CCFF00] text-black rounded-xs font-display font-black uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.55)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={13} />
                  一键生成说明书 / GENERATE
                </button>
              </div>
            </motion.div>
          ) : (
            // State 2 Active: Locked specs choices actions
            <motion.div
              key="panel-locked"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="w-full max-w-lg mx-auto flex flex-col gap-3"
            >
              {/* Primary: Start Manual Compilation */}
              <button
                onClick={() => {
                  if (onShowNotification) {
                    onShowNotification("🚀 比赛说明书生成完毕！已为您直连击球动作深度说明书...");
                  }
                  onNavigate('manual-action');
                }}
                className="w-full py-4 bg-[#CCFF00] text-black rounded-xs font-display font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:shadow-[0_0_40px_rgba(204,255,0,0.6)] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} />
                开始生成说明书 / START GENERATING
              </button>

              {/* Secondary: Reset ask query back */}
              <button
                onClick={() => setViewState('listening')}
                className="w-full py-3.5 bg-black/60 border border-white/10 text-white rounded-xs font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                <Mic size={14} className="text-[#00e3fd]" />
                重新提问 / RE-INPUT QUERY
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </motion.div>
  );
}
