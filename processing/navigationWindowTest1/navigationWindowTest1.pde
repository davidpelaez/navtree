import com.nootropic.processing.layers.*;

import processing.opengl.*;
import controlP5.*;
import peasy.*;
import org.json.*; 

int maxTreeWidth;
int yBase = height/2; //The line that constains all the roots (trunk)
public Navtree navtree;
int margin = 25; //The minimun distance fromt the start and the end of the window


void setup() {  
  size(1000, 400, OPENGL); //This allows us to use PEASY. Just draw like it was regular 2d.   
  createNavigableSketch();
  maxTreeWidth = width;
  navtree = new Navtree(); 
  toConsole(navtree.getTimespanDays() + " days in tree");
  frameRate(12); //Reduces memory ocnsumtion?
  //Slider to control the width of the tree
  controlP5.addSlider("treeWidth", width-20, 4500, width-20, width-505, 10, 170, 10).setColorCaptionLabel(TEXT_COLOR); //def, x, y, w,h .setGroup(toolsGroup);
}

void draw() {
  //Prepare the space
  myBackground();
  hint(ENABLE_DEPTH_TEST); //Draw everything on top of the last thing
  cam.feed();
  //REady to draw in navigable space
  myDraw();
  //Your draw ends here
  //Disable the zbuffer, allowing you to draw on top of everything at will. Here's where the GUI is drawn
  hint(DISABLE_DEPTH_TEST); 
  gui();
}

public void myDraw() {
  /*  scale(2);
   translate(0, -(height/3));
   background(255);*/
  noStroke();
  Node theRoot;
  //Draw the roots and all their subtrees

  for (int i=0; i < navtree.roots.size(); i++) {
    theRoot = (Node)navtree.roots.get(i);

    theRoot.drawNode();

    //theRoot.drawSubtree();
  }
}

public void treeWidth(int value) {
  maxTreeWidth = value;
}

