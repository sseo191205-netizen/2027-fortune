import React, { useState, useMemo } from 'react';
import { FORTUNES, Fortune } from '../data/fortunes';
import { ThemeEmblem } from './ThemeEmblem';
import { MascotAvatar } from './MascotCharacters';
import { X, Search, Star, ExternalLink } from 'lucide-react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFortune: (fortune: Fortune) => void;
}

const CATEGORIES = [
  '전체',
  '행운운',
  '성장운',
  '도전운',
  '우정운',
  '성취운',
  '창의력운',
  '새로운 만남운',
  '행복운',
  '미래 발견운',
  '특별한 기회운',
];

export const FortuneArchiveModal: React.FC<ArchiveModalProps> = ({
  isOpen,
  onClose,
  onSelectFortune,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFortunes = useMemo(() => {
    return FORTUNES.filter((f) => {
      const matchCat = selectedCategory === '전체' || f.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === '' ||
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.id.includes(searchQuery);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#0B0F26] border border-indigo-500/30 flex flex-col overflow-hidden shadow-2xl animate-fade-in text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-indigo-900/40 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-800">
                TOTAL 100 FORTUNES
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                2027 미래 운세 100선 도감
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              경상남도교육청 미래교육원이 준비한 10개 카테고리 100가지 희망의 메시지
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls (Interactive Segmented Tabs) */}
        <div className="p-4 bg-slate-900/50 border-b border-indigo-900/30 space-y-3">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="운세 제목, 키워드(#행운), 내용 또는 번호 검색..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fortune Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredFortunes.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400">
              검색 조건에 맞는 운세 카드가 없습니다.
            </div>
          ) : (
            filteredFortunes.map((fortune) => (
              <div
                key={fortune.id}
                onClick={() => {
                  onSelectFortune(fortune);
                  onClose();
                }}
                className="group relative rounded-2xl p-4 bg-slate-900/70 border border-slate-800 hover:border-indigo-400/50 hover:bg-slate-850 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-slate-400 font-bold">
                      NO.{fortune.id}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold"
                      style={{
                        backgroundColor: `${fortune.luckyColorCode}22`,
                        color: fortune.luckyColorCode,
                      }}
                    >
                      {fortune.category}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 my-2">
                    <div className="shrink-0 p-1.5 rounded-xl bg-white/5 border border-white/5">
                      <MascotAvatar variant={fortune.character} size={36} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                        {fortune.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {fortune.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-yellow-400">
                    {'★'.repeat(fortune.stars)}
                  </span>
                  <span className="text-indigo-300 group-hover:underline flex items-center gap-1 font-semibold">
                    <span>이 카드 보기</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-indigo-900/40 bg-slate-950/80 text-center text-xs text-slate-400">
          원하는 카드를 클릭하면 해당 운세 결과 카드로 바로 이동합니다.
        </div>
      </div>
    </div>
  );
};
