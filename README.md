# YouTube Learn App 📱

A React Native mobile application built with Expo that provides a YouTube-like learning experience for educational content.

## Prerequisites

- Node.js (v16 or higher)
- iOS Simulator
- Expo CLI (`npm install -g @expo/cli`)

## Getting Started

### 1. Environment Setup

Create a `.env` file in the root directory and add your Google API key:

```bash
EXPO_PUBLIC_GOOGLE_API_KEY=your_api_key_here
```

**To get your Google API key:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

### 2. Install Dependencies

```bash
npm install
```

### 3. Run on iOS

```bash
npx expo run:ios
```

If you encounter issues with native dependencies, run:

```bash
npx expo prebuild
```

## Project Structure

```
├── app/                    # App screens and navigation
│   ├── (app)/             # Main app screens
│   │   ├── (tabs)/        # Tab navigation screens
│   │   └── user/          # User-related screens
│   └── (auth)/            # Authentication screens
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── api/                   # API client and types
├── contexts/              # React contexts
├── store/                 # State management
├── utils/                 # Utility functions
└── assets/                # Images, icons, and media files
```
