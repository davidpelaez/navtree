//BEHAVIOUR CONSTANTS
NEW_WINDOW = 2;
NEW_TAB_BLANK = 3; 
NEW_TAB_POINTED = 5;
NEW_TAB_ACTIVE = 7;
NEW_TAB_BG = 11;

//It's not possible to inherit from an Array in JS, therefore an internal array was created to map the TABS as a tabl
function TabsTable(){  
	var myParent = this;
	this.table = new Array(); //Maps an index to a NavTreeTab Obj.
	
	this.findIndexFor = function(targetTab){return 0;}  


	//Check if the tab is blank or Pointed 
	this.evalTabURL = function(theTab){jqueryTest();};



	//Add a new tab to the table after the required event with the extra NEW_TAB and evaluate URL and Activeness
	this.addTab = function(theNewTab){
			evalTabActiveness(theNewTab);
			evalTabURL(theNewTab); 
			evalWindow(); //Check if the tab is the active in a new window non recorded yet inside windowRecord
			//TODO: Trigger SYNC with server
		};           
                
	//Register changes in the URL. (EVERY OLD Tab CHANGING MUST BE ACTIVE, therefore no activeness is evaluated)
	this.navigateInTab = function(theTab){
				evalTabURL(theTab); //This is evaluated because it's possible to hit back or have a shortcut to an blank url.
			};

	//This is not tracked in the server but keeps the table clean once a tab has been closed
	//IF THERE's only that tab in the window, then the window must be closed too.
	this.removeTab = function(theClosedTab){

		};  
		
	//Check if the tab is active or in bg
	this.evalTabActiveness = function(event){ 
		console.log("Eval.")
		if(event.target.browserWindow.activeTab == event.target)
			console.log("New tab - Active");
		else
			console.log("New tab - Non Active");
		}; 

	//TODO: Work windowsRECORD    
	this.windowsRecord = new Array();
	
	this.navigationHandler = function(event){
		console.log(event.url); //Log the url that the user is navigating to
	} 
	
	this.openHandler = function(event){               
		console.log("Open Event triggered")
	    if (event.target instanceof SafariBrowserTab){
			myParent.evalTabActiveness(event);			
		}
	}                              


} 





	
	
