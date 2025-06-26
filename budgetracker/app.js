// E-wallets state
let wallets = [];
// Expenses state
let expenses = [];

// DOM elements
const walletForm = document.getElementById('wallet-form');
const walletNameInput = document.getElementById('wallet-name');
const walletAmountInput = document.getElementById('wallet-amount');
const walletsList = document.getElementById('wallets-list');
const totalMoneyDiv = document.getElementById('total-money');

const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseFrequencyInput = document.getElementById('expense-frequency');
const monthlyExpensesList = document.getElementById('monthly-expenses');
const threeMonthsExpensesList = document.getElementById('3months-expenses');
const yearlyExpensesList = document.getElementById('yearly-expenses');
const summaryDiv = document.getElementById('summary');

// Add wallet
walletForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = walletNameInput.value.trim();
    const amount = parseFloat(walletAmountInput.value);
    if (!name || isNaN(amount) || amount < 0) return;
    wallets.push({ name, amount });
    walletNameInput.value = '';
    walletAmountInput.value = '';
    renderWallets();
    renderSummary();
});

// Render wallets
function renderWallets() {
    walletsList.innerHTML = '';
    wallets.forEach((wallet, idx) => {
        const li = document.createElement('li');
        li.textContent = `${wallet.name}: $${wallet.amount.toLocaleString()}`;
        // Optionally, add a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.onclick = () => {
            wallets.splice(idx, 1);
            renderWallets();
            renderSummary();
        };
        li.appendChild(removeBtn);
        walletsList.appendChild(li);
    });
    const total = wallets.reduce((sum, w) => sum + w.amount, 0);
    totalMoneyDiv.textContent = `Total Money: $${total.toLocaleString()}`;
}

// Add expense
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    if (!name || isNaN(amount) || amount < 0) return;
    expenses.push({ name, amount });
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    renderExpenses();
    renderSummary();
});

// Render expenses
function renderExpenses() {
    monthlyExpensesList.innerHTML = '';
    expenses.forEach((exp, idx) => {
        const li = document.createElement('li');
        li.textContent = `${exp.name}: $${exp.amount.toLocaleString()}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.onclick = () => {
            expenses.splice(idx, 1);
            renderExpenses();
            renderSummary();
        };
        li.appendChild(removeBtn);
        monthlyExpensesList.appendChild(li);
    });
}

// Render summary
function renderSummary() {
    const totalMoney = wallets.reduce((sum, w) => sum + w.amount, 0);
    const totalMonthly = expenses.reduce((sum, e) => sum + e.amount, 0);
    const remaining = totalMoney - totalMonthly;
    const percentSpent = totalMoney > 0 ? ((totalMonthly / totalMoney) * 100).toFixed(2) : '0.00';
    summaryDiv.innerHTML = `
        <div>Total Money in Wallets: $${totalMoney.toLocaleString()}</div>
        <div>Total Monthly Expenses: $${totalMonthly.toLocaleString()}</div>
        <div>Remaining after Expenses: $${remaining.toLocaleString()}</div>
        <div>Percentage of Money Spent on Expenses: ${percentSpent}%</div>
    `;
}

// Initial render
renderWallets();
renderExpenses();
renderSummary(); 