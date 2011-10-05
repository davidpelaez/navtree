navigationHandler = function(event){
	//console.log(event.url);      
	tabsTable.navigateInTab(event);
};


openHandler = function(event){       

	if (event.target instanceof SafariBrowserTab){  
		if(tabsTable.findTab(event.target)==false){
	   		tabsTable.addTab(event.target);	
		}		
	}
};

closeHandler = function(event){               
    if (event.target instanceof SafariBrowserTab){  
		tabsTable.removeTab(event.target);
	}
};

//React when the button is clicked according to the current status/mode
commandHandler = function(event){ 
	if(event.command == "click_menu_button"){
		buttonManager(event.target);
	};
};

