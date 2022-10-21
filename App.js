const billAmount = document.querySelector('#bill-amount')
const cashGiven = document.querySelector('#cash-given')
const nextBtn = document.querySelector('.next-button')
const checkBtn = document.querySelector('.check-button')
const billErrorMessage = document.querySelector('.bill-error')
const cashErrorMessage = document.querySelector('.cash-error')
const notesList = document.querySelectorAll('.no-of-notes')

const cashDiv = document.querySelector('.cash')
const divider = document.querySelector('.divider')
const table = document.querySelector('table')
const billPaid = document.querySelector('.paid')

const availableNotes = [2000,500,100,20,10,5,1]

billErrorMessage.style.display = "none"
cashErrorMessage.style.display = "none"
cashDiv.style.display = "none"
divider.style.display = "none"
table.style.display = "none"
billPaid.style.display = "none"

//next button functionality
nextBtn.addEventListener('click',checkBillAmount);
function checkBillAmount() {
  if(Math.trunc(billAmount.value) > 0){
    billErrorMessage.style.display = 'none';
    cashDiv.style.display = 'flex'
  }else {
    showInvalidBillMsg('Bill amount should be greater than 0')
    cashDiv.style.display='none'
    divider.style.display = 'none'
    table.style.display='none'
  }
}

//check button functionality : 
checkBtn.addEventListener('click',() => {
  
  if(Math.trunc(billAmount.value) > 0){
    billErrorMessage.style.display = 'none'
    cashDiv.style.display = 'flex'
    checkCashGiven()
  } else {
    showInvalidBillMsg('Bill amount should be greater than 0')
    cashDiv.style.display = 'none'
    divider.style.display = 'none'
    table.style.display = 'none'
  }
})

// checking the Cash given:
function checkCashGiven() {
  if (Number(cashGiven.value) === Number(billAmount.value)) {
      amountPaid();
  } else if (Number(cashGiven.value) >= Number(billAmount.value)) {
      cashErrorMessage.style.display = "none";
      billPaid.style.display = "none";
      divider.style.display = "flex";
      table.style.display = "flex";
      const amountToBeReturned = cashGiven.value - billAmount.value;
      calculateChange(amountToBeReturned);
      boldNoteCount(); 
  } else {
      showInvalidCashMsg('Please pay or we will call the Police 👮‍♂️');
      divider.style.display = "none";
      table.style.display = "none";
      billPaid.style.display = "none";
  }
}
function showInvalidCashMsg(msg) {
    cashErrorMessage.style.display = "flex";
    cashErrorMessage.innerText = msg;
}

function showInvalidBillMsg(msg) {
  billErrorMessage.style.display = 'flex'
  billErrorMessage.innerText = msg
}


// check if amount is paid or not : 
function amountPaid() {
  cashErrorMessage.style.display = 'none'
  divider.style.display = 'flex'
  cashErrorMessage.style.display = 'none'
  table.style.display = 'none'
  billPaid.style.display = 'block'
  billPaid.innerText = 'Bill has been paid....Have a nice day ! 😊'
}

function calculateChange(amountToBeReturned) {
  for (let i=0; i<availableNotes.length; i++) {
      const numberOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]);
      amountToBeReturned = amountToBeReturned % availableNotes[i];
      notesList[i].innerText = numberOfNotes;
  }
}

function boldNoteCount() {
  notesList.forEach(note => {
      note.style.fontWeight = 400;
      if (Number(note.textContent) != 0) {
          note.style.fontWeight = 700;
      }
  });
}
