import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Web Audio API
class AudioContextMock {
  state = 'running';
  resume() {
    return Promise.resolve();
  }
  suspend() {
    return Promise.resolve();
  }
  createOscillator() {
    return {
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      frequency: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), value: 440 },
      type: 'sine',
    };
  }
  createGain() {
    return {
      connect: vi.fn(),
      gain: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), value: 1 },
    };
  }
  get destination() {
    return {};
  }
  get currentTime() {
    return 0;
  }
  close() {
    return Promise.resolve();
  }
}

// @ts-ignore
window.AudioContext = AudioContextMock;
// @ts-ignore
window.webkitAudioContext = AudioContextMock;

// Mock Navigator vibrate
if (typeof navigator !== 'undefined') {
  // @ts-ignore
  navigator.vibrate = vi.fn();
}

// Mock scrollIntoView
if (typeof window !== 'undefined' && window.HTMLElement) {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

// Mock matchMedia
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function (query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as any;
  };
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock Firebase Auth & Firestore SDKs
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => [{}]),
  getApp: vi.fn(() => ({})),
}));

class MockGoogleAuthProvider {
  setCustomParameters = vi.fn();
}

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn((cb) => {
      cb(null);
      return vi.fn();
    }),
  })),
  GoogleAuthProvider: MockGoogleAuthProvider,
  signInWithPopup: vi.fn().mockResolvedValue({ user: null }),
  signOut: vi.fn().mockResolvedValue(undefined),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null);
    return vi.fn();
  }),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn(),
  setDoc: vi.fn().mockResolvedValue(undefined),
  getDoc: vi.fn().mockResolvedValue({ exists: () => false, data: () => ({}) }),
  collection: vi.fn(),
  getDocs: vi.fn().mockResolvedValue([]),
  query: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  serverTimestamp: vi.fn(),
}));
