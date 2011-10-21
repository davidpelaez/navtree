package trash;
import java.util.Date;
import processing.core.*;
public class Node2 {
	

	  
	

	  public Node getParent() {
	    return (Node)navtree.nodes.get(parent);
	  }

	 

	  
	  //The position that the node should have in the graph in X
	  public float getX() {
		  
	    int y2_y1 = (navtree.applet.maxTreeWidth-margin)-(margin);

	    int x2_x1 = (navtree.dateDelta)-(0); //Only for clarity purposes!


	    double mx = getDelta()*y2_y1/x2_x1;

	    int x = (int)mx + margin;


	    return x;
	  }

	  //The position that the node should have in the graph in Y
	  //Remember to use X and rotation to determine Y.
	  public float getY() {
	    if (isRoot()) { //All root are on the baseline
	      return yBase;
	    }
	    else {
	      //Changes according to the branching factor
	      Node parentNode = getParent();
	      float _angle = parentNode.getAngle(id);
	      float _x = getX()-parentNode.getX();
	      float _tan = PApplet.tan(PApplet.radians(_angle)); 
	      float _y = (_tan*_x); //Use this angle to caclulate the Y in combination with Y
	      if ( _angle < 0) { 
	        return yBase-_y;
	      }
	      else { 
	        return yBase+_y;
	      }
	    }
	  }

	  //Draw the representation of the node
	  public void drawNode() { 
		  navtree.applet.stroke(0, 255, 0);
	    if (!root) {
	      drawConnection();
	    }
	    //TODO draw node

	    //println(getDelta());
	    if (root) {

	    	navtree.applet.fill(0, 0, 255);
	    }
	    else {
	    	navtree.applet.fill(255, 0, 0);
	    }
	    navtree.applet.noStroke();
	    navtree.applet.ellipse(getX(), getY(), 15, 15);
	    drawSubtree();
	  }

	  public String toString() {
	    return "[" + getX() +", " + getY()+ "]";
	  }

	  //Return how much as an integer is the difference between the date of this node and the max Delta.
	  //The delta explains how far to the right or to the left on the window the node should be.
	  // D=0 means 25 pixels to the write. D=navtree.dateDelta (max possible), mean w-25 to the right, near the border of the window
	  public int getDelta() {
	    return date-navtree.minDate;
	  }

	  //Draw the connection of the node to its parent if it exists
	  public void drawConnection() {
	    try {
	      if (parent != -1) {
	        Node theParent = (Node)navtree.nodes.get(parent);

	        navtree.applet.line(getX(), getY(), theParent.getX(), theParent.getY());
	        navtree.applet.noStroke();
	      }
	    }
	    catch(NullPointerException e) {
	      //println("Couldn't find parent with id "+parent);
	    }
	  }


	  //Tell to a child how much it should bend. The function calculates on what portion of 110 radius it should appear. 
	  //The node should rotate that accordingly to its X before DRAWING
	  //Returns DEGREES
	  public float getAngle(int id) {
	    //Locate the child asking
	    Node theChild;
	    int i;
	    for (i=0;i<children.length;i++) {
	      if (children[i] == id) {
	        //theChild = (Node)navtree.nodes.get(children[i]);
	        break;
	      }
	    }
	    //Calculate the angle
	    return (110*i/children.length);
	  }

	  //Draws all the nodes that are children of this one NOT including this node of course
	  public void drawSubtree() {
	    Node theChild;
	    if (children != null) {
	      for (int i=0;i<children.length;i++) {
	        theChild = (Node)navtree.nodes.get(children[i]);
	        theChild.drawNode();
	      }
	    }
	  }//Subtree drawing ends
	}
