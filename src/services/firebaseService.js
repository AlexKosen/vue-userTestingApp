import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';


class FirebaseService {
  constructor() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
      projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_ID,
      appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
    };

    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth(this.firebaseApp);
    this.database = getDatabase(this.firebaseApp);
  }

  getCurrentUser() {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (authUser) => {
        resolve(authUser);
      });
    });
  }

  async getCompletedTests(userId) {
    const snapshot = await get(ref(this.database, `/users/${userId}/completedTests`));
    return snapshot.val();
  }

  updateCompletedTests(userId, completedTests) {
    set(ref(this.database, `/users/${userId}/completedTests`), completedTests);
  }
}

export default new FirebaseService();
