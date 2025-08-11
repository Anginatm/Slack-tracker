# 🕐 Slack Time Tracker Pro

A comprehensive time tracking application that integrates with Slack to monitor team productivity and individual user activity in real-time.

## ✨ Features

### 🎯 **Individual Dashboard**
- **User Selection**: Choose specific users to view their detailed metrics
- **Date Filtering**: Filter data by specific dates or date ranges (Today, Yesterday, Last 7 Days, Last 30 Days)
- **Real-time Statistics**: Total time, active time, project count, and productivity metrics
- **Activity Timeline**: Recent activity history with timestamps
- **Data Export**: Export filtered data as CSV

### 👥 **Team Dashboard**
- **Multi-user Support**: Track multiple Slack users simultaneously
- **Real-time Status**: Monitor user presence (Active, Away, Offline)
- **Team Analytics**: Aggregate team productivity metrics
- **Project Breakdown**: Time spent on different projects
- **Presence Analysis**: Active vs away vs offline time distribution

### 🔧 **Technical Features**
- **Slack Integration**: Real-time status monitoring via Slack API
- **Web Dashboard**: Beautiful, responsive web interface
- **Data Persistence**: Individual user data files
- **Environment Variables**: Secure configuration management
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Slack Bot Token
- Slack App with appropriate permissions

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd slack-time-tracker-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and add your Slack token:
   ```
   SLACK_TOKEN=xoxb-your-actual-token-here
   SLACK_USER_ID=U06CQAKLWG4
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Start web dashboard
   node web-server.js web
   
   # Or start console mode
   node web-server.js start
   ```

5. **Access the dashboard**
   - Team Dashboard: http://localhost:3000
   - Individual Dashboard: http://localhost:3000/individual

## 📊 Dashboard Features

### Individual Dashboard (`/individual`)
- **User Selection**: Dropdown to choose specific users
- **Date Filtering**: 
  - Date picker for specific dates
  - Quick buttons for common ranges
  - Dynamic statistics updates
- **User Profile**: Avatar, name, and current status
- **Statistics Cards**: Total time, active time, projects, productivity
- **Data Breakdowns**: Project and presence analysis
- **Activity Timeline**: Recent activity with timestamps
- **Export Options**: Download filtered data as CSV

### Team Dashboard (`/`)
- **User Cards**: Individual user status and metrics
- **Team Overview**: Aggregate team statistics
- **Real-time Updates**: Live status monitoring
- **Navigation**: Easy switching between views

## 🔧 Configuration

### User Configuration
Edit `config.js` to add or modify users:
```javascript
users: [
  {
    id: 'U06CQAKLWG4',
    name: 'Satyam Vatsa',
    dataFile: 'time_logs_satyam.json'
  },
  // Add more users...
]
```

### Environment Variables
- `SLACK_TOKEN`: Your Slack Bot User OAuth Token
- `SLACK_USER_ID`: Default user ID for backward compatibility
- `NODE_ENV`: Environment (development/production)

## 📁 Project Structure

```
slack-time-tracker-pro/
├── web-server.js          # Main web server
├── multi-user-tracker.js  # Multi-user tracking logic
├── config.js             # Configuration file
├── tracker.html          # Individual dashboard
├── all-users-dashboard.html # Team dashboard
├── package.json          # Dependencies
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🔒 Security

- **No Hardcoded Tokens**: All sensitive data uses environment variables
- **Secure Configuration**: Tokens stored in `.env` file (not committed to git)
- **Data Privacy**: Individual user data files for privacy

## 🛠️ Development

### Running in Development Mode
```bash
node web-server.js web
```

### Testing Slack Connection
```bash
node web-server.js test
```

### Generating Reports
```bash
node web-server.js report 2024-01-15
```

## 📈 API Endpoints

- `GET /` - Team dashboard
- `GET /individual` - Individual dashboard
- `GET /api/user/{userId}/data` - Get user data
- `GET /api/status` - Get current status
- `POST /api/start-tracking` - Start tracking
- `POST /api/stop-tracking` - Stop tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the documentation
2. Review the configuration
3. Ensure your Slack token has proper permissions
4. Check the console for error messages

---

**Built with ❤️ for better team productivity tracking** 