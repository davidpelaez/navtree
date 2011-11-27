package navtreeWheat;

import controlP5.*;
import processing.core.*;
import myCam2D.*;

public class SimpleTree2D extends PApplet {
	
	Navtree navtree;
	MyCam cam;
	float zoom = 1, tx = 0, ty = 0;
	ControlP5 controlP5;
	ControlWindow controlWindow;

	public void setup() {	
		size(1250, 550);
		frameRate(12);
		navtree = new Navtree(this);
		smooth();
		setupGui();
		cam = new MyCam(this);
		int times = 10;
		System.out.println("Updating tree " + times +  " times before initial draw");		
		for(int i=0; i<times;i++){
				navtree.update();
				System.out.println(100*i/times + "%");
		}
		System.out.println("Drawing begins");
	}

	public void draw() {
		background(51,51,51);
		pushMatrix();
		cam.feed();
		scale(zoom);
		translate(tx, ty);
		navtree.draw();
		popMatrix();
		controlP5.draw();
	}
	
	public void setupGui() {
		controlP5 = new ControlP5(this);
		controlP5.setAutoDraw(false);
		controlWindow = controlP5.addControlWindow("controlP5window", 100, 100, 250, 500);
		controlWindow.hideCoordinates();
		createControllers();
	}

	public void createControllers() {		
		controlP5.addButton("pause",0,40,130,80,19).moveTo(controlWindow);
		controlP5.addButton("showGuides",0,40,160,80,19).moveTo(controlWindow);		
		controlWindow.setTitle("controls");
	}
	
	public void pause(){
		navtree.update = !navtree.update ;
	}
	
	void customize(DropdownList ddl) {
		  ddl.setBackgroundColor(color(190));
		  ddl.setItemHeight(20);
		  ddl.setBarHeight(15);
		  ddl.captionLabel().set("pulldown");
		  ddl.captionLabel().style().marginTop = 3;
		  ddl.captionLabel().style().marginLeft = 3;
		  ddl.valueLabel().style().marginTop = 3;
		  for(int i=0;i<80;i++) {
		    ddl.addItem("item "+i,i);
		  }
		  ddl.setColorBackground(color(60));
		  ddl.setColorActive(color(255,128));
		}
	
	public void controlEvent(ControlEvent theEvent) {
		  // PulldownMenu is if type ControlGroup.
		  // A controlEvent will be triggered from within the ControlGroup.
		  // therefore you need to check the originator of the Event with
		  // if (theEvent.isGroup())
		  // to avoid an error message from controlP5.

		  if (theEvent.isGroup()) {
		    // check if the Event was triggered from a ControlGroup
		    println(theEvent.group().value()+" from "+theEvent.group());
		  } else if(theEvent.isController()) {
		    println(theEvent.controller().value()+" from "+theEvent.controller());
		  }
		}


}
