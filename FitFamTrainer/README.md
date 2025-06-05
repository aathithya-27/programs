# FitFam Trainer 💪

A comprehensive family fitness and nutrition app built with React Native and Expo. Connect with your family members and achieve your fitness goals together!

## 🚀 Features

### 📱 Core Features
- **Phone Number Authentication**: Secure OTP-based login system
- **Family Groups**: Connect with family members via invite codes
- **Workout Programs**: Categorized by fitness goals (Weight Loss, Weight Gain, Bulking, Abs Cutting, Maintenance)
- **Nutrition Planning**: Personalized meal plans with macro tracking
- **Progress Tracking**: Weight, body measurements, and photo progress
- **Smart Watch Integration**: Sync with Apple Watch and Wear OS devices
- **Achievement System**: Unlock badges and milestones
- **Family Activity Feed**: See and encourage family members' progress

### 🏋️ Workout Features
- **5 Fitness Categories**: Weight Loss, Weight Gain, Bulking, Abs Cutting, Maintenance
- **3 Difficulty Levels**: Beginner, Intermediate, Advanced
- **12-Week Programs**: Structured workout plans
- **3D Exercise Animations**: Interactive exercise demonstrations
- **Workout Tracking**: Sets, reps, rest times, and completion tracking
- **Exercise Library**: Comprehensive database with instructions

### 🍎 Nutrition Features
- **Personalized Meal Plans**: Based on fitness goals and level
- **Macro Tracking**: Protein, carbs, fat monitoring
- **Calorie Counting**: Daily calorie intake tracking
- **Water Intake Tracker**: Hydration monitoring
- **Grocery List Generator**: Auto-generated shopping lists
- **Meal Logging**: Track consumed meals and portions

### 📊 Progress Features
- **Weight Tracking**: Monitor weight changes over time
- **Body Measurements**: Track chest, waist, hips, etc.
- **Progress Photos**: Before/after photo comparisons
- **Charts & Analytics**: Visual progress representation
- **Achievement Badges**: Milestone celebrations

### 👨‍👩‍👧‍👦 Family Features
- **Family Groups**: Create or join family fitness groups
- **Activity Feed**: See family members' workouts and progress
- **Encouragement System**: Like and support family activities
- **Shared Goals**: Work towards common fitness objectives

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation v6
- **State Management**: Zustand with persistence
- **Backend**: Firebase (Auth, Firestore, Storage)
- **UI Components**: Custom components with Expo Vector Icons
- **Charts**: React Native Chart Kit
- **Animations**: React Native Reanimated
- **Styling**: React Native StyleSheet with Linear Gradients

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FitFamTrainer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a new Firebase project
   - Enable Authentication (Phone)
   - Enable Firestore Database
   - Enable Storage
   - Update `src/services/firebase.ts` with your config

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🏗️ Project Structure

```
FitFamTrainer/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (Button, Card, Input, etc.)
│   │   ├── workout/        # Workout-specific components
│   │   ├── nutrition/      # Nutrition-specific components
│   │   └── progress/       # Progress-specific components
│   ├── screens/            # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── home/          # Home dashboard
│   │   ├── workout/       # Workout screens
│   │   ├── nutrition/     # Nutrition screens
│   │   ├── progress/      # Progress tracking screens
│   │   └── profile/       # Profile and settings screens
│   ├── navigation/         # Navigation configuration
│   ├── services/          # API and Firebase services
│   ├── store/             # Zustand state management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── data/              # Static data (workouts, meals)
├── assets/                # Images, fonts, and other assets
└── App.tsx               # Main app component
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com
2. Enable the following services:
   - Authentication (Phone provider)
   - Firestore Database
   - Storage
3. Download the configuration file and update `src/services/firebase.ts`

### Environment Variables
Create a `.env` file in the root directory:
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

## 📱 App Screens

### Authentication Flow
- **Login Screen**: Phone number input with OTP
- **OTP Verification**: 6-digit code verification
- **Profile Creation**: User information setup
- **Family Setup**: Create or join family groups

### Main App
- **Home Dashboard**: Overview of daily activities
- **Workouts**: Browse and start workout programs
- **Nutrition**: Meal planning and tracking
- **Progress**: Charts, measurements, and achievements
- **Profile**: Settings and account management

## 🎨 Design System

### Colors
- **Primary**: #007AFF (iOS Blue)
- **Secondary**: #34C759 (Green)
- **Accent**: #FF6B35 (Orange)
- **Error**: #FF3B30 (Red)
- **Background**: #F8F9FA (Light Gray)

### Typography
- **Headers**: Bold, 24-32px
- **Body**: Regular, 14-16px
- **Captions**: Regular, 12-14px

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Gradient backgrounds, rounded
- **Inputs**: Clean borders, focus states

## 🚀 Deployment

### iOS App Store
1. Build the app for production
2. Configure app signing
3. Submit to App Store Connect

### Google Play Store
1. Generate signed APK
2. Upload to Google Play Console
3. Complete store listing

### Expo Application Services (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## 📈 Performance Optimization

- **Image Optimization**: Use WebP format for images
- **Bundle Splitting**: Lazy load screens and components
- **State Management**: Efficient Zustand stores
- **Caching**: AsyncStorage for offline data
- **Memory Management**: Proper cleanup of listeners

## 🔒 Security

- **Authentication**: Firebase Auth with phone verification
- **Data Validation**: Input sanitization and validation
- **Secure Storage**: Encrypted local storage
- **API Security**: Firebase security rules
- **Privacy**: GDPR compliant data handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@fitfamtrainer.com
- Documentation: [Link to docs]

## 🎯 Roadmap

### Version 1.1
- [ ] AI-powered workout recommendations
- [ ] Social features and challenges
- [ ] Integration with more fitness devices
- [ ] Advanced analytics and insights

### Version 1.2
- [ ] Nutrition barcode scanning
- [ ] Custom workout builder
- [ ] Video workout sessions
- [ ] Premium subscription features

## 🙏 Acknowledgments

- React Native community
- Expo team
- Firebase team
- All contributors and testers

---

**FitFam Trainer** - Bringing families together through fitness! 💪👨‍👩‍👧‍👦