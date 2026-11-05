import React, { useRef, useState, useEffect } from 'react';
import { GreenMascot, BlueMascot, NavyMascot } from './MascotCharacters';
import { playChime } from '../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';

export type CardType = 'A' | 'B' | 'C';

interface CardInfo {
  id: CardType;
  name: string;
  colorName: string;
  themeColor: string;
  glowColor: string;
  borderClass: string;
  mascot: 'navy' | 'green' | 'blue';
  symbol: string;
  subtitle: string;
}

export const CARD_CONFIGS: CardInfo[] = [
  {
    id: 'A',
    name: '신비의 라벤더 카드',
    colorName: '라벤더',
    themeColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.65)',
    borderClass: 'border-purple-400/60 shadow-[0_0_30px_rgba(168,85,247,0.5)]',
    mascot: 'navy',
    symbol: '✧',
    subtitle: '코스믹 직관과 꿈',
  },
  {
    id: 'B',
    name: '희망의 네온 민트 카드',
    colorName: '민트',
    themeColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    borderClass: 'border-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.5)]',
    mascot: 'green',
    symbol: '✦',
    subtitle: '새싹의 성장과 행운',
  },
  {
    id: 'C',
    name: '지혜의 스카이블루 카드',
    colorName: '스카이블루',
    themeColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.65)',
    borderClass: 'border-sky-400/60 shadow-[0_0_30px_rgba(56,189,248,0.5)]',
    mascot: 'blue',
    symbol: '✶',
    subtitle: '미래 지성과 비상',
  },
];

interface CardDeckProps {
  onCardConfirmed: (cardId: CardType) => void;
}

export const CardDeck: React.FC<CardDeckProps> = ({ onCardConfirmed }) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const lastTapTimeRef = useRef<{ [key in CardType]?: number }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle single-touch / click selection vs double-tap confirmation
  const handleCardInteraction = (cardId: CardType, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    const now = Date.now();
    const lastTap = lastTapTimeRef.current[cardId] || 0;
    const isDoubleTap = now - lastTap < 360 && selectedCard === cardId;

    if (isDoubleTap) {
      // Double tap confirmed!
      playChime('confirm');
      onCardConfirmed(cardId);
      lastTapTimeRef.current = {};
    } else {
      // Single tap / click
      lastTapTimeRef.current[cardId] = now;
      if (selectedCard !== cardId) {
        setSelectedCard(cardId);
        playChime('select');
      }
    }
  };

  // Double click for mouse desktop
  const handleCardDoubleClick = (cardId: CardType, e: React.MouseEvent) => {
    e.stopPropagation();
    playChime('confirm');
    onCardConfirmed(cardId);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') setSelectedCard('A');
      if (e.key === '2') setSelectedCard('B');
      if (e.key === '3') setSelectedCard('C');
      if (e.key === 'Enter' || e.key === ' ') {
        if (selectedCard) {
          e.preventDefault();
          playChime('confirm');
          onCardConfirmed(selectedCard);
        }
      }
      if (e.key === 'Escape') {
        setSelectedCard(null);
        playChime('cancel');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCard, onCardConfirmed]);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 flex flex-col items-center justify-between min-h-[calc(100vh-100px)]"
      onClick={() => {
        if (selectedCard) {
          setSelectedCard(null);
          playChime('cancel');
        }
      }}
    >
      {/* Screen 2 Header */}
      <div className="text-center pt-2 sm:pt-4 mb-4 select-none">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-indigo-300 uppercase mb-2 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>FUTURE DESTINY DECK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
          당신의 미래를 선택해 주세요
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 font-medium">
          마음이 끌리는 카드를 골라보세요.
        </p>
      </div>

      {/* 3 Cards Container */}
      <div 
        className="w-full grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 items-center justify-center my-auto py-6"
        role="radiogroup"
        aria-label="2027 미래 운세 카드 3장"
      >
        {CARD_CONFIGS.map((card, idx) => {
          const isSelected = selectedCard === card.id;

          return (
            <div
              key={card.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={(e) => handleCardInteraction(card.id, e)}
              onDoubleClick={(e) => handleCardDoubleClick(card.id, e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (isSelected) {
                    onCardConfirmed(card.id);
                  } else {
                    setSelectedCard(card.id);
                  }
                }
              }}
              style={{
                transform: isSelected
                  ? 'translateY(-26px) scale(1.08)'
                  : 'translateY(0px) scale(1)',
                transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
              }}
              className={`relative cursor-pointer rounded-2xl sm:rounded-3xl p-0.5 sm:p-1 outline-none transition-all duration-300 group ${
                isSelected
                  ? `${card.borderClass} ring-2 ring-white/50 z-20`
                  : 'hover:border-white/40 border border-white/10 hover:-translate-y-1 z-10'
              }`}
            >
              {/* Outer Glow Halo for Selected Card */}
              {isSelected && (
                <div
                  className="absolute -inset-2 rounded-3xl opacity-80 blur-xl pointer-events-none transition-opacity duration-300"
                  style={{ backgroundColor: card.glowColor }}
                />
              )}

              {/* Holographic Card Body (Card Back) */}
              <div className="relative w-full aspect-[9/15] rounded-2xl sm:rounded-[22px] overflow-hidden flex flex-col items-center justify-between p-2 sm:p-4 bg-gradient-to-b from-[#141838] via-[#0D122B] to-[#080B1C] shadow-2xl">
                
                {/* Circuit Grid Hologram Texture Background */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(${card.themeColor} 1px, transparent 1px), linear-gradient(to right, ${card.themeColor}15 1px, transparent 1px)`,
                    backgroundSize: '16px 16px, 20px 20px',
                  }}
                />

                {/* Shimmer Sheen on Card Border */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                {/* Card Top Label & ID */}
                <div className="relative z-10 w-full flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold text-slate-300">
                  <span className="opacity-75">#{String(idx + 1).padStart(2, '0')}</span>
                  <span 
                    className="px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold tracking-wider"
                    style={{ backgroundColor: `${card.themeColor}25`, color: card.themeColor }}
                  >
                    CARD {card.id}
                  </span>
                  <span style={{ color: card.themeColor }}>{card.symbol}</span>
                </div>

                {/* Card Center: Institute Mascot & Hologram Rings */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                  {/* Concentric subtle hologram ring */}
                  <div
                    className={`absolute rounded-full border border-dashed transition-all duration-500 pointer-events-none ${
                      isSelected ? 'w-24 h-24 sm:w-36 sm:h-36 opacity-70 animate-spin' : 'w-20 h-20 sm:w-28 sm:h-28 opacity-30'
                    }`}
                    style={{ borderColor: card.themeColor, animationDuration: '24s' }}
                  />

                  {/* Character Illustration */}
                  <div className={`transition-transform duration-300 ${isSelected ? 'scale-110' : 'scale-95 group-hover:scale-100'}`}>
                    {card.mascot === 'navy' && <NavyMascot size={76} />}
                    {card.mascot === 'green' && <GreenMascot size={76} />}
                    {card.mascot === 'blue' && <BlueMascot size={76} />}
                  </div>

                  {/* Korean Color Label */}
                  <div className="mt-2 text-center">
                    <span className="text-[11px] sm:text-sm font-extrabold tracking-wide text-white drop-shadow">
                      {card.colorName}
                    </span>
                    <p className="hidden sm:block text-[10px] text-slate-400 font-medium mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: 2027 Inscription */}
                <div className="relative z-10 w-full text-center border-t border-white/10 pt-1.5 sm:pt-2">
                  <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-slate-300">
                    2027 FUTURE
                  </span>
                </div>

                {/* Selected Status Indicator Ribbon */}
                {isSelected && (
                  <div 
                    className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold text-white shadow-lg animate-pulse"
                    style={{ backgroundColor: card.themeColor }}
                  >
                    선택됨
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Usability & Selection Guidance */}
      <div className="w-full max-w-md mx-auto text-center mt-2 mb-4 space-y-3">
        {/* Instruction Message */}
        <p className="text-xs sm:text-sm text-slate-300 font-medium bg-slate-900/60 border border-slate-700/50 py-2 px-4 rounded-xl backdrop-blur-sm shadow-sm inline-block">
          👆 <span className="text-white font-semibold">한 번 터치</span>해서 선택하고, <span className="text-yellow-300 font-bold">두 번 터치</span>해서 미래를 확인하세요!
        </p>

        {/* Supplementary Confirm Button for users who prefer button click */}
        <div className="h-14 flex items-center justify-center">
          {selectedCard ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                playChime('confirm');
                onCardConfirmed(selectedCard);
              }}
              className="w-full max-w-xs py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 animate-bounce-subtle"
              style={{
                background: `linear-gradient(135deg, ${
                  CARD_CONFIGS.find((c) => c.id === selectedCard)?.themeColor
                }, #4338CA)`,
                boxShadow: `0 8px 25px ${
                  CARD_CONFIGS.find((c) => c.id === selectedCard)?.glowColor
                }`,
              }}
            >
              <span>이 카드로 미래 확인하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-normal">
              3장의 카드 중 하나를 가볍게 터치해 보세요
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
