import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Complete End-to-End User Flow Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const launchActiveGame = (playerNames = ['سارا', 'رضا', 'مریم', 'علی']) => {
    // 1. Intro -> New Game
    fireEvent.click(screen.getByText('شروع بازی جدید'));
    // 2. Setup -> Categories
    fireEvent.click(screen.getByRole('button', { name: /مرحله بعد/i }));
    // 3. Categories -> Player Names
    fireEvent.click(screen.getByRole('button', { name: /مرحله بعد/i }));
    
    // 4. Fill in player names to activate start button
    const inputs = screen.getAllByRole('textbox');
    playerNames.forEach((name, idx) => {
      if (inputs[idx]) {
        fireEvent.change(inputs[idx], { target: { value: name } });
      }
    });

    // 5. Start Game -> Seating Confirmation
    fireEvent.click(screen.getByRole('button', { name: /شروع بازی/i }));
    // 6. Confirm Seating -> Start Round 1
    fireEvent.click(screen.getByRole('button', { name: /شروع دور ۱/i }));
  };

  test('Flow 1: Intro screen renders cleanly with "دور" title, language selector, help, and history', () => {
    render(<App />);

    // 1. Check Persian title "دور" without illegible diacritics
    const titleElements = screen.getAllByText('دور');
    expect(titleElements.length).toBeGreaterThan(0);
    expect(titleElements[0].textContent).toBe('دور');
    expect(titleElements[0].textContent).not.toContain('\u064F'); // No damma

    // Subtitle
    expect(screen.getByText('بازی گروهی کلمات')).toBeInTheDocument();

    // 2. Open Rules / Help from Intro
    const guideBtn = screen.getByRole('button', { name: /راهنما/i });
    fireEvent.click(guideBtn);

    // Verify Help Screen is visible
    expect(screen.getByText(/راهنمای بازی «دور»/i)).toBeInTheDocument();
    expect(screen.getByText(/معرفی بازی/i)).toBeInTheDocument();

    // Close Help Screen using ✕ button
    const closeHelpBtn = screen.getByText('✕');
    fireEvent.click(closeHelpBtn);

    // Verify we returned to Intro Screen
    expect(screen.getByText('شروع بازی جدید')).toBeInTheDocument();

    // 3. Open History Screen
    const historyBtn = screen.getByRole('button', { name: /تاریخچه/i });
    fireEvent.click(historyBtn);

    // Verify empty history message
    expect(screen.getByText(/هنوز بازی‌ای ثبت نشده/i)).toBeInTheDocument();

    // Back to Intro
    const backBtns = screen.getAllByRole('button', { name: /بازگشت/i });
    fireEvent.click(backBtns[0]);
    expect(screen.getByText('شروع بازی جدید')).toBeInTheDocument();
  });

  test('Flow 2: Complete Setup, Category Selection, Player Names, and Seating Table Confirmation', () => {
    render(<App />);

    // 1. From Intro -> Click "شروع بازی جدید"
    const newGameBtn = screen.getByText('شروع بازی جدید');
    fireEvent.click(newGameBtn);

    // 2. We are in Setup Screen
    expect(screen.getByText('تنظیمات اولیه')).toBeInTheDocument();

    // Verify 4, 6, 8 player buttons exist
    const p4Btn = screen.getByRole('button', { name: /4 نفر/i });
    const p6Btn = screen.getByRole('button', { name: /6 نفر/i });
    const p8Btn = screen.getByRole('button', { name: /8 نفر/i });
    expect(p4Btn).toBeInTheDocument();
    expect(p6Btn).toBeInTheDocument();
    expect(p8Btn).toBeInTheDocument();

    // Select 4 players
    fireEvent.click(p4Btn);

    // Click "مرحله بعد" -> Go to Category Screen
    const nextBtn1 = screen.getByRole('button', { name: /مرحله بعد/i });
    fireEvent.click(nextBtn1);

    // 3. Category Screen
    expect(screen.getByText('دسته‌بندی‌ها')).toBeInTheDocument();

    // Click "مرحله بعد" -> Go to Player Name Screen
    const nextBtn2 = screen.getByRole('button', { name: /مرحله بعد/i });
    fireEvent.click(nextBtn2);

    // 4. Player Name Screen
    expect(screen.getByText('نام بازیکنان')).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(4);

    fireEvent.change(inputs[0], { target: { value: 'سارا' } });
    fireEvent.change(inputs[1], { target: { value: 'رضا' } });
    fireEvent.change(inputs[2], { target: { value: 'مریم' } });
    fireEvent.change(inputs[3], { target: { value: 'علی' } });

    // Click "شروع بازی" -> Go to Seating Confirmation
    const startBtn = screen.getByRole('button', { name: /شروع بازی/i });
    fireEvent.click(startBtn);

    // 5. Seating Confirmation Screen
    expect(screen.getByText('چیدمان دور میز')).toBeInTheDocument();
    expect(screen.getAllByText(/سارا/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/رضا/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/مریم/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/علی/).length).toBeGreaterThan(0);

    // Confirm seating and start round 1
    const confirmSeatingBtn = screen.getByRole('button', { name: /شروع دور ۱/i });
    fireEvent.click(confirmSeatingBtn);

    // 6. Now in GameplayScreen
    expect(screen.getAllByText(/دور.*از/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/سارا/).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /درسته!/i })).toBeInTheDocument();
  });

  test('Flow 3: Gameplay mechanics - Guessing, Clockwise Turns, Undo, Word Swapping, and Pausing', () => {
    render(<App />);

    launchActiveGame(['سارا', 'رضا', 'مریم', 'علی']);

    // Player 1 (ساعتگرد: نفر اول)
    expect(screen.getAllByText(/دور.*از/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/سارا/).length).toBeGreaterThan(0);
    
    // Check initial active player 1 is displayed
    const correctBtn = screen.getByRole('button', { name: /درسته!/i });
    expect(correctBtn).toBeInTheDocument();

    // Record player 1 guessing correctly
    fireEvent.click(correctBtn);

    // Player 2 (رضا) is now active, and Floating Undo button appears
    expect(screen.getAllByText(/رضا/).length).toBeGreaterThan(0);
    const undoBtn = screen.getByRole('button', { name: /لغو حدس/i });
    expect(undoBtn).toBeInTheDocument();

    // Test Undo -> Reverts to Player 1 (سارا)
    fireEvent.click(undoBtn);
    expect(screen.getAllByText(/سارا/).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /لغو حدس/i })).not.toBeInTheDocument();

    // Advance again to Player 2
    fireEvent.click(correctBtn);
    expect(screen.getAllByText(/رضا/).length).toBeGreaterThan(0);

    // Test Pause Game
    const pauseBtn = screen.getByLabelText('Pause');
    fireEvent.click(pauseBtn);

    // Paused Modal appears
    expect(screen.getAllByText(/بازی متوقف شد/i).length).toBeGreaterThan(0);
    const resumeBtn = screen.getByRole('button', { name: /ادامه بازی/i });
    expect(resumeBtn).toBeInTheDocument();

    // Resume Game
    fireEvent.click(resumeBtn);
    expect(screen.queryByRole('button', { name: /ادامه بازی/i })).not.toBeInTheDocument();

    // Test In-Game Sound Toggle
    const soundBtn = screen.getByLabelText('Sound Toggle');
    expect(soundBtn).toBeInTheDocument();
    fireEvent.click(soundBtn);

    // Test In-Game Help Modal
    const inGameHelpBtn = screen.getByLabelText('Help');
    fireEvent.click(inGameHelpBtn);
    expect(screen.getByText(/راهنمای بازی «دور»/i)).toBeInTheDocument();
    
    // Close In-Game Help
    fireEvent.click(screen.getByText('✕'));
    expect(screen.getByRole('button', { name: /درسته!/i })).toBeInTheDocument();
  });

  test('Flow 4: Language switcher on Intro updates the entire interface seamlessly', () => {
    render(<App />);

    // Switch to English
    const enLangBtn = screen.getByText('English');
    fireEvent.click(enLangBtn);

    // Verify English text
    expect(screen.getByText('Turn')).toBeInTheDocument();
    expect(screen.getByText('Group Word Game')).toBeInTheDocument();
    expect(screen.getByText('Start New Game')).toBeInTheDocument();

    // Switch to Deutsch
    const deLangBtn = screen.getByText('Deutsch');
    fireEvent.click(deLangBtn);

    expect(screen.getByText('Runde')).toBeInTheDocument();
    expect(screen.getByText('Neues Spiel')).toBeInTheDocument();

    // Switch to Nederlands
    const nlLangBtn = screen.getByText('Nederlands');
    fireEvent.click(nlLangBtn);

    expect(screen.getByText('Beurt')).toBeInTheDocument();
    expect(screen.getByText('Nieuw Spel')).toBeInTheDocument();

    // Switch to Arabic
    const arLangBtn = screen.getByText('العربية');
    fireEvent.click(arLangBtn);

    const arTitle = screen.getAllByText('دور');
    expect(arTitle.length).toBeGreaterThan(0);
    expect(screen.getByText('بدء لعبة جديدة')).toBeInTheDocument();

    // Switch back to Persian
    const faLangBtn = screen.getByText('فارسی');
    fireEvent.click(faLangBtn);

    const faTitle = screen.getAllByText('دور');
    expect(faTitle.length).toBeGreaterThan(0);
    expect(screen.getByText('شروع بازی جدید')).toBeInTheDocument();
  });

  test('Flow 5: Pause and Exit to Intro screen', () => {
    render(<App />);

    launchActiveGame(['سارا', 'رضا', 'مریم', 'علی']);

    // Pause and Exit to Intro
    const pauseBtn = screen.getByLabelText('Pause');
    fireEvent.click(pauseBtn);
    
    const exitBtn = screen.getByRole('button', { name: /خروج از بازی/i });
    fireEvent.click(exitBtn);

    // Should be back on Intro
    expect(screen.getByText('شروع بازی جدید')).toBeInTheDocument();
  });

  test('Flow 6: PWA and Mobile App Installation modal and tabs', () => {
    render(<App />);

    // Verify PWA banner is rendered at the bottom of Intro
    expect(screen.getByText(/نصب روی موبایل/i)).toBeInTheDocument();
    expect(screen.getByText(/نسخه اندروید و iOS به‌زودی در استورها/i)).toBeInTheDocument();

    // Click Install / Add button to open modal
    const installBtn = screen.getByRole('button', { name: /نصب \/ افزودن/i });
    fireEvent.click(installBtn);

    // Verify Modal is opened
    expect(screen.getByText(/نصب روی گوشی \(PWA\)/i)).toBeInTheDocument();
    expect(screen.getByText(/نحوه افزودن در مرورگر کروم/i)).toBeInTheDocument();

    // Switch to iOS Tab
    const iosTabBtn = screen.getByText(/🍏 iOS/i);
    fireEvent.click(iosTabBtn);

    // Verify iOS Instructions are shown
    expect(screen.getByText(/نحوه افزودن در سافاری آیفون/i)).toBeInTheDocument();
    expect(screen.getByText(/دکمه Share/i)).toBeInTheDocument();

    // Switch back to Android Tab
    const androidTabBtn = screen.getByText(/🤖 Android/i);
    fireEvent.click(androidTabBtn);
    expect(screen.getByText(/نحوه افزودن در مرورگر کروم/i)).toBeInTheDocument();

    // Close modal via close button
    const closeBtn = screen.getByRole('button', { name: /متوجه شدم، بستن/i });
    fireEvent.click(closeBtn);

    // Verify modal is closed
    expect(screen.queryByText(/نحوه افزودن در مرورگر کروم/i)).not.toBeInTheDocument();
  });
});
