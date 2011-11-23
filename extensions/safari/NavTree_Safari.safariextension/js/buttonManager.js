//var toolbarButton = safari.extension.toolbarItems[0];  

NORMAL_STATUS = 0;
PRIVATE_STATUS = 1;
ALERT_STATUS = 2;
OFFLINE_STATUS = 3;

var extensionMode = NORMAL_STATUS; //This is to control to enable/disable the extension or inform that there's a problem

ALERT_ICON = safari.extension.baseURI + "icons/alert.png";
NORMAL_ICON = safari.extension.baseURI + "icons/nodesV.png";
INVISIBLE_ICON = safari.extension.baseURI + "icons/invisible.png";
OFFLINE_ICON = safari.extension.baseURI + "icons/disconnect.png";



//Trigger the status and other related changes in a single line
function updateButtons(thePic, theLabel, theStatus){
	extensionMode = theStatus; //Keep the buttons and the extension synced	  
	for(i=0; i< safari.extension.toolbarItems.length; i++){
		button = safari.extension.toolbarItems[i];	
		button.image = thePic;    
		button.label = theLabel;    
		button.toolTip = theLabel;
	}
};

//Set the button and the extension in a given status/mode
setExtensionStatus = function(theStatus){ 
	switch(theStatus){
		case NORMAL_STATUS: //Normal syncing        		
			updateButtons(NORMAL_ICON,"Syncing to Navtree's active",0); 
			break;
		case PRIVATE_STATUS: //NOT syncing, invisible browsing
			updateButtons(INVISIBLE_ICON,"Invisible browsing, NOT syncing to Navtree",1); 
			break;
		case ALERT_STATUS: //ALERT something's wrong
			updateButtons(ALERT_ICON,"Something's wrong! Click for more details",2); 
			break;
		case OFFLINE_STATUS: //No internet
			updateButtons(OFFLINE_ICON,"You are not connected to the internet",3); 
			break;
	}
};  

function updateCount(theCount){  
	if(safari.extension.toolbarItems.length > 0){
		buttonWindow = safari.extension.toolbarItems[0].popover.contentWindow;	
		buttonWindow.updateCount(theCount);
	}
};

//React when the button is clicked according to the current status/mode
/*var buttonManager = function(toolbarButton){ 
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
};*/