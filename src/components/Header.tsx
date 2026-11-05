import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Building2 } from 'lucide-react';

interface HeaderProps {
  currentStep: 'intro' | 'select' | 'reveal' | 'result';
  onNavigate: (step: 'intro' | 'select') => void;
  onOpenArchive: () => void;
  onOpenAbout: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigate,
  onOpenArchive,
  onOpenAbout,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="relative z-30 w-full border-b border-indigo-900/40 bg-[#060919]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Single text wordmark in display face */}
        <button
          onClick={() => onNavigate('intro')}
          className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white via-indigo-100 to-sky-200 bg-clip-text text-transparent">
            2027 미래 운세 카드
          </span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-300">
          <button
            onClick={() => onNavigate('intro')}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              currentStep === 'intro' ? 'text-sky-300 underline underline-offset-4 font-bold' : ''
            }`}
          >
            홈
          </button>
          <button
            onClick={() => onNavigate('select')}
            className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
              currentStep === 'select' ? 'text-sky-300 underline underline-offset-4 font-bold' : ''
            }`}
          >
            카드 뽑기
          </button>
          <button
            onClick={onOpenArchive}
            className="hover:text-white transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 text-slate-300"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-300" />
            <span>운세 100선</span>
          </button>
          <button
            onClick={onOpenAbout}
            className="hover:text-white transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 text-slate-300"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>미래교육원</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Sound toggle & Quick Action) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Archive button on mobile */}
          <button
            onClick={onOpenArchive}
            className="md:hidden p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 cursor-pointer"
            title="운세 100선 보기"
            aria-label="운세 100선 보기"
          >
            <BookOpen className="w-4 h-4 text-purple-300" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 cursor-pointer transition-colors"
            title={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
            aria-label={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Primary Action Button */}
          {currentStep !== 'select' && currentStep !== 'reveal' && (
            <button
              onClick={() => onNavigate('select')}
              className="py-1.5 px-3.5 sm:px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 shadow-md shadow-indigo-500/20 whitespace-nowrap cursor-pointer transition-all active:scale-95"
            >
              카드 뽑기
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
