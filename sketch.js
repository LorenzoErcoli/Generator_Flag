let url = [
  //https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51",
  //"https://coolors.co/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226",
  "https://coolors.co/9b5de5-f15bb5-fee440-00bbf9-00f5d4-001219-005f73-0a9396-94d2bd-e9d8a6",
];

let list_shapevalue = []
let animation = false;
let instant_fc = 0;
let deltaframeCount = 0;
let f_animation = 0
let stop_frame = 0
let deltastop =  0
let start_stop_frame = 0




function setup() {

	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	num_shape = int(random(1,4))
	for (ns = 0; ns < num_shape; ns++){
		shapevalue = randomvalue(ns)
		append(list_shapevalue, shapevalue)
	}
}


function draw() {

	//resize flags
	var w = window.innerWidth;
	var h = window.innerHeight;
	c = createCanvas(w, h);

	clear();
	palette = createPalette(random(url), 100);
	background(0, 0, 0);
	blendMode(ADD);

	backpattern(w,h,100)
	drawflag(w,h)

}






function randomvalue(num_inc){

	l_incshape = [1,0.8,0.5,0.3,0.2]



	x_sft = int(random(-window.innerWidth/4,window.innerWidth/4))
	side_sh = int(random(1,600))* l_incshape[num_inc]
	d_degree = int(random(90))
	type_shape = int(random(5))
	n_rot = int(random(1,8))

	end_point = int(random(-window.innerWidth/2,window.innerWidth/2))
	freq = int(random(1,8))

	n_color = int(random(0,8))

	return shapevalue = [x_sft, side_sh, d_degree, type_shape, n_rot, end_point, freq ,n_color]

}




function drawflag(w,h){

	for (dns = 0; dns < num_shape; dns++){
		kalShape(list_shapevalue[dns][0],list_shapevalue[dns][1],list_shapevalue[dns][2],list_shapevalue[dns][3],list_shapevalue[dns][4],w,h,animation,instant_fc)
	}

}


function kalShape(x_sft,side_sh,d_degree,type_shape,n_rot,w,h,animation,deltaframeCount){

	push()
		translate(w/2, h/2)
		indexcolor = list_shapevalue[dns][7]
		stroke(palette[indexcolor]);
		strokeWeight(8)

		drawingContext.shadowBlur = 20;
		drawingContext.shadowColor = color(palette[indexcolor]);

		if (animation == true){
			deltaframeCount = animationinc(instant_fc)
			f_animation = deltaframeCount *0.1

		} else if (animation == false){
			f_animation = f_animation
		}




		for (ddeg = 0; ddeg < n_rot; ddeg++){
			push()
			rotate(360/n_rot*ddeg + d_degree + f_animation)
			drawRandomShape(x_sft + f_animation * 10 ,0, side_sh + f_animation * 2 ,side_sh + f_animation * 2, type_shape)
			shape_propagation(x_sft , 0, side_sh + f_animation * 10 ,side_sh , type_shape, list_shapevalue[dns][5] , list_shapevalue[dns][6])
			pop()
		}
	pop()
}



function shape_propagation(x, y, w, h, shape_num, end_point, freq){

	c_point = -(end_point - x) 
	d_shift = (end_point) / freq
	d_w_side = w / freq
	d_h_side = h / freq

	for (xsp = 0; xsp < freq; xsp++){
		drawRandomShape(  c_point+(d_shift*xsp), y, d_w_side*xsp, d_h_side*xsp, shape_num)
	}


}




function drawRandomShape(x, y, w, h, shape_num) {
  switch (shape_num) {
    case 0:
      ellipse(x, y, w, h)
      break;
    case 1:
      rectMode(CENTER)
      rect(x, y, w, h)
      break;
  	case 2:
  		push()
  		polygon(x, y, w, 3);
  		pop()
  	break;
  	case 3:
  		push()
  		polygon(x, y, w, 6);
  		pop()
  	break;
  	case 4:
  		push()
  		ellipse(x, x, w, w/2)
  		pop()
  	break;
  	}
}




function polygon(x, y, radius, npoints) {


  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}








function backpattern(w,h,side_sq){


	push();

	w_marg = w % side_sq
	h_marg = h % side_sq

	w_inc = (w - w_marg)/side_sq
	h_inc = (h - h_marg)/side_sq

	var wdp = 2

	for (wx = 1; wx < w_inc; wx++){
		for (hx = 1; hx < h_inc; hx++){

			strokeWeight(1)
			stroke(palette[4]);
			drawingContext.shadowBlur = 30;
			drawingContext.shadowColor = color(palette[4]);
			noFill(0);
			ellipse((side_sq*wx - wdp/2 + w_marg/2), (side_sq*hx  - wdp/2 + h_marg/2), wdp, wdp)

		}
	}

}


function createPalette(_url, percent = 100) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = color('#' + arr[i] + hex(int(percent / 100 * 255), 2));
  }
  return arr;
}



function animationinc(instant_fc){

	deltaframeCount =  frameCount - instant_fc 
	return deltaframeCount

}




function keyPressed() {
	if (keyCode === BACKSPACE) {
		saveCanvas('/flags', 'jpg');
	} else if (keyCode === ENTER){
		list_shapevalue = []
		shapevalue = []
		setup()

	} else if (keyCode === SHIFT){
		if (animation == false){

			end_stop_frame = frameCount
			stop_frame = stop_frame + (end_stop_frame - start_stop_frame)

			instant_fc = stop_frame 
			animation = true;



		} else if (animation == true){

			start_stop_frame = frameCount
			animation = false;


		}

	}
}



function mouseClicked() {
 print("mi")
}