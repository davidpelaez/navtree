//Trigger the status and other related changes in a single line
safari.extension.toolbarItems[0].__proto__.updateButton = function(thePic, theLabel, theStatus){
	
};

//Set the button and the extension in a given status/mode
safari.extension.toolbarItems[0].__proto__.setStatus = function(theStatus){ 
	switch(theStatus){
		case 1:
			theButton.image = safari.extension.baseURI + "alert.png" ; 
			theButton.status = 1;
			theButton.status = 1;
			break;
		case 1:
			theButton.image = safari.extension.baseURI + "alert.png" ; 
			theButton.status = 1;
			theButton.status = 1;
			break;
		case 1:
			theButton.image = safari.extension.baseURI + "alert.png" ; 
			theButton.status = 1;
			theButton.status = 1;
			break;
	}
	
};  

//React when the button is clicked according to the current status/mode
var buttonManager = function(theButton){
	console.log("Se clickero el boton") ;

		theButton = event.target; 
		switch(theButton.status){
			case 1:
				theButton.image = safari.extension.baseURI + "alert.png" ; 
				theButton.status = 1;
				theButton.status = 1;
				break;
			case 1:
				theButton.image = safari.extension.baseURI + "alert.png" ; 
				theButton.status = 1;
				theButton.status = 1;
				break;
			case 1:
				theButton.image = safari.extension.baseURI + "alert.png" ; 
				theButton.status = 1;
				theButton.status = 1;
				break;

		extensionMode = theButton.status;

	}
};