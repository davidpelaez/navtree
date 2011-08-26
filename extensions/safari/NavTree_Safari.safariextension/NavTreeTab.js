

/*Definition of the class to keep all the information needed for the tab in sync with the server*/
function NavTreeTab(theSafariTab){
	this.tab = theSafariTab;
	this.edgeId = null; //This will be used for the next sync to track ancestry
	this.url = theSafariTab.url;
	this.extra = 1; //This is where the behaviour is tracked as the product of all the applicable behaviours
	
	this.syncWithServer = function(){return true;};
	this.synced = false;
	this.timeStamp = theSafariTab.timeStamp; //Should I keep this?   
}