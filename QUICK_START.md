# Quick Start Guide - OSVARA Mobile

## 🚀 Installation & Setup

### 1. Prerequisites Installed ✅

- Java JDK 17 (Zulu) - Installed
- Android SDK - Installed
- Android Emulator (Pixel 6 API 35) - Ready
- Node.js & npm - Ready

### 2. Install Dependencies (Already Done)

```bash
cd /Users/idhanzarkasyah/Osvara-2.0-Mobile
npm install
```

### 3. Current Project Status

- ✅ All source files created
- ✅ Navigation set up
- ✅ Components built
- ✅ State management ready
- ✅ Build successful
- ✅ App deployed to emulator

## 📱 Running the App

### Option 1: Run Android

```bash
cd /Users/idhanzarkasyah/Osvara-2.0-Mobile
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export ANDROID_HOME=/opt/homebrew/share/android-commandlinetools
npx react-native run-android
```

### Option 2: Start Dev Server Only

```bash
npm start
```

Then in another terminal:

```bash
npx react-native run-android
```

### Option 3: Run on iOS (requires Xcode)

```bash
npx react-native run-ios
```

## 📱 Emulator Commands

### Start Emulator

```bash
emulator -avd Pixel_6_API_35 -no-audio &
```

### List Available Emulators

```bash
emulator -list-avds
```

### Stop Emulator

```bash
pkill -f emulator
```

## 🎯 What's Ready

### Home Screen

- Browse products by category
- View product details
- Add to cart
- See cart badge in header

### Cart Screen

- View all items
- Update quantities
- Remove items
- See total price
- Proceed to checkout

### Checkout

- Enter shipping details
- Confirm order
- See order confirmation

### Profile Screen

- User account info
- Access to orders, favorites, settings
- Contact support
- Logout option

### About Screen

- Company information
- Why choose OSVARA
- Contact details
- Social media links

## 🔧 Development

### Hot Reload

```bash
# Press 'r' in terminal to reload app
# Press 'd' to open dev menu
```

### Debug Mode

```bash
# Shake device (or Cmd+M on emulator)
# Select "Debug" from menu
```

### View Logs

```bash
adb logcat
```

## 📝 File Locations

```
/Users/idhanzarkasyah/Osvara-2.0-Mobile/
├── App.tsx                          # Main app with navigation
├── src/
│   ├── screens/                    # Screen components
│   ├── components/                 # Reusable components
│   ├── store/                      # State management
│   ├── types/                      # TypeScript types
│   └── utils/                      # Constants & helpers
├── android/                        # Android native code
├── ios/                            # iOS native code
└── package.json                    # Dependencies
```

## 🎨 Customization Quick Tips

### Add New Product

Edit `src/utils/constants.ts`:

```typescript
export const PRODUCTS = [
  {
    id: '5',
    name: 'New Product',
    price: 600000,
    image: 'https://...',
    category: 'Category',
    rating: 4.5,
  },
  // ...
];
```

### Change Theme Color

Edit color in `src/utils/constants.ts`:

```typescript
export const COLORS = {
  gold: '#FFD700', // Change this
  // ...
};
```

### Add New Screen

1. Create `src/screens/NewScreen.tsx`
2. Add to navigation in `App.tsx`
3. Import and configure

## 🐛 Troubleshooting

### Port 8081 Already in Use

```bash
lsof -ti:8081 | xargs kill -9
npm start
```

### Emulator Won't Start

```bash
# Kill all emulator processes
pkill -9 -f emulator
pkill -9 -f qemu

# Start fresh
rm -rf ~/.android/avd/Pixel_6_API_35.avd
emulator -list-avds
emulator -avd Pixel_6_API_35
```

### Build Fails

```bash
# Clean build
./gradlew clean
npx react-native run-android
```

## 📊 Project Statistics

- **Total Screens**: 6
- **Components**: 2 main
- **Lines of Code**: ~800
- **Build Time**: ~5 minutes
- **App Size**: ~50MB

## 🎓 Learning Resources

- React Native: https://reactnative.dev/
- React Navigation: https://reactnavigation.org/
- Zustand State: https://github.com/pmndrs/zustand
- TypeScript: https://www.typescriptlang.org/

## ✨ Next Phase Ideas

1. **Connect to API** - Replace mock data
2. **User Auth** - Login/signup screens
3. **Payment** - Integrate Stripe/payment gateway
4. **Notifications** - Push notifications
5. **Search** - Product search functionality
6. **Reviews** - Customer reviews & ratings
7. **Wishlist** - Save favorite products
8. **Orders** - Order tracking & history

## 🎉 You're All Set!

Your OSVARA mobile app is ready to run. The app has been successfully:

- ✅ Created from web design
- ✅ Built with React Native
- ✅ Styled with professional UI
- ✅ Configured with navigation
- ✅ Set up with state management
- ✅ Deployed to emulator

**Start the app and enjoy!** 🚀
