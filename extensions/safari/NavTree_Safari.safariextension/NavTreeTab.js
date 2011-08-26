

/*Definition of the class to keep all the information needed for the tab in sync with the server*/
function NavTreeTab(theSafariTab){  
  	var myNavTreeTabParent = this;   
	this.tab = theSafariTab;
	this.edgeId = null; //This will be used for the next sync to track ancestry
	this.url = theSafariTab.url;
	this.extra = 1; //This is where the behaviour is tracked as the product of all the applicable behaviours
	
	this.syncWithServer = function(){return true;};
	this.synced = false;
	this.onTimer = false; //Use this to track if the Nav is giving time for a Nav Event to happen
	this.stamp = randomString(10); //This is used by the queue to ensure that a record is posted 5 secs after the record
	
	this.beginTimer = function(){
		myNavTreeTabParent.onTimer = true;
		setTimeout(function(){myNavTreeTabParent.sync();},2000);
	};
	this.sync = function(){
		console.log("The tab is being synched");
		myNavTreeTabParent.synced = true;
		
	};

}