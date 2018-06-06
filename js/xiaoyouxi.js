		  //获取元素的属性值
			//obj  元素对象
			//attr 要获取的元素属性
			function getStyleAttr(obj,attr){
				if(window.getComputedStyle){  //ie9+  ff 谷歌
					return getComputedStyle(obj,null)[attr];			
				}
				//ie8及以下
				return obj.currentStyle[attr];
			}
		  function startMove(obj,attr,s){
		     
					//清除之前运动定时器
					clearInterval(obj.timer);
					//开启定时器，开始运动
					obj.timer = setInterval(function(evt){
						var width = document.body.offsetWidth;
						var box = document.querySelector(".box");
						//获取初始位置
						var current = parseInt(getStyleAttr(obj,attr));
						//console.log(width);
						//console.log(current);
						//设置一个速度
						var iSpeed = -s ;
			//			console.log(iSpeed);
						//当到目标位置时，关闭定时器，停止运动
						if(Math.abs(current) >= width){
						//	console.log("haha")
							obj.style[attr] = width-1+ "px";
							return;  //跳出函数  不执行下面的代码
						}		
						//判断是否碰撞(游戏结束)
						var over = document.querySelector("#over");
				        var height = document.documentElement.clientHeight;
						if(box.offsetTop>=obj.offsetTop &&box.offsetTop<=obj.offsetTop+obj.offsetHeight &&  box.offsetLeft>=obj.offsetLeft&&box.offsetLeft<=obj.offsetLeft+obj.offsetWidth){
							clearInterval(obj.timer);
							var overspan = document.querySelector("#over span");
							overspan.innerHTML = "game over";
							over.style.top = 0+"px";
							over.style.lineHeight = height+'px';
						}
						//运动	current + iSpeed	
						obj.style[attr] = current + iSpeed + "px";					
					},50)
				}
			//current 200+5 205  、205+5 210
		
			window.onload = function(){
				var box = document.querySelector(".box");
				var div = document.querySelectorAll("div");
				var over = document.querySelector("#over");
				var btn =document.querySelector("#btn");
				btn.onclick = function(){
				
					window.location.href="index.html";
				}
				var height = document.documentElement.clientHeight;
				console.log(height);
				//初始化位置
				box.style.top=height-box.offsetHeight+"px";
				over.style.height = height+"px";
          for(var i=1;i<div.length-1;i++){
          	startMove(div[i],"left",Math.ceil(Math.random()*20))
          }
			window.onkeydown=function(evt){           	
            	var oEvent = evt ||event;
            	var over = document.querySelector("#over");
            	var overspan = document.querySelector("#over span");
            		//上箭头
            		if(oEvent.keyCode==38){
            			var boxtop = box.offsetTop;
            			if(overspan.innerHTML =="game over"){
            				box.style.top = boxtop+"px";
            			}else{
            				box.style.top = boxtop-10+"px";
            			}
            			
            		}
            		//下箭头
     /*       		if(oEvent.keyCode==40){
            			if(box.offsetTop>=document.documentElement.clientHeight-box.offsetHeight){
            				 box.style.top = document.documentElement.clientHeight-box.offsetHeight+"px";
            			}else{
            				var boxtop = box.offsetTop;
            			  box.style.top = boxtop+10+"px";
            			}
            			console.log(box.offsetTop)
            			console.log(box.offsetTop)
            			
            		}*/
            		//左箭头
            		if(oEvent.keyCode==37){
            			if(box.offsetLeft<=0){
            				box.style.left = 0+"px";
            			}else{
            				var boxleft = box.offsetLeft;
            			  box.style.left = boxleft-10+"px"; 
            			}            			          			
            		}
            		//右箭头
            		if(oEvent.keyCode==39){
            			if(box.offsetLeft>=document.documentElement.offsetWidth-box.offsetWidth){
            				box.style.left = document.documentElement.offsetWidth-box.offsetWidth+'px';
            			}else{
            				var boxleft = box.offsetLeft;
            			  box.style.left = boxleft+10+"px"; 
            			}          			
            		}
            		//胜利
            		if(box.offsetTop<=0){           			
					        var height = document.documentElement.clientHeight;				
									over.style.top = 0+"px";
									over.style.lineHeight = height+'px';
									overspan.innerHTML = "厉害哟，你赢了";
            		}
            	console.log(box.offsetTop)
            }
		}
