function reverseStr(str) {
  return str.split('').reverse().join('');
}

function isPalindrome(str) {
  if(str === reverseStr(str)) return true;
  else return false;
}

function convertDateToStr(date) {
   var dateStr = {day: '', month: '', year: ''};
   
   if(date.day<10) {
      dateStr.day = '0' + date.day;
   }
   else {
      dateStr.day = date.day.toString();
   }

   if(date.month <10) {
    dateStr.month = '0' + date.month;
   }
   else {
    dateStr.month = date.month.toString();
   }
   dateStr.year = date.year.toString();

   return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2); 
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllFormats(date) {
  var allFormats = getAllDateFormats(date);
  var palindrome = false; 
  for(var i=0;i<allFormats.length;i++){
    if(isPalindrome(allFormats[i])){
      palindrome = true;
    }
  }
  return palindrome;
}

function isLeapYear(year) {
  if(year % 4 === 0 ) {
    return true;
  }
  if(year % 100 === 0 ) {
    return false;
  }
  if(year % 4 === 0) {
    return true;
  }
  return false;
}
var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;


  if(month === 2){
    if(isLeapYear(year)){
      if(day > 29 ) {
        day = 1;
        month++;
      }
    } else {
      if(day > 28 ){
        day = 1;
        month++;
      }
    } 
  } else {
    if(day > daysInMonth[month - 1]){
      day = 1;
      month++;
    }
  }

  if(month > 12 ) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
  
}

function getPrevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  if(month === 3) {
    if(isLeapYear(year)) {
      if(day < 1){
        day = 29;
        month--;
      }
    } else {
      if(day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if(month === 1 && day<1){
      day = 31;
      month = 12;
      year--;
    }
    if(month > 1 && day < 1){
      day = daysInMonth[month - 2];
      month--;
    }
  }
  return {
    day: day,
    month: month,
    year: year
  }
  
}

function getNextPalindromeDate(date) {

  var count = 0;
  var nextDate = getNextDate(date);

  while(1) {
    count++;
    var isPalindrome = checkPalindromeForAllFormats(nextDate);
    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];

}
function getPreviousPalindromeDate(date) {
  var previousDate = getPrevDate(date);
  let counter = 0;
  while(1) {
    counter++;
    var isPalindrome = checkPalindromeForAllFormats(previousDate);
    if(isPalindrome) {
      break;
    }
    previousDate = getPrevDate(previousDate);
  }
  return [counter, previousDate];
}

var date = {
  day: 11,
  month: 09,
  year: 2022
}

console.log(getNextPalindromeDate(date));

var dateInput = document.querySelector('#bday-input');
var showBtn = document.querySelector('.show-btn');
var result = document.querySelector('.result')

showBtn.addEventListener('click',(e) => {
  console.log(dateInput.value);
})

function clickHandler(e) {
  var bdayStr = dateInput.value;

  if(bdayStr !== '') {
    var strDate = bdayStr.split('-');
    var date = {
      day: Number(strDate[2]),
      month: Number(strDate[1]),
      year: Number(strDate[0])
    }

    var isPalindrome = checkPalindromeForAllFormats(date);
    // console.log(isPalindrome)
    if(isPalindrome) {
      result.innerText = 'Yay! your birthday is a palindrome! ✨🥳'
    }
    else {
      var [countNext, nextDate] = getNextPalindromeDate(date);
      var [countPrev, prevDate] = getPreviousPalindromeDate(date);
      result.innerHTML = `<li>No, your birthday is <span>Not</span> a Palindrome.🥲☹️</li><br> 
      <li>You just missed by <span>${countNext}</span> days, the next palindrome date is <span>${nextDate.day}-${nextDate.month}-${nextDate.year}</span> 
      </li><br>
      <li>Also, The Previous palindrome date is <span>${prevDate.day}-${prevDate.month}-${prevDate.year}</span>, you just missed by <span>${countPrev}</span> days.</li>`
      
    }
  }
 
}

showBtn.addEventListener('click',clickHandler);