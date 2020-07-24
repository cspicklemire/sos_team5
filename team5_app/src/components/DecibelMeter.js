import React from 'react';


function DecibelMeter(props) {
	
	const myRef = React.useRef(null)
	const [cleared, setCleared] = React.useState(false)

	
	
	
	React.useEffect(() => {
        var canvas  = document.getElementById("theCanvas");
        const ctx = canvas.getContext("2d")
        var img = new Image();
        img.src = '/img/DecibelMeter.png';
		img.width = 248
		img.height = 125
        if (!cleared) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setCleared(true)
        }
		img.onload = function (e) {
			ctx.drawImage(img, 0, 0)
			let x = (2+ ((245)*(1 - Math.cos(props.angle * Math.PI/180))))/2
			let y = (((245)*(1 - Math.sin(props.angle * Math.PI/180))) + 3)/2
			ctx.lineWidth = 5
			ctx.beginPath();
			ctx.moveTo(123,125)
  			ctx.lineTo(x,y)
        	ctx.stroke();
		}

		
	},[cleared, props.angle])
	
	
	
	
	
	
	return (
	<>
	<canvas id="theCanvas" ref={ myRef  } 
                width="248" 
                height="125"
                >
    </canvas>
	</>
	)
}

export default DecibelMeter