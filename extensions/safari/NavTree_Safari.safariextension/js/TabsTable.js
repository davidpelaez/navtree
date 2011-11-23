//BEHAVIOUR (aka extra) CONSTANTS
SIMPLE_NODE = 1; //THIS MEANS NOTHING SINCE 1 ISN'T A PRIME, but gives consistency to the list 
NEW_WINDOW = 2;
NEW_TAB = 3;
BLANK = 5; 
POINTED = 7;
ACTIVE = 11; //This one is only used in new windows/tabs
BG = 13;

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
	
	this.findRootNavTreeTabs = function(){    
		result = Array();
		for(var i=0; i< myParent.table.length; i++){
			if(myParent.table[i].navTreeTabAncestor==null)
				result.push( myParent.table[i] );
		}
		return result; //Tab wasn't found
	};   
	
	
	
	/*******************
	*    Boolean Methods for NavTreeTab.extra
	*******************/  
	
	//Check if the tab is active or in bg
	this.isTabActive = function(theTab){ 
		theNavTreeTab = myParent.findTab(theTab);
		if(theTab.browserWindow.activeTab == theTab){
			return true;
		}else{
			return false;
		}

	  }; 
	
	this.isTabNewWindow = function(theNewTab){   
		if(theNewTab.browserWindow.tabs.length == 1){
			return true;
		}else{
			return false;
		}
	};

	/*******************
	*    EVENTS METHODS
	*******************/  
	
	Array.prototype.removeTab = function(index){ return myParent.table.splice(index,1);};
	
	this.pushIntoTable = function(theNavTreeTab){  
		myParent.table.push(theNavTreeTab);				
		myParent.attachExtra(theNavTreeTab);
	};

	//Add a new tab to the table after the required event with the extra NEW_TAB and evaluate URL and Activeness
	this.addTab = function(theNewTab){     
				theActiveTab = theNewTab.browserWindow.activeTab; 
				//IF the active tab hasn't been added
				if(tabsTable.findTab(theActiveTab) == false){
					//ADD the active tab before proceeding   
					myParent.pushIntoTable( new NavTreeTab(theActiveTab) );
				}
				
				if(myParent.findTab(theNewTab) == false){
					myParent.pushIntoTable( new NavTreeTab(theNewTab) );
				}
		};
		
	this.attachExtra = function(theNavTreeTab){ 

		theNewTab = theNavTreeTab.tab;
   		if(theNavTreeTab.evaluedURL==false){ 
			//Attach activeness
			if(myParent.isTabActive(theNewTab)){
				theNavTreeTab.extra *= ACTIVE;
			}else{
				theNavTreeTab.extra *= BG;
				//Anything opened in the background is a SOFT CHILD of the active TAB of its Window
				theSoftAncestor = myParent.findTab(theNewTab.browserWindow.activeTab);
				theNavTreeTab.navTreeTabAncestor = 	theSoftAncestor;
			} 
			//Attach weather new tab or just new window			
			if(myParent.isTabNewWindow(theNewTab)){
				theNavTreeTab.extra *= NEW_WINDOW;
			}else{
				theNavTreeTab.extra *= NEW_TAB;
			}
		}		
	};
	
     
    ///NOTA: should i allow here the new tab extra or not??
	//Register changes in the URL. (EVERY OLD Tab CHANGING MUST BE ACTIVE, therefore no activeness is evaluated)
	this.navigateInTab = function(event){
		theTab = event.target;
		theNavtreeTab = myParent.findTab(theTab); 
        theNavtreeTab.navigateTo(event.url);                                             
		};     

	//This is not tracked in the server but keeps the table clean once a tab has been closed
	this.removeTab = function(theClosedTab){ 
		//Check that the tab is synced befor removing it
		while(theClosedTab.synced == false){ 
			theClosedTab.sync();
		}
		myParent.table.removeTab(myParent.findIndexFor(theClosedTab));

		};  
	
                       
}; 





	
	
