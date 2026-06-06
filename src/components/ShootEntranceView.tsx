/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Camera, Upload, History, Sparkles, Activity, Loader2 } from 'lucide-react';
import { ScreenPath } from '../types';

interface ShootEntranceViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification?: (msg: string) => void;
}

export default function ShootEntranceView({ onNavigate, onShowNotification }: ShootEntranceViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const triggerSimulatedAction = (topic: string) => {
    if (onShowNotification) {
      onShowNotification(`📊 【${topic}】功能深度训练模块已启动，请对准球拍/球鞋拍摄以自动编译规格。`);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedVideo(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
    setErrorMsg(null);
  };

  const startAnalysis = async () => {
    if (!selectedVideo) return;

    setIsAnalyzing(true);
    setErrorMsg(null);
    setAnalysisStatus('正在上传视频...');

    try {
      const formData = new FormData();
      formData.append('video', selectedVideo);
      formData.append('mode', 'action');

      // Simulate status progression for better UX
      const statusTimer1 = setTimeout(() => setAnalysisStatus('正在抽取关键帧...'), 1500);
      const statusTimer2 = setTimeout(() => setAnalysisStatus('正在识别身体姿态...'), 3000);
      const statusTimer3 = setTimeout(() => setAnalysisStatus('正在生成姿态标注视频...'), 5000);
      const statusTimer4 = setTimeout(() => setAnalysisStatus('正在生成动作说明书...'), 8000);

      const res = await fetch('http://localhost:8000/api/analyze-video', {
        method: 'POST',
        body: formData
      });

      clearTimeout(statusTimer1);
      clearTimeout(statusTimer2);
      clearTimeout(statusTimer3);
      clearTimeout(statusTimer4);

      if (!res.ok) {
        throw new Error('Analysis failed');
      }

      const result = await res.json();
      
      if (!result.success) {
        throw new Error(result.error || '视频分析失败');
      }

      localStorage.setItem('analysisResult', JSON.stringify(result));
      
      if (result.manual?.type === 'action') {
        onNavigate('manual-action' as ScreenPath);
      } else if (result.manual?.type === 'match') {
        onNavigate('manual-match' as ScreenPath);
      } else if (result.manual?.type === 'equipment') {
        onNavigate('manual-equip' as ScreenPath);
      } else {
        onNavigate('manual-action' as ScreenPath);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || '视频分析失败，请检查后端是否启动或换一个较短的视频再试。');
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex-grow flex flex-col pb-6 text-[#E2E8F0]"
    >
      {/* Top Header Navigation */}
      <section className="flex justify-between items-center py-4 border-b border-white/10 mb-6">
        <button
          onClick={() => {
            if (selectedVideo) resetUpload();
            else onNavigate('home');
          }}
          className="flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-white uppercase font-mono tracking-widest cursor-pointer bg-white/5 py-1.5 px-3 rounded-xs border border-white/5"
        >
          <ChevronLeft size={14} />
          <span>返回 / BACK</span>
        </button>
        <span className="text-[10px] font-mono tracking-widest text-primary-container font-black uppercase">
          AI CAMERA ENGINE
        </span>
      </section>

      {/* Video Preview / Upload Flow */}
      <AnimatePresence mode="wait">
        {selectedVideo ? (
          <motion.section
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col flex-1"
          >
            <div className="relative flex-1 bg-black/50 border border-white/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4 mb-6">
              {videoPreviewUrl && (
                <video
                  src={videoPreviewUrl}
                  controls
                  className="max-h-[40vh] max-w-full rounded-lg shadow-2xl mb-4"
                />
              )}
              <p className="text-white/70 text-sm font-mono">{selectedVideo.name}</p>

              {errorMsg && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-xs text-center max-w-sm">
                  {errorMsg}
                </div>
              )}
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <Loader2 className="animate-spin text-[#CCFF00] mb-4" size={40} />
                  <p className="text-[#CCFF00] font-mono font-bold tracking-wider">{analysisStatus}</p>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startAnalysis}
              disabled={isAnalyzing}
              className={`w-full py-4 rounded-xl font-display font-black text-lg tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl ${
                isAnalyzing ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-[#CCFF00] text-black hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] cursor-pointer'
              }`}
            >
              <Sparkles size={20} />
              {isAnalyzing ? '正在分析中...' : '开始分析'}
            </motion.button>
          </motion.section>
        ) : (
          <motion.div
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1"
          >
            {/* Hero Header */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-[#CCFF00] text-black text-[9px] font-bold uppercase rounded-sm">
                  Active Filming
                </span>
                <span className="text-white/40 text-[9px] uppercase tracking-widest">Workspace Core</span>
              </div>
              <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase leading-tight">
                拍一下，生成说明书
              </h2>
              <p className="font-sans text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                拍摄动作、装备规范或对局回合。AI 实时高维追踪，极速生成定制说明书。
              </p>
            </section>

            {/* Main Bento Entrances Grid */}
            <section className="flex flex-col gap-4 mb-8">
              {/* Card 1: 拍动作 (Primary) */}
              <div
                onClick={() => onNavigate('shoot-camera-guide')}
                className="glass-card p-5 rounded-xl border border-white/10 relative overflow-hidden group cursor-pointer active:scale-[0.99] transition-all bg-[#07090C] hover:border-[#CCFF00]/30"
              >
                {/* Neon Glow Bloom */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#CCFF00]/10 rounded-full blur-[30px]" />

                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div className="p-2 bg-[#CCFF00]/10 rounded-full border border-[#CCFF00]/20 text-[#CCFF00]">
                    <Camera size={20} />
                  </div>
                  <span className="font-mono text-[9px] font-black text-black bg-[#00e3fd] px-3 py-1 rounded-xs uppercase tracking-wider">
                    SKELETON ANALYSIS
                  </span>
                </div>

                <div className="relative z-10 mb-4">
                  <h3 className="font-display font-black text-lg text-white uppercase italic tracking-tight">
                    拍动作 / MOTION TRACKING
                  </h3>
                  <p className="text-on-surface-variant text-xs mt-1">
                    追踪发力链、最佳击球甜区、手肘水平及发力硬伤纠错。
                  </p>
                </div>

                {/* Graphical Simulated Viewport Render */}
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#11141B] border border-white/5">
                  <img
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    alt="Professional Athlete Smash AI"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXzvORPbJAMy05hq9EMvmcdIseLuZnTGmlRsvH0g8BZZdQcpi6mu3Mx1ZFpM4QHDlArO8JSomHCrdQcRYxVlzTFGiABYNZhmskDYC7PsZeAytjOqbcq5TcfpNXuPG8uzadauYnV1HuhXiePl_jWoLFt3jXYw0D5_QCK_l6qyQk_nBqC07BrDANyfdkwngsmGMlSvYLapeDfJOdTlZFyn9csWvYx-13ehZwsuFn_iSyFmXvNo8nNnQgCMS-El3lbvtO_Y7C9qppmuo"
                  />
                  {/* Ambient scan-line */}
                  <div className="scan-line" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 font-mono text-[9px] text-[#CCFF00]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                    <span>DASHED SILHOUETTE GUIDE ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Dual Split Sub-modules */}
              <div className="grid grid-cols-2 gap-4">
                {/* Card 2: 拍装备 */}
                <div
                  onClick={() => triggerSimulatedAction('拍装备')}
                  className="glass-card p-4 rounded-xl border border-white/10 flex flex-col justify-between group cursor-pointer active:scale-[0.98] transition-all bg-[#07090C] hover:border-[#00e3fd]/30"
                >
                  <div>
                    <div className="p-2 bg-[#00e3fd]/10 rounded-full w-fit text-[#00e3fd] mb-3 border border-[#00e3fd]/20">
                      <Sparkles size={16} />
                    </div>
                    <h4 className="font-display font-black text-sm uppercase italic text-white tracking-tight">
                      拍装备 / GEAR MATCH
                    </h4>
                    <p className="text-[10px] text-on-surface-variant mt-1.5 leading-relaxed">
                      快速扫描球拍线谱、中管硬度、鞋底抗扭，一键配重诊断。
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-[#00e3fd] w-2/3 shadow-[0_0_8px_rgba(0,227,253,0.6)]" />
                    </div>
                  </div>
                </div>

                {/* Card 3: 拍回合 */}
                <div
                  onClick={() => triggerSimulatedAction('拍回合')}
                  className="glass-card p-4 rounded-xl border border-white/10 flex flex-col justify-between group cursor-pointer active:scale-[0.98] transition-all bg-[#07090C] hover:border-[#ffe16d]/30"
                >
                  <div>
                    <div className="p-2 bg-[#ffe16d]/10 rounded-full w-fit text-[#ffe16d] mb-3 border border-[#ffe16d]/20">
                      <Activity size={16} />
                    </div>
                    <h4 className="font-display font-black text-sm uppercase italic text-white tracking-tight">
                      拍回合 / TACTICS
                    </h4>
                    <p className="text-[10px] text-on-surface-variant mt-1.5 leading-relaxed">
                      实战对局跑位记录、盲区步数纠音、网前跟进漏顶纠正。
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                      <div className="h-full bg-[#ffe16d] w-1/2 shadow-[0_0_8px_rgba(255,225,109,0.6)]" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Primary Actions Row */}
            <section className="flex flex-col gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onNavigate('shoot-camera-guide')}
                className="w-full py-4 bg-[#CCFF00] text-black font-display font-black uppercase text-xs tracking-widest rounded-sm shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera size={16} />
                立即开始拍摄 / START FILMING
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="video/*" 
                  onChange={handleFileSelect} 
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="py-3 bg-white/5 border border-white/10 text-xs font-display font-bold uppercase rounded-sm flex items-center justify-center gap-1.5 hover:bg-white/10 active:scale-95 transition-all text-white cursor-pointer"
                >
                  <Upload size={14} className="text-[#00e3fd]" />
                  上传本地视频
                </button>
                <button
                  onClick={() => triggerSimulatedAction('查看历史采集记录')}
                  className="py-3 bg-white/5 border border-white/10 text-xs font-display font-bold uppercase rounded-sm flex items-center justify-center gap-1.5 hover:bg-white/10 active:scale-95 transition-all text-white cursor-pointer"
                >
                  <History size={14} className="text-[#ffe16d]" />
                  历史采集记录
                </button>
              </div>
            </section>

            {/* Stats latency chip */}
            <footer className="flex justify-center mt-auto">
              <div className="bg-white/5 border border-white/5 px-4 py-1.5 rounded-full flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                  <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider">
                    AI CORE v4.2 ONLINE
                  </span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <span className="font-mono text-[9px] text-[#CCFF00] tracking-widest uppercase">
                  LATENCY: 12ms
                </span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
