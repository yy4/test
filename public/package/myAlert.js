
$(document).ready(function(){
	jQuery.extend({
		myAlert : function(value,fn) {
			// $("#my_alert").css("display","none");
			// $("#my_alert").show();
			if($("#my_alert").length!=0){
				$("#my_alert").fadeIn("slow");
				$("#my_alert h2").text(value);
			}else{
				var body=$("body");
				var boss =new $().add("<div id='my_alert'></div>");
				var back =new $().add("<div></div>");
				var content=new $().add("<div></div>");
				var contentTitle=new $().add("<div><br><br><h2>"+value+"</h2></div>");
				var buts=new $().add("<div></div>");
				var but1=new $().add("<input type='button' value='取消'>");
				var but2=new $().add("<input type='button' value='确定'>");
				var x=new $().add("<a href='javascript:void(0)'>×</a>");

				boss.css("display","none")
				// 公共
				$(boss).add(back).css({"position": "absolute","width": "100%","height": "100%","top": "0px","left": "0px"});
				// 背景填充
				back.css({"backgroundColor": "rgb(0, 0, 0)","opacity": "0.3"})
				// 中心内容
				content.css({"position":"absolute",
							"width":"300px",
							"height":"200px",
							"top":"50%",
							"left":"50%",
							"margin":"-100px 0 0 -100px",
							"backgroundColor":"white",
							"borderTop":"2px solid orange",
							"borderRadius":"5px",
							"padding":"10px 10px"
				});
				// 标题部分
				// 两个按钮部分
				buts.css({
					"position":"absolute",
					"backgroundColor":"AliceBlue",
					"bottom":"10px",
					"width":"100%",
					"marginLeft":"-10px",
					"padding":"8px 0px",
					"textAlign":"center",
				});
				// 第一个按钮
				but1.css("marginRight","20px");
				// 第二个按钮
				but2.css("marginLeft","20px");
				// ×部分

				x.css({
					"position":"absolute",
					"top":"16px",
					"right":"8px",
					"color":"rgb(105, 110, 120)",
					"textDecoration":"none",
					"fontFamily":"STKaiti",
					"font-size":"18px"
				});
				// 按钮的通用属性
				$().add(but1).add(but2).css({
					"border":"2px solid AliceBlue",
					"borderRadius":"3px",
					"backgroundColor":"AliceBlue",
				});
				$().add(but1).add(but2).hover(function(){
					$(this).css({
						"border":"2px solid #c3c8cd",
						"borderRadius":"3px",
						"backgroundColor":"aqua"
					});

				},function(){
					$(this).css({
					"border":"2px solid AliceBlue",
					"borderRadius":"3px",
					"backgroundColor":"AliceBlue"
				});
				});


				//三个事件
				but1.click(function(){
					// $("#my_alert").css("display","none");
					$("#my_alert").slideUp("fast",function(){});
				});
				but2.click(function(){
					$("#my_alert").slideUp("fast",function(){
						fn();
					});
				});
				x.click(function(){
					$("#my_alert").slideUp("fast",function(){});
				});

				boss.append(back);
				content.append(contentTitle);
				buts.append(but1);
				buts.append(but2);
				content.append(buts);
				content.append(x);
				boss.append(content);
				body.append(boss);
				boss.fadeIn("slow");
			}
		}
	});

});






