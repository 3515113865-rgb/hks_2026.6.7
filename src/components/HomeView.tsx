/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, ChevronRight, Brain, Play, X, Clock, Volume2, Maximize2, Share2, Layers } from 'lucide-react';
import { ScreenPath } from '../types';

interface HomeViewProps {
  onNavigate: (path: ScreenPath) => void;
}

const RECOMMENDED_VIDEOS = [
  {
    id: 'vid-1',
    title: '全英公开赛男单决赛：李梓嘉空中暴扣重杀瞬间定格解析',
    type: '技巧视频 / MASTERCLASS',
    typeColor: 'bg-[#CCFF00] text-black',
    duration: '08:42',
    views: '42.5w',
    likes: '99% 赞誉度',
    desc: '3D重构扣杀传导动力流：高尔夫握拍切抹起跳、极致胸腰反弓与击球落点深度测绘轨迹。',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQugdFV9l_YPO8h2dKB6zrllrMvONMnC5DOG1Q8rk-lJ53wwuGUndu9iVJVWL_CEAooPS3DxvtRnBVebywRhmOixvH_m49q8PWPnBYlkdnuHuTp3MMKyK_8huRjumQlx4-HjGSLid3AWgKOSaX_EBAuw-UqCkLxvLcfa4YNjuFoxFAC5NOzr6HezpLaV8EfLcugXrYszf6K9dOJkZrGk0u8IdUl2I9YJDPIZbLx80ucHRJAQiXKDbPfOsxTc_FXMjcrWCdXjAlbFU',
    overlayTitle: 'SMASH DEEP SCAN [LIVE]',
    author: '羽人AI教学大纲组'
  },
  {
    id: 'vid-2',
    title: '国羽传奇带教：反手防接杀斜线变档与卸力动作动力解构',
    type: '技巧视频 / TECH COACH',
    typeColor: 'bg-[#ffe16d] text-black',
    duration: '14:20',
    views: '18.9w',
    likes: '4.8k 收藏',
    desc: '反手防守核心秘诀：击球瞬间利用大拇指顶靠发力、卸力对角快当，纠正习惯僵硬手臂。',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXzvORPbJAMy05hq9EMvmcdIseLuZnTGmlRsvH0g8BZZdQcpi6mu3Mx1ZFpM4QHDlArO8JSomHCrdQcRYxVlzTFGiABYNZhmskDYC7PsZeAytjOqbcq5TcfpNXuPG8uzadauYnV1HuhXiePl_jWoLFt3jXYw0D5_QCK_l6qyQk_nBqC07BrDANyfdkwngsmGMlSvYLapeDfJOdTlZFyn9csWvYx-13ehZwsuFn_iSyFmXvNo8nNnQgCMS-El3lbvtO_Y7C9qppmuo',
    overlayTitle: 'DEFENSE ANGLE TUNE',
    author: '国羽资深教练科研组'
  },
  {
    id: 'vid-3',
    title: '宿敌史诗巨燃交锋：林李拉锯58拍假动作及跑位逻辑慢析',
    type: '比赛视频 / MATCH HIGH',
    typeColor: 'bg-[#00daf3] text-black',
    duration: '22:15',
    views: '68.2w',
    likes: '世纪精选殿堂级',
    desc: '全场跑位轨迹精细复盘：多重视角还原假动作出手时差、起扣节奏与中路补空配合。',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmRxE-NaIg1RKa1gvUTlMvJ8ewBOiSxYJQ4XAT_V2papSkSsE061cc6VGqMrWIfDKhx99vFuR4Yfnf1fMXvczUIJ_OZ3n8PuzxAT9OAvLcOJTLOGv8A_KfVbmcifIo9wpXOX3dXlHEnLncBs3BT7QfVcHIdoVFwzZzug9L_lfEC45qq29WTjZQIFzwPAoW7aYeKXkwiMw2B3MxpK9UJS1f1lJZWwvYLL5ISSaCcRisgGKOu-ybQBLAHf0mRc1pdkIpPS9I9-wvHNw',
    overlayTitle: 'CLASSIC TACTICS HUD',
    author: '世界羽学技战术研究馆'
  }
];

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [activeVideo, setActiveVideo] = useState<typeof RECOMMENDED_VIDEOS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playProgress, setPlayProgress] = useState(35);
  const [showAiOverlay, setShowAiOverlay] = useState(true);

  // Simulated tick for state-based video playback bar progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeVideo && isPlaying) {
      interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeVideo, isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-grow flex flex-col"
    >
      {/* Brand Header */}
      <section className="mb-8 pt-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#CCFF00] flex items-center justify-center rounded-xs">
            <span className="text-black font-display font-black text-xl italic leading-none">羽</span>
          </div>
          <span className="text-2xl font-display font-black tracking-tighter uppercase italic text-white flex items-center gap-1.5">
            YU REN / 羽人  <span className="text-primary-container not-italic font-sans text-xs bg-white/10 px-2 py-0.5 rounded-sm">AI</span>
          </span>
        </div>
        <p className="font-sans text-sm text-on-surface-variant leading-relaxed opacity-95">
          解析羽毛球高维瞬态，一键智能生成你的动作剖析与专属训练说明书。
        </p>
      </section>

      {/* Primary AI Entrance Card */}
      <section className="mb-10">
        <div className="glass-card rounded-[24px] p-6 relative overflow-hidden group shadow-2xl border border-white/10 bg-white/5">
          {/* Pulsing glow bloom */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#CCFF00]/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#CCFF00]/15 transition-colors duration-500" />
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
            <Brain size={140} className="text-primary-container" />
          </div>

          <div className="relative z-10">
            <h3 className="font-display font-black text-xl italic uppercase text-primary-container mb-3 flex items-center gap-2">
              进入羽人空间 / WORKSPACE
            </h3>
            <p className="font-sans text-sm text-[#E2E8F0] mb-6 leading-relaxed opacity-90">
              圈选动作、智能配重或复盘比赛回合，AI 自动编译动作、装备和多维实战说明书。
            </p>

            {/* Tag Chips Grid */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1.5 rounded-sm bg-[#1A1E26] border border-white/5 flex items-center gap-1.5 text-xs text-on-surface-variant font-mono uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container scale-100 group-hover:scale-125 transition-transform" />
                问动作 / MOTION
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-[#1A1E26] border border-white/5 flex items-center gap-1.5 text-xs text-on-surface-variant font-mono uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
                问装备 / GEARS
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-[#1A1E26] border border-white/5 flex items-center gap-1.5 text-xs text-on-surface-variant font-mono uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container" />
                问比赛 / TACTICS
              </span>
            </div>

            {/* Twin Tactical Solid Action Buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('watch-ask')}
                className="w-full py-4 bg-[#CCFF00] text-black font-display font-black uppercase text-xs tracking-widest rounded-sm shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                边看边问分析 / LIVE VOICE QUERY
                <ChevronRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('shoot-entrance')}
                className="w-full py-4 bg-[#CCFF00] text-black font-display font-black uppercase text-xs tracking-widest rounded-sm shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                主动拍摄分析 / START CAMERA ANALYSIS
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section (Videos & Handpicked Master Tutorials) */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
          <h4 className="font-display font-black text-xl italic uppercase text-white tracking-tight">为你推荐 / FEEDS</h4>
          <Sparkles size={18} className="text-primary-container animate-pulse" />
        </div>

        <div className="flex flex-col gap-5">
          {RECOMMENDED_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => {
                setActiveVideo(video);
                setIsPlaying(true);
                setPlayProgress(24);
              }}
              className="glass-card rounded-xl overflow-hidden group cursor-pointer border border-white/10 active:scale-[0.99] transition-transform bg-[#07090C] hover:border-[#CCFF00]/40 transition-colors"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                  alt={video.title}
                  src={video.thumbnail}
                />
                
                {/* Visual duration and standard type anchors */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 ${video.typeColor} font-display text-[9px] uppercase font-black tracking-wider rounded-xs`}>
                  {video.type}
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/85 text-white/90 font-mono text-[9px] rounded-sm flex items-center gap-1.5">
                  <Clock size={10} className="text-[#CCFF00]" />
                  <span>{video.duration}</span>
                </div>

                {/* Central play trigger overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#CCFF00] flex items-center justify-center text-black shadow-lg shadow-[#CCFF00]/30 transform scale-90 group-hover:scale-100 transition-transform">
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h5 className="font-display font-bold text-[15px] text-white mb-1.5 leading-tight group-hover:text-[#CCFF00] transition-colors">
                  {video.title}
                </h5>
                <p className="text-on-surface-variant text-[11px] mb-3 leading-relaxed opacity-80 line-clamp-2">
                  {video.desc}
                </p>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
                  <div className="flex items-center gap-1.5">
                    <Eye size={12} className="text-[#CCFF00]" />
                    <span>{video.views} 播放</span>
                  </div>
                  <span className="text-[#CCFF00] font-sans font-medium">{video.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMMERSIVE SPORTS TUTORIAL/MATCH HUD PREVIEW MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden"
          >
            {/* Embedded HUD Header */}
            <header className="absolute top-0 inset-x-0 z-40 bg-gradient-to-b from-black/90 via-black/40 to-transparent p-6 flex justify-between items-center">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[9px] tracking-wider text-[#CCFF00] font-black uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                  AI SPORTS PLAYER HUD
                </span>
                <h1 className="font-display font-bold text-xs text-white uppercase tracking-tighter max-w-[280px] truncate">
                  {activeVideo.title}
                </h1>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95 cursor-pointer outline-none"
              >
                <X size={20} />
              </button>
            </header>

            {/* Video Canvas Sandbox view with simulated futuristic overlays */}
            <div className="relative w-full h-[58%] bg-neutral-950 flex items-center justify-center overflow-hidden my-auto">
              {/* Media banner image */}
              <img
                src={activeVideo.thumbnail}
                className="w-full h-full object-cover opacity-60 filter brightness-[0.7] focus-visible:outline-none"
                alt={activeVideo.title}
                referrerPolicy="no-referrer"
              />

              {/* Dynamic AI overlay frame if turned on */}
              <AnimatePresence>
                {showAiOverlay && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 pointer-events-none"
                  >
                    {/* Bounding trackers */}
                    <div className="absolute top-[20%] left-[25%] right-[25%] bottom-[20%] border-2 border-dashed border-[#CCFF00]/40 rounded-lg flex items-start justify-between p-3 animate-pulse">
                      <span className="font-mono text-[8px] text-[#CCFF00] font-black">{activeVideo.overlayType || "POSE MODEL ACTIVE [98.2%]"}</span>
                      <span className="font-mono text-[8px] text-white bg-black/60 px-1 py-0.5 rounded-sm">60 FPS REC</span>
                    </div>

                    {/* Simulated vector track path and lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-70">
                      {/* Swing line trace */}
                      <path d="M 120 300 Q 240 100 320 280" fill="none" stroke="#CCFF00" strokeWidth="2.5" strokeDasharray="3 3" />
                      <circle cx="320" cy="280" r="5" fill="#00daf3" className="animate-ping" />
                      
                      {/* Joint dots trackers */}
                      <line x1="200" y1="180" x2="230" y2="240" stroke="#CCFF00" strokeWidth="2" />
                      <line x1="230" y1="240" x2="210" y2="310" stroke="#CCFF00" strokeWidth="2" />
                      <circle cx="200" cy="180" r="4.5" fill="#fff" />
                      <circle cx="230" cy="240" r="4.5" fill="#fff" />
                      <circle cx="210" cy="310" r="4.5" fill="#fff" />
                    </svg>

                    {/* Real-time telemetry widgets */}
                    <div className="absolute bottom-5 left-5 bg-black/75 border border-white/10 p-3 rounded-md flex flex-col gap-0.5">
                      <span className="font-mono text-[7px] text-white/50 uppercase tracking-widest">KINETIC EFFICIENCY</span>
                      <span className="font-mono text-sm font-black text-[#CCFF00]">94.6 kg·m/s</span>
                    </div>

                    <div className="absolute bottom-5 right-5 bg-black/75 border border-white/10 p-3 rounded-md flex flex-col gap-0.5">
                      <span className="font-mono text-[7px] text-white/50 uppercase tracking-widest">HIP TO SHOULDER</span>
                      <span className="font-mono text-sm font-black text-[#00daf3]">34.8°</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Standard play icon states overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-30">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-[#CCFF00] text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer outline-none shadow-2xl"
                  >
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Immersive Playback Control Unit */}
            <footer className="w-full bg-neutral-900 border-t border-white/10 pb-8 pt-5 px-6 z-40 flex flex-col gap-4">
              {/* Playback seeking timeline */}
              <div className="flex flex-col gap-1.5">
                <div className="relative w-full h-1 bg-white/20 rounded-full cursor-pointer overflow-hidden">
                  <div
                    style={{ width: `${playProgress}%` }}
                    className="absolute top-0 left-0 h-full bg-[#CCFF00] rounded-full transition-all duration-300"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/50 font-mono">
                  <span>
                    {Math.floor((playProgress * 0.1) * 60 / 60)}:
                    {String(Math.floor((playProgress * 0.1) * 60 % 60)).padStart(2, '0')}
                  </span>
                  <span>{activeVideo.duration}</span>
                </div>
              </div>

              {/* Video metadata and contextual details description block */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm line-clamp-1">{activeVideo.title}</span>
                  <span className="shrink-0 bg-white/10 text-white/80 text-[8px] font-mono tracking-wider font-semibold py-0.5 px-2 rounded-xs">
                    {activeVideo.duration}
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-sans mt-1">
                  {activeVideo.desc}
                </p>
                <span className="text-[10px] text-[#CCFF00]/95 font-mono mt-0.5">制作方: {activeVideo.author}</span>
              </div>

              {/* Bottom Interactive Dashboard Trigger Row */}
              <div className="grid grid-cols-4 gap-2 border-t border-white/5 pt-4 mt-1">
                {/* 1&2: Media control triggers */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="col-span-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white py-3 rounded-xs font-mono font-bold tracking-widest text-[9px] uppercase cursor-pointer flex items-center justify-center"
                >
                  {isPlaying ? "PAUSE" : "PLAY"}
                </button>

                {/* 3: Live AI telemetry switch overlay toggle */}
                <button
                  onClick={() => setShowAiOverlay(!showAiOverlay)}
                  className={`col-span-1 border py-3 rounded-xs font-mono font-bold tracking-widest text-[9px] uppercase cursor-pointer flex items-center justify-center transition-colors ${showAiOverlay ? "bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00]" : "bg-white/5 border-white/10 text-white/60"}`}
                >
                  <Layers size={13} className="mr-1 inline" />
                  {showAiOverlay ? "HUD ON" : "HUD OFF"}
                </button>

                {/* 4: Compile report link direct trigger */}
                <button
                  onClick={() => {
                    setActiveVideo(null);
                    // Match video triggers analysis reports
                    if (activeVideo.id === 'vid-1' || activeVideo.id === 'vid-2') {
                      onNavigate('manual-action');
                    } else {
                      onNavigate('analysis');
                    }
                  }}
                  className="col-span-2 bg-[#CCFF00] text-black hover:opacity-90 py-3 rounded-xs font-display font-black tracking-widest text-[10px] uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                >
                  <Sparkles size={11} />
                  一键剖析此瞬间 / MAP AI
                </button>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
