package navtree;

import controlP5.ControlEvent;
import processing.core.*;
import peasy.*;

public class SimpleTree extends PApplet {

	public PeasyCam cam;
	Navtree navtree;
	int minDistance = 300, maxDistance = 4500; 

	public void setup() {
		/*
		 * size(1000, 400); smooth(); frameRate(12); // Reduces memory
		 * ocnsumtion?
		 */
		size(1000, 400, P3D); // This allows us to use PEASY. Just draw like
									// it was regular 2d.
		frameRate(12); // Reduces memory ocnsumtion?
		cam = new PeasyCam(this, 100); // Look at distance 100.
		cam.setMinimumDistance((double) minDistance);
		cam.setMaximumDistance((double) maxDistance);
		cam.setLeftDragHandler(null);
		cam.setRightDragHandler(null);
		navtree = new Navtree(this);
	}

	public void draw() {
		cam.feed();
		background(255);
		navtree.draw();
	}

}
