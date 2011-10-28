package navtreeWave;

import processing.core.*;
import myCam2D.*;
import controlP5.*;

public class SimpleTreeWave extends PApplet {
	int verticalCenter;

	public PImage bg;
	Navtree navtree;
	MyCam cam;

	float zoom = 1, tx = 0, ty = 0;

	public void setup() {
		bg = loadImage("bg.png");		
		size(1000, 550);
		verticalCenter = height/2;
		navtree = new Navtree(this);		
		frameRate(12);		
		smooth();
		cam = new MyCam(this);
	}

	

	public void draw() {
		background(231, 232, 233);
		image(bg, (width - bg.width) / 2, (height - bg.height) / 2);
		
		pushMatrix();
		cam.feed();
		scale(zoom);
		translate(tx, ty);
		navtree.draw();
		popMatrix();

	}
	
	

	

}
