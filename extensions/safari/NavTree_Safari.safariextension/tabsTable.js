//BEHAVIOUR (aka extra) CONSTANTS
NEW_WINDOW = 2;
NEW_TAB_BLANK = 3; 
NEW_TAB_POINTED = 5;
NEW_TAB_ACTIVE = 7;
NEW_TAB_BG = 11;

//It's not possible to inherit from an Array in JS, therefore an internal array was created to map the TABS as a tabl
function TabsTable(){  
	var myParent = this;
	this.table = new Array(); //Maps an index to a NavTreeTab Obj.

	/*******************
	* "CLASS" BASICS
	*******************/    
	
	this.size = function(){
		return myParent.table.length; };
	
	this.findIndexFor = function(targetTab){
		for(var i=0; i< myParent.table.length; i++){
			if(myParent.table[i].tab==targetTab)
				return i;
		}
		return false; //Tab wasn't found
		;}  
	
	//return the NavTreeTab for a given Tab
	this.findTab = function(targetTab){
		for(var i=0; i< myParent.table.length; i++){
			if(myParent.table[i].tab==targetTab)
				return myParent.table[i];
		}
		return false; //Tab wasn't found
	}
	
	this.findUnsyncedNavTreeTabs = function(){    
		result = Array();
		for(var i=0; i< myParent.table.length; i++){
			if(myParent.table[i].synced==false)
				result.push( myParent.table[i] );
		}
		return result; //Tab wasn't found
	};

	/*******************
	*    EVENTS METHODS
	*******************/  
	
	Array.prototype.removeTab = function(index){ return myParent.table.splice(index,1);};

	//Add a new tab to the table after the required event with the extra NEW_TAB and evaluate URL and Activeness
	this.addTab = function(theNewTab){ 
			console.log("Adding new tab");
			theNavTreeTab = new NavTreeTab(theNewTab);
			myParent.table.push(theNavTreeTab);


			
			//TODO: Add the tab to the array so that It can be searched in the other methods
			myParent.evalTabActiveness(theNewTab);
			myParent.evalNewTabURL(theNewTab); 
			myParent.evalWindow(theNewTab); 
		}; 
		
	
	
     
    ///NOTA: should i allow here the new tab extra or not??
	//Register changes in the URL. (EVERY OLD Tab CHANGING MUST BE ACTIVE, therefore no activeness is evaluated)
	this.navigateInTab = function(event){
		theTab = event.target;
		theNavtreeTab = myParent.findTab(theTab); 
        theNavtreeTab.updateURL(event.url);                                             
		};     

	//This is not tracked in the server but keeps the table clean once a tab has been closed
	this.removeTab = function(theClosedTab){ 
		//Check that the tab is synced befor removing it
		while(theClosedTab.synced == false){ 
			theClosedTab.sync();
		}
		myParent.table.removeTab(myParent.findIndexFor(theClosedTab));

		};  
		
		
		
		
	/*******************
	*    EVAL METHODS
	*******************/  
	
	//Check if the tab is active or in bg
	this.evalTabActiveness = function(theTab){ 
		theNavTreeTab = myParent.findTab(theTab);
		if(theTab.browserWindow.activeTab == theTab){
			theNavTreeTab.extra *= NEW_TAB_ACTIVE;
		}else{
			theNavTreeTab.extra *= NEW_TAB_BG;
		}
		//TODO attach the calculated activeness to theNavTreeTab

	  }; 
	
	this.evalWindow = function(theNewTab){   
		if(theNewTab.browserWindow.tabs.length == 1)
			myParent.findTab(theNewTab).extra *= NEW_TAB_BG; // Find the tab and then attach new window
	};   
	
	//Check if the tab is blank or Pointed 
	//In this case theURL is passed directly because it can come from a beforeNavigateEvent and is therefore not in tab.url yet
	this.evalNewTabURL = function(theTab){
		//TODO Attach the result to the NavTreeTab extra info
		if(theTab.url != "")
			{//POINTED
			theNavTreeTab.extra *= NEW_TAB_POINTED;
		}else{
			//BLANK
			theNavTreeTab.extra *= NEW_TAB_BLANK; 
			}
		};

	
                       
}; 





	
	
