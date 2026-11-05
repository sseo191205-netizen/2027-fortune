import React from 'react';
import { GreenMascot, BlueMascot, NavyMascot } from './MascotCharacters';
import { playChime } from '../utils/audio';
import { Sparkles, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center justify-between min-h-[calc(100vh-100px)] select-none">
      
      {/* Top Header Badge */}
      <div className="text-center pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase mb-3 bg-indigo-950/70 border border-indigo-500/30 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span>GYEONGNAM FUTURE EDUCATION INSTITUTE</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-sky-300 tracking-tight leading-tight filter drop-shadow-[0_4px_20px_rgba(168,85,247,0.35)] animate-holo">
          2027 미래 운세 카드
        </h1>

        {/* Subtitles */}
        <div className="mt-3 sm:mt-4 space-y-1">
          <p className="text-base sm:text-lg md:text-xl font-bold text-white tracking-wide">
            "2027년, 당신의 미래가 도착했습니다."
          </p>
          <p className="text-xs sm:text-sm md:text-base text-indigo-200/80 font-medium">
            당신을 기다리는 특별한 행운을 만나보세요.
          </p>
        </div>
      </div>

      {/* Central 3 Mascots Section with Floating Space Particles */}
      <div className="relative my-auto py-8 w-full max-w-lg flex items-center justify-center">
        
        {/* Holographic Glowing Backdrop Aura */}
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-purple-600/30 via-sky-500/25 to-emerald-500/20 blur-3xl pointer-events-none" />

        {/* Holographic Concentric Orbit Rings */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed border-indigo-400/25 pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
        <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-dotted border-sky-400/20 pointer-events-none animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }} />

        {/* 3 Mascots Staggered Layout */}
        <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-6">
          
          {/* 1. Green Mascot (Left, gently floating) */}
          <div className="flex flex-col items-center animate-float" style={{ animationDelay: '0s' }}>
            <div className="sm:hidden">
              <GreenMascot size={88} />
            </div>
            <div className="hidden sm:block">
              <GreenMascot size={124} />
            </div>
            <span className="mt-1 text-[11px] sm:text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-0.5 rounded-full border border-emerald-500/30 whitespace-nowrap text-center shadow-sm">
              상상이
            </span>
          </div>

          {/* 2. Blue Mascot (Center, slightly larger) */}
          <div className="flex flex-col items-center -translate-y-2 sm:-translate-y-4 animate-float" style={{ animationDelay: '1.2s' }}>
            <div className="sm:hidden">
              <BlueMascot size={102} />
            </div>
            <div className="hidden sm:block">
              <BlueMascot size={142} />
            </div>
            <span className="mt-1 text-xs sm:text-sm font-bold text-sky-300 bg-sky-950/80 px-3 py-0.5 rounded-full border border-sky-500/30 shadow-md whitespace-nowrap text-center">
              체험이
            </span>
          </div>

          {/* 3. Navy Mascot (Right, gently floating) */}
          <div className="flex flex-col items-center animate-float" style={{ animationDelay: '2.4s' }}>
            <div className="sm:hidden">
              <NavyMascot size={88} />
            </div>
            <div className="hidden sm:block">
              <NavyMascot size={124} />
            </div>
            <span className="mt-1 text-[11px] sm:text-xs font-bold text-indigo-300 bg-indigo-950/80 px-3 py-0.5 rounded-full border border-indigo-500/30 whitespace-nowrap text-center shadow-sm">
              공감이
            </span>
          </div>

        </div>

        {/* Floating Sparkle Stars around characters */}
        <div className="absolute top-4 left-6 text-yellow-300 text-lg animate-pulse">✦</div>
        <div className="absolute bottom-6 right-8 text-sky-300 text-sm animate-pulse" style={{ animationDelay: '1s' }}>✧</div>
        <div className="absolute top-10 right-10 text-emerald-300 text-base animate-pulse" style={{ animationDelay: '1.8s' }}>✦</div>
        <div className="absolute bottom-12 left-10 text-purple-300 text-xs animate-pulse" style={{ animationDelay: '2.5s' }}>✶</div>
      </div>

      {/* Bottom Start CTA Button & Sub-info */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3 pb-4">
        
        {/* Main CTA Button: [나의 미래 확인하기] */}
        <button
          onClick={() => {
            playChime('select');
            onStart();
          }}
          className="group relative w-full py-4 px-8 rounded-2xl font-black text-lg sm:text-xl text-white tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 active:scale-95 shadow-[0_0_35px_rgba(129,140,248,0.5)] border border-white/30 flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 overflow-hidden"
        >
          {/* Shimmer sweep animation across button */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>나의 미래 확인하기</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Privacy & No Sign-in Trust Note */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>개인정보 수집 및 로그인 없이 누구나 무료로 이용 가능</span>
        </div>

        {/* Kiosk / Instagram tip */}
        <div className="text-[11px] text-indigo-300/70 text-center">
          100종의 다양한 2027 미래 운세를 만나보세요
        </div>

      </div>

    </div>
  );
};
