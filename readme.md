# Weather App 📱

Welcome to the Weather App! - a React Native Weather App built entirely with JavaScript. This React Native application provides weather forecasts and current weather information. Built with Expo, NativeWind, and automated using GitHub Actions, this app ensures a smooth and modern user experience 🚀.

## Features
- 📍 Blended Expo Location for precise weather data of you location. <br>
-  Access to up-to-date weather forecasts, including temperature, humidity, wind speed, and more. <br>
- 🔍 View the weather forecast for the next few days. <br>
- 🌈 Designed with NativeWind for a clean and responsive interface. <br>
- 💻 Continuous integration and deployment using GitHub Actions. <br>

## Changelog
### V1.5
- Revamped UI like glassmorphism

### V2
- Added sidebar
- City search functionality added
- City search history added
- More bug fixed

## Screenshots
<img src="/Screenshots/Screenshot-3.jpg" width="50%" />
<img src="/Screenshots/Screenshot-4.jpg" width="50%" />

## Setup and Run locally
To set up and run the Weather App locally, follow these steps:

### Prerequisites
- Node.js (recommended version 20.x)
- Expo CLI (install using `npm install -g expo-cli`)
- ADB drivers
- USB debugging turned on on your phone's developer options
- Git (for cloning the repository)

### Clone the Repository
```
git clone https://github.com/Shubhendu-Maharana/Weather.git
cd weather
```

### Install dependencies
```
npm i
```

### Setup API KEY
Write you API KEY genereated from [here](https://www.weatherapi.com/) into ".env" file
or
Run this command:
```
echo "EXPO_PUBLIC_API_KEY=YOUR_API_KEY" > .env
```
Replace "YOUR_API_KEY" with your KEY.

### Setup your phone
- Make sure USB debugging is turned on.
- Connect your phone to laptop/PC using data cable
- Now run this command:
```
adb devices
```
Now copy your device name. Then run this:
```
adb -s <device_name> reverse tcp:8081 tcp:8081
```

### Run
- Now run this command:
```
npx expo start --android
```

### Enjoy :)

## Installation (Only for Android devices right now)
To get started with the Weather App, follow these steps:
- Download latest release from Release section of this repo
- Install as normal apk file

## Feedback
Download the app 📱 now on from the Release section and let me know what you think. I truly value your feedback and support—it makes a huge difference to me. Thank you for taking the time to check out my Weather App project!

## 👋 Developer
- [Shubhendu Maharana](https://github.com/Shubhendu-Maharana)

## Contact
For any questions or feedback, please contact maharanasubhendu3@gmail.com
