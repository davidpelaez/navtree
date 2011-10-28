package trash;

import processing.core.*;
import java.util.*;   

import org.json.*;
import java.io.*;

public class Navtree2 {
	
public SimpleTree applet;


  int dateDelta = 0;



  public int maxDate, minDate; //This is to find what span of time's being graphed
  public Node oldestNode, youngestNode;

  Navtree2(SimpleTree _parent) {
	  applet = _parent;
    
    System.out.println(myJsonStrings.length + " nodes Loaded");
    String theLine;

    
    for (int i=0; i < myJsonStrings.length; i++) {
      theLine = myJsonStrings[i];    
      try {
        //For each line there's the Json of a node.
        //Read the node
        
        
        
        
        //Is this is the first node in the tree, then set that node's date as the reference point & avoid nullPointer
        if (i==0) {
          maxDate = date;
          minDate = date;
        }
        compareDate(date);
        
       
    }//Tree mapping in memory ends
    System.out.println(nodes.size());
    //applet.toConsole(nodes.size() + " nodes");
    dateDelta = (maxDate-minDate); //SHOU

  } //Constuctor ends


  public void compareDate(int theDate) {
    //The date is bigger
    if (theDate>maxDate) {
      maxDate = theDate;
    }
    //The date is smaller that the one recorded so far
    if (theDate<minDate) {
      minDate = theDate;
    }
  }//CompareDate ends

  public Date getMaxDate() {
    Date time = new Date();
    time.setTime((long)maxDate*1000);
    return time;
  }

  public Date getMinDate() {
    Date time = new Date();
    time.setTime((long)minDate*1000);
    return time;
  }

  //Get the difference in second the max and the min date  
  public int getTimespanSeconds() {
    // Get msec from each, and subtract.
    long diff = getMaxDate().getTime() - getMinDate().getTime();
    return (int)(diff/1000);
    //Thanks to http://bit.ly/qqpd5e
  }

  public int getTimespanDays() {
    return getTimespanSeconds()/86400;
  }
  
  
  
  
  
  
  
}
