/***
 Simple Tree representing the Navtree loaded as a Json File. 
 David Pelaez Tamayo - hello@davidpelaez.me - October 2011. 
 http://growanavtree.com
 
 Thanks to Jer Thorp for the Json Library Pack
 http://www.blprnt.com/processing/json.zip 
 
 IMPORTANT: For practical reasons, the Json library is inside this sketch. No need to install for the sketch to run.
 ***/

/**/
import org.json.*; 


public Navtree navtree;
int margin = 25; //The minimun distance fromt the start and the end of the window


void setup() {
  size(850, 700);
  navtree = new Navtree(); 
  println(navtree.getTimespanDays() + " days in tree");
  //java.util.Date time = new java.util.Date();
noLoop();
  
}

void draw() {
  background(255);
  Node theRoot;
  //Draw the roots and all their subtrees

  for(int i=0; i < navtree.roots.size(); i++){
    theRoot = (Node)navtree.roots.get(i);
      fill(0);
    theRoot.drawNode(0);
          fill(100);
    theRoot.drawSubtree();
  }
}

