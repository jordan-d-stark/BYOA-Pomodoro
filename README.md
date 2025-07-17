# Pomodoro Timer

A beautiful, modern Pomodoro timer that runs in your browser. Built with vanilla HTML, CSS, and JavaScript.

## Features

- ⏱️ **25/5/15 minute intervals** - Classic Pomodoro technique with work, short break, and long break sessions
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations and responsive layout
- 📊 **Visual progress** - Circular progress indicator that shows time remaining
- 🔄 **Auto-switching** - Automatically switches between work and break modes
- 📱 **Responsive design** - Works perfectly on desktop, tablet, and mobile devices
- 🌙 **Dark mode support** - Automatically adapts to your system's color scheme
- 🔔 **Notifications** - Browser notifications when sessions complete
- 📈 **Session tracking** - Counts completed work sessions and total focus time
- ⏸️ **Smart pausing** - Automatically pauses when you switch browser tabs

## How to Use

1. **Open the timer**: Simply open `index.html` in your web browser
2. **Choose your mode**:
   - **Work** (25 minutes): For focused work sessions
   - **Short Break** (5 minutes): For quick breaks between work sessions
   - **Long Break** (15 minutes): For longer breaks after multiple work sessions
3. **Start the timer**: Click the "Start" button to begin
4. **Monitor progress**: Watch the circular progress indicator and time display
5. **Take breaks**: The timer will automatically switch to break mode after work sessions

## Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

### Basic Workflow:
1. Decide on the task to be done
2. Set the timer to 25 minutes (work session)
3. Work on the task until the timer rings
4. Take a short break (5 minutes)
5. After 4 work sessions, take a longer break (15 minutes)

## Browser Compatibility

This timer works in all modern browsers that support:
- ES6 Classes
- CSS Grid and Flexbox
- CSS Custom Properties
- Web Notifications API (optional)

## Files Structure

```
Pomodoro/
├── index.html      # Main HTML structure
├── styles.css      # Modern CSS styling
├── script.js       # Timer functionality
└── README.md       # This file
```

## Customization

You can easily customize the timer by modifying the following:

- **Timer durations**: Edit the `data-time` attributes in the HTML or the default values in the JavaScript
- **Colors**: Modify the CSS variables and gradient values
- **Notifications**: Customize the notification messages in the `showNotification()` method
- **Auto-switching behavior**: Modify the `autoSwitchMode()` method

## Getting Started

1. Download or clone this repository
2. Navigate to the `Pomodoro` folder
3. Open `index.html` in your web browser
4. Allow notifications when prompted (optional)
5. Start your first Pomodoro session!

## Tips for Effective Use

- **Find a quiet space**: Minimize distractions during work sessions
- **Use the full timer**: Don't stop early unless absolutely necessary
- **Take breaks seriously**: Use break time to step away from your work
- **Track your sessions**: Monitor your session count to build consistency
- **Adjust as needed**: Feel free to modify timer durations to suit your workflow

## License

This project is open source and available under the MIT License.

---

Happy focusing! 🍅 