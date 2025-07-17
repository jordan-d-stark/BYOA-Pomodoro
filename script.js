class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.interval = null;
        this.currentMode = 'work';
        this.sessionCount = 0;
        this.totalFocusTime = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.updateProgress();
    }

    initializeElements() {
        this.timeDisplay = document.getElementById('time');
        this.timerLabel = document.getElementById('timer-label');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.progressCircle = document.getElementById('progress-circle');
        this.sessionCountDisplay = document.getElementById('session-count');
        this.totalTimeDisplay = document.getElementById('total-time');
        this.modeButtons = document.querySelectorAll('.mode-btn');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target));
        });

        // Handle visibility change to pause timer when tab is not active
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isRunning) {
                this.pause();
            }
        });
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.interval = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                this.updateProgress();
                
                if (this.timeLeft <= 0) {
                    this.complete();
                }
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.interval);
        }
    }

    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
        this.updateProgress();
    }

    switchMode(button) {
        // Remove active class from all buttons
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get mode and time from button data
        const mode = button.dataset.mode;
        const time = parseInt(button.dataset.time);
        
        this.currentMode = mode;
        this.totalTime = time * 60;
        this.timeLeft = this.totalTime;
        
        // Update timer label
        const labels = {
            'work': 'Work Time',
            'short-break': 'Short Break',
            'long-break': 'Long Break'
        };
        this.timerLabel.textContent = labels[mode];
        
        // Update progress circle color based on mode
        this.updateProgressColor();
        
        this.updateDisplay();
        this.updateProgress();
    }

    complete() {
        this.pause();
        
        // Add completion animation
        const timerDisplay = document.querySelector('.timer-display');
        timerDisplay.classList.add('timer-complete');
        setTimeout(() => {
            timerDisplay.classList.remove('timer-complete');
        }, 500);
        
        // Update session count and total focus time
        if (this.currentMode === 'work') {
            this.sessionCount++;
            this.totalFocusTime += this.totalTime;
            this.sessionCountDisplay.textContent = this.sessionCount;
            this.totalTimeDisplay.textContent = this.formatTime(this.totalFocusTime);
        }
        
        // Show notification
        this.showNotification();
        
        // Auto-switch to next mode
        this.autoSwitchMode();
    }

    autoSwitchMode() {
        if (this.currentMode === 'work') {
            // After work session, switch to short break
            const shortBreakBtn = document.querySelector('[data-mode="short-break"]');
            this.switchMode(shortBreakBtn);
        } else if (this.currentMode === 'short-break') {
            // After short break, switch back to work
            const workBtn = document.querySelector('[data-mode="work"]');
            this.switchMode(workBtn);
        } else if (this.currentMode === 'long-break') {
            // After long break, switch back to work
            const workBtn = document.querySelector('[data-mode="work"]');
            this.switchMode(workBtn);
        }
    }

    updateDisplay() {
        this.timeDisplay.textContent = this.formatTime(this.timeLeft);
    }

    updateProgress() {
        const progress = (this.totalTime - this.timeLeft) / this.totalTime;
        const circumference = 2 * Math.PI * 120; // r = 120
        const offset = circumference - (progress * circumference);
        this.progressCircle.style.strokeDashoffset = offset;
    }

    updateProgressColor() {
        const colors = {
            'work': '#e53e3e',
            'short-break': '#48bb78',
            'long-break': '#ed8936'
        };
        this.progressCircle.style.stroke = colors[this.currentMode];
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    showNotification() {
        const messages = {
            'work': 'Work session completed! Time for a break.',
            'short-break': 'Short break completed! Ready to work again?',
            'long-break': 'Long break completed! Time to get back to work.'
        };

        const message = messages[this.currentMode];
        
        // Check if browser supports notifications
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23667eea"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showNotification();
                }
            });
        }

        // Fallback: Show alert if notifications are not available
        if (!('Notification' in window) || Notification.permission === 'denied') {
            alert(message);
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});

// Request notification permission on page load
if ('Notification' in window && Notification.permission === 'default') {
    document.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
            Notification.requestPermission();
        }, 1000);
    });
} 