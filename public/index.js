window.onload=init()
var ctx1,ctx2,ctx3,ctx4,cvs1,cvs2,cv3,cvs4,ctx
var cvs,x,y,theta1,theta2,theta3,theta4,i=0,f1,f2,f3,f4,radius,matrix   //f=function
function init(){
	theta1=0,theta2=0,theta3=0,theta4=0,p2=null,p1=null,radius=100,ctx=[]
	matrix=[[0,0,0,0],   //x
			[0,0,0,0],	 //y
			[0,0,0,0],	 //theta
			[0,0,0,0],	//f
			[null,null,null,null],  //p1
			[null,null,null,null]]	 //p2
	cvs4=document.getElementById("mycanvas4")
	ctx4=cvs4.getContext("2d")

	cvs3=document.getElementById("mycanvas3")
	ctx3=cvs3.getContext("2d")

	cvs2=document.getElementById("mycanvas2")
	ctx2=cvs2.getContext("2d")

	cvs1=document.getElementById("mycanvas1")
	ctx1=cvs1.getContext("2d")
	ctx.push(ctx1,ctx2,ctx3,ctx4)

	gameLoop()
}
function update(){
	for(var i=0;i<4;i++){
		var x=matrix[3][i]*Math.cos(matrix[2][i])
		var y=matrix[3][i]*Math.sin(matrix[2][i])
		if(matrix[4][i]===null){
			matrix[4][i]={x:x,y:y}
		}
		else{ 
			matrix[5][i]={x:x,y:y}
		}
		if(matrix[5][i]!==null && matrix[5][i]!==null){
			drawLine(ctx[i],matrix[4][i],matrix[5][i])
			matrix[4][i]=matrix[5][i]
		}
	}
	// var x=f4*Math.cos(theta4)
	// var y=f4*Math.sin(theta4)
	// if(p1===null){
	// 	console.log("p1 is null")
	// 	p1={x:x,y:y}
	// }
	// else{ 
	// 	p2={x:x,y:y}
	// }

	// if(p2!==null){
	// 	console.log(p1,p2)
	// 	drawLine(ctx4,p1,p2)
	// 	p1=p2
	// }

	// x=f2*Math.cos(theta2)
	// y=f2*Math.sin(theta2)
	// if(p1===null){
	// 	p1={x:x,y:y}
	// }
	// else{ 
	// 	p2={x:x,y:y}
	// }

	// if(p2!==null){
	// 	console.log(p1,p2)
	// 	drawLine(ctx2,p1,p2)
	// 	p1=p2
	// }
	
}
function drawLine(ctx,p1,p2){
	ctx.beginPath()
	ctx.moveTo(p1.x+300,p1.y+300);
	ctx.lineTo(p2.x+300,p2.y+300);
	ctx.stroke();
}
function drawPoint(x,y){
	ctx.beginPath();
	ctx.arc(x,y, 1, 0, 1 * Math.PI, true);
	ctx.stroke();
}
function gameLoop() {

	update()
	matrix[2][0]+=0.01 
	matrix[2][2]+=0.01   // for first two
	matrix[2][1]+=0.01   // for first two
	matrix[2][3]+=0.1  //for spiral

	//K=(1+Math.cos(theta))  for cardioid
	matrix[3][0]=radius*(1+Math.cos(matrix[2][1]))  // for cardioid
	matrix[3][1]=radius*Math.cos(3*matrix[2][1])  //for 3 petal Rose Curve
	matrix[3][2]=radius*Math.cos(7*matrix[2][1])  //for 7 petal Rose Curve
	matrix[3][3]=radius*0.05*matrix[2][3]	 // for spiral
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