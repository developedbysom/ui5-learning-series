sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Core",
	"sap/ui/model/json/JSONModel"	
], function (Controller,Core,JSONModel) {
    "use strict";

    return Controller.extend("dataBinding.controller.App", {
		onInit: function () {
			var oView = this.getView(),
				oMM = Core.getMessageManager();
			
			// Model set up
			var oData = new JSONModel({
				OrderQuantity1: 10,
				OrderQuantity2: 10,
				date: new Date(),
				weight: 2.301,
				zip:'',
				text:"Quantity should be between 1 and 10"
			});
			oView.setModel(oData, 'myModel');

			// Registering to message manager

			oMM.registerObject(oView.byId('OrdQty1'), true)
			oMM.registerObject(oView.byId('weight'), true)
			oMM.registerObject(oView.byId('zipcode'), true)

			// Dynamic value binding 
			oView.byId('OrdQty2').bindValue(
				{
					path: 'myModel>/OrderQuantity2',
					type: 'sap.ui.model.type.Integer',
					constraints: {
							minimum: 1,
							maximum: 10
					}
				});
			// Dynamic property Binding
			oView.byId('OrdQty2').bindProperty('valueStateText', {
				path:'myModel>/text'
				});			
		},

		_validateInput: function (oInput) {
			var sValueState = "None";
			var bValidationError = false;
			var oBinding = oInput.getBinding("value");

			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				sValueState = "Error";
				bValidationError = true;
			}

			oInput.setValueState(sValueState);

			return bValidationError;
		},
		onChange: function(oEvent){
			var oInput = oEvent.getSource();
			this._validateInput(oInput);
		},
    });
});