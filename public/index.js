window.onload=init()
var ctx1,ctx2,ctx3,ctx4,cvs1,cvs2,cv3,cvs4,ctx,cvs
var cvs,x,y,i=0,radius,matrix   //f=function
function init(){
	radius=100,ctx=[],cvs=[]
	matrix=[[0,0,0,0],   //x
			[0,0,0,0],	 //y
			[0,0,0,0],	 //theta
			[0,0,0,0],	//f
			[null,null,null,null],  //p1
			[null,null,null,null],	 //p2
			[0,0,0,0]]	//rotation
	cvs4=document.getElementById("mycanvas4")
	ctx4=cvs4.getContext("2d")

	cvs3=document.getElementById("mycanvas3")
	ctx3=cvs3.getContext("2d")

	cvs2=document.getElementById("mycanvas2")
	ctx2=cvs2.getContext("2d")

	cvs1=document.getElementById("mycanvas1")
	ctx1=cvs1.getContext("2d")
	cvs.push(cvs1,cvs2,cvs3,cvs4)
	ctx.push(ctx1,ctx2,ctx3,ctx4)
	cvs1.addEventListener('click',function(e){ matrix[6][0]=true })
	cvs2.addEventListener('click',function(e){ matrix[6][1]=true })
	cvs3.addEventListener('click',function(e){ matrix[6][2]=true })
	cvs4.addEventListener('click',function(e){ matrix[6][3]=true })
	for(var i=0;i<4;i++){
		//ctx[i].translate(300,300)
	}
	gameLoop()
}
function update(){
	for(var i=0;i<4 && matrix[2][0] <= Math.PI*2.01;i++){
		var x=matrix[3][i]*Math.cos(matrix[2][i])
		var y=matrix[3][i]*Math.sin(matrix[2][i])
		if(matrix[4][i]===null && x!==0 && y!==0){
			matrix[4][i]={x:x,y:y}
		}
		else if(x!==0 && y!==0){ 
			matrix[5][i]={x:x,y:y}
		}
		if(matrix[5][i]!==null && matrix[5][i]!==null){
			drawLine(ctx[i],matrix[4][i],matrix[5][i])
			matrix[4][i]=matrix[5][i]
		}
	}
	for(var j=0;j<4;j++){
		if(matrix[6][j]===true){
			console.log("rotating",matrix)
			matrix[2][1]=0.01
		}
	}
	
}
function drawLine(ctx,p1,p2){
	ctx.beginPath()
	ctx.moveTo(p1.x+100,p1.y+100);
	ctx.lineTo(p2.x+100,p2.y+100);
	ctx.stroke();
}
function drawPoint(x,y){
	ctx.beginPath();
	ctx.arc(x+100,y+100, 1, 0, 1 * Math.PI, true);
	ctx.stroke();
}
function gameLoop() {

	update()
	if( matrix[2][0] <= Math.PI*2.01){
		matrix[2][0]+=0.01 
		matrix[2][2]+=0.01   // for first two
		matrix[2][1]+=0.01   // for first two
		matrix[2][3]+=0.1  //for spiral
	
		//K=(1+Math.cos(theta)) // for cardioid
		
		matrix[3][0]=radius*(1+Math.cos(matrix[2][1]))  // for cardioid
		matrix[3][1]=radius*Math.cos(3*matrix[2][1])  //for 3 petal Rose Curve
		matrix[3][2]=radius*Math.cos(7*matrix[2][1])  //for 7 petal Rose Curve
		matrix[3][3]=radius*0.05*matrix[2][3]	 // for spiral
	}
	
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