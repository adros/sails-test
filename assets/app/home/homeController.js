/*global angular:true */
var app = angular.module("single-page-app");

app.controller("HomeCtrl", [
	"$scope",
	"$http",
	function($scope/*, $http*/) {
		document.title = "Home | " + app.BASE_TITLE;
		$scope.chart1Type = "bar2d";
		$scope.chart1DataSource = {
			chart : {
				caption : "Companies",
				"paletteColors" : "#0075c2",
				"bgColor" : "#ffffff",
				"showBorder" : "0",
				"showCanvasBorder" : "0",
				"usePlotGradientColor" : "0",
				"plotBorderAlpha" : "10",
				"placeValuesInside" : "1",
				"valueFontColor" : "#ffffff",
				"showAxisLines" : "1",
				"axisLineAlpha" : "25",
				"divLineAlpha" : "10",
				"alignCaptionWithCanvas" : "0",
				"showAlternateVGridColor" : "0",
				"captionFontSize" : "14",
				"subcaptionFontSize" : "14",
				"subcaptionFontBold" : "0",
				"toolTipColor" : "#ffffff",
				"toolTipBorderThickness" : "0",
				"toolTipBgColor" : "#000000",
				"toolTipBgAlpha" : "80",
				"toolTipBorderRadius" : "2",
				"toolTipPadding" : "5"
			},
			data : [
				{
					label : "2011",
					value : 42
				},
				{
					label : "2012",
					value : 13
				},
				{
					label : "2013",
					value : 50
				},
				{
					label : "2014",
					value : 24
				},
				{
					label : "2015",
					value : 25
				}
			]
		};
		$scope.chart2Type = "angulargauge";
		$scope.chart2DataSource = {
			"chart" : {
				"caption" : "Customer Satisfaction Score",
				"lowerlimit" : "0",
				"upperlimit" : "100",
				"lowerlimitdisplay" : "Bad",
				"upperlimitdisplay" : "Good",
				"palette" : "1",
				"numbersuffix" : "%",
				"tickvaluedistance" : "10",
				"showvalue" : "0",
				"gaugeinnerradius" : "0",
				"bgcolor" : "FFFFFF",
				"pivotfillcolor" : "333333",
				"pivotradius" : "8",
				"pivotfillmix" : "333333, 333333",
				"pivotfilltype" : "radial",
				"pivotfillratio" : "0,100",
				"showtickvalues" : "1",
				"showborder" : "0"
			},
			"colorrange" : {
				"color" : [
					{
						"minvalue" : "0",
						"maxvalue" : "45",
						"code" : "e44a00"
					},
					{
						"minvalue" : "45",
						"maxvalue" : "75",
						"code" : "f8bd19"
					},
					{
						"minvalue" : "75",
						"maxvalue" : "100",
						"code" : "6baa01"
					}
				]
			},
			"dials" : {
				"dial" : [
					{
						"value" : "92",
						"rearextension" : "15",
						"radius" : "100",
						"bgcolor" : "333333",
						"bordercolor" : "333333",
						"basewidth" : "8"
					}
				]
			}
		};
	}
]);
