package navtreeContrainedXY;

import org.json.JSONException;
import org.json.JSONObject;

/*
 * This class has a series of  methods that read information from JSON data to make the Navtree class easier to read 
 */

public class JSONNodeReader {

	JSONObject nodeData;
	public int id, parentId, extra, depth;
	public int unixDate;
	public String url, childrenIds;
	public boolean isRoot, hasChildren;

	JSONNodeReader(JSONObject _nodeData) {
		nodeData = _nodeData;
		try {
			id = (Integer) ((Number) nodeData.get("id")).intValue();
			depth = (Integer) ((Number) nodeData.get("depth")).intValue();
			try {
				parentId = (Integer) ((Number) nodeData.get("parent")).intValue();
			} catch (ClassCastException e) {
				parentId = Node.NULL_PARENT;
			}
			extra = (Integer) ((Number) nodeData.get("extra")).intValue();
			unixDate = (Integer) ((Number) nodeData.get("date")).intValue();
			try {
				url = (String) nodeData.get("url");
			} catch (ClassCastException e) {
				url = "";
			}
			childrenIds = (String) nodeData.get("children");
			hasChildren = nodeData.getBoolean("has_children");
			isRoot = nodeData.getBoolean("root");
		} catch (JSONException e) {
			System.out.println("There was an error parsing the JSONObject.");
			System.out.println(e);
		}

	}

	/*public int Id() {
		return id;
	}

	public int ParentId() {
		return parentId;
	}

	public int Extra() {
		return extra;
	}

	public int UnixDate() {
		return unixDate;
	}

	public String Url() {
		return url;
	}

	public String Children() {
		return children;
	}

	public boolean HasChildren() {
		return hasChildren;
	}

	public boolean IsRoot() {
		return isRoot;
	}*/

}
