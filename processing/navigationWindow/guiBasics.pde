ControlGroup consoleGroup, toolsGroup, statusGroup;
Textarea console;

int minDistance = 600, maxDistance = 2500; //600 is almos real size as indicated in the drawing 2d commands, that means that an ellipse of 100px appears like 100px in screen at 600 of distance
int consoleGroupX, consoleGroupY;
PMatrix3D currCameraMatrix;
PGraphics3D g3; 
ControlP5 controlP5;
PeasyCam cam;
PImage bg;
/*left-drag to rotate 
 mouse wheel, or right-drag up and down to zoom 
 middle-drag (cmd-left-drag on mac) to pan 
 double-click to reset*/
color GROUP_BACKGROUND, TEXT_COLOR;

public void setupGUI() {
  setupColors();
  //Load the controlP5 interface
  controlP5 = new ControlP5(this);
  controlP5.setAutoDraw(false);
  createGroups();
  createControllers();
  //Load Background
  bg = loadImage("bg.png");
}

public void setupColors() {
  TEXT_COLOR = color(100);//Dark gray
  GROUP_BACKGROUND = color(200, 200, 200, 200); //Light gray 200 Opacity
}


public void setupCam() {
  g3 = (PGraphics3D)g; //Used by ControlP5
  cam = new PeasyCam(this, 100); //Look at distance 100. 
  cam.setMinimumDistance((double)minDistance);
  cam.setMaximumDistance((double)maxDistance);
  cam.setLeftDragHandler(null);
  cam.setRightDragHandler(null);
}

public void recordCurrentCamera() {
  currCameraMatrix = new PMatrix3D(g3.camera);
  camera();
}

public void restoreCamera() {
  g3.camera = currCameraMatrix;
}

void gui() {
  recordCurrentCamera();
  //Keep the slider and the cam distance synced
  Controller zoom = controlP5.controller("zoom");
  if (!zoom.isInside()) {
    zoom.setBroadcast(false);
    zoom.setValue((int)cam.getDistance()); 
    zoom.setBroadcast(true);
  }
  controlP5.draw();
  restoreCamera();
}

/*
DEFINE THE BASIC GUI ELEMENTS TO CONTROL THE SPACE:
 1. A group for feedback in the bottom of the window.
 2. A group on the top for the tools.
 3. A status bar in the bottom of the window for basic info
 */

public void createGroups() { //All items are 10px away from the border of the window
  toolsGroup = controlP5.addGroup("tools", 10, 20); 
  statusGroup = controlP5.addGroup("status", 0, height-170);
  consoleGroupX = 10;
  consoleGroupY = height-75;
  consoleGroup = controlP5.addGroup("console", consoleGroupX, consoleGroupY);  
  //Make the groups trigger events
  toolsGroup.activateEvent(true);  
  statusGroup.activateEvent(true); 
  consoleGroup.activateEvent(true);
  //Color the background of the groups
  statusGroup.setBackgroundColor(GROUP_BACKGROUND);
  toolsGroup.setBackgroundColor(GROUP_BACKGROUND);
  consoleGroup.setBackgroundColor(GROUP_BACKGROUND);
  //Show the background
  statusGroup.setBackgroundHeight(65);
  toolsGroup.setBackgroundHeight(65);
  consoleGroup.setBackgroundHeight(65);
  //Set the width
  consoleGroup.setWidth(width-20);
}

public void   createControllers() {
  int distance = (int)cam.getDistance();
  controlP5.addSlider("zoom", minDistance, maxDistance, distance, width-205, 20, 170, 10).setColorCaptionLabel(TEXT_COLOR); //def, x, y, w,h .setGroup(toolsGroup);
  int _width = consoleGroup.getWidth()-18;
  int _height = consoleGroup.getBackgroundHeight()-10;

  console = controlP5.addTextarea( "console_textarea", "-", consoleGroupX + 5, consoleGroupY+5, _width, _height);
  console.setColor(TEXT_COLOR);
}

void console(boolean a) {
  println("UNO");
}

public void zoom(int value) {
  cam.setDistance(value, 1000);
}

void controlEvent(ControlEvent theEvent) {
  if (theEvent.isGroup()) {
    //println("got an event from group "+theEvent.group().name()+", isOpen? "+theEvent.group().isOpen());
    if (theEvent.group() == consoleGroup) {
      //Toggle on/off the console when the group is clicked
      if (console.isVisible()) { 
        console.hide();
        consoleGroup.setPosition(consoleGroupX, height-10);
      }
      else { 
        console.show();
        consoleGroup.setPosition(consoleGroupX, consoleGroupY);
      }
    }
  }
  else if (theEvent.isController()) {
    println("got something from a controller "+theEvent.controller().name());
  }
}

public void toConsole(Object msg) {
  String current = console.text();
  console.setText(msg.toString() + "\n" + current);
}

public void myBackground() {
  recordCurrentCamera();
  background(100);
  image(bg, 0, 0);
  restoreCamera();
}

