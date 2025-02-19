const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


function updateSummary() {
    let income = 0, expense = 0, balance = 0;

    transactions.forEach(t => {
        if (t.type === "income") {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    balance = income - expense;

    balanceEl.innerText = balance.toFixed(2);
    incomeEl.innerText = "₹" + income.toFixed(2);
    expenseEl.innerText = "₹" + expense.toFixed(2);
}


function renderTransactions() {
    transactionList.innerHTML = "";
    transactions.forEach((t, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span style="color: ${t.type === "income" ? "green" : "red"}">
                            ${t.description}: ₹${t.amount}
                        </span> 
                        <span onclick="deleteTransaction(₹{index})" style="cursor:pointer; color:grey;">❌</span>`;
        
        transactionList.appendChild(li);
    });
}


function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveAndRender();
}


function saveAndRender() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateSummary();
    renderTransactions();
}


transactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    
    transactions.push({ description, amount, type });
    saveAndRender();

    
    descriptionInput.value = "";
    amountInput.value = "";
});


saveAndRender();
