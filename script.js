// $(function() {
//     var quote = $('#quote-text');
//     getQuote(quote);
//   ​
//     // $('#getQuote').click(function(event) {
//     window.onload(function(event) {
//       event.preventDefault();
//       getQuote(quote);
//     })
//   });

// function getQuote(quote) {
//   // let quote=document.getElementById('quote-text');
//   // quote.innerText=;
//   var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"
//   $.getJSON(url, function(data) {
//     quote.html(data.quoteText);
//   });
// }
// getQuote();


// var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
// fetch(url).then((response)=>{
//   console.log("fads");
//   return response.json();
// }).then((data)=>{
//   console.log("this is something else than fads");
//   console.log(data);
// })


$(function() {
  var quote = $('#quote-text');
  getQuote(quote);

  $('#getQuote').click(function(event) {
    event.preventDefault();
    getQuote(quote);
  })
});

function getQuote(quote) {
  var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"

  $.getJSON(url, function(data) {
      quote.html(data.quoteText);
  });
}

//   Scroll to top Button

var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement;

window.onscroll = () => {
  if (rootElement.scrollTop > 300) {
    scrollToTopBtn.style.right = "20px";
  } else if (rootElement.scrollTop < 300) {
    scrollToTopBtn.style.right = "-60px";
  }
};

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
