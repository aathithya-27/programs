import { initializeApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "fitfam-trainer.firebaseapp.com",
  projectId: "fitfam-trainer",
  storageBucket: "fitfam-trainer.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase - temporarily disabled for testing
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// Mock exports for testing
export const auth = null as any;
export const db = null as any;
export const storage = null as any;

// Auth Service
export class AuthService {
  static async sendOTP(phoneNumber: string): Promise<string> {
    try {
      // In a real app, you would use Firebase Auth's phone authentication
      // For demo purposes, we'll simulate OTP sending
      const verificationId = `verification_${Date.now()}`;
      await AsyncStorage.setItem(`otp_${phoneNumber}`, '123456'); // Demo OTP
      return verificationId;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  }

  static async verifyOTP(phoneNumber: string, otp: string, verificationId: string): Promise<boolean> {
    try {
      // In a real app, you would verify with Firebase
      const storedOTP = await AsyncStorage.getItem(`otp_${phoneNumber}`);
      return storedOTP === otp;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  }

  static async signOut(): Promise<void> {
    try {
      await auth.signOut();
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}

// User Service
export class UserService {
  static async createUser(userData: any): Promise<string> {
    try {
      const userRef = doc(collection(db, 'users'));
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return userRef.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async getUser(userId: string): Promise<any> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  static async updateUser(userId: string, userData: any): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...userData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async getUserByPhoneNumber(phoneNumber: string): Promise<any> {
    try {
      const q = query(collection(db, 'users'), where('phoneNumber', '==', phoneNumber));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user by phone:', error);
      throw error;
    }
  }
}

// Family Service
export class FamilyService {
  static async createFamilyGroup(name: string, createdBy: string): Promise<string> {
    try {
      const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const familyRef = doc(collection(db, 'familyGroups'));
      await setDoc(familyRef, {
        name,
        members: [createdBy],
        createdBy,
        inviteCode,
        createdAt: new Date()
      });
      
      // Update user with family group ID
      await UserService.updateUser(createdBy, { familyGroupId: familyRef.id });
      
      return familyRef.id;
    } catch (error) {
      console.error('Error creating family group:', error);
      throw error;
    }
  }

  static async joinFamilyGroup(inviteCode: string, userId: string): Promise<string> {
    try {
      const q = query(collection(db, 'familyGroups'), where('inviteCode', '==', inviteCode));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Invalid invite code');
      }
      
      const familyDoc = querySnapshot.docs[0];
      const familyData = familyDoc.data();
      
      if (!familyData.members.includes(userId)) {
        await updateDoc(familyDoc.ref, {
          members: [...familyData.members, userId]
        });
        
        await UserService.updateUser(userId, { familyGroupId: familyDoc.id });
      }
      
      return familyDoc.id;
    } catch (error) {
      console.error('Error joining family group:', error);
      throw error;
    }
  }

  static async getFamilyGroup(familyGroupId: string): Promise<any> {
    try {
      const familyDoc = await getDoc(doc(db, 'familyGroups', familyGroupId));
      if (familyDoc.exists()) {
        return { id: familyDoc.id, ...familyDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting family group:', error);
      throw error;
    }
  }

  static async getFamilyMembers(familyGroupId: string): Promise<any[]> {
    try {
      const familyGroup = await this.getFamilyGroup(familyGroupId);
      if (!familyGroup) return [];
      
      const members = [];
      for (const memberId of familyGroup.members) {
        const member = await UserService.getUser(memberId);
        if (member) members.push(member);
      }
      
      return members;
    } catch (error) {
      console.error('Error getting family members:', error);
      throw error;
    }
  }
}

// Workout Service
export class WorkoutService {
  static async getWorkoutPrograms(goal?: string, level?: string): Promise<any[]> {
    try {
      let q = query(collection(db, 'workoutPrograms'));
      
      if (goal) {
        q = query(q, where('goal', '==', goal));
      }
      if (level) {
        q = query(q, where('level', '==', level));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting workout programs:', error);
      throw error;
    }
  }

  static async getWorkoutProgram(programId: string): Promise<any> {
    try {
      const programDoc = await getDoc(doc(db, 'workoutPrograms', programId));
      if (programDoc.exists()) {
        return { id: programDoc.id, ...programDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting workout program:', error);
      throw error;
    }
  }

  static async saveWorkoutSession(sessionData: any): Promise<string> {
    try {
      const sessionRef = doc(collection(db, 'workoutSessions'));
      await setDoc(sessionRef, {
        ...sessionData,
        date: new Date()
      });
      return sessionRef.id;
    } catch (error) {
      console.error('Error saving workout session:', error);
      throw error;
    }
  }

  static async getUserWorkoutSessions(userId: string, limit?: number): Promise<any[]> {
    try {
      let q = query(collection(db, 'workoutSessions'), where('userId', '==', userId));
      
      const querySnapshot = await getDocs(q);
      let sessions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by date descending
      sessions.sort((a: any, b: any) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      if (limit) {
        sessions = sessions.slice(0, limit);
      }
      
      return sessions;
    } catch (error) {
      console.error('Error getting user workout sessions:', error);
      throw error;
    }
  }
}

// Nutrition Service
export class NutritionService {
  static async getMealPlans(goal?: string, level?: string): Promise<any[]> {
    try {
      let q = query(collection(db, 'mealPlans'));
      
      if (goal) {
        q = query(q, where('goal', '==', goal));
      }
      if (level) {
        q = query(q, where('level', '==', level));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting meal plans:', error);
      throw error;
    }
  }

  static async getMeal(mealId: string): Promise<any> {
    try {
      const mealDoc = await getDoc(doc(db, 'meals', mealId));
      if (mealDoc.exists()) {
        return { id: mealDoc.id, ...mealDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting meal:', error);
      throw error;
    }
  }

  static async saveDailyNutrition(nutritionData: any): Promise<string> {
    try {
      const nutritionRef = doc(collection(db, 'dailyNutrition'));
      await setDoc(nutritionRef, {
        ...nutritionData,
        date: new Date()
      });
      return nutritionRef.id;
    } catch (error) {
      console.error('Error saving daily nutrition:', error);
      throw error;
    }
  }

  static async getUserNutritionLog(userId: string, date: Date): Promise<any> {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      const q = query(
        collection(db, 'dailyNutrition'),
        where('userId', '==', userId),
        where('date', '>=', startOfDay),
        where('date', '<=', endOfDay)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user nutrition log:', error);
      throw error;
    }
  }
}

// Progress Service
export class ProgressService {
  static async saveProgressEntry(progressData: any): Promise<string> {
    try {
      const progressRef = doc(collection(db, 'progressEntries'));
      await setDoc(progressRef, {
        ...progressData,
        date: new Date()
      });
      return progressRef.id;
    } catch (error) {
      console.error('Error saving progress entry:', error);
      throw error;
    }
  }

  static async getUserProgressEntries(userId: string, limit?: number): Promise<any[]> {
    try {
      let q = query(collection(db, 'progressEntries'), where('userId', '==', userId));
      
      const querySnapshot = await getDocs(q);
      let entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by date descending
      entries.sort((a: any, b: any) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      
      if (limit) {
        entries = entries.slice(0, limit);
      }
      
      return entries;
    } catch (error) {
      console.error('Error getting user progress entries:', error);
      throw error;
    }
  }

  static async uploadProgressPhoto(userId: string, imageUri: string, type: string): Promise<string> {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      const fileName = `progress_photos/${userId}/${Date.now()}_${type}.jpg`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading progress photo:', error);
      throw error;
    }
  }
}

// Activity Service
export class ActivityService {
  static async createFamilyActivity(activityData: any): Promise<string> {
    try {
      const activityRef = doc(collection(db, 'familyActivities'));
      await setDoc(activityRef, {
        ...activityData,
        createdAt: new Date()
      });
      return activityRef.id;
    } catch (error) {
      console.error('Error creating family activity:', error);
      throw error;
    }
  }

  static async getFamilyActivities(familyGroupId: string, limit?: number): Promise<any[]> {
    try {
      let q = query(collection(db, 'familyActivities'), where('familyGroupId', '==', familyGroupId));
      
      const querySnapshot = await getDocs(q);
      let activities = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by date descending
      activities.sort((a: any, b: any) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      
      if (limit) {
        activities = activities.slice(0, limit);
      }
      
      return activities;
    } catch (error) {
      console.error('Error getting family activities:', error);
      throw error;
    }
  }
}