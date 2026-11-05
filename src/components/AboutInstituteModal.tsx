import React from 'react';
import { GreenMascot, BlueMascot, NavyMascot } from './MascotCharacters';
import { X, Sparkles, MapPin, Target, Lightbulb, Users, Compass } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutInstituteModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#0B0F26] border border-indigo-500/40 flex flex-col overflow-hidden shadow-2xl animate-fade-in text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-indigo-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-sky-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                경상남도교육청 미래교육원 소개
              </h3>
              <p className="text-[11px] text-slate-400">
                Gyeongnam Future Education Institute
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          
          {/* Main Hero Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-purple-950/40 to-slate-900/80 border border-indigo-500/30">
            <h4 className="text-base font-bold text-sky-300 flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4" />
              <span>미래를 여는 배움의 터전, 미래교육원</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              경상남도 의령군에 위치한 경상남도교육청 미래교육원은 인공지능(AI), 빅데이터, 지능형 로봇, 미래 모빌리티 등 미래 첨단 기술을 학생들이 직접 체험하고 탐구할 수 있는 경남 미래교육의 핵심 플랫폼입니다.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>경상남도 의령군 의령읍 미래교육원</span>
            </div>
          </div>

          {/* 3 Mascot Trios */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>미래교육원 공식 마스코트 3총사</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Green: 상상이 */}
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-emerald-500/30 flex flex-col items-center text-center">
                <GreenMascot size={80} />
                <span className="text-xs font-bold text-emerald-400 mt-2">상상이 (초록색)</span>
                <p className="text-[11px] text-slate-400 mt-1">
                  자라나는 꿈나무와 생명력, 무한한 상상력과 배움의 호기심을 상징합니다.
                </p>
              </div>

              {/* Blue: 체험이 */}
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-sky-500/30 flex flex-col items-center text-center">
                <BlueMascot size={80} />
                <span className="text-xs font-bold text-sky-400 mt-2">체험이 (파란색)</span>
                <p className="text-[11px] text-slate-400 mt-1">
                  지식정보사회를 이끌어갈 온몸으로 부딪히는 실천과 미래 기술 체험을 표현합니다.
                </p>
              </div>

              {/* Navy: 공감이 */}
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-indigo-500/30 flex flex-col items-center text-center">
                <NavyMascot size={80} />
                <span className="text-xs font-bold text-indigo-300 mt-2">공감이 (보라/남색)</span>
                <p className="text-[11px] text-slate-400 mt-1">
                  친구와 세상을 향한 따뜻한 공감의 마음과 미래를 향한 담대한 비전을 담고 있습니다.
                </p>
              </div>

            </div>
          </div>

          {/* 2027 Future Fortune Card Event Intro */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-yellow-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>2027 미래 운세 카드 인터랙티브 프로젝트</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              본 웹사이트는 미래교육원 방문객과 인스타그램 참여자를 위해 제작된 무작위 100종 미래 운세 인터랙티브 콘텐츠입니다. 개인정보를 전혀 수집하지 않으며, 대형 키오스크 화면에서 스캔한 QR코드를 통해 언제 어디서든 스마트폰으로 동일한 운세 카드를 다운로드하고 소장할 수 있습니다.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-indigo-900/40 bg-slate-950/80 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold text-white transition-colors cursor-pointer"
          >
            확인
          </button>
        </div>

      </div>
    </div>
  );
};
