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


void setup() {
  size(850, 700);
  navtree = new Navtree(); 
  println(navtree.getTimespanDays() + " days in tree");
  //java.util.Date time = new java.util.Date();
  //time.setDate(1280512800);
  
}

void draw() {
  background(255);
}

