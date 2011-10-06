class Node{
  
  public int id, parent, extra,date;
  public String url, children;
  public boolean root, hasChildren;
  public Navtree navtree;
  

 Node(Navtree ntree,int nid,String nurl,int nparent,boolean nroot,int nextra, int ndate, boolean nhasChildren, String nchildren){
   id = nid;   
   url = nurl;
   parent = nparent;
   root = nroot;
   hasChildren = nhasChildren;
   children = nchildren;
   extra = nextra;
   date = ndate; //This comes as unix time because it's easier to use to create the graph
 }
 
 public boolean isRoot(){
   return root;
 }
 
 public Date getDate(){
  Date time = new Date();
  time.setTime((long)date*1000);
  return time;
 }
  
}
