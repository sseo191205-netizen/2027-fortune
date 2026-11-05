import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Fortune } from '../data/fortunes';
import { MascotAvatar } from './MascotCharacters';
import { ThemeEmblem } from './ThemeEmblem';
import { exportFortuneCardImage } from '../utils/imageExporter';
import { playChime } from '../utils/audio';
import { Download, RefreshCw, Share2, Check, QrCode, Star, Sparkles, Smartphone } from 'lucide-react';

interface FortuneResultProps {
  fortune: Fortune;
  onReset: () => void;
  isDirectLink?: boolean;
}

export const FortuneResult: React.FC<FortuneResultProps> = ({ fortune, onReset, isDirectLink = false }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [shareUrl, setShareUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Generate share URL and QR code on mount
  useEffect(() => {
    let baseUrl = window.location.origin + window.location.pathname;
    
    // In dev or preview, ensure we preserve origin & pathname
    const finalShareUrl = `${baseUrl}?fortune=${fortune.id}`;
    setShareUrl(finalShareUrl);

    // Generate QR Code data URL
    QRCode.toDataURL(finalShareUrl, {
      margin: 1,
      width: 280,
      color: {
        dark: '#080C24',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation failed', err));
  }, [fortune.id]);

  // Handle PNG Image Download / Web Share
  const handleSaveImage = async () => {
    try {
      setIsExporting(true);
      playChime('select');
      await exportFortuneCardImage(fortune, shareUrl);
    } catch (err) {
      console.error('Image export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle Copy Link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      playChime('sparkle');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 flex flex-col items-center">
      
      {/* Direct link badge if user arrived via QR Code */}
      {isDirectLink && (
        <div className="mb-3 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm animate-pulse">
          <Smartphone className="w-3.5 h-3.5 text-sky-300" />
          <span>공유된 2027 미래 운세 카드입니다</span>
        </div>
      )}

      {/* Main Grid: Responsive Card + QR Code / Share Panel for Large Displays & Mobile */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-10">
        
        {/* ================= FORTUNE RESULT CARD ================= */}
        <div
          id="fortune-card-display"
          className="relative w-full max-w-[390px] sm:max-w-[430px] rounded-3xl p-1 shadow-2xl transition-all duration-300"
          style={{
            background: `linear-gradient(145deg, ${fortune.luckyColorCode}66, rgba(255,255,255,0.1), rgba(15,23,42,0.8))`,
            boxShadow: `0 0 50px ${fortune.luckyColorCode}35`,
          }}
        >
          {/* Outer Glow Ambient Frame */}
          <div
            className="absolute -inset-1 rounded-3xl opacity-50 blur-xl pointer-events-none"
            style={{ backgroundColor: fortune.luckyColorCode }}
          />

          {/* Card Inner Body */}
          <div className="relative z-10 w-full rounded-[22px] overflow-hidden bg-gradient-to-b from-[#121738] via-[#0C1028] to-[#070918] p-5 sm:p-6 flex flex-col items-center text-center border border-white/15">
            
            {/* Shimmering Top Bar */}
            <div className="w-full flex items-center justify-between text-xs font-mono font-bold text-slate-400 border-b border-white/10 pb-3">
              <span className="text-slate-300">NO.{fortune.id}</span>
              <span className="text-[11px] font-extrabold tracking-widest text-indigo-300">
                2027 MY FUTURE
              </span>
              <span style={{ color: fortune.luckyColorCode }}>✦</span>
            </div>

            {/* Category Pill Tag */}
            <div className="mt-3">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm"
                style={{
                  backgroundColor: `${fortune.luckyColorCode}22`,
                  color: fortune.luckyColorCode,
                  border: `1px solid ${fortune.luckyColorCode}55`,
                }}
              >
                {fortune.category}
              </span>
            </div>

            {/* Central Visual: Mascot & Theme Illustration */}
            <div className="relative my-4 w-full h-44 sm:h-48 flex items-center justify-center">
              {/* Theme Ambient Radial Glow */}
              <div
                className="absolute w-36 h-36 rounded-full blur-2xl opacity-40 pointer-events-none"
                style={{ backgroundColor: fortune.luckyColorCode }}
              />

              {/* Theme Emblem Behind */}
              <div className="absolute opacity-40 scale-125 transform">
                <ThemeEmblem theme={fortune.theme} size={150} />
              </div>

              {/* Character Mascot in Front */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300 animate-float">
                <MascotAvatar variant={fortune.character} size={110} />
              </div>
            </div>

            {/* Fortune Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-md px-2">
              "{fortune.title}"
            </h3>

            {/* Fortune Message */}
            <div className="mt-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-xs sm:text-sm leading-relaxed font-normal text-left">
              <p className="indent-1">{fortune.message}</p>
            </div>

            {/* 4 Attributes Grid (Stars, Color, Item, Keyword) */}
            <div className="w-full grid grid-cols-2 gap-2 mt-4 text-left">
              
              {/* 1. Stars */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  행운 지수
                </span>
                <span className="text-sm font-bold text-yellow-300 mt-1">
                  {'★'.repeat(fortune.stars)}{'☆'.repeat(5 - fortune.stars)}
                </span>
              </div>

              {/* 2. Lucky Color */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-medium">행운의 컬러</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="w-3 h-3 rounded-full border border-white/40 shrink-0"
                    style={{ backgroundColor: fortune.luckyColorCode }}
                  />
                  <span className="text-xs sm:text-sm font-bold text-white truncate">
                    {fortune.luckyColor}
                  </span>
                </div>
              </div>

              {/* 3. Lucky Item */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-medium">행운의 아이템</span>
                <span className="text-xs sm:text-sm font-bold text-sky-200 mt-1 truncate">
                  {fortune.luckyItem}
                </span>
              </div>

              {/* 4. Keyword */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-medium">2027 키워드</span>
                <span className="text-xs sm:text-sm font-bold text-purple-300 mt-1 truncate">
                  {fortune.keyword}
                </span>
              </div>

            </div>

            {/* Institute Footer Label */}
            <div className="w-full border-t border-white/10 mt-4 pt-2.5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">경상남도교육청 미래교육원</span>
              <span className="font-mono text-[10px] text-slate-500">2027 FUTURE</span>
            </div>

          </div>
        </div>

        {/* ================= ACTIONS & QR SHARE PANEL ================= */}
        <div className="w-full max-w-[390px] sm:max-w-[430px] flex flex-col gap-4">
          
          {/* Action Buttons Box */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/70 border border-slate-700/60 backdrop-blur-md shadow-xl flex flex-col gap-3">
            
            <div className="text-center sm:text-left mb-1">
              <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>나의 2027 미래 카드 저장 & 공유</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                고화질 이미지로 간직하거나 친구에게 공유해 보세요.
              </p>
            </div>

            {/* 1. Save Image Button (내 미래 카드 저장하기) */}
            <button
              onClick={handleSaveImage}
              disabled={isExporting}
              className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 active:scale-[0.98] shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>고화질 1080×1920 카드 생성 중...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-yellow-300" />
                  <span>내 미래 카드 저장하기 (PNG)</span>
                </>
              )}
            </button>

            {/* 2. Copy Link / Share Button */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyLink}
                className="py-3 px-3 rounded-2xl font-semibold text-xs sm:text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-600/70 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">링크 복사됨!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-indigo-300" />
                    <span>운세 링크 복사</span>
                  </>
                )}
              </button>

              {/* Toggle QR Code Modal on Mobile */}
              <button
                onClick={() => setShowQrModal(true)}
                className="py-3 px-3 rounded-2xl font-semibold text-xs sm:text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-600/70 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-sky-300" />
                <span>QR코드 크게보기</span>
              </button>
            </div>

            {/* 3. Re-draw / Pick Again Button (다른 미래도 만나보기) */}
            <button
              onClick={() => {
                playChime('select');
                onReset();
              }}
              className="mt-1 w-full py-3 px-4 rounded-2xl font-semibold text-xs sm:text-sm text-indigo-200 bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-500/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              <span>다른 미래도 만나보기 (다시 뽑기)</span>
            </button>

          </div>

          {/* QR Code Card (Prominently displayed on desktop/kiosk for visitors to scan) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/70 border border-slate-700/60 backdrop-blur-md shadow-xl flex flex-col items-center text-center">
            
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold text-white">
                휴대폰으로 운세 가져가기
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-xs mb-3">
              대형 모니터에서 뽑은 운세를 카메라로 스캔하면 내 폰에서도 그대로 열립니다.
            </p>

            {/* QR Code Container */}
            <div className="p-3 bg-white rounded-2xl shadow-md border border-white/20 inline-block">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="2027 운세 결과 공유 QR코드"
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain rounded-lg"
                />
              ) : (
                <div className="w-36 h-36 flex items-center justify-center text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
              )}
            </div>

            <div className="mt-2 text-[11px] text-slate-400 font-mono break-all px-2">
              ?fortune={fortune.id}
            </div>

            <span className="mt-2 text-[11px] text-indigo-300 font-medium">
              💡 별도 앱 설치나 로그인 없이 바로 열립니다
            </span>

          </div>

        </div>

      </div>

      {/* ================= MODAL: ENLARGED QR CODE ================= */}
      {showQrModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            className="w-full max-w-sm rounded-3xl bg-[#0F142D] border border-indigo-500/40 p-6 flex flex-col items-center text-center shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-bold text-white mb-1">
              QR코드 스캔하기
            </h4>
            <p className="text-xs text-slate-300 mb-4">
              카메라 앱으로 비추면 동일한 운세 카드로 연결됩니다.
            </p>

            <div className="p-4 bg-white rounded-2xl shadow-xl mb-4">
              {qrDataUrl && (
                <img
                  src={qrDataUrl}
                  alt="대형 QR코드"
                  className="w-56 h-56 object-contain"
                />
              )}
            </div>

            <p className="text-xs font-mono text-indigo-300 break-all mb-4 px-2">
              {shareUrl}
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
