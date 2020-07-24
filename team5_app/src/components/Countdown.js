import React from 'react';

function CountDown(props) {
	const [days, setDays] = React.useState(0)
	const [hours, setHours] = React.useState(0)
	const [minutes, setMinutes] = React.useState(0)
	const [seconds, setSeconds] = React.useState(0)

    let deadline = new Date("jul 24, 2020 23:59:59").getTime();
    let x = setInterval(function() {

        let now = new Date().getTime();
        let t = deadline - now;
        let d = Math.floor(t / (1000 * 60 * 60 * 24));
        let h = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
        let m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((t % (1000 * 60)) / 1000);
        setDays(d)
        setHours(h)
        setMinutes(m)
        setSeconds(s)
        if (t < 0) {
                clearInterval(x);
                setDays(d)
        		setHours(h)
        		setMinutes(m)
        		setSeconds(s) }
    }, 1000);
    return(
  <>
    <br />
    <br />
        <div classname='clockdiv'>
   <div className = 'clockdiv-div'>
       <span classname = 'clockdiv-div-span' class="days" id="day">{days}</span>
       <div class='smalltext'>Days</div>
   </div>
   <div className = 'clockdiv-div'>
       <span span classname = 'clockdiv-div-span' class="hours" id="hour">{hours}</span>
       <div class='smalltext'>Hours</div>
   </div>
   <div className = 'clockdiv-div'>
       <span span classname = 'clockdiv-div-span'  class="minutes" id="minute">{minutes}</span>
       <div class='smalltext'>Minutes</div>
   </div>
   <div className = 'clockdiv-div'>
       <span span classname = 'clockdiv-div-span' class="seconds" id="second">{seconds}</span>
       <div class='smalltext'>Seconds</div>
   </div>
    <p id="demo" > &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Until next live broadcast!</p> 
   </div>
 </>
);
}

export default CountDown