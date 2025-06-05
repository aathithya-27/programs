// Test Firebase configuration without actual Firebase
export const firebaseConfig = {
  apiKey: "test-api-key",
  authDomain: "test-project.firebaseapp.com",
  projectId: "test-project",
  storageBucket: "test-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Mock Firebase services for testing
export class MockAuthService {
  static async signInWithPhoneNumber(phoneNumber: string) {
    console.log('Mock: Sign in with phone number:', phoneNumber);
    return { confirm: async (code: string) => ({ user: { uid: 'test-user' } }) };
  }
}

export class MockUserService {
  static async createUser(userData: any) {
    console.log('Mock: Create user:', userData);
    return { id: 'test-user', ...userData };
  }
}

export class MockFamilyService {
  static async createFamily(familyData: any) {
    console.log('Mock: Create family:', familyData);
    return { id: 'test-family', ...familyData };
  }
}