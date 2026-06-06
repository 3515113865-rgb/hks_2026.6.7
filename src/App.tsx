/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, BookOpen, User, Signal, Wifi, Battery, Search, RefreshCw } from 'lucide-react';
import { ScreenPath } from './types';

// Import our modular screen subcomponents
import HomeView from './components/HomeView';
import AnalysisView from './components/AnalysisView';
import LoadingView from './components/LoadingView';
import ManualActionView from './components/ManualActionView';
import ManualEquipView from './components/ManualEquipView';
import PurchaseView from './components/PurchaseView';
import GrowthMapView from './components/GrowthMapView';
import ManualsView from './components/ManualsView';
import ProfileView from './components/ProfileView';
import ShootEntranceView from './components/ShootEntranceView';
import ShootCameraGuideView from './components/ShootCameraGuideView';
import WatchAskView from './components/WatchAskView';
import DouyinView from './components/DouyinView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'看见' | '说明书' | '我的'>('看见');
  const [currentPath, setCurrentPath] = useState<ScreenPath>('douyin');
  const [userQuery, setUserQuery] = useState('为什么这一球能得分？');
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  
  // Custom Toast notification states
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Sync tab triggers with standard starting routes
  const handleTabChange = (tab: '看见' | '说明书' | '我的') => {
    setActiveTab(tab);
    if (tab === '看见') {
      setCurrentPath('home');
    } else if (tab === '说明书') {
      setCurrentPath('manuals');
    } else {
      setCurrentPath('profile');
    }
  };

  const handleNavigate = (path: ScreenPath) => {
    setCurrentPath(path);
    // Synced navbar highlights.
    if (path === 'home' || path === 'analysis' || path === 'loading' || path === 'shoot-entrance' || path === 'shoot-camera-guide' || path === 'watch-ask') {
      setActiveTab('看见');
    } else if (path === 'manuals' || path === 'manual-action' || path === 'manual-equip' || path === 'purchase') {
      setActiveTab('说明书');
    } else if (path === 'growth-map' || path === 'profile') {
      setActiveTab('我的');
    }
  };

  // Dedicated dispatcher for main screen routing
  const renderScreen = () => {
    switch (currentPath) {
      case 'douyin':
        return (
          <DouyinView
            onNavigate={handleNavigate}
            customVideoUrl={customVideoUrl}
            setCustomVideoUrl={setCustomVideoUrl}
          />
        );
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'analysis':
        return <AnalysisView onNavigate={handleNavigate} setUserQuery={setUserQuery} />;
      case 'loading':
        return <LoadingView userQuery={userQuery} onNavigate={handleNavigate} />;
      case 'manual-action':
        return <ManualActionView onNavigate={handleNavigate} onShowNotification={showNotification} />;
      case 'manual-equip':
        return <ManualEquipView onNavigate={handleNavigate} onShowNotification={showNotification} />;
      case 'purchase':
        return <PurchaseView onNavigate={handleNavigate} onShowNotification={showNotification} />;
      case 'growth-map':
        return <GrowthMapView onNavigate={handleNavigate} onShowNotification={showNotification} />;
      case 'shoot-entrance':
        return <ShootEntranceView onNavigate={handleNavigate} onShowNotification={showNotification} />;
      case 'shoot-camera-guide':
        return <ShootCameraGuideView onNavigate={handleNavigate} onShowNotification={showNotification} />;
      case 'watch-ask':
        return (
          <WatchAskView
            onNavigate={handleNavigate}
            onShowNotification={showNotification}
            customVideoUrl={customVideoUrl}
          />
        );
      
      // Secondary fallback tab indexing components
      case 'manuals':
        return <ManualsView onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileView onNavigate={handleNavigate} onShowNotification={showNotification} />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  // Determine if full-bleed sub-reports should overlay sticky bottom navigation
  const hideNavbar = ['douyin', 'analysis', 'loading', 'manual-action', 'manual-equip', 'purchase', 'growth-map', 'shoot-camera-guide', 'watch-ask'].includes(currentPath);

  return (
    <div className="min-h-screen bg-[#0A0C10] court-lines flex flex-col justify-center items-center py-6 px-4 selection:bg-primary-container selection:text-black">
      {/* Background Decorative Element */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#CCFF00] opacity-10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Absolute top grid subtle ambiance light flare */}
      <div className="absolute top-0 w-full max-w-4xl h-96 bg-gradient-to-b from-primary-container/10 via-secondary-container/0 to-transparent blur-[80px] pointer-events-none" />

      {/* Main Core Viewport - Configured as a pristine smartphone container aspect ratio */}
      <main className="w-full max-w-md min-h-[820px] bg-[#07090C] rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-white/10 relative flex flex-col overflow-hidden text-sm select-none">
        
        {/* iOS Native Status Bar simulation */}
        <header className="px-7 pt-4 pb-2 z-30 flex justify-between items-center text-xs font-mono font-medium tracking-wide text-white/80 pointer-events-none">
          <span>15:07</span>
          {/* Dynamic Interactive notch bar capsule */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#00e3fd]/40 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <Signal size={12} className="opacity-80" />
            <Wifi size={12} className="opacity-80" />
            <Battery size={13} className="text-primary-container" />
          </div>
        </header>

        {/* Dynamic Display area containing screen router outcomes */}
        <div className="flex-grow flex flex-col px-6 overflow-y-auto no-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            <React.Fragment key={currentPath}>
              {renderScreen()}
            </React.Fragment>
          </AnimatePresence>
        </div>

        {/* Universal Sticky Elegant Bottom Tab iOS Bar navigator */}
        {!hideNavbar && (
          <nav className="sticky bottom-0 z-20 pb-5 pt-3 bg-gradient-to-t from-[#07090C] via-[#07090C]/95 to-transparent border-t border-white/5 flex justify-around px-2">
            
            {/* Tab: 看见 */}
            <button
              onClick={() => handleTabChange('看见')}
              className={`flex flex-col items-center gap-1.5 transition-all text-xs outline-none py-1 px-4 rounded-xl ${
                activeTab === '看见' ? 'text-primary-container font-bold' : 'text-slate-500 hover:text-white'
              }`}
            >
              <Eye size={18} className={activeTab === '看见' ? 'drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]' : ''} />
              <span className="font-display font-medium tracking-tight uppercase">看见</span>
              {activeTab === '看见' && (
                <motion.div layoutId="tab-underline" className="w-4 h-[2px] bg-primary-container rounded-full" />
              )}
            </button>

            {/* Tab: 说明书 */}
            <button
              onClick={() => handleTabChange('说明书')}
              className={`flex flex-col items-center gap-1.5 transition-all text-xs outline-none py-1 px-4 rounded-xl ${
                activeTab === '说明书' ? 'text-primary-container font-bold' : 'text-slate-500 hover:text-white'
              }`}
            >
              <BookOpen size={18} className={activeTab === '说明书' ? 'drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]' : ''} />
              <span className="font-display font-medium tracking-tight uppercase">说明书</span>
              {activeTab === '说明书' && (
                <motion.div layoutId="tab-underline" className="w-4 h-[2px] bg-primary-container rounded-full" />
              )}
            </button>

            {/* Tab: 我的 */}
            <button
              onClick={() => handleTabChange('我的')}
              className={`flex flex-col items-center gap-1.5 transition-all text-xs outline-none py-1 px-4 rounded-xl ${
                activeTab === '我的' ? 'text-primary-container font-bold' : 'text-slate-500 hover:text-white'
              }`}
            >
              <User size={18} className={activeTab === '我的' ? 'drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]' : ''} />
              <span className="font-display font-medium tracking-tight uppercase">我的</span>
              {activeTab === '我的' && (
                <motion.div layoutId="tab-underline" className="w-4 h-[2px] bg-primary-container rounded-full" />
              )}
            </button>
          </nav>
        )}

        {/* Dynamic dismiss-timer Toast Notification banner overlay */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="absolute bottom-28 inset-x-6 z-50 pointer-events-auto"
            >
              <div className="glass-card-accent px-5 py-4 rounded-2xl shadow-2xl shadow-black">
                <p className="font-sans text-xs text-primary-container leading-relaxed font-semibold">
                  {notification}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
