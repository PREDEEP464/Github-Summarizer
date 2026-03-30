# GitHub Profile Summary

A beautiful, interactive web application that provides comprehensive analytics and visualizations of GitHub user profiles. Search for any GitHub user and get detailed insights about their repositories, contributions, followers, and more with elegant charts and statistics.

![GitHub Profile Summary](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)
![Chart.js](https://img.shields.io/badge/Chart.js-4-orange?style=flat-square&logo=chart.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blue?style=flat-square&logo=tailwindcss)

## 📸 Screenshots

### Landing Page
Search for any GitHub user with a beautiful, intuitive interface
![Landing Page](./assets/landing.png)

### Profile Page
View detailed user information, stats, and commit history
![Profile Page](./assets/profile.png)

### Analytics Dashboard
Explore comprehensive charts and statistics
![Stats Page](./assets/stats.png)

## ✨ Features

- **User Profile Search** - Search any GitHub user by username
- **Profile Statistics** - View repositories, followers, and following counts
- **Interactive Charts**
  - Doughnut chart for language distribution
  - Bar chart for top repositories by stars
  - Line chart for quarterly commit history
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between dark and light modes with persistent storage
- **User Information** - Display location, company, email, and bio
- **Member Timeline** - Shows how long a user has been on GitHub
- **Share Functionality** - Copy profile link or share on social media
- **Portfolio Link** - Quick access to user's website/portfolio
- **Error Handling** - Beautiful error messages for invalid usernames

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Charts**: Chart.js 4 with React wrapper
- **Routing**: React Router v6
- **API**: GitHub REST API v3
- **Theme Management**: Context API with localStorage
- **Development**: ESLint, Vite Hot Module Replacement (HMR)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- GitHub account (for API access)

## 📁 Project Structure

```
src/
├── components/
│   ├── UserProfile.jsx          # Main user profile card with stats
│   ├── DonutChart.jsx           # Language distribution chart
│   ├── BarChart.jsx             # Top repositories chart
│   ├── CommitChart.jsx          # Quarterly commits chart
│   ├── SearchBar.jsx            # GitHub user search input
│   ├── ShareButtons.jsx         # Share and copy link buttons
│   └── ThemeToggle.jsx          # Dark/light mode toggle
├── services/
│   └── profileSummaryApi.js    # GitHub API integration
├── App.jsx                      # Main app routing
├── ProfilePage.jsx              # Profile details page
├── LandingPage.jsx              # Home/search page
├── ThemeContext.jsx             # Theme management
└── main.jsx                     # App entry point
```

## 🌐 API Integration

This application uses the **GitHub REST API** (v3) to fetch user data. The API calls are made through the `profileSummaryApi.js` service.

**API Rate Limiting**: GitHub allows 60 requests per hour for unauthenticated requests. For higher limits, consider adding authentication.

### Data Fetched

- User profile information (name, bio, avatar, location, company)
- Repository statistics and data
- Commit history
- Follower/following counts
- User join date

## 🎨 Theme Support

The application supports both light and dark modes with automatic detection based on system preferences. Theme preference is saved to localStorage for persistence.

- Toggle theme using the theme button in the top navigation
- Automatic dark mode detection on first visit
- All components are theme-compatible

## 📊 Chart Features

- **Language Distribution (Donut Chart)** - Shows programming languages used across repositories
- **Top Repositories by Stars (Bar Chart)** - Horizontal bar chart of most starred repositories
- **Quarterly Commits (Line Chart)** - Trends in commit activity over time

All charts are fully responsive and dynamically themed based on light/dark mode selection.

## 🎯 Usage

1. **On landing page**: Enter a GitHub username in the search bar
2. **Press Enter or click Search**: Fetch the user's profile data
3. **View Analytics**: Explore various charts and statistics
4. **Share Profile**: Use the copy link or social share buttons
5. **Toggle Theme**: Click the theme toggle in the top right
6. **Search Another**: Click "Search Another Profile" to search for a different user

## 🐛 Error Handling

The app gracefully handles:
- Invalid GitHub usernames
- API rate limiting
- Network errors
- Loading states with spinner

Shows user-friendly error messages with option to retry.

## 🔄 Loading States

- Animated spinner while fetching profile data
- Smooth transitions between states
- Prevents duplicate requests during loading

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components adapt beautifully to different screen sizes.

## 🌟 Key Components

### UserProfile
Main component displaying user information, stats, and membership details with action buttons.

### Charts
Interactive data visualizations built with Chart.js:
- Real-time theme adaptation
- Responsive sizing
- Hover interactions

### SearchBar
Simple input component for GitHub username search with validation.

### ThemeContext
Manages global light/dark theme state using React Context API with localStorage persistence.

## 🔐 Privacy

- No user data is stored on our servers
- All API calls go directly to GitHub
- GitHub API requests are public (no authentication required)
- User preferences (theme) are only stored locally in browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙋 Support

If you encounter any issues or have questions, please open an issue on GitHub or reach out to the maintainers.

## 📚 Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs)

---

Made with ❤️ by Predeep