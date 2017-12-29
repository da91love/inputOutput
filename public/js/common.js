//가로넓이 지정하면,
//canvas_outer가로 수정, 세로 크기 가로의 1/3수정
//canvas_inner


//*********************라인별 고유키 생성**********************//
var dependencyKey=0;

function createDependencyKey(){
	dependencyKey=dependencyKey+1;
}

//*********************초기 브라우저의 길이, 원의 위치, 텍스트의 위치를 지정**********************//
$('.middle').css({"width" : $(document).width() + "px"});
$('.line_description').css({"width" : $(document).width() * 0.2 + "px"});
$('.canvas_outer').css({"width" : $(document).width() * 0.8 + "px"});

//*********************초기 라인의 를 조정**********************//
$('#initial-line').attr({"x1":150,"y1":$('.canvas_inner').height()*0.5,"x2":$('.canvas_inner').width() - 150,"y2":$('.canvas_inner').height()*0.5});
$('#initial-line').attr("line-len",$('.canvas_inner').width()-300);

$('#initial-start-circle').attr({"cx":150, "cy":$('.canvas_inner').height()*0.5, "r":10});
$('#initial-start-text').attr({"x":150, "y":$('.canvas_inner').height()*0.5});

$('#initial-end-circle').attr({"cx":$('.canvas_inner').width() - 150, "cy":$('.canvas_inner').height()*0.5, "r":10});
$('#initial-end-text').attr({"x":$('.canvas_inner').width() - 150, "y":$('.canvas_inner').height()*0.5});

//*********************라인의 길이를 조정**********************//
var i = 0;
$('#plus').click(function() {
	i++;
	$('#test').text(i);
	$('.middle').css({"width" : $('.middle').width() + 100 + "px"});
	$('.canvas_outer').css({"width" : $('.middle').width()- $('.line_description').width() + "px"});
	$('#initial-line').attr("x2",$('.canvas_inner').width() - 150);
	$('#initial-end-circle').attr("cx",$('.canvas_inner').width() - 150);
	$('#initial-end-text').attr("x",$('.canvas_inner').width() - 150);
});

$('#minus').click(function() {
	if (i <= 0) {
		alert("더 이상 작게 설정할 수 없습니다");
	} else {
		i--;
		$('#test').text(i);
		$('.middle').css({"width" : $('.middle').width() - 100 + "px"});
		$('.canvas_outer').css({"width" : $('.middle').width()- $('.line_description').width()+ "px"});
		$('#initial-line').attr("x2", $('.canvas_inner').width() - 150);
		$('#initial-end-circle').attr("cx",$('.canvas_inner').width() - 150);
		$('#initial-end-text').attr("x",$('.canvas_inner').width() - 150);
	}
});

//*********************ip,op클릭시 해당 텍스트 산출**********************//






//*********************desc에 마우스가 올라갈시 line색변함**********************//
$(document).on('mouseenter','.panel',function(e){
	var $ldb = $(this).parent();
	var key= $ldb.attr('key');


	var $lic = null;
	var $allLic = $(document).find('.line-in-canvas');


	for(var i=0;i<$allLic.length;i++){
		if($allLic.eq(i).attr('key')==key){
			$lic = $allLic.eq(i);
			break;
		}
	}
	$(this).css({
		'border-color':'rgb(255, 102, 102)',
		'border-width':'7px'
	});

	$lic.find('.line').css({'stroke':'rgb(255, 102, 102)','stroke-width':'3'});
	$lic.find('.start_circle').attr({'fill':'rgb(255, 102, 102)','stroke':'rgb(255, 102, 102)'});
	$lic.find('.end_circle').attr({'fill':'rgb(255, 102, 102)','stroke':'rgb(255, 102, 102)'});
});


$(document).on('mouseleave','.panel',function(e){
	var $ldb = $(this).parent();
	var key= $ldb.attr('key');

	var $lic = null;
	var $allLic = $(document).find('.line-in-canvas');

	for(var i=0;i<$allLic.length;i++){
		if($allLic.eq(i).attr('key')==key){
			$lic = $allLic.eq(i);
			break;
		}
	}

	$(this).css({
		'border-color':'',
		'border-width':'1px'
	});

	$lic.find('.line').css({'stroke':'rgb(0,0,0)','stroke-width':'2'});
	$lic.find('.start_circle').attr({'fill':'black','stroke':'black'});
	$lic.find('.end_circle').attr({'fill':'black','stroke':'black'});
});



//*********************line에 마우스가 올라갈시 desc색변함**********************//
$(document).on('mouseenter','.line-in-canvas',function(e){
	var $lic = $(this);
	var key= $lic.attr('key');

	var $panel = null;
	var $allPanel = $(document).find('.panel');

	for(var i=0;i<$allPanel.length;i++){
		if($allPanel.eq(i).parent().attr('key')==key){
			$panel = $allPanel.eq(i);
			break;
		}
	}

	$panel.css({
		'border-color':'rgb(255, 102, 102)',
		'border-width':'7px'
	});

	$lic.find('.line').css({'stroke':'rgb(255, 102, 102)','stroke-width':'3'});
	$lic.find('.start_circle').attr({'fill':'rgb(255, 102, 102)','stroke':'rgb(255, 102, 102)'});
	$lic.find('.end_circle').attr({'fill':'rgb(255, 102, 102)','stroke':'rgb(255, 102, 102)'});
});


$(document).on('mouseleave','.line-in-canvas',function(e){
	var $lic = $(this);
	var key= $lic.attr('key');

	var $panel = null;
	var $allPanel = $(document).find('.panel');

	for(var i=0;i<$allPanel.length;i++){
		if($allPanel.eq(i).parent().attr('key')==key){
			$panel = $allPanel.eq(i);
			break;
		}
	}

	$panel.css({
		'border-color':'',
		'border-width':'1px'
	});

	$lic.find('.line').css({'stroke':'rgb(0,0,0)','stroke-width':'2'});
	$lic.find('.start_circle').attr({'fill':'black','stroke':'black'});
	$lic.find('.end_circle').attr({'fill':'black','stroke':'black'});
});


//*********************plus button 클릭시 하위레벨의 라인 desc 생성**********************//
$(document).on('click','.add_line',function(){
	var $ldb = $(this).parent().parent().parent();
	var step = $ldb.attr('step');
	var key= $ldb.attr('key');


	var $lic = null;
	var $allLic = $(document).find('.line-in-canvas');


	for(var i=0;i<$allLic.length;i++){
		if($allLic.eq(i).attr('key')==key){
			$lic = $allLic.eq(i);
			break;
		}
	}

	createDependencyKey();

	//add input-ouput box in desc part
	var htmlDesc ='<div class="line-desc-bunch" '+
				'step="'+(parseInt(step)+1)+ '" key="'+dependencyKey+ '" '+
				'style="width:'+ ($(this).parent().parent().width()-20)+'px;'+
				'float:right;border-left: 2px dotted rgb(0,64,0);">'+
				'<div class="panel panel-default">'+
					'<table class="table table-striped">'+
						'<tr>'+
							'<td>INPUT</td>'+
							'<td><textarea class="form-control taIp"></textarea></td>'+
						'</tr>'+
						'<tr>'+
							'<td>OUTPUT</td>'+
							'<td><textarea class="form-control taOp"></textarea></td>'+
						'</tr>'+
					'</table>'+
					'<div class="delAddBtn">'+
						'<button class="del_line">'+
							'<span class="glyphicon glyphicon-minus"></span>'+
						'</button>'+
						'<button class="add_line">'+
							'<span class="glyphicon glyphicon-plus"></span>'+
						'</button>'+
					'</div>'+
				'</div>'+
			'</div>';
	$ldb.append(htmlDesc);

	//add group in line part
	var group = document.createElementNS('http://www.w3.org/2000/svg','g');
	group.setAttributeNS(null, 'class', 'line-in-canvas');
	group.setAttributeNS(null, 'step', parseInt(step)+1);
	group.setAttributeNS(null, 'key', dependencyKey);
//			$lic.append(group);
	$lic.after(group);

});

//*********************plus button 클릭시 하위레벨의 라인 생성**********************//
$(document).on('click','.add_line',function(){
	var $ldb = $(this).parent().parent().parent();
	var step = $ldb.attr('step');
	var key= $ldb.attr('key');

	var $lic = null;
	var $allLic = $(document).find('.line-in-canvas');

	for(var i=0;i<$allLic.length;i++){
		if($allLic.eq(i).attr('key')==key){
			$lic = $allLic.eq(i);
			break;
		}
	}

	//coordination config
	var x1 = null;
	var y1 = null;
	var x2 = null;
	var y2 = null;
	if((parseInt(step)+1)%2==0){
		//line's start x point
		x1 = $lic.children('line').attr('x1');
		//line's start y point
		y1 = parseInt($lic.children('line').attr('y1'))+parseInt($lic.children('line').attr('line-len'))*0.5*0.4;
		//line's end x point
		x2 = $lic.children('line').attr('x1');
		//line's end y point
		y2 = parseInt($lic.children('line').attr('y1'))-parseInt($lic.children('line').attr('line-len'))*0.5*0.4;
	}
	else{
		//line's start x point
		x1 = parseInt($lic.children('line').attr('x1'))-parseInt($lic.children('line').attr('line-len'))*0.5*0.4;
		//line's start y point
		y1 = $lic.children('line').attr('y2');
		//line's end x point
		x2 = parseInt($lic.children('line').attr('x1'))+parseInt($lic.children('line').attr('line-len'))*0.5*0.4;
		//line's end y point
		y2 = $lic.children('line').attr('y2');
	}


	//Find <g> tag which added above
	var $newLic = null;
	for(var i=0;i<$allLic.length;i++){
		if($allLic.eq(i).attr('key')==dependencyKey){
			$newLic = $allLic.eq(i);
			break;
		}
	}

	var line = document.createElementNS('http://www.w3.org/2000/svg','line');
	line.setAttributeNS(null, 'class', 'line');
	line.setAttributeNS(null, 'line-len', parseInt($lic.children('line').attr('line-len'))*0.4);
	line.setAttributeNS(null, 'x1', x1);
	line.setAttributeNS(null, 'y1', y1);
	line.setAttributeNS(null, 'x2', x2);
	line.setAttributeNS(null, 'y2', y2);

	var start_circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
	start_circle.setAttributeNS(null, 'class', 'start_circle');
	start_circle.setAttributeNS(null, 'stroke-width', '2');
	start_circle.setAttributeNS(null, 'fill', 'black');
	start_circle.setAttributeNS(null, 'cx', x1);
	start_circle.setAttributeNS(null, 'cy', y1);
	start_circle.setAttributeNS(null, 'r', '10');

	var start_text = document.createElementNS('http://www.w3.org/2000/svg','text');
	start_text.setAttributeNS(null, 'class', 'start_text');
	start_text.setAttributeNS(null, 'alignment-baseline', 'middle');
	start_text.setAttributeNS(null, 'text-anchor', 'middle');
	start_text.setAttributeNS(null, 'fill', 'white');
	start_text.setAttributeNS(null, 'x', x1);
	start_text.setAttributeNS(null, 'y', y1);

	var end_circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
	end_circle.setAttributeNS(null, 'class', 'end_circle');
	end_circle.setAttributeNS(null, 'stroke-width', '2');
	end_circle.setAttributeNS(null, 'fill', 'black');
	end_circle.setAttributeNS(null, 'cx', x2);
	end_circle.setAttributeNS(null, 'cy', y2);
	end_circle.setAttributeNS(null, 'r', '10');

	var end_text = document.createElementNS('http://www.w3.org/2000/svg','text');
	end_text.setAttributeNS(null, 'class', 'end_text');
	end_text.setAttributeNS(null, 'alignment-baseline', 'middle');
	end_text.setAttributeNS(null, 'text-anchor', 'middle');
	end_text.setAttributeNS(null, 'fill', 'white');
	end_text.setAttributeNS(null, 'x', x2);
	end_text.setAttributeNS(null, 'y', y2);

	$newLic.append(line);
	$newLic.append(start_circle);
	$newLic.append(start_text);
	$newLic.append(end_circle);
	$newLic.append(end_text);
});



//*********************del button 클릭시 하위레벨의 라인 desc 삭제**********************//
$(document).on('click','.del_line',function(){
	alert('하위 레벨까지 모두 삭제됩니다. 정말 삭제하시겠습니까?');
	var $ldb = $(this).parent().parent().parent();
	var step = $ldb.attr('step');
	var key= $ldb.attr('key');

	var $allLdb = $(document).find('.line-desc-bunch');
	var $lic = null;
	var $allLic = $(document).find('.line-in-canvas');


	//desc remove
	$ldb.remove();


	//line remove
	for(var i=0;i<=$ldb.find('.line-desc-bunch').length;i++){
		for(var k=0;k<$allLic.length;k++){
			if($ldb.find('.line-desc-bunch').eq(i).attr('key')==$allLic.eq(k).attr('key')){
				$allLic.eq(k).remove();

			}
			else if($ldb.attr('key')==$allLic.eq(k).attr('key')){
				$allLic.eq(k).remove();

			}
		}
	}
});

//*********************라인의 위치 이동**********************//\

var dragging = false;
var $lineTarget;

$(document).on('mousedown','g.line-in-canvas',function(e){
	dragging = true;
	$lineTarget = $(this);
});



$(document).on('mousemove',document,function(e){
	var $allLdb = $(document).find('.line-desc-bunch');
	var $allLic = $(document).find('.line-in-canvas');
	var $descTarget;
	var ix, iy;

	if(dragging){

		for(var i=0;i<$allLdb.length;i++){
			if($lineTarget.attr('key')==$allLdb.eq(i).attr('key')){
				$descTarget = $allLdb.eq(i);
				break;
			}
		}

		if(parseInt($lineTarget.attr('step'))%2==0){
			ix = parseInt(e.offsetX) - parseInt($lineTarget.find('line.line').attr('x1'));

			$lineTarget.find('line.line').attr({'x1':e.offsetX,'x2':e.offsetX});
			$lineTarget.find('circle.start_circle').attr({'cx':e.offsetX});
			$lineTarget.find('text.start_text').attr({'x':e.offsetX});
			$lineTarget.find('circle.end_circle').attr({'cx':e.offsetX});
			$lineTarget.find('text.end_text').attr({'x':e.offsetX});

			//alert($descTarget.find('.line-desc-bunch').length);

			for(var k=0;k<$descTarget.find('.line-desc-bunch').length;k++){
				for(var i=0;i<=$allLic.length;i++){
					if($descTarget.find('.line-desc-bunch').eq(k).attr('key')==$allLic.eq(i).attr('key')){
						//alert($allLic.eq(k).attr('step'));

							var originX1 = $allLic.eq(i).find('line.line').attr('x1');
							var originX2 = $allLic.eq(i).find('line.line').attr('x2');

							$allLic.eq(i).find('line.line').attr({'x1':parseInt(originX1)+ix,'x2':parseInt(originX2)+ix});
							$allLic.eq(i).find('circle.start_circle').attr({'cx':parseInt(originX1)+ix});
							$allLic.eq(i).find('text.start_text').attr({'x':parseInt(originX1)+ix});
							$allLic.eq(i).find('circle.end_circle').attr({'cx':parseInt(originX2)+ix});
							$allLic.eq(i).find('text.end_text').attr({'x':parseInt(originX2)+ix});
					}
				}
			}
		}

		else{
			iy = parseInt(e.offsetY) - parseInt($lineTarget.find('line.line').attr('y1'));

			$lineTarget.find('line.line').attr({'y1':e.offsetY,'y2':e.offsetY});
			$lineTarget.find('circle.start_circle').attr({'cy':e.offsetY});
			$lineTarget.find('text.start_text').attr({'y':e.offsetY});
			$lineTarget.find('circle.end_circle').attr({'cy':e.offsetY});
			$lineTarget.find('text.end_text').attr({'y':e.offsetY});

			//alert($descTarget.find('.line-desc-bunch').length);

			for(var k=0;k<$descTarget.find('.line-desc-bunch').length;k++){
				for(var i=0;i<=$allLic.length;i++){
					if($descTarget.find('.line-desc-bunch').eq(k).attr('key')==$allLic.eq(i).attr('key')){

							var originY1 = $allLic.eq(i).find('line.line').attr('y1');
							var originY2 = $allLic.eq(i).find('line.line').attr('y2');

							$allLic.eq(i).find('line.line').attr({'y1':parseInt(originY1)+iy,'y2':parseInt(originY2)+iy});
							$allLic.eq(i).find('circle.start_circle').attr({'cy':parseInt(originY1)+iy});
							$allLic.eq(i).find('text.start_text').attr({'y':parseInt(originY1)+iy});
							$allLic.eq(i).find('circle.end_circle').attr({'cy':parseInt(originY2)+iy});
							$allLic.eq(i).find('text.end_text').attr({'y':parseInt(originY2)+iy});
					}
				}
			}
		}
	}
});

$(document).on('mouseup',document,function(e){
	if(dragging){
		dragging = false;
	}
});