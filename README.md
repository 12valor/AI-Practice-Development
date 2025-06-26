# 🕹️ Web Clicking Game

A modern, addictive clicking game built with HTML, CSS, and JavaScript featuring upgrades, rebirths, and a leaderboard system.

## 🎯 Game Features

### Core Mechanics
- **Click to Gain**: Click the main button to earn clicks
- **Auto Clickers**: Purchase upgrades to automatically generate clicks per second
- **Click Multipliers**: Increase your click power with multiplier upgrades
- **Rebirth System**: Reset your progress for permanent bonuses
- **Leaderboard**: Compete with other players (simulated)

### 🛠️ Upgrades Available

#### Auto Clickers
- **Auto Clicker I**: +1 click/second (Cost: 10 clicks)
- **Auto Clicker II**: +5 clicks/second (Cost: 50 clicks)
- **Auto Clicker III**: +25 clicks/second (Cost: 250 clicks)
- **Auto Clicker IV**: +100 clicks/second (Cost: 1000 clicks)

#### Click Multipliers
- **Click Multiplier I**: 2x click power (Cost: 25 clicks)
- **Click Multiplier II**: 3x click power (Cost: 100 clicks)
- **Click Multiplier III**: 4x click power (Cost: 500 clicks)

### 🔄 Rebirth System
- **Requirement**: 1000 × 1.5^rebirths clicks needed
- **Bonus**: Each rebirth gives permanent click power bonus
- **Reset**: Clicks, auto-clickers, and upgrades reset, but rebirths are permanent

### 🏆 Leaderboard
- Shows top 10 players by rebirth count
- Your current position is highlighted
- Updates automatically as you progress

## 🚀 How to Play

1. **Open the Game**: Simply open `index.html` in your web browser
2. **Start Clicking**: Click the main button to earn clicks
3. **Buy Upgrades**: Use your clicks to purchase auto-clickers and multipliers
4. **Rebirth**: When you have enough clicks, rebirth for permanent bonuses
5. **Compete**: Try to reach the top of the leaderboard!

## 💾 Game Features

- **Auto-Save**: Your progress is automatically saved every 30 seconds
- **Persistent Data**: Game state is stored in browser localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations

## 🎨 Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript
- **No Dependencies**: Runs entirely in the browser
- **Responsive**: Mobile-friendly design
- **Animations**: Smooth click effects and visual feedback
- **Number Formatting**: Large numbers displayed as K, M, B, T

## 📁 File Structure

```
clicker-game/
├── index.html      # Main game interface
├── styles.css      # Game styling and animations
├── script.js       # Game logic and mechanics
└── README.md       # This file
```

## 🎮 Game Strategy Tips

1. **Early Game**: Focus on Auto Clicker I to start passive income
2. **Mid Game**: Balance between auto-clickers and multipliers
3. **Late Game**: Save for rebirths to gain permanent bonuses
4. **Rebirth Timing**: Rebirth when you can't afford meaningful upgrades

## 🔧 Customization

You can easily modify the game by editing `script.js`:
- Add new upgrades in the `upgrades` array
- Adjust rebirth requirements and bonuses
- Modify upgrade costs and effects
- Add new game mechanics

## 🌟 Future Enhancements

Potential features to add:
- More upgrade tiers
- Prestige system beyond rebirths
- Achievements and milestones
- Sound effects and music
- Multiplayer leaderboard
- Different click themes

---

**Enjoy clicking! 🎯** 