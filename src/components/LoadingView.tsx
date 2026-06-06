/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Brain, Loader, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { ScreenPath } from '../types';

interface LoadingViewProps {
  userQuery: string;
  onNavigate: (path: ScreenPath) => void;
}

interface StepType {
  id: number;
  label: string;
  status: 'pending' | 'active' | 'completed';
}

export default function LoadingView({ userQuery, onNavigate }: LoadingViewProps) {
  const [steps, setSteps] = useState<StepType[]>([
    { id: 1, label: '正在识别画面对象', status: 'active' },
    { id: 2, label: '正在分析圈选目标', status: 'pending' },
    { id: 3, label: '正在基于成长图谱判断用户意图', status: 'pending' },
    { id: 4, label: '正在生成对应说明书内容', status: 'pending' },
  ]);

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Stage-by-stage tick simulation to make the HUD feel incredible and organic
    const timer1 = setTimeout(() => {
      setSteps(prev => prev.map(s => 
        s.id === 1 ? { ...s, status: 'completed' } :
        s.id === 2 ? { ...s, status: 'active' } : s
      ));
    }, 600);

    const timer2 = setTimeout(() => {
      setSteps(prev => prev.map(s => 
        s.id === 2 ? { ...s, status: 'completed' } :
        s.id === 3 ? { ...s, status: 'active' } : s
      ));
    }, 1200);

    const timer3 = setTimeout(() => {
      setSteps(prev => prev.map(s => 
        s.id === 3 ? { ...s, status: 'completed' } :
        s.id === 4 ? { ...s, status: 'active' } : s
      ));
    }, 1800);

    const timer4 = setTimeout(() => {
      setSteps(prev => prev.map(s => 
        s.id === 4 ? { ...s, status: 'completed' } : s
      ));
      setFinished(true);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleProceed = () => {
    if (!finished) return;
    // Route based on query mapping
    const isEquipment = userQuery.includes('装备') || userQuery.includes('鞋') || userQuery.includes('拍');
    const isAction = userQuery.includes('动作') || userQuery.includes('跳杀') || userQuery.includes('得分') || userQuery.includes('为什么');
    
    if (isEquipment) {
      onNavigate('manual-equip');
    } else {
      onNavigate('manual-action');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-grow flex flex-col justify-between py-8 px-6 min-h-[700px] relative overflow-hidden"
    >
      {/* Dimmed Blurred Video Background Simulation */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover blur-md brightness-[0.25]"
          referrerPolicy="no-referrer"
          alt="High speed analysis background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjm2MHzROVU_Umu_wN68el6ulIAFzqoutY3F7mLj1TAX93XD-0J82JHmowYC4WOHb6-R9LKKnMonH8oMSpqtsGW6tmiGqo-8g-990cFkaJ25utKpvJItAXkErmr2KXORqPwmRDeLz0ZDUhuiWcgFvprtz5EObzH6FDi9QmBI49gkH070e78ONsd0-dFGnylbHQI0VUrV_U6gpwFPlBSyDww_2onqRZql74tRVm9lAfRI4E2C2--8KZyD4_--DbcMin2a9nFon1mYU"
        />
        {/* Scanning Line HUD overlay */}
        <div className="absolute inset-x-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#00e3fd] to-transparent opacity-40 blur-[1px] animate-scan pointer-events-none" />
      </div>

      {/* Header Reference Chip */}
      <div className="relative z-10 mx-auto">
        <div className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2 border border-[#00e3fd]/20">
          <HelpCircle size={14} className="text-[#00e3fd]" />
          <span className="font-mono text-xs text-white/90 truncate max-w-[240px]">
            问："{userQuery || '为什么这一球能得分？'}"
          </span>
        </div>
      </div>

      {/* Central Visual Spinner Brain */}
      <div className="relative z-10 flex flex-col items-center justify-center my-6">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Animated Spinning outer rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className={`absolute inset-0 rounded-full border-t-2 border-r-2 ${finished ? 'border-primary-container' : 'border-[#00e3fd]'} opacity-80`}
          />

          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-surface-container-high/40 opacity-50"
          />

          {/* Central Pulsing bloom */}
          <motion.div 
            animate={{ scale: [0.95, 1.1, 0.95] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-4 rounded-full bg-primary-container/10 flex items-center justify-center"
          />

          <Brain size={44} className={`text-primary-container drop-shadow-[0_0_12px_rgba(195,244,0,0.6)] ${finished ? 'text-primary-container' : 'text-[#00e3fd]'}`} />
        </div>

        <h3 className="font-display font-semibold text-lg text-white mt-8 tracking-tight" id="main-status">
          {finished ? '说明书生成完毕' : '正在分析生成中...'}
        </h3>
      </div>

      {/* Status Progress Checklist */}
      <div className="relative z-10 space-y-3.5 w-full max-w-sm mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-3.5 p-4 rounded-2xl glass-card border transition-all duration-300 ${
              step.status === 'completed'
                ? 'border-primary-container/20 opacity-100 bg-[#c3f400]/5'
                : step.status === 'active'
                ? 'border-[#00e3fd]/30 opacity-100'
                : 'border-white/5 opacity-40'
            }`}
          >
            {step.status === 'completed' ? (
              <CheckCircle2 size={16} className="text-primary-container shrink-0" />
            ) : step.status === 'active' ? (
              <Loader size={16} className="text-[#00e3fd] shrink-0 animate-spin" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
            )}
            <span className="font-sans text-xs text-white/90">{step.label}</span>
          </div>
        ))}
      </div>

      {/* Trigger CTA */}
      <div className="relative z-10 w-full max-w-sm mx-auto mt-6">
        <motion.button
          whileHover={finished ? { scale: 1.02 } : {}}
          whileTap={finished ? { scale: 0.98 } : {}}
          onClick={handleProceed}
          disabled={!finished}
          className={`w-full py-4 rounded-full font-display font-bold text-sm transition-all duration-500 flex items-center justify-center gap-2 ${
            finished
              ? 'bg-primary-container text-[#161e00] shadow-[0_0_25px_rgba(195,244,0,0.4)] hover:shadow-[0_0_35px_rgba(195,244,0,0.6)]'
              : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'
          }`}
          id="cta-button"
        >
          查看说明书
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
