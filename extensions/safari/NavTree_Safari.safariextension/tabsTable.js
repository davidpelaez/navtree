

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

function TabsTable(){
	
}   

//Check if the tab is blank or Pointed 
TabsTable.prototype.evalTabURL = function(theTab){jqueryTest();};

//Check if the tab is active or in bg
TabsTable.prototype.evalTabActiveness = function(theTab){};

//Add a new tab to the table after the required event with the extra NEW_TAB and evaluate URL and Activeness
TabsTable.prototype.addTab = function(theNewTab){
		evalTabActiveness(theNewTab);
		evalTabURL(theNewTab); 
		evalWindow(); //Check if the tab is the active in a new window non recorded yet inside windowRecord
		//TODO: Trigger SYNC with server
	};           
                
//Register changes in the URL. (EVERY OLD Tab CHANGING MUST BE ACTIVE, therefore no activeness is evaluated)
TabsTable.prototype.navigateInTab = function(theTab){
			evalTabURL(theTab); //This is evaluated because it's possible to hit back or have a shortcut to an blank url.
		};

//This is not tracked in the server but keeps the table clean once a tab has been closed
TabsTable.prototype.removeTab = function(theClosedTab){

	};
	
	
