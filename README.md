# TMDBMovieApp

A React Native mobile application for browsing and searching movies using The Movie Database (TMDB) API. Built with Expo and React Native.

## Features

- Browse popular movies
- Search for movies by title
- View movie details
- Pagination for continuous scrolling
- Pull-to-refresh functionality
- Offline support with data persistence
- Modern and responsive UI

## Tech Stack

- React Native (v0.76.7)
- Expo (v52.0.37)
- Redux Toolkit for state management
- Redux Persist for offline data caching
- Axios for API requests
- React Navigation for app navigation
- Expo Router for file-based routing
- Async Storage for local data persistence
- TypeScript for type safety

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional for local development)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/supunishara/TMDBMovieApp.git
   cd TMDBMovieApp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your TMDB API key:
   ```
   TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Run on a specific platform:
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## Project Structure

```
TMDBMovieApp/
├── app/                  # Expo Router navigation and screens
├── assets/               # Images, fonts, and other static files
├── components/           # Reusable UI components
├── constants/            # App constants and theme settings
├── redux/                # Redux store, slices, and selectors
├── services/             # API and other services
├── types/                # TypeScript type definitions
├── .env                  # Environment variables (not in repo)
├── App.js                # Root component
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android emulator/device
- `npm run ios` - Start the app on iOS simulator/device
- `npm run web` - Start the app in a web browser
- `npm test` - Run tests with Jest

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Expo](https://expo.dev/) for the amazing React Native toolchain
- [React Native](https://reactnative.dev/) community for the extensive libraries and support
