/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { CardDeck, CardType } from './components/CardDeck';
import { CardRevealAnimation } from './components/CardRevealAnimation';
import { FortuneResult } from './components/FortuneResult';
import { FortuneArchiveModal } from './components/FortuneArchiveModal';
import { AboutInstituteModal } from './components/AboutInstituteModal';
import { Fortune, getFortuneById, getRandomFortune } from './data/fortunes';

type AppStep = 'intro' | 'select' | 'reveal' | 'result';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('intro');
  const [chosenCard, setChosenCard] = useState<CardType>('B');
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);
  const [isDirectLink, setIsDirectLink] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // 1. Initial URL check for ?fortune=XXX parameter (QR code scan entry)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fortuneParam = params.get('fortune');

    if (fortuneParam) {
      const found = getFortuneById(fortuneParam);
      if (found) {
        // Valid fortune ID in URL -> jump directly to Result View
        setCurrentFortune(found);
        setIsDirectLink(true);
        setCurrentStep('result');
      } else {
        // Invalid fortune ID -> clean URL and stay on Intro
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', newUrl);
        setCurrentStep('intro');
      }
    }
  }, []);

  // Update browser URL query when fortune is determined
  const updateUrlWithFortune = useCallback((fortuneId: string | null) => {
    const url = new URL(window.location.href);
    if (fortuneId) {
      url.searchParams.set('fortune', fortuneId);
    } else {
      url.searchParams.delete('fortune');
    }
    window.history.replaceState({}, '', url.toString());
  }, []);

  // Handler: Start from Intro -> Go to Card Selection
  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep('select');
  };

  // Handler: Confirm Card Selection -> Start Reveal Animation
  const handleCardConfirmed = (cardId: CardType) => {
    setChosenCard(cardId);
    // Draw a random fortune from 100 fortunes
    const fortune = getRandomFortune();
    setCurrentFortune(fortune);
    setIsDirectLink(false);
    updateUrlWithFortune(fortune.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep('reveal');
  };

  // Handler: Reveal Animation Complete -> Show Result
  const handleAnimationComplete = () => {
    setCurrentStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Reset / Pick Again
  const handleReset = () => {
    updateUrlWithFortune(null);
    setCurrentFortune(null);
    setIsDirectLink(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep('select');
  };

  // Handler: Select fortune directly from 100 Fortune Archive
  const handleSelectFromArchive = (fortune: Fortune) => {
    setCurrentFortune(fortune);
    setIsDirectLink(false);
    updateUrlWithFortune(fortune.id);
    setCurrentStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#040714] text-white overflow-x-hidden">
      
      {/* Background Starfield, Aurora & Hologram Rings */}
      <CosmicBackground />

      {/* Top Bar Header */}
      <Header
        currentStep={currentStep}
        onNavigate={(step) => {
          if (step === 'intro') {
            updateUrlWithFortune(null);
            setCurrentStep('intro');
          } else {
            setCurrentStep('select');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />

      {/* Main Dynamic Interactive Stages */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-4">
        {currentStep === 'intro' && (
          <IntroScreen onStart={handleStart} />
        )}

        {currentStep === 'select' && (
          <CardDeck onCardConfirmed={handleCardConfirmed} />
        )}

        {currentStep === 'reveal' && (
          <CardRevealAnimation
            chosenCard={chosenCard}
            onAnimationComplete={handleAnimationComplete}
          />
        )}

        {currentStep === 'result' && currentFortune && (
          <FortuneResult
            fortune={currentFortune}
            onReset={handleReset}
            isDirectLink={isDirectLink}
          />
        )}
      </main>

      {/* Global Minimal Footer */}
      <footer className="relative z-20 w-full py-4 px-6 border-t border-indigo-950/40 bg-[#040714]/80 text-center text-xs text-slate-500 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>경상남도교육청 미래교육원 · 2027 미래 운세 카드</span>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              미래교육원 소개
            </button>
            <span>·</span>
            <button
              onClick={() => setIsArchiveOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              운세 100선 둘러보기
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FortuneArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onSelectFortune={handleSelectFromArchive}
      />

      <AboutInstituteModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

    </div>
  );
}
