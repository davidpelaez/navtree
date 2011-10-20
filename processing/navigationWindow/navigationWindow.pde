import processing.opengl.*;
import controlP5.*;
import peasy.*;


void setup() {  
  createNavigableSketch();
}

void draw() {
  //Prepare the space
  myBackground();
  hint(ENABLE_DEPTH_TEST); //Draw everything on top of the last thing
  cam.feed();
  //REady to draw in navigable space
  fill(255, 0, 0);
  ellipse(0, 0, 100, 100);   //Sample object in the space
  fill(0, 255, 0);
  ellipse(100, 100, 100, 100);   //Sample object in the space
  fill(0, 0, 255);
  ellipse(900, 200, 100, 100);   //Sample object in the space
  //Disable the zbuffer, allowing you to draw on top of everything at will. Here's where the GUI is drawn
  hint(DISABLE_DEPTH_TEST); 
  gui();
}

