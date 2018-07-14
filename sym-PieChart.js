(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	//* PieChart to show % data for two attributes

	var definition = { 
		typeName: "PieChart",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: "Table",
				Height: 100,
				Width: 100 
			} 
		}
	}

	function getConfig(){
		return {
			"type": "pie",
	"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
	"titleField": "attribute",
	"valueField": "value",
	"allLabels": [],
	"balloon": {},
	"legend": {
		"enabled": true,
		"align": "center",
		"markerType": "circle"
	},
	"titles": [],
			"dataProvider": [
				{
					"attribute": "1",
					"value": 4,
				},
				{
					"attribute": "2",
					"value": 2,
				}
			]
		}
	}
	
	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		var labels;
		var previousValue = []; //for extra credit
		
		var symbolContainerDiv = elem.find("#container")[0];
		symbolContainerDiv.id = "barChart_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(symbolContainerDiv.id, getConfig());

	//*Function to get data in correct format so that can be passed to PieChart

		function convertoChart(data){
			
			return data.Rows.map(function(item, index){
				return {
					value: item.Value,
					attribute: labels[index]
				}
			});
			
			
		}
				
		function updateLabel(data){
			labels = data.Rows.map(function(item){
				return item.Label;
			});
		}
		//* Function to extract label from sporadic updates

		function dataUpdate(data){
			if( !data) return;
			if( data.Rows[0].Label) updateLabel(data);
			if( !labels || !chart) return;
			
			var dataprovider = convertoChart(data);
			chart.dataProvider = dataprovider; 
			chart.validateData(); 
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
