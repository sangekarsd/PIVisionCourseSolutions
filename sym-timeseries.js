(function (PV) {
    "use strict";

    function symbolVis() { };
    PV.deriveVisualizationFromBase(symbolVis);

   //* Getting timeseries with value greater than 0 and background color, decimal places and border redius configurable

    var definition = { 
        typeName: "timeseries",
        visObjectType: symbolVis,
        datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
        getDefaultConfig: function(){ 
            return {
                DataShape: 'Timeseries',
                Height: 150,
                Width: 150,
                BackgroundColor: 'orange',
                BorderRadius: 10,
                DisplayDigits: 2
            } 
        },

       configOptions: function () {
           return [
              {
                   title: "Format-Sysmbol",
                   mode: "format"

               }
            ];
        }
    }


    symbolVis.prototype.init = function (scope, elem) {
        this.onDataUpdate = dataUpdate;    
        function dataUpdate(data) {
            
           if (!data) return;

           var firstAttribute = data.Data[0];
           scope.Values = firstAttribute.Values;
           
	//*Check to get label and units from sporadic data update

           if (firstAttribute.Label) {

               scope.Units = firstAttribute.Units;
               scope.Label = firstAttribute.Label;
           }
             
 }
    };

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
