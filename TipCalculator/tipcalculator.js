$(document).ready(function() {
    function tipCalculator() {
      //retrieve and store variables
      var amount = $("#amount").val();
      var percentage = $("#percentage").val();
      //calculate tip
      var tip = amount * (percentage / 100);
      
      //convert to number
      var total = +amount + tip;
      
      $("#tip").text(tip.toFixed(2));
      $("#total").text(total.toFixed(2));
    }; 
    
      $("#calculate").click(tipCalculator);
  });