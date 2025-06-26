// Game State
let gameState = {
    clicks: 0,
    clicksPerSecond: 0,
    rebirths: 0,
    clickPower: 1,
    upgrades: {},
    lastSave: Date.now()
};

// Upgrade definitions
const upgrades = [
    {
        id: 'clicker1',
        name: '🤖 Auto Clicker I',
        description: 'A basic robot that clicks for you! +1 click per second',
        baseCost: 10,
        costMultiplier: 1.15,
        effect: { clicksPerSecond: 1 }
    },
    {
        id: 'clicker2',
        name: '⚡ Auto Clicker II',
        description: 'A faster robot with better programming! +5 clicks per second',
        baseCost: 50,
        costMultiplier: 1.15,
        effect: { clicksPerSecond: 5 }
    },
    {
        id: 'clicker3',
        name: '🚀 Auto Clicker III',
        description: 'A supercharged robot with turbo mode! +25 clicks per second',
        baseCost: 250,
        costMultiplier: 1.15,
        effect: { clicksPerSecond: 25 }
    },
    {
        id: 'clicker4',
        name: '💎 Auto Clicker IV',
        description: 'A legendary robot with ultimate power! +100 clicks per second',
        baseCost: 1000,
        costMultiplier: 1.15,
        effect: { clicksPerSecond: 100 }
    },
    {
        id: 'multiplier1',
        name: '🔥 Click Multiplier I',
        description: 'Double your clicking power! 2x click strength',
        baseCost: 25,
        costMultiplier: 1.5,
        effect: { clickPower: 2 }
    },
    {
        id: 'multiplier2',
        name: '⚡ Click Multiplier II',
        description: 'Triple your clicking power! 3x click strength',
        baseCost: 100,
        costMultiplier: 1.5,
        effect: { clickPower: 3 }
    },
    {
        id: 'multiplier3',
        name: '💎 Click Multiplier III',
        description: 'Quadruple your clicking power! 4x click strength',
        baseCost: 500,
        costMultiplier: 1.5,
        effect: { clickPower: 4 }
    }
];

// Leaderboard data (simulated)
let leaderboard = [
    { name: 'RobloxPro', rebirths: 15 },
    { name: 'ClickMaster', rebirths: 12 },
    { name: 'SpeedClicker', rebirths: 8 },
    { name: 'RebirthKing', rebirths: 6 },
    { name: 'ClickerPro', rebirths: 4 }
];

// DOM Elements
const clickButton = document.getElementById('clickButton');
const clicksDisplay = document.getElementById('clicks');
const clicksPerSecondDisplay = document.getElementById('clicksPerSecond');
const rebirthsDisplay = document.getElementById('rebirths');
const clickPowerDisplay = document.getElementById('clickPower');
const upgradesGrid = document.getElementById('upgradesGrid');
const rebirthButton = document.getElementById('rebirthButton');
const rebirthRequirement = document.getElementById('rebirthRequirement');
const leaderboardElement = document.getElementById('leaderboard');

// Initialize game
function initGame() {
    loadGame();
    renderUpgrades();
    updateDisplay();
    updateLeaderboard();
    startGameLoop();
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    clickButton.addEventListener('click', handleClick);
    rebirthButton.addEventListener('click', handleRebirth);
    
    // Auto-save every 30 seconds
    setInterval(saveGame, 30000);
}

// Click handling
function handleClick() {
    gameState.clicks += gameState.clickPower;
    clickButton.classList.add('click-effect');
    setTimeout(() => clickButton.classList.remove('click-effect'), 200);
    
    // Add floating number effect
    createFloatingNumber(gameState.clickPower);
    
    updateDisplay();
    saveGame();
}

// Create floating number effect
function createFloatingNumber(value) {
    const floatingNumber = document.createElement('div');
    floatingNumber.textContent = `+${formatNumber(value)}`;
    floatingNumber.style.cssText = `
        position: absolute;
        color: #ffd700;
        font-weight: 900;
        font-size: 1.2rem;
        text-shadow: 2px 2px 0px #000000;
        pointer-events: none;
        z-index: 1000;
        animation: float 1s ease-out forwards;
    `;
    
    // Position near click button
    const rect = clickButton.getBoundingClientRect();
    floatingNumber.style.left = rect.left + rect.width / 2 + 'px';
    floatingNumber.style.top = rect.top + rect.height / 2 + 'px';
    
    document.body.appendChild(floatingNumber);
    
    setTimeout(() => {
        document.body.removeChild(floatingNumber);
    }, 1000);
}

// Upgrade handling
function purchaseUpgrade(upgradeId) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;
    
    const owned = gameState.upgrades[upgradeId] || 0;
    const cost = calculateUpgradeCost(upgrade, owned);
    
    if (gameState.clicks >= cost) {
        gameState.clicks -= cost;
        gameState.upgrades[upgradeId] = (gameState.upgrades[upgradeId] || 0) + 1;
        
        // Apply upgrade effects
        if (upgrade.effect.clicksPerSecond) {
            gameState.clicksPerSecond += upgrade.effect.clicksPerSecond;
        }
        if (upgrade.effect.clickPower) {
            gameState.clickPower *= upgrade.effect.clickPower;
        }
        
        // Add purchase effect
        const upgradeElement = document.querySelector(`[data-upgrade-id="${upgradeId}"]`);
        if (upgradeElement) {
            upgradeElement.classList.add('bounce');
            setTimeout(() => upgradeElement.classList.remove('bounce'), 1000);
        }
        
        updateDisplay();
        renderUpgrades();
        saveGame();
    }
}

// Calculate upgrade cost
function calculateUpgradeCost(upgrade, owned) {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, owned));
}

// Render upgrades
function renderUpgrades() {
    upgradesGrid.innerHTML = '';
    
    upgrades.forEach(upgrade => {
        const owned = gameState.upgrades[upgrade.id] || 0;
        const cost = calculateUpgradeCost(upgrade, owned);
        const canAfford = gameState.clicks >= cost;
        
        const upgradeElement = document.createElement('div');
        upgradeElement.className = `upgrade-item ${canAfford ? 'affordable' : 'unaffordable'}`;
        upgradeElement.setAttribute('data-upgrade-id', upgrade.id);
        upgradeElement.onclick = () => canAfford && purchaseUpgrade(upgrade.id);
        
        upgradeElement.innerHTML = `
            <div class="upgrade-name">${upgrade.name}</div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-cost">💰 Cost: ${formatNumber(cost)} clicks</div>
            <div class="upgrade-owned">📦 Owned: ${owned}</div>
        `;
        
        upgradesGrid.appendChild(upgradeElement);
    });
}

// Rebirth handling
function handleRebirth() {
    const rebirthRequirementValue = 1000 * Math.pow(1.5, gameState.rebirths);
    
    if (gameState.clicks >= rebirthRequirementValue) {
        const rebirthBonus = Math.floor(gameState.rebirths / 10) + 1;
        gameState.rebirths++;
        gameState.clicks = 0;
        gameState.clicksPerSecond = 0;
        gameState.clickPower = rebirthBonus;
        gameState.upgrades = {};
        
        // Update leaderboard
        updateLeaderboard();
        
        updateDisplay();
        renderUpgrades();
        saveGame();
        
        // Show rebirth effect
        rebirthButton.classList.add('glow');
        setTimeout(() => rebirthButton.classList.remove('glow'), 2000);
        
        // Add rebirth celebration effect
        createRebirthEffect();
    }
}

// Create rebirth celebration effect
function createRebirthEffect() {
    const celebration = document.createElement('div');
    celebration.innerHTML = '🌟 REBIRTH! 🌟';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: 900;
        color: #ffd700;
        text-shadow: 3px 3px 0px #000000;
        z-index: 1000;
        animation: bounce 2s ease-in-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        document.body.removeChild(celebration);
    }, 2000);
}

// Update display
function updateDisplay() {
    clicksDisplay.textContent = formatNumber(gameState.clicks);
    clicksPerSecondDisplay.textContent = formatNumber(gameState.clicksPerSecond);
    rebirthsDisplay.textContent = gameState.rebirths;
    clickPowerDisplay.textContent = formatNumber(gameState.clickPower);
    
    // Update rebirth button
    const rebirthRequirementValue = 1000 * Math.pow(1.5, gameState.rebirths);
    rebirthRequirement.textContent = formatNumber(rebirthRequirementValue);
    
    const canRebirth = gameState.clicks >= rebirthRequirementValue;
    rebirthButton.disabled = !canRebirth;
    rebirthButton.textContent = `🔄 Rebirth (${Math.floor(gameState.rebirths / 10) + 1}x)`;
    
    if (canRebirth) {
        rebirthButton.classList.add('glow');
    } else {
        rebirthButton.classList.remove('glow');
    }
}

// Update leaderboard
function updateLeaderboard() {
    // Add current player to leaderboard
    const currentPlayer = { name: 'You', rebirths: gameState.rebirths };
    let updatedLeaderboard = [...leaderboard, currentPlayer];
    
    // Sort by rebirths (descending)
    updatedLeaderboard.sort((a, b) => b.rebirths - a.rebirths);
    
    // Keep only top 10
    updatedLeaderboard = updatedLeaderboard.slice(0, 10);
    
    // Render leaderboard
    leaderboardElement.innerHTML = '';
    updatedLeaderboard.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = `leaderboard-item ${player.name === 'You' ? 'current-user' : ''}`;
        
        item.innerHTML = `
            <div class="leaderboard-rank">#${index + 1}</div>
            <div class="leaderboard-name">${player.name}</div>
            <div class="leaderboard-rebirths">🔄 ${player.rebirths} rebirths</div>
        `;
        
        leaderboardElement.appendChild(item);
    });
}

// Game loop
function startGameLoop() {
    setInterval(() => {
        gameState.clicks += gameState.clicksPerSecond;
        updateDisplay();
    }, 1000);
}

// Format numbers
function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return Math.floor(num).toString();
}

// Save/Load game
function saveGame() {
    gameState.lastSave = Date.now();
    localStorage.setItem('clickerGame', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('clickerGame');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            gameState = { ...gameState, ...loaded };
        } catch (e) {
            console.log('Failed to load saved game');
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Save before page unload
window.addEventListener('beforeunload', saveGame); 