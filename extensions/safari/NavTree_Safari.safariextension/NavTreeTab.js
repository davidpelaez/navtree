

/*Definition of the class to keep all the information needed for the tab in sync with the server*/
function NavTreeTab(theSafariTab){  
  	var myNavTreeTabParent = this;
	var ajaxHeader = new Object();
	ajaxHeader.secret = safari.extension.secureSettings.secretKey;
	this.tab = theSafariTab;
	this.edgeId = null; //This will be used for the next sync to track ancestry
	this.navTreeTabAncestor = null;  
	this.url = null;  
	this.timerId = null;  
	this.evaluedURL = false;
	this.stamp = randomString(10); //This is used by the queue to ensure that a record is posted 5 secs after the record


	
	this.beginTimer = function(){  
		myNavTreeTabParent.onTimer = true;        
		myNavTreeTabParent.timerId = setTimeout(function(){myNavTreeTabParent.sync();},5000); 
	}; 
	
	this.stopTimer = function(){  
		if(myNavTreeTabParent.timerId != null){ 
			clearTimeout(myNavTreeTabParent.timerId); 
			myNavTreeTabParent.onTimer = false; 
		}
	};
	
	this.resetTimer = function(){  
		myNavTreeTabParent.stopTimer();	
		myNavTreeTabParent.beginTimer();                               
	}; 
	
	this.updateURL = function(newURL){
		myNavTreeTabParent.url = newURL; //THERE MIGHT BE A BUG HERE, like the URL isn't always the tab URL??
		myNavTreeTabParent.synced = false; 
		//console.log(">> " + newURL);
		myNavTreeTabParent.resetTimer(); 
		  //  		console.log("------------------------------------"); 
	}; 
	
	this.updateURL(theSafariTab.url);
	
	
	this.updateURL(theSafariTab.url);
	this.extra = SIMPLE_NODE; //This is where the behaviour is tracked as the product of all the applicable behaviours
	
	this.syncWithServer = function(){return true;};
	this.synced = false;  
	this.onsync = false; //THIS IS TO avoid async ajax calls and still keeping track
	this.onTimer = false; //Use this to track if the Nav is giving time for a Nav Event to happen

	

   
	this.toMap = function(){
		myMap = new Object();
		myMap.tab_url = myNavTreeTabParent.url;
		myMap.tab_edgeId = myNavTreeTabParent.edgeId; 
		myMap.tab_extra = myNavTreeTabParent.extra;
		return myMap;
	};     
	
	//Check if the tab is blank or Pointed 
	//Add this to the EXTRA right before SYNC
	this.evalTabURL = function(){
		//TODO Attach the result to the NavTreeTab extra info 
		if(myNavTreeTabParent.evaluedURL==false){ //This is to avoid adding multiple times the same extra
			if(myNavTreeTabParent.url != ""){
				myNavTreeTabParent.extra *= POINTED;
			}else{
				myNavTreeTabParent.extra *= BLANK; 
			}   
			myNavTreeTabParent.evaluedURL== true;
		}
		}; 
	
	this.sync = function(){  
		//Check if there's an ancestor edgeId that needs to be attached before SYNC
		myNavTreeTabParent.url = myNavTreeTabParent.tab.url; //THIS ALLOWS US TO DELETE UPDATE URL and only leave timer
		if(myNavTreeTabParent.navTreeTabAncestor != null){                                 
			console.log("Ancestro suave");
			console.log(myNavTreeTabParent.navTreeTabAncestor);
			//Link the last edge of the ancestor to the edge of this tab. this created a hard link.
			//The soft link is the result of ancestry + BG*NEW_TAB*n where n is any other prime product			
			//Check that the parent has been synced, force if othwersie, then link  
			if(!myNavTreeTabParent.navTreeTabAncestor.synced){  
				//myNavTreeTabParent.navTreeTabAncestor.stopTimer();
				//myNavTreeTabParent.navTreeTabAncestor.sync();				
			}			
			myNavTreeTabParent.edgeId = myNavTreeTabParent.navTreeTabAncestor.edgeId;
			console.log("Ancestry for soft link was added before sync") ;
		}
		myNavTreeTabParent.timerId = null;
		myNavTreeTabParent.onTimer = false; 
		myNavTreeTabParent.evalTabURL();
		console.log("SYNCING: " + myNavTreeTabParent.url + "[" + myNavTreeTabParent.extra + "]");  
		console.log("------------------------------------");
		var theNode = new Object();
		theNode.tab = myNavTreeTabParent; //Create the header request.headers["HTTP_TAB"] for rails
		jQuery.ajax({  
			data: "syncing=1",
			headers: myNavTreeTabParent.toMap(),
			complete: function(jqXHR, textStatus){
				console.log(jQuery.parseJSON( jqXHR.responseText).node );
				},
			error: function(jqXHR, textStatus, errorThrown){
				console.log("The ajax failed"); 
				},
			success: function(){
				console.log(myNavTreeTabParent.stamp);
				myNavTreeTabParent.synced = true; 
				myNavTreeTabParent.extra = SIMPLE_NODE; 
				}
		}); 
		//TODO SYNCED TO TRUE AND RESET THE TAB 
		//TODO MANAGE ERRORS		
	};

}