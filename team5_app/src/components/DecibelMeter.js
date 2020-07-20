import React from 'react';


function DecibelMeter(props) {
	
	const myRef = React.useRef(null)
	
	React.useEffect(() => {
        var canvas  = document.getElementById("theCanvas");
        const ctx = canvas.getContext("2d")
        var img = new Image();
        img.src = '/img/DecibelMeter.png';
		img.width = 500
		img.height = 250
//		ctx.fillStyle = "grey";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		img.onload = function (e) {
			ctx.drawImage(img, 0, 0)
			let x = ((247.5)*(1 - Math.cos(props.angle * Math.PI/180)))
			let y = ((250)*(1 - Math.sin(props.angle * Math.PI/180)))
			ctx.lineWidth = 5
			ctx.beginPath();
			ctx.moveTo(247.5,250)
  			ctx.lineTo(x,y)
        	ctx.stroke();
		}

		
	})
	
	
	
	
	return (
	<>
	<canvas id="theCanvas" ref={ myRef  } 
                width="500" 
                height="250"
                >
    </canvas>
	</>
	)
}

export default DecibelMeter