import React, { useEffect, useState } from 'react';
import { CardType, CARD_CONFIGS } from './CardDeck';
import { GreenMascot, BlueMascot, NavyMascot } from './MascotCharacters';
import { playChime } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

interface CardRevealAnimationProps {
  chosenCard: CardType;
  onAnimationComplete: () => void;
}

export const CardRevealAnimation: React.FC<CardRevealAnimationProps> = ({
  chosenCard,
  onAnimationComplete,
}) => {
  const [stage, setStage] = useState<'gather' | 'spin' | 'flip' | 'shine'>('gather');
  const cardConfig = CARD_CONFIGS.find((c) => c.id === chosenCard) || CARD_CONFIGS[0];

  useEffect(() => {
    // 1. Starlight gathering (0.6s)
    const t1 = setTimeout(() => {
      setStage('spin');
      playChime('sparkle');
    }, 700);

    // 2. 3D Rotation & Flip (1.4s)
    const t2 = setTimeout(() => {
      setStage('flip');
      playChime('sparkle');
    }, 1400);

    // 3. Starlight explosion & final flash (2.2s)
    const t3 = setTimeout(() => {
      setStage('shine');
      playChime('reveal');
      // Fire festive cosmic confetti
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#A855F7', '#38BDF8', '#10B981', '#FBBF24', '#F472B6'],
        });
      } catch {
        // Safe fallback
      }
    }, 2200);

    // 4. Complete to Result Screen (2.7s)
    const t4 = setTimeout(() => {
      onAnimationComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onAnimationComplete]);

  return (
    <div className="relative z-20 w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-4 overflow-hidden select-none">
      
      {/* Background Pulse Flare during reveal */}
      <div 
        className={`absolute w-[450px] h-[450px] rounded-full blur-[90px] transition-all duration-700 pointer-events-none ${
          stage === 'shine' ? 'opacity-90 scale-150' : 'opacity-40 scale-100'
        }`}
        style={{ backgroundColor: cardConfig.themeColor }}
      />

      {/* Loading Status Text */}
      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-indigo-300 uppercase mb-2 bg-indigo-950/70 border border-indigo-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          <span>CONNECTING TO 2027</span>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight animate-pulse">
          2027년의 미래를 불러오는 중...
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {cardConfig.name} 속에 담긴 당신의 운명이 깨어납니다
        </p>
      </div>

      {/* 3D Animated Card Box */}
      <div className="relative z-10 perspective-1200 w-64 sm:w-72 aspect-[9/15]">
        
        {/* Swirling Starlight Particle Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-80 h-80 rounded-full border border-dashed border-white/40 animate-spin"
            style={{ animationDuration: '3s' }}
          />
          <div 
            className="w-96 h-96 rounded-full border border-dotted border-yellow-300/40 animate-spin"
            style={{ animationDuration: '4s', animationDirection: 'reverse' }}
          />
        </div>

        {/* The Card with 3D Flip Transform */}
        <div
          className={`w-full h-full rounded-3xl p-1 transition-all duration-700 preserve-3d shadow-2xl ${
            stage === 'flip' || stage === 'shine'
              ? 'rotate-y-180 scale-105'
              : stage === 'spin'
              ? 'rotate-3 scale-105'
              : 'scale-100'
          }`}
          style={{
            boxShadow: `0 0 50px ${cardConfig.glowColor}`,
            border: `2px solid ${cardConfig.themeColor}`,
          }}
        >
          {/* Card Back Face (visible initially) */}
          <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden flex flex-col items-center justify-between p-4 bg-gradient-to-b from-[#141838] via-[#0D122B] to-[#080B1C]">
            <div className="w-full flex items-center justify-between text-xs font-mono font-bold text-slate-300">
              <span>CARD {cardConfig.id}</span>
              <span className="text-yellow-300">✦ ✦ ✦</span>
              <span>2027</span>
            </div>

            <div className="my-auto flex flex-col items-center">
              <div className="relative w-28 h-28 flex items-center justify-center p-2 mb-2">
                <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-spin" style={{ animationDuration: '10s' }} />
                <div className="relative z-10">
                  {cardConfig.mascot === 'navy' && <NavyMascot size={80} />}
                  {cardConfig.mascot === 'green' && <GreenMascot size={80} />}
                  {cardConfig.mascot === 'blue' && <BlueMascot size={80} />}
                </div>
              </div>
              <span className="text-base font-bold text-white mt-1">
                {cardConfig.colorName} 카드
              </span>
            </div>

            <div className="w-full text-center text-xs text-indigo-300/80 font-mono">
              ★ GYEONGNAM FUTURE EDU ★
            </div>
          </div>

          {/* Card Front Face (revealed after 3D flip) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 border border-white/30 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 animate-bounce">
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>
            <span className="text-xs font-bold text-indigo-300 tracking-wider">
              2027 운세 도착!
            </span>
            <h4 className="text-xl font-extrabold text-white mt-2">
              운세가 열렸습니다
            </h4>
          </div>

        </div>

      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 mt-8 z-10">
        <span className={`w-2.5 h-2.5 rounded-full transition-colors ${stage === 'gather' ? 'bg-indigo-400 scale-125' : 'bg-slate-700'}`} />
        <span className={`w-2.5 h-2.5 rounded-full transition-colors ${stage === 'spin' ? 'bg-indigo-400 scale-125' : 'bg-slate-700'}`} />
        <span className={`w-2.5 h-2.5 rounded-full transition-colors ${stage === 'flip' ? 'bg-indigo-400 scale-125' : 'bg-slate-700'}`} />
        <span className={`w-2.5 h-2.5 rounded-full transition-colors ${stage === 'shine' ? 'bg-yellow-400 scale-125' : 'bg-slate-700'}`} />
      </div>

    </div>
  );
};
