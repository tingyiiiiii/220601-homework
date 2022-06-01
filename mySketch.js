var inputElement, sliderElement, btnElement
var randomValue=0 //等於0意思是靜止

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	inputElement =createInput("Hello")//要輸入的文字內容
	inputElement.position(50,10)//輸入的文字要放入的位置
	sliderElement= createSlider(50,150,50,0.01)//最小值，最大值，預設值，間距
	sliderElement.position(204,10)//滑桿的位置
	
	btnElement =createButton("瘋狂")
	btnElement.position(340,10)//按鈕的位置
	btnElement.mousePressed(goCrazy)//當按鈕按下時，要執行goCrazy這個東西
	btnElement.style("border-color",'green')//選擇框線顏色
	btnElement.style("border-width",'10px')//框線的粗度
	
	
  colorPicker = createColorPicker('#ed225d');//括號內的值，為預設值
  colorPicker.position(400,8)
	radioElement=createRadio()
  radioElement.option("一般")
  radioElement.option("旋轉(rotate)")
  radioElement.option("大小(scale)")
  radioElement.position(470,10)
  radioElement.style("background-color",'white')//設定為CSS格式
}

function goCrazy() {
  if(randomValue>0){
	 randomValue=0//不抖動
  }
  else
  {
	  randomValue=10//抖動的距離為-10到10之間
  }
}

function draw() {
	background(0)//使文字不會重疊
	var txts = inputElement.value();
	var textHeight=sliderElement.value()
	textSize(sliderElement.value())//文字大小隨著滑桿移動而縮放
  var textLength=textWidth(txts)+100//+textWidth(txts)的用意是讓字之間的空格取決於呈現文字的寬度
	var mode = radioElement.value()
	for(var y=0; y<height;y=y+textHeight+20){//y間距也隨著文字大小縮放，避免文字重疊
	  push()
	        if(int(y/(textHeight+20))%2==0){//int是取整數，除下來的餘數等於0時，代表是偶數行
	          fill(colorPicker.value())
				    translate(-50,0)//讓偶數行的位置往x軸移動50
			    }
		      else{
				    fill(255)//奇數行顏色是白色
			    }
		  for(var x=0; x<width;x=x+textLength)
		{ push()
			translate(x+random(-randomValue,randomValue), y+random(-randomValue,randomValue))//txts是顯示文字，後兩個值是在滑鼠按下時，文字會隨意抖動
			if (mode=="旋轉(rotate)"){
			  rotate(sin(frameCount/20+y/2))
			}else if (mode=="大小(scale)"){
				scale(sin(frameCount/20+y/10))
			}
		 text(txts,0,0)
			pop()
	    }
		  pop()
	
	}
}