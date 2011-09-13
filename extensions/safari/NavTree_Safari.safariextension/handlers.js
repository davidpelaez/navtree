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

