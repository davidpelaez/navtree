navigationHandler = function(event){
	//console.log(event.url);      
	tabsTable.navigateInTab(event);
};

openHandler = function(event){
	var evento = event;
	console.log("EVENTO APERTURA");
	console.log(event);            
	console.log("¬¬¬¬¬¬¬¬¬¬¬¬¬");
	//console.log("Open Event triggered")
    if (event.target instanceof SafariBrowserTab){  
		//Register the target Tab inside the table
		tabsTable.addTab(event.target);
	}
};

closeHandler = function(event){               
    if (event.target instanceof SafariBrowserTab){  
		tabsTable.removeTab(event.target);
	}
};

