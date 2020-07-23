import React from 'react';

function CountDown(props) {
    var deadline = new Date("jul 25, 2020 23:59:59").getTime();

    var x = setInterval(function() {

        var now = new Date().getTime();
        var t = deadline - now;
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        document.getElementById("day").innerHTML =days ;
        document.getElementById("hour").innerHTML =hours;
        document.getElementById("minute").innerHTML = minutes;
        document.getElementById("second").innerHTML =seconds;
        if (t < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "TIME UP";
                document.getElementById("day").innerHTML ='0';
                document.getElementById("hour").innerHTML ='0';
                document.getElementById("minute").innerHTML ='0' ;
                document.getElementById("second").innerHTML = '0'; }
    }, 1000);
    return(
       
        <div classname='clockdiv'>
   <div className = 'clockdiv-div'>
       <span classname = 'clockdiv-div-span' class="days" id="day"></span>
       <div class='smalltext'>Days</div>
   </div>
   <div className = 'clockdiv-div'>
       <span span classname = 'clockdiv-div-span' class="hours" id="hour"></span>
       <div class='smalltext'>Hours</div>
   </div>
   <div className = 'clockdiv-div'>
       <span span classname = 'clockdiv-div-span'  class="minutes" id="minute"></span>
       <div class='smalltext'>Minutes</div>
   </div>
   <div className = 'clockdiv-div'>
       <span span classname = 'clockdiv-div-span' class="seconds" id="second"></span>
       <div class='smalltext'>Seconds</div>
   </div>
    <p id="demo"></p> 
   </div>
);
}

export default CountDown