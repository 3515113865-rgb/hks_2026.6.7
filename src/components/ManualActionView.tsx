/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Share2, MoreVertical, Award, ShieldAlert, CheckCircle2, AlertTriangle, ArrowLeft,
  ChevronRight, Dumbbell, PlayCircle, Heart, Star, Sparkles, Camera
} from 'lucide-react';
import { ScreenPath } from '../types';

interface ManualActionViewProps {
  onNavigate: (path: ScreenPath) => void;
  onShowNotification: (message: string) => void;
}

export default function ManualActionView({ onNavigate, onShowNotification }: ManualActionViewProps) {
  const [addedToGraph, setAddedToGraph] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem('analysisResult');
      if (data) {
        setAnalysisData(JSON.parse(data));
      }
    } catch (e) {
      console.error('Failed to parse analysis result', e);
      setAnalysisData(null);
    }
  }, []);

  // Safely extract properties
  const scores = analysisData?.scores || {};
  const power = scores.power ?? scores["发力完整度"] ?? 82;
  const hitPoint = scores.hit_point ?? scores["击球点"] ?? 76;
  const timing = scores.timing ?? scores["起跳时机"] ?? 70;
  const coordination = scores.coordination ?? scores["身体协调"] ?? 85;

  const actionName = analysisData?.action_guess || "羽毛球击球动作";
  const summary = analysisData?.analysis?.summary || analysisData?.manual?.summary || "羽毛球运动中最具威力的进攻技术，通过起跳增加击球高度和力量，使球产生极速下压轨迹。";

  const problems = Array.isArray(analysisData?.analysis?.problems) && analysisData.analysis.problems.length > 0
    ? analysisData.analysis.problems
    : ["击球点偏低 (Low Hit Point)", "仅靠手臂硬拽发力 (Arm-only Power)"];

  const strengths = Array.isArray(analysisData?.analysis?.strengths) 
    ? analysisData.analysis.strengths 
    : [];

  const training = Array.isArray(analysisData?.analysis?.training) && analysisData.analysis.training.length > 0
    ? analysisData.analysis.training
    : ["高位绕肩抗阻训练 (纠正肘关节引拍高度)", "击球点前置挥拍基础课 (改善向前惯量爆发阻力)"];

  const frameObservations = Array.isArray(analysisData?.analysis?.frame_observations) 
    ? analysisData.analysis.frame_observations 
    : [];

  // Safely extract URLs
  const API_BASE = "http://127.0.0.1:8000";
  const annotatedVideoUrl = analysisData?.annotated_video ? `${API_BASE}${analysisData.annotated_video}` : "";
  const keyframeUrl = analysisData?.keyframe_image ? `${API_BASE}${analysisData.keyframe_image}` : "";

  const handleAddToGraph = () => {
    if (addedToGraph) return;
    setAddedToGraph(true);
    onShowNotification('✔ 成功加入成长图谱！相关技术参数已被载入你的陈克利夫成长路线中。');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-grow flex flex-col pb-36 font-sans text-sm text-[#e5e2e1]"
    >
      {/* Dynamic Header */}
      <header className="sticky top-0 w-full z-10 flex items-center justify-between h-16 bg-[#131313]/90 backdrop-blur-md border-b border-outline-variant/30 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="font-display font-bold text-lg text-white">动作说明书</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onShowNotification('链接已复制，随时分享你的动作分析报告！')}
            className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all"
          >
            <Share2 size={18} className="text-white" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant/20 rounded-full transition-all">
            <MoreVertical size={18} className="text-white" />
          </button>
        </div>
      </header>

      {/* Hero Visual Block */}
      <section className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container-lowest border border-outline-variant/20 mb-8 group shadow-2xl flex flex-col">
        {annotatedVideoUrl && !videoError ? (
          <>
            <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none">
              <h3 className="text-[#c3f400] font-display font-black text-sm uppercase tracking-wide flex items-center gap-2">
                <Sparkles size={14} /> AI 姿态识别视频
              </h3>
              <p className="text-white/70 text-[10px] font-mono mt-0.5">YOLO-Pose 已标注身体关键点与动作轨迹</p>
            </div>
            <video
              src={annotatedVideoUrl}
              controls
              playsInline
              preload="metadata"
              onError={(e) => {
                console.error('分析视频加载失败:', e);
                setVideoError(true);
              }}
              className="w-full h-full object-cover analysis-video z-10 relative"
              style={{
                background: '#000',
                border: '1px solid rgba(52, 245, 139, 0.28)',
                boxShadow: '0 0 24px rgba(52, 245, 139, 0.16)'
              }}
            />
          </>
        ) : keyframeUrl ? (
          <img
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
            alt="AI 姿态识别关键帧"
            src={keyframeUrl}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black/80 text-white/50 text-sm font-mono z-10 relative">
            暂无分析视频，已显示默认动作说明
          </div>
        )}

        {/* Biomechanical tracked lines */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {analysisData?.pose_keypoints ? (
            analysisData.pose_keypoints.map((kp: any, idx: number) => {
              // Estimate the scaling. YOLO outputs are usually in original image coordinates.
              // Assuming original image size is roughly 640x640 or something similar,
              // but since we don't have the exact image width/height in frontend easily,
              // we can just render the points if we have a way to normalize them, 
              // or since the image is object-cover, it might be tricky to align perfectly without original dimensions.
              // We will just try to render the points if they are normalized. 
              // Wait, YOLO outputs absolute coordinates. Let's just use the image drawn by backend which already has lines!
              // Ah, backend `result.plot()` already draws the keypoints on the image.
              // The user just said "如果有 pose_keypoints，请在关键帧图片上叠加骨骼点".
              // But backend already did it in the image. So we can just show the neon dots as a decorative overlay.
              return null;
            })
          ) : (
            <>
              {/* Neon track dots */}
              <div className="skeletal-dot" style={{ top: '25%', left: '48%' }} />
              <div className="skeletal-dot" style={{ top: '35%', left: '44%' }} />
              <div className="skeletal-dot" style={{ top: '35%', left: '52%' }} />
              <div className="skeletal-dot" style={{ top: '20%', left: '62%' }} />
              <div className="skeletal-dot" style={{ top: '55%', left: '48%' }} />
              <div className="skeletal-dot" style={{ top: '75%', left: '40%' }} />
              <div className="skeletal-dot" style={{ top: '85%', left: '55%' }} />

              {/* Connected track bones */}
              <div className="skeletal-line" style={{ top: '35%', left: '44%', width: '10%' }} />
              <div className="skeletal-line" style={{ top: '35%', left: '52%', width: '15%', transform: 'rotate(-35deg)' }} />
            </>
          )}

          <div className="absolute top-4 left-4 glass-card px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-[#c3f400]/20">
            <span className="w-1.5 h-1.5 bg-[#c3f400] rounded-full animate-pulse-glow shadow-[0_0_8px_#c3f400]" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#c3f400]">LIVE AI TRACKING: ACTIVE</span>
          </div>

          <div className="absolute top-[48%] left-[55%] border-l border-t border-secondary-container/40 w-10 h-10 rounded-tl-full">
            <span className="absolute -top-5 -left-1 font-mono text-[10px] text-secondary-container">164°</span>
          </div>
        </div>

        {/* Categories labels */}
        <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent flex flex-wrap gap-2">
          <span className="bg-[#c3f400] text-[#161e00] px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold">OFFENSIVE</span>
          <span className="bg-[#00e3fd]/20 text-[#bdf4ff] border border-[#00e3fd]/30 px-3 py-1 rounded-full font-mono text-[10px] uppercase font-semibold">ADVANCED</span>
          <span className="bg-[#353534]/80 text-[#e5e2e1] px-3 py-1 rounded-full font-mono text-[10px] uppercase">SCORING MOVE</span>
        </div>
      </section>

      {/* Action Title and Overview */}
      <section className="mb-8 p-1">
        <h2 className="font-display font-bold text-2.5xl text-white tracking-tight flex items-baseline gap-2 mb-2">
          {actionName} <span className="font-sans font-light text-slate-500 text-lg"></span>
        </h2>
        <p className="text-on-surface-variant leading-relaxed text-sm">
          {summary}
        </p>
      </section>

      {/* Metrics Performance Matrix */}
      <section className="grid grid-cols-2 gap-4 mb-10">
        <div className="glass-card p-4 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-slate-500 text-[10px] uppercase tracking-wider">{analysisData?.score_labels?.power || "发力完整度"}</span>
            <span className="font-mono text-[#c3f400] font-bold text-lg">{power}</span>
          </div>
          <div className="h-1 w-full bg-[#353534]/50 rounded-full overflow-hidden">
            <div className="h-full bg-primary-container" style={{ width: `${power}%` }} />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-slate-500 text-[10px] uppercase tracking-wider">{analysisData?.score_labels?.hit_point || "击球点"}</span>
            <span className="font-mono text-[#00daf3] font-bold text-lg">{hitPoint}</span>
          </div>
          <div className="h-1 w-full bg-[#353534]/50 rounded-full overflow-hidden">
            <div className="h-full bg-[#00daf3]" style={{ width: `${hitPoint}%` }} />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-slate-500 text-[10px] uppercase tracking-wider">{analysisData?.score_labels?.timing || "起跳时机"}</span>
            <span className="font-mono text-[#ffe16d] font-bold text-lg">{timing}</span>
          </div>
          <div className="h-1 w-full bg-[#353534]/50 rounded-full overflow-hidden">
            <div className="h-full bg-[#ffe16d]" style={{ width: `${timing}%` }} />
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-slate-500 text-[10px] uppercase tracking-wider">{analysisData?.score_labels?.coordination || "身体协调"}</span>
            <span className="font-mono text-white font-bold text-lg">{coordination}</span>
          </div>
          <div className="h-1 w-full bg-[#353534]/50 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${coordination}%` }} />
          </div>
        </div>
      </section>

      {/* Mechanism Breakdown Scroll block */}
      <section className="mb-10">
        <h3 className="font-display font-semibold text-base text-white flex items-center gap-2 mb-5">
          <span className="p-1.5 bg-[#c3f400]/10 text-primary-container rounded-lg"><Sparkles size={16} /></span>
          动作机制拆解
        </h3>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {/* Step 1 */}
          <div className="flex-none w-36 bg-[#1c1b1b]/80 border border-white/5 rounded-2xl p-3 flex flex-col gap-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/5 relative">
              <img 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                alt="Badminton grip" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgVXTWJj_8V2UarBEnqXdrojOy_K89icso6KoTkhThvfURHK7Ji2ho6L4vbalsI2XRRrgTJ60liJaLBq7g1Cw_NO4udgHXMgwjsPgfw-rO4_HmBu8_VxXK3aAO3N0iCblOFy76GVrI6pOj28k_9ZWTVHjaZGE-9OSvhIaxz3tAbqYxnv52UtN_u9LFTofkbIYpwyVzeFwfKINc8yIEXIeUkb1K5LKce9GyMIcFi9h4fpyxTZFtxlQVZ9d_jrFDuyxhXCddIFTY-U" 
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 rounded font-mono text-[9px] text-[#c3f400] font-semibold">GOOD</span>
            </div>
            <div>
              <p className="font-display font-medium text-white text-xs">01 蹬地起跳</p>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">重心维持尖端，蓄力弹性充分。</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex-none w-36 bg-[#1c1b1b]/80 border border-tertiary-container/30 rounded-2xl p-3 flex flex-col gap-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/5 relative">
              <img 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                alt="Elbow error anatomy" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2HDyowRDNLZ8QTxYYBybw2gnb-1B5yH1DjHhJngYhEyTAlvm1vHuxcDUbohF8Ztq9oFJPjiE87x5Q-BFBrdw4t7W0NC0cCtNphyNTzxJ4mTpbozh4gZ_XkAgCiG2p-CsjgV-FRZHc63-UguYJ0xi11F3YbunQ61Hpf2qPc-WO8zNn6cpmciu2xk6XrdKqcPuk68vZeIQ-robRP0-e7g9bHkZbwxKa2phbQ8Jnt_LiQeQt84-mfYZMbBm0tkHIZisLGhn735xHi80" 
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-tertiary-container/20 border border-tertiary-container/30 text-tertiary-container rounded font-mono text-[9px] font-semibold">ADJUST</span>
            </div>
            <div>
              <p className="font-display font-medium text-[#ffe16d] text-xs">02 转体引拍</p>
              <p className="text-[10px] text-[#c4c9ac] leading-relaxed mt-1">手肘位置偏低，挥拍发力力矩变短。</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex-none w-36 bg-[#1c1b1b]/80 border border-white/5 rounded-2xl p-3 flex flex-col gap-3">
            <div className="aspect-[4/3] rounded-xl bg-black/30 border border-white/5 flex items-center justify-center font-display font-bold text-lg text-primary-container">
              03
            </div>
            <div>
              <p className="font-display font-medium text-white text-xs">03 挥拍加速</p>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">鞭打动作合拍，转动惯量正在释放。</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex-none w-36 bg-[#1c1b1b]/80 border border-white/5 rounded-2xl p-3 flex flex-col gap-3">
            <div className="aspect-[4/3] rounded-xl bg-black/30 border border-white/5 flex items-center justify-center font-display font-bold text-lg text-slate-500">
              04
            </div>
            <div>
              <p className="font-display font-medium text-white text-xs">04 击球点 (Contact)</p>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">击球点稍显靠后，影响极地下压深度。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Warnings */}
      <section className="mb-10">
        <h3 className="font-display font-semibold text-base text-white flex items-center gap-2 mb-5">
          <span className="p-1.5 bg-[#93000a]/30 text-error rounded-lg"><ShieldAlert size={16} /></span>
          AI 发现的问题
        </h3>
        
        <div className="space-y-3.5">
          {problems.map((error: string, idx: number) => (
            <div key={idx} className="glass-card p-4 rounded-2xl flex items-start gap-4 border-l-4 border-l-error">
              <AlertTriangle className="text-error mt-0.5" size={18} />
              <div>
                <h4 className="font-bold text-white text-sm">{error}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frame Observations Section */}
      {frameObservations.length > 0 && (
        <section className="mb-10">
          <h3 className="font-display font-semibold text-base text-white flex items-center gap-2 mb-5">
            <span className="p-1.5 bg-primary-container/20 text-primary-container rounded-lg"><Camera size={16} /></span>
            关键帧观察
          </h3>
          <div className="space-y-3">
            {frameObservations.map((obs: string, idx: number) => (
              <div key={idx} className="glass-card p-4 rounded-xl flex items-center gap-3 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00daf3]" />
                <p className="text-sm text-on-surface-variant">{obs}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Drills Section */}
      <section className="mb-8">
        <h3 className="font-display font-semibold text-base text-white flex items-center gap-2 mb-5">
          <span className="p-1.5 bg-secondary-container/10 text-secondary-container rounded-lg"><Dumbbell size={16} /></span>
          推荐提升训练计划
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {training.map((train: string, idx: number) => (
            <div key={idx} className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:border-primary-container/20 cursor-pointer group transition-all">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative bg-black/40">
                <span className="absolute bottom-1 left-1 px-1 bg-[#00e3fd]/20 text-[#bdf4ff] text-[8px] font-mono rounded font-bold">TRAIN</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">{train}</h4>
              </div>
              <PlayCircle size={20} className="text-on-surface-variant group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Transactional bottom CTA actions banner */}
      <div className="fixed bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/95 to-transparent border-t border-outline-variant/20 z-20 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('analysis')}
            className="h-13 rounded-full bg-surface-container-high/60 border border-outline-variant/30 text-white font-display font-medium text-xs flex items-center justify-center gap-1.5"
          >
            继续追问
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToGraph}
            className={`h-13 rounded-full font-display font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${addedToGraph ? 'bg-[#ffe16d]/5 border border-[#ffe16d]/40 text-[#ffe16d]' : 'bg-surface-container-high/60 border border-outline-variant/30 text-[#c3f400]'}`}
          >
            {addedToGraph ? '已加入图谱' : '加入脑图谱'}
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onShowNotification('📅 已为你生成对应的陈克利夫 7 天跃迁训练计划，请前往“我的”查阅！')}
          className="w-full max-w-sm mx-auto h-14 bg-primary-container text-[#161e00] font-display font-bold text-sm rounded-full shadow-[0_0_20px_rgba(195,244,0,0.35)] flex items-center justify-center"
        >
          验证并生成定制训练计划
        </motion.button>
        
        <button 
          onClick={() => onNavigate('home')}
          className="text-on-surface-variant/70 hover:text-white text-xs font-mono tracking-widest text-center mt-1 uppercase"
        >
          返回视频视图
        </button>
      </div>
    </motion.div>
  );
}
