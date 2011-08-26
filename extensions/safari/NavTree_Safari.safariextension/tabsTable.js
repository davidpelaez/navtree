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
	
	//return the NavTreeTab for a given Tab
	this.findTab = function(targetTab){
		
	}


	//Check if the tab is blank or Pointed 
	//In this case theURL is passed directly because it can come from a beforeNavigateEvent and is therefore not in tab.url yet
	this.evalTabURL = function(theTab){
		//TODO Attach the result to the NavTreeTab extra info
		if(theTab.url != "")
			//POINTED
			console.log("Navigatin to pointed node");
		else
			//BLANK
			console.log("Navigatin to blank");
		};



	//Add a new tab to the table after the required event with the extra NEW_TAB and evaluate URL and Activeness
	this.addTab = function(theNewTab){ 
		//Check that the tab hasnt already been added  
			console.log("------ADDTAD starts-------")   
			//TODO: Add the tab to the array so that It can be searched in the other methods
			myParent.evalTabActiveness(theNewTab);
			myParent.evalTabURL(theNewTab); 
			myParent.evalWindow(theNewTab); 
			console.log("------ADDTAD ends-------")
			setTimeout(function(){console.log("time's up!");},2000);
		}; 
		
	this.navigationHandler = function(event){
		//console.log(event.target.url); //Log the url that the user is navigating to
		console.log(event.url);
		myParent.navigateInTab(event.target);
	};
	
     
                
	//Register changes in the URL. (EVERY OLD Tab CHANGING MUST BE ACTIVE, therefore no activeness is evaluated)
	this.navigateInTab = function(theTab){
		//Si el tab no esta on timer eso quiere decir que toca sincronizar y luego cambiar

				myParent.evalTabURL(theTab); //This is evaluated because it's possible to hit back or have a shortcut to an blank url.

				//TODO SYNC
			};

	//This is not tracked in the server but keeps the table clean once a tab has been closed
	this.removeTab = function(theClosedTab){
		console.log("Removing a TAB");

		};  
		
	//Check if the tab is active or in bg
	this.evalTabActiveness = function(theTab){ 
		theNavTreeTab = myParent.findTab(theTab);
		if(theTab.browserWindow.activeTab == theTab){
			console.log("New tab - Active");
		}else{
			console.log("New tab - Background");
		}
		//TODO attach the calculated activeness to theNavTreeTab
	  }; 
	
	this.evalWindow = function(theNewTab){   
		if(theNewTab.browserWindow.tabs.length == 1)
			console.log("This is a new window");
		else
			console.log("The window of this tab already existed");
	};

	
	this.openHandler = function(event){               
		console.log("Open Event triggered")
	    if (event.target instanceof SafariBrowserTab){  
			//Register the target Tab inside the table
			myParent.addTab(event.target);
		}
	};
	
	this.closeHandler = function(event){               
	    if (event.target instanceof SafariBrowserTab){  
			myParent.removeTab(event.target);
		}
	};                              


}; 





	
	
