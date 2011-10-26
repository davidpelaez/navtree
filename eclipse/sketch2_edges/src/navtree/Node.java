package navtree;

import java.util.Date;

import org.json.JSONObject;
import processing.core.PApplet;

public class Node {
	public static final int NULL_PARENT = -1;
	public int id, parentId, extra;
	public int unixDate;
	public String url;
	public int[] children = null; // Array with the ids of the children
	public boolean isRoot, hasChildren;
	public Navtree navtree;
	public Node parent;
	public float x, y;
	public float dx, dy; // Offset added is nodes are too close
	public PApplet applet;
	public boolean fixedX=false, fixedY=false;
	
	public static int MAX_DELTA = 20;

	Node(Navtree _navtree, JSONObject nodeData) {
		JSONNodeReader jNode = new JSONNodeReader(nodeData);
		navtree = _navtree;
		applet = navtree.applet;
		x = applet.random(applet.width);
		y = applet.random(applet.height);
		build(jNode.id, jNode.url, jNode.parentId, jNode.isRoot, jNode.extra, jNode.unixDate, jNode.hasChildren, jNode.childrenIds);
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
		if(isRoot){
			y = applet.height/2;
			fixY();
			
		}
	}// Constructor ends

	public void pointToParent() {
		if (!isRoot) {
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

	/*
	 * Calculation methods
	 */

	public void relax() {
		float ddx = 0;
		float ddy = 0;
		for (int j = 0; j < navtree.nodeCount; j++) {
			Node n = navtree.nodes[j];
			if (n != this) {
				float vx = x - n.x;
				float vy = y - n.y;
				float lensq = vx * vx + vy * vy;
				if (lensq == 0) {
					ddx += applet.random(1);
					ddy += applet.random(1);
				} else if (lensq < 100 * 100) {
					ddx += vx / lensq;
					ddy += vy / lensq;
				}
			}
		}
		float dlen = PApplet.mag(ddx, ddy) / 2;
		if (dlen > 0) {
			dx += ddx / dlen;
			dy += ddy / dlen;
		}
	}// Relax ends

	void update() {
		if (!fixedX) {
			x += PApplet.constrain(dx, -MAX_DELTA, MAX_DELTA);
			//x = PApplet.constrain(x, 0, applet.width);
		}
		if(!fixedY){
			y += PApplet.constrain(dy, -MAX_DELTA, MAX_DELTA);
			//y = PApplet.constrain(y, 0, applet.height);
		}
		dx /= 2;
		dy /= 2;
	}// Update ends

	void draw() {
		if (isRoot) {
			applet.fill(130,0,0);
		} else {
			applet.fill(255,255,0);
		}
		applet.stroke(0);
		applet.strokeWeight((float)0.5);
		applet.ellipse(x, y, 10, 10);
	}// Draw ends
	
	//Lock the Y position of the node
	public void fixY(){
		fixedY = true;
	}
	
	//Lock the Y position of the node
	public void fixX(){
		fixedX = true;
	}
	
	
}
