package navtreeNoDraw;

import trash.Navtree2;
import controlP5.ControlEvent;

public class SimpleTree extends navigable.NavigableSketch {
	
	Navtree navtree;
	
	public void myDraw(){
		
	}
	
	public void mySetup(){
		navtree = new Navtree(this);		
	}
	
	
	@Override
	public void controlEvent(ControlEvent theEvent) {
		super.controlEvent(theEvent);
	}
}
