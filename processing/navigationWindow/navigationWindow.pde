import processing.opengl.*;
import controlP5.*;
import peasy.*;


void setup() {  
  size(1000, 700, OPENGL); //This allows us to use PEASY. Just draw like it was regular 2d.   
  setupCam(); 
  setupGUI();
}

void mouseWheel(int delta) {
  println(1);
}




void draw() {

  myBackground();
  hint(ENABLE_DEPTH_TEST); //Draw everything on top of the last thing
  cam.feed();
  fill(255, 0, 0);
  ellipse(0, 0, 100, 100);   //Sample object in the space
  fill(0, 255, 0);
  ellipse(100, 100, 100, 100);   //Sample object in the space
  fill(0, 0, 255);
  ellipse(900, 200, 100, 100);   //Sample object in the space
  //println(cam.getLookAt());
  //println(cam.getDistance());
  hint(DISABLE_DEPTH_TEST); //Disable the zbuffer, allowing you to draw on top of everything at will. Here's where the GUI is drawn
  gui();
}


