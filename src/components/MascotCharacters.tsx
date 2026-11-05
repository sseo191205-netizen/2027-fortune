import React from 'react';

export type MascotColor = 'green' | 'blue' | 'navy';

export const CHARACTER_IMAGES: Record<MascotColor, string> = {
  green: '/characters/character_green.png',
  blue: '/characters/character_blue.png',
  navy: '/characters/character_navy.png',
};

export function getCharacterImageUrl(variant: MascotColor): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}${CHARACTER_IMAGES[variant]}`;
}

interface MascotProps {
  className?: string;
  size?: number;
  variant?: MascotColor;
}

export const GreenMascot: React.FC<MascotProps> = ({ className = '', size = 120 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-lime-500/20 blur-xl pointer-events-none" />
      <img
        src={getCharacterImageUrl('green')}
        alt="경상남도교육청 미래교육원 공식 초록색 캐릭터"
        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(132,204,22,0.45)] select-none pointer-events-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export const BlueMascot: React.FC<MascotProps> = ({ className = '', size = 120 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-xl pointer-events-none" />
      <img
        src={getCharacterImageUrl('blue')}
        alt="경상남도교육청 미래교육원 공식 파란색 캐릭터"
        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(56,189,248,0.45)] select-none pointer-events-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export const NavyMascot: React.FC<MascotProps> = ({ className = '', size = 120 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-indigo-500/25 blur-xl pointer-events-none" />
      <img
        src={getCharacterImageUrl('navy')}
        alt="경상남도교육청 미래교육원 공식 남색 캐릭터"
        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(99,102,241,0.5)] select-none pointer-events-none"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export const MascotAvatar: React.FC<{ variant: MascotColor; size?: number; className?: string }> = ({
  variant,
  size = 64,
  className = '',
}) => {
  switch (variant) {
    case 'green':
      return <GreenMascot size={size} className={className} />;
    case 'blue':
      return <BlueMascot size={size} className={className} />;
    case 'navy':
      return <NavyMascot size={size} className={className} />;
    default:
      return <GreenMascot size={size} className={className} />;
  }
};
