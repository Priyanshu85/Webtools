const initialPrice = document.querySelector('#initial-price');
const quantityOfStocks = document.querySelector('#stocks-quantity');
const currentPrice = document.querySelector('#current-price');
const showMeBtn = document.querySelector('.show-me-btn');
const output = document.querySelector('.output-message');

const header = document.querySelector('.heading');
const inputs = document.querySelectorAll('input[type=number]');
const headerText = document.querySelector('.header-text');

const defaultGif = document.querySelector('.default-gif');
const profitGif = document.querySelector('.profit-gif');
const lossGif = document.querySelector('.loss-gif');
const noProfitLossGif = document.querySelector('.no-profit-loss-gif');

profitGif.style.display = 'none';
lossGif.style.display = 'none';
noProfitLossGif.style.display = 'none';

showMeBtn.addEventListener('click', clickHandler);

function calculateProfitLoss(initial, quantity, current) {
    if (initial > current) {
        let loss = (initial - current) * quantity;
        let lossPercentage = (loss / (initial * quantity)) * 100;
        lossGifShow();
        outputMessage(`Whoops! Your <span>Loss</span> is <span>${loss}</span> and loss <span>Percentage</span> is <span>${lossPercentage.toFixed(2)}%</span>`);
        if (lossPercentage > 50) {
            above50LossLayout();
        } else {
            defaultLayout();
        }
    } else if (current > initial) {
        let profit = (current - initial) * quantity;
        let profitPercentage = (profit / (initial * quantity)) * 100;
        profitGifShow();
        outputMessage(`Yay! Your <span>Profit</span> is <span>${profit}</span> and profit <span>Percentage</span> is <span>${profitPercentage.toFixed(2)}%</span>`);
        if (profitPercentage > 50) {
            above50ProfitLayout();
        } else {
            defaultLayout();
        }
    } else {
        outputMessage('<span>No Profit / No Loss</span>');
        noProfitLossGifShow();
        defaultLayout();
    }
}

function profitGifShow() {
    defaultGif.style.display = 'none';
    lossGif.style.display = 'none';
    profitGif.style.display = 'block';
    noProfitLossGif.style.display = 'none';
}

function lossGifShow() {
    defaultGif.style.display = 'none';
    lossGif.style.display = 'block';
    profitGif.style.display = 'none';
    noProfitLossGif.style.display = 'none';
}

function noProfitLossGifShow() {
    defaultGif.style.display = 'none';
    lossGif.style.display = 'none';
    profitGif.style.display = 'none';
    noProfitLossGif.style.display = 'block';
}

function defaultLayout() {
    header.style.backgroundColor = "var(--primary-color)";
    headerText.style.color = 'white';
    document.body.style.backgroundColor = "var(--secondary-color)";
    document.body.style.color = "white";
    inputs.forEach(input => input.style.boxShadow = '3px 3px var(--primary-color)');
    showMeBtn.style.boxShadow = '3px 3px var(--primary-color)';
}

function above50ProfitLayout() {
    header.style.backgroundColor = "var(--green)";
    headerText.style.color = 'black';
    document.body.style.backgroundColor = "var(--off-green)";
    document.body.style.color = "black";
    inputs.forEach(input => input.style.boxShadow = '3px 3px var(--green)');
    showMeBtn.style.boxShadow = '3px 3px var(--green)';
}

function above50LossLayout() {
    header.style.backgroundColor = "var(--red)";
    headerText.style.color = 'black';
    document.body.style.backgroundColor = "var(--off-red)";
    document.body.style.color = "black";
    inputs.forEach(input => input.style.boxShadow = '3px 3px var(--red)');
    showMeBtn.style.boxShadow = '3px 3px var(--red)';
}

function clickHandler() {
    let initPrice = Number(initialPrice.value);
    let stocksQty = Number(quantityOfStocks.value);
    let currPrice = Number(currentPrice.value);

    if (initialPrice.value && quantityOfStocks.value && currentPrice.value) {
        calculateProfitLoss(initPrice, stocksQty, currPrice);
    } else {
        defaultLayout();
        outputMessage('Enter all the details.', './Images/default.webp');
    }

}

function outputMessage(msg) {
    output.innerHTML = msg;
    output.style.display = 'block';
}