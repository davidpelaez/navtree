

/*Definition of the class to keep all the information needed for the tab in sync with the server*/
function NavTreeTab(theSafariTab){  
  	var myNavTreeTabParent = this;
	var ajaxHeader = new Object();
	ajaxHeader.secret = safari.extension.secureSettings.secretKey;
	this.tab = theSafariTab;
	this.parentEdgeId = null; //This will be used for the next sync to track ancestry
	this.navTreeTabAncestor = null;  
	this.url = null;  
	this.timesTried = 0;
	this.timerId = null;  
	this.evaluedURL = false;
	this.stamp = randomString(10); //This is used by the queue to ensure that a record is posted 5 secs after the record


	
	this.beginTimer = function(time){  
		time = typeof(time) != 'undefined' ? time : 5000;  //Default value for arugument time defined 

		myNavTreeTabParent.onTimer = true;        
		myNavTreeTabParent.timerId = setTimeout(function(){
				if(extensionMode != PRIVATE_STATUS){ //Try to sync even if there's an alert
					myNavTreeTabParent.sync();
				}else{
					console.log("Private mode: Not syncing");
					//RESET the node as if a virtual sync happened. The parentEdge remains untouched
					myNavTreeTabParent.synced = true;                                               					
					//Reset tab
					myNavTreeTabParent.extra = SIMPLE_NODE;
				}
			},time); 
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
	
	this.navigateTo = function(newURL){
		myNavTreeTabParent.url = newURL; //THERE MIGHT BE A BUG HERE, like the URL isn't always the tab URL??
		myNavTreeTabParent.synced = false; 
		myNavTreeTabParent.resetTimer(); 
	}; 
	
	this.navigateTo(theSafariTab.url);
	
	

	this.extra = SIMPLE_NODE; //This is where the behaviour is tracked as the product of all the applicable behaviours
	
	this.syncWithServer = function(){return true;};
	this.synced = false;  
	this.onsync = false; //THIS IS TO avoid async ajax calls and still keeping track
	this.onTimer = false; //Use this to track if the Nav is giving time for a Nav Event to happen

	

   
	this.toMap = function(){
		myMap = new Object();
		myNavTreeTabParent.url = typeof(myNavTreeTabParent.url) != 'undefined' ? myNavTreeTabParent.url : "";  //Default value for url to prevent encoding error
		theTitle = myNavTreeTabParent.tab.title;
		if(myNavTreeTabParent.url == ""){theTitle="";}
		myMap.title = Base64.encode(theTitle);
		myMap.url = Base64.encode(myNavTreeTabParent.url);        
		myMap.parentEdgeId = myNavTreeTabParent.parentEdgeId; 
		myMap.extra = myNavTreeTabParent.extra; 
		return {"X-tab-url":myMap.url,"X-tab-title":myMap.title,"X-tab-parentEdgeId":myMap.parentEdgeId,"X-tab-extra":myMap.extra};
		/*return myMap;*/
	};     
	
	//Check if the tab is blank or Pointed 
	//Add this to the EXTRA right before SYNC
	this.evalTabURL = function(){
		if(!myNavTreeTabParent.evaluedURL){ //This is to avoid adding multiple times the same extra
			if(myNavTreeTabParent.url != ""){
				myNavTreeTabParent.extra *= POINTED;
			}else{
				myNavTreeTabParent.extra *= BLANK; 
			}   
		}       
		myNavTreeTabParent.evaluedURL = true;
		};  
		

	
	this.sync = function(){  
		//Check if there's an ancestor parentEdgeId that needs to be attached before SYNC
		myNavTreeTabParent.timerId = null;
		myNavTreeTabParent.onTimer = false;
		myNavTreeTabParent.url = myNavTreeTabParent.tab.url; //THIS ALLOWS US TO DELETE UPDATE URL and only leave timer
		if(myNavTreeTabParent.navTreeTabAncestor != null){                                 
			
			//Link the last edge of the ancestor to the edge of this tab. this created a hard link.
			//The soft link is the result of ancestry + BG*NEW_TAB*n where n is any other prime product			
			//Check that the parent has been synced, force if othwersie, then link  
			if(myNavTreeTabParent.navTreeTabAncestor.synced == false){             
					//myNavTreeTabParent.navTreeTabAncestor.sync();
					//Reset the timer and Return to stop the sync function  
					console.log("ERROR: Ancestor isn't synced. Waiting before syncing " + 500*(myNavTreeTabParent.timesTried+1) +"ms [" + myNavTreeTabParent.timesTried + "]:" ) ;			
					myNavTreeTabParent.timesTried++;	
					myNavTreeTabParent.beginTimer(500*(myNavTreeTabParent.timesTried+1));                                  
					return false;                          
		   
			}			
			myNavTreeTabParent.parentEdgeId = myNavTreeTabParent.navTreeTabAncestor.parentEdgeId;
		}
 
		myNavTreeTabParent.evalTabURL();
		console.log("SYNCING: " + myNavTreeTabParent.url + "[" + myNavTreeTabParent.extra + "]");  

		var theNode = new Object();
		theNode.tab = myNavTreeTabParent; //Create the header request.headers["HTTP_TAB"] for rails
		jQuery.ajax({  
			data: "syncing=1",
			headers: myNavTreeTabParent.toMap(),

			error: function(jqXHR, textStatus, errorThrown){ 
				//This extension fails silently and retries every 5 sec with the data it has. No amount of max tries's defined
				//This is triggered by HTTP != 200
				console.log("The ajax failed. Qeued for re-sync in 5 sec"); 
				if(jqXHR.status == 0){
					connectivity = false;
					setExtensionStatus(OFFLINE_STATUS);
				}else if(jqXHR.status == 403){
					validSecret = false;
				}
				setExtensionStatus(ALERT_STATUS);
				myNavTreeTabParent.beginTimer();                                  
				},
			success: function(data, textStatus, jqXHR){ 
				validSecret = true; 
				connectivity = true;
				myNavTreeTabParent.synced = true;    
				if(extensionMode != PRIVATE_STATUS) setExtensionStatus(NORMAL_STATUS);
				//This is triggered by HTTP == 200 				
				responseEdge = jQuery.parseJSON( jqXHR.responseText).edge;
				myNavTreeTabParent.parentEdgeId = responseEdge.id; 
				//Update the edge count in the feedback window
				updateCount(responseEdge.edge_count);
				//Reset tab
				myNavTreeTabParent.extra = SIMPLE_NODE; 
				}
		}); 
   	
	};

}