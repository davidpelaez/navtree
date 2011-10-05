var toolbarButton = safari.extension.toolbarItems[0];  

NORMAL_STATUS = 0;
PRIVATE_STATUS = 1;
ALERT_STATUS = 2;

ALERT_ICON = safari.extension.baseURI + "icons/alert.png";
NORMAL_ICON = safari.extension.baseURI + "icons/nodesV.png";
INVISIBLE_ICON = safari.extension.baseURI + "icons/invisible.png";

//Trigger the status and other related changes in a single line
toolbarButton.__proto__.updateButton = function(thePic, theLabel, theStatus){  
	toolbarButton.status = theStatus;    
	extensionMode = theStatus; //Keep the button and the extension synced	
	toolbarButton.image = thePic;    
	toolbarButton.label = theLabel;    
	toolbarButton.toolTip = theLabel;    

};

//Set the button and the extension in a given status/mode
toolbarButton.__proto__.setStatus = function(theStatus){ 
	switch(theStatus){
		case NORMAL_STATUS: //Normal syncing        		
			toolbarButton.updateButton(NORMAL_ICON,"Syncing to Navtree's active",0); 
			break;
		case PRIVATE_STATUS: //NOT syncing, invisible browsing
			toolbarButton.updateButton(INVISIBLE_ICON,"Invisible browsing, NOT syncing to Navtree",1); 
			break;
		case ALERT_STATUS: //ALERT something's wrong
			toolbarButton.updateButton(ALERT_ICON,"Something's wrong! Click for more details",2); 
			break;
	}

	
};  

//React when the button is clicked according to the current status/mode
var buttonManager = function(toolbarButton){ 
		console.log("CLICKED!");
		switch(toolbarButton.status){
			case NORMAL_STATUS: //Change to invisible
				toolbarButton.setStatus(PRIVATE_STATUS);
				break;
			case PRIVATE_STATUS: //Change to normal
				toolbarButton.setStatus(NORMAL_STATUS);
				break;
			case ALERT_STATUS: //Inform the reason of the alert 
				alert("We are working to figure out why the extension presents errors") ;
				break;
	}
};