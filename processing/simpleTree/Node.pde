class Node {

  public int id, parent, extra;
  public int date;
  public String url;
  public int[] children=null; //Array with the ids of the children
  public boolean root, hasChildren;
  public Navtree navtree;


  Node(Navtree ntree, int nid, String nurl, int nparent, boolean nroot, int nextra, int ndate, boolean nhasChildren, String nchildren) {
    id = nid;   
    url = nurl;
    parent = nparent;
    root = nroot;
    hasChildren = nhasChildren;

    extra = nextra;
    date = ndate; //This comes as unix time because it's easier to use to create the graph
    navtree = ntree;

    if (nchildren.length()>0) {

      String[] splitted = nchildren.split(",");



      children = new int[splitted.length];
      for (int i=0;i<children.length;i++) {
        children[i] = Integer.parseInt( splitted[i].trim() );
      }
    }//Array of children ids ends
  }

  public boolean isRoot() {
    return root;
  }

  public Date getDate() {
    Date time = new Date();
    time.setTime((long)date*1000);
    return time;
  }

  //The position that the node should have in the graph in X
  public float getX() {
    int y2_y1 = (width-margin)-(margin);

    int x2_x1 = (navtree.dateDelta)-(0); //Only for clarity purposes!


    double mx = getDelta()*y2_y1/x2_x1;

    int x = (int)mx + margin;


    return x;
  }

  //The position that the node should have in the graph in Y
  public float getY() {
    return height/2;
  }

  //Draw the representation of the node
  public void drawNode(int angle) { //THE ANGLE is to control branching, so that there's no node overlapping
    stroke(0, 255, 0);
    if (!root) {
      drawConnection();
    }
    //TODO draw node

    //println(getDelta());
    if (root) {
      if (hasChildren) {
        fill(0);
      }
      else {
        fill(0, 0, 255);
      }
    }
    else {
      fill(255, 0, 0);
    }
    noStroke();
    ellipse(getX(), getY()+angle, 2, 2);
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
        println("-----");
        println(parent);
        println(navtree.nodes.containsKey(parent));
        //println(navtree.nodes.keySet());
        println(this);
        println(theParent);
        line(getX(), getY()+50, theParent.getX(), theParent.getY());
        noStroke();
      }
    }
    catch(NullPointerException e) {
      //println("Couldn't find parent with id "+parent);
    }
  }

  //Draws all the nodes that are children of this one NOT including this node of course
  public void drawSubtree() {
    Node theChild;
    if (children != null) {
      for (int i=0;i<children.length;i++) {
        theChild = (Node)navtree.nodes.get(children[i]);
        theChild.drawNode(50);
      }
    }
  }//Subtree drawing ends
}

