(function (PV){
	"use strict";
    
    //* Tool pane to provide help message 
	var def = {
	    typeName: "helloworld",
	    displayName: "Help",
	    iconUrl: "Images/help.svg",
		init: init 
	} 

	function init(scope) {
			}

	PV.toolCatalog.register(def); 

})(window.PIVisualization)
