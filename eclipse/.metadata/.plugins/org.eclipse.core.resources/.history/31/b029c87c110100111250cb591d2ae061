package navtreeNoDraw;

import java.util.Date;

import org.json.JSONObject;

public class Node {
	public static final int NULL_PARENT = -1;
	public int id, parentId, extra;
	public int unixDate;
	public String url;
	public int[] children = null; // Array with the ids of the children
	public boolean isRoot, hasChildren;
	public Navtree navtree;
	public Node parent;
	
	Node(Navtree _navtree, JSONObject nodeData){
		JSONNodeReader jNode = new JSONNodeReader(nodeData);
		navtree = _navtree;
		build(jNode.id,jNode.url,jNode.parentId,jNode.isRoot,jNode.extra,jNode.unixDate,jNode.hasChildren,jNode.childrenIds);
	}

	public void build(int _id, String _url, int _parentId, boolean _isRoot, int _extra, int _unixDate, boolean _hasChildren, String _childrenIds) {
		id = _id;
		parentId = _parentId;
		isRoot = _isRoot;
		extra = _extra;
		unixDate = _unixDate;
		hasChildren = _hasChildren;
		// Process children IDS
		if (_childrenIds.length() > 0) {
			String[] splitted = _childrenIds.split(",");
			children = new int[splitted.length];
			for (int i = 0; i < children.length; i++) {
				children[i] = Integer.parseInt(splitted[i].trim());
			}
		}

	}// Constructor ends
	
	public void pointToParent(){
		if(!isRoot){
			parent = navtree.findNode(parentId);
		}
	}

	public boolean isRoot() {
		return isRoot;
	}

	public boolean hasChildren() {
		return hasChildren;
	}

	public Date getDate() {
		Date time = new Date();
		time.setTime((long) unixDate * 1000);
		return time;
	}

	public void draw() {

	}

}
