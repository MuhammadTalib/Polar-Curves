window.onload=init()
var ctx
var cvs,x,y,theta,i=0,K,p1,p2
function init(){
	theta=0,p2=null,p1=null
	cvs=document.getElementById("mycanvas")
	ctx=cvs.getContext("2d")

	gameLoop()
}
function update(){
	var x=K*Math.cos(theta)*100
	var y=K*Math.sin(theta)*100
	if(p1===null){
		console.log("p1 is null")
		p1={x:x,y:y}
	}
	else{ 
		p2={x:x,y:y}
	}

	if(p2!==null){
		console.log(p1,p2)
		drawLine(p1,p2)
		p1=p2
	}
	
}
function drawLine(p1,p2){
	ctx.beginPath()
	ctx.moveTo(p1.x+200,p1.y+200);
	ctx.lineTo(p2.x+200,p2.y+200);
	ctx.stroke();
}
function drawPoint(x,y){
	ctx.beginPath();
	ctx.arc(x,y, 1, 0, 1 * Math.PI, true);
	ctx.stroke();
}
function gameLoop() {

	update()
	//theta+=0.01   // for first two
	theta+=0.1  //for spiral

	//K=(1+Math.cos(theta))  for cardioid
	//K=Math.cos(9*theta)  //for Rose Curve
	K=0.05*theta
	requestAnimationFrame(gameLoop)

}

function clearCanvas(cvs){
	const ctx = cvs.getContext("2d")
	ctx.save()
	ctx.globalCompositeOperation ="copy"
	ctx.strokeStyle="transparent"
	ctx.beginPath()
	ctx.lineTo(0,0)
	ctx.stroke()
	ctx.restore()
}