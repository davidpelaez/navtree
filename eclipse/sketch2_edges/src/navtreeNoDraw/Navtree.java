package navtreeNoDraw;

import java.io.*;
import processing.core.*;
import org.json.*;

public class Navtree {

	public java.util.HashMap<Integer, Node> nodeTable;
	public Node[] nodes = new Node[100];
	public Edge[] edges = new Edge[500];
	public int nodeCount = 0, edgeCount = 0;
	public PApplet applet;


	Navtree(PApplet _applet) {
		applet = _applet;
		nodeTable = new java.util.HashMap<Integer, Node>();
		String[] myJsonStrings = loadFile("data/myNavtree.json");		
		String jsonLine;
		JSONObject jsonData;
		for (int i = 0; i < myJsonStrings.length; i++) {
			jsonLine = myJsonStrings[i];
			try {
				jsonData = new JSONObject(jsonLine);
				addNode(jsonData);
			} catch (JSONException e) {
				System.out.println("There was an error parsing the JSONObject.");
				System.out.println(e);
			}
		} // Line read ends. All nodes in memory
			// Point all edges to its nodes and all nodes to its parent node.
		shrinkArrays();
		for (int i = 0; i < nodeCount; i++) {
			nodes[i].pointToParent();
		}
		for (int i = 0; i < edgeCount; i++) {
			edges[i].pointToNodes();
		}
		System.out.println("NodeCount = " + nodeCount);
		System.out.println("EdgeCount = " + edgeCount);
	}// Constructor ends
	
	protected void shrinkArrays(){
		
	}

	protected void addEdge(int fromId, int toParentId) {
		Edge e = new Edge(this, fromId, toParentId);
		if (edgeCount == edges.length) {
			edges = (Edge[]) PApplet.expand(edges);
		}
		edges[edgeCount++] = e;
	}

	protected void addNode(JSONObject nodeData) {
		Node node = new Node(this, nodeData);
		if (nodeCount == nodes.length) {
			nodes = (Node[]) PApplet.expand(nodes);
		}
		nodeTable.put(node.id, node);
		if (!node.isRoot()) {
			addEdge(node.id, node.parentId);
		}
		nodes[nodeCount++] = node;
	}

	// TODO: Modify the behaviour because all nodes will be added when find is
	// to be used

	public Node findNode(int id) {
		Node n = (Node) nodeTable.get(id);
		if (n == null) {
			throw new RuntimeException("The requested node isn't registered. Possible bug or Json Navtree integrity error.");
		}
		return n;
	}

	/*
	 * Load file and return it as an array of strings
	 */
	protected String[] loadFile(String path) {
		java.util.ArrayList<String> fileLines = new java.util.ArrayList<String>();
		String[] lines = null;
		try {
			// Open the file that is the first
			// command line parameter
			FileInputStream fstream = new FileInputStream(path);
			// Get the object of DataInputStream
			DataInputStream in = new DataInputStream(fstream);
			BufferedReader br = new BufferedReader(new InputStreamReader(in));
			String strLine;
			// Read File Line By Line
			while ((strLine = br.readLine()) != null) {
				// Print the content on the console
				fileLines.add(strLine);
			}
			// Close the input stream
			in.close();
			lines = fileLines.toArray(new String[1]);
		} catch (Exception e) {// Catch exception if any
			System.err.println("Error: " + e.getMessage());
		}
		return lines;
	}

}
