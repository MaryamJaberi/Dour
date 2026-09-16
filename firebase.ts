import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';
import { GameHistoryEntry, GameSettings, Language } from './types';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with specific databaseId from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

// Sign In with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      // Sync user profile in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || 'Player',
        email: user.email || '',
        photoURL: user.photoURL || '',
        lastLoginAt: new Date().toISOString()
      }, { merge: true });
    }
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign Out
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Save Match History to Firestore
export const saveMatchToCloud = async (userId: string, match: GameHistoryEntry, settings?: GameSettings) => {
  try {
    const matchRef = doc(db, 'users', userId, 'matches', match.id);
    await setDoc(matchRef, {
      ...match,
      userId,
      difficulty: settings?.difficulty || 'easy',
      language: settings?.language || 'fa',
      roundsCount: settings?.roundsCount || 3,
      createdAt: serverTimestamp()
    });

    // Update user stats
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const currentCount = userDoc.exists() ? (userDoc.data()?.totalGamesPlayed || 0) : 0;
    await setDoc(userRef, {
      totalGamesPlayed: currentCount + 1,
      lastPlayedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving match to cloud:', error);
  }
};

// Fetch User's Cloud Match History
export const fetchUserMatchHistory = async (userId: string): Promise<GameHistoryEntry[]> => {
  try {
    const matchesCol = collection(db, 'users', userId, 'matches');
    const q = query(matchesCol, orderBy('createdAt', 'desc'), limit(30));
    const snapshot = await getDocs(q);
    const results: GameHistoryEntry[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      results.push({
        id: data.id || docSnap.id,
        date: data.date,
        winnerNames: data.winnerNames || [],
        winnerColor: data.winnerColor || 'BLUE',
        players: data.players || [],
        language: (data.language as Language) || 'fa'
      });
    });
    return results;
  } catch (error) {
    console.error('Error fetching cloud match history:', error);
    return [];
  }
};

// Sync Settings with Cloud
export const syncSettingsToCloud = async (userId: string, settings: GameSettings) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { settings }, { merge: true });
  } catch (error) {
    console.error('Error saving settings to cloud:', error);
  }
};

export const fetchSettingsFromCloud = async (userId: string): Promise<GameSettings | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists() && snapshot.data()?.settings) {
      return snapshot.data().settings as GameSettings;
    }
    return null;
  } catch (error) {
    console.error('Error fetching settings from cloud:', error);
    return null;
  }
};
