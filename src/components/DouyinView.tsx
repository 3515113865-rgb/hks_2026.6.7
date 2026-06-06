/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Heart, MessageCircle, Share2, Music, Shuffle, ChevronUp, Plus, Check, Upload, RotateCcw } from 'lucide-react';
import { ScreenPath } from '../types';

interface DouyinViewProps {
  onNavigate: (path: ScreenPath) => void;
  customVideoUrl: string | null;
  setCustomVideoUrl: (url: string | null) => void;
}

export default function DouyinView({ onNavigate, customVideoUrl, setCustomVideoUrl }: DouyinViewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1284);
  const [isFollowed, setIsFollowed] = useState(false);
  const controls = useAnimation();

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
    }
  };

  const handleResetVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (customVideoUrl) {
      URL.revokeObjectURL(customVideoUrl);
    }
    setCustomVideoUrl(null);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Support responsive simulated swipe-up gesture transition
  const handleDragEnd = async (event: any, info: any) => {
    // If the user drags upwards by more than 80px, transition to the home screen
    if (info.offset.y < -80) {
      onNavigate('home');
    } else {
      // Snap back to base position
      controls.start({ y: 0 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className="absolute inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden"
    >
      {/* Immersive Short Video Backdrop */}
      <div className="absolute inset-0 z-0">
        {customVideoUrl ? (
          <video
            src={customVideoUrl}
            className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.10]"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <motion.img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQugdFV9l_YPO8h2dKB6zrllrMvONMnC5DOG1Q8rk-lJ53wwuGUndu9iVJVWL_CEAooPS3DxvtRnBVebywRhmOixvH_m49q8PWPnBYlkdnuHuTp3MMKyK_8huRjumQlx4-HjGSLid3AWgKOSaX_EBAuw-UqCkLxvLcfa4YNjuFoxFAC5NOzr6HezpLaV8EfLcugXrYszf6K9dOJkZrGk0u8IdUl2I9YJDPIZbLx80ucHRJAQiXKDbPfOsxTc_FXMjcrWCdXjAlbFU"
            className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.10]"
            alt="Professional Badminton Athlete Smash video freeze"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        {/* Soft immersive dark gradients on top/bottom fields */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/85 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-82 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />
      </div>

      {/* Top Left Area - Immersive Video Upload Widget */}
      <div className="absolute top-11 left-6 z-40 pointer-events-auto flex items-center gap-1.5">
        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#CCFF00]/60 text-white hover:text-[#CCFF00] rounded-full text-[10px] font-sans font-medium hover:bg-black/60 cursor-pointer transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <Upload size={12} />
          <span>上传视频 / Upload</span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </label>
        {customVideoUrl && (
          <button
            onClick={handleResetVideo}
            title="恢复默认背景 / Reset Default"
            className="p-1.5 bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-400 hover:text-red-400 text-white/80 rounded-full cursor-pointer transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <RotateCcw size={12} />
          </button>
        )}
      </div>

      {/* Top Feed tabs HUD header */}
      <div className="absolute top-10 inset-x-0 z-30 flex justify-center items-center gap-6 text-sm text-white/60 font-sans">
        <span className="cursor-pointer hover:text-white transition-colors">关注 / Following</span>
        <div className="flex flex-col items-center gap-1 font-bold text-white cursor-pointer">
          <span>推荐 / For You</span>
          <div className="w-4 h-[2px] bg-[#CCFF00] rounded-full" />
        </div>
      </div>

      {/* Draggable container surface to support organic mobile swiping gestures */}
      <motion.div
        drag="y"
        dragConstraints={{ top: -300, bottom: 0 }}
        dragElastic={0.4}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="relative z-10 flex-grow w-full flex flex-col justify-end p-6 pb-8 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex justify-between items-end gap-6 w-full mt-auto">
          {/* Bottom Left: Video description details card info */}
          <div className="flex-grow flex flex-col gap-2.5 text-left text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] pointer-events-auto">
            <span className="font-display font-black text-sm italic tracking-widest text-[#CCFF00]">
              @羽人AI技战术解析
            </span>
            <p className="text-xs font-sans text-white/95 leading-relaxed max-w-[260px]">
              全英公开赛焦点瞬间！李梓嘉空中反关节暴扣超级绝杀，骨骼捕捉慢动作姿态对比。
              <span className="text-[#CCFF00] ml-1.5 font-semibold">#羽毛球 #杀球 biomechanical</span>
            </p>

            {/* Loop scrolling musical track name */}
            <div className="flex items-center gap-2 mt-1 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 w-fit max-w-[170px] overflow-hidden whitespace-nowrap">
              <Music size={11} className="text-[#CCFF00] shrink-0" />
              <marquee scrollamount="2" className="text-[10px] font-mono text-white/80">
                李梓嘉决赛背景原声音轨 - 极速狂飙
              </marquee>
            </div>
          </div>

          {/* Bottom Right: Interactive video control column digits list */}
          <div className="flex flex-col items-center gap-6 shrink-0 z-20 select-none pb-4 pointer-events-auto">
            {/* User Avatar with follow state button overlay option */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-[#CCFF00] overflow-hidden bg-zinc-900 shadow-md">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmRxE-NaIg1RKa1gvUTlMvJ8ewBOiSxYJQ4XAT_V2papSkSsE061cc6VGqMrWIfDKhx99vFuR4Yfnf1fMXvczUIJ_OZ3n8PuzxAT9OAvLcOJTLOGv8A_KfVbmcifIo9wpXOX3dXlHEnLncBs3BT7QfVcHIdoVFwzZzug9L_lfEC45qq29WTjZQIFzwPAoW7aYeKXkwiMw2B3MxpK9UJS1f1lJZWwvYLL5ISSaCcRisgGKOu-ybQBLAHf0mRc1pdkIpPS9I9-wvHNw"
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              </div>
              <button
                onClick={() => setIsFollowed(!isFollowed)}
                className={`absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center border border-black shadow transition-all ${isFollowed ? 'bg-[#CCFF00] text-black scale-95' : 'bg-red-500 text-white'}`}
              >
                {isFollowed ? <Check size={11} strokeWidth={3} /> : <Plus size={11} strokeWidth={3} />}
              </button>
            </div>

            {/* Like count tracker trigger */}
            <button
              onClick={handleLike}
              className="flex flex-col items-center gap-1 text-white bg-transparent outline-none cursor-pointer group active:scale-90 transition-transform"
            >
              <div className={`w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-colors group-hover:bg-white/20 ${isLiked ? 'text-red-500' : 'text-white'}`}>
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} className="active:scale-125 transition-transform" />
              </div>
              <span className="font-mono text-[10px] text-white/90">
                {likeCount.toLocaleString()}
              </span>
            </button>

            {/* Comment block simulated popup list */}
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center gap-1 text-white bg-transparent outline-none cursor-pointer group active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-colors group-hover:bg-white/20">
                <MessageCircle size={20} />
              </div>
              <span className="font-mono text-[10px] text-white/90">242</span>
            </button>

            {/* Share action trigger */}
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center gap-1 text-white bg-transparent outline-none cursor-pointer group active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-colors group-hover:bg-white/20">
                <Share2 size={20} />
              </div>
              <span className="font-mono text-[10px] text-white/90">分享</span>
            </button>

            {/* Moving turntable vinyl element */}
            <div className="w-10 h-10 rounded-full border-4 border-zinc-800 bg-black overflow-hidden flex items-center justify-center animate-[spin_4s_linear_infinite] shadow-2xl">
              <div className="w-4 h-4 rounded-full bg-[#CCFF00]" />
            </div>
          </div>
        </div>

        {/* Swipe-up Guidance Controller Indicator */}
        <div className="w-full mt-8 flex flex-col items-center gap-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-0.5 text-white/70"
          >
            <ChevronUp size={16} className="text-[#CCFF00]" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              上划进入羽人AI空间 / SWIPE UP
            </span>
          </motion.div>

          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3.5 bg-[#CCFF00] hover:bg-[#CCFF00]/95 active:scale-[0.98] text-black font-display font-black text-xs uppercase tracking-widest rounded-sm transition-all shadow-[0_4px_25px_rgba(204,255,0,0.4)] cursor-pointer select-none"
          >
            点击直接进入空间 / ENTER HUB
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
