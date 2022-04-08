sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Core",
	"sap/ui/model/json/JSONModel"
], function (Controller,Core,JSONModel) {
    "use strict";

    return Controller.extend("dataBinding.controller.App", {
		// onInit: function(){
		// 	var oView = this.getView(),
		// 		oMM = Core.getMessageManager();
		// 	// oMM.registerObject(oView.byId('amt'), true)
		// 	oMM.registerObject(oView.byId('nameInput'), true)
			
		// 	oView.setModel(new JSONModel({ name: "", email: "" }));
		// },
        onPressItem: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("products");
            var sPath = oContext.getPath();
            var oProductDetailPanel = this.byId("productDetailsPanel");
            oProductDetailPanel.bindElement({ path: sPath, model: "products" });
		},
		// _validateInput: function (oInput) {
		// 	var sValueState = "None";
		// 	var bValidationError = false;
		// 	var oBinding = oInput.getBinding("value");

		// 	try {
		// 		oBinding.getType().validateValue(oInput.getValue());
		// 	} catch (oException) {
		// 		sValueState = "Error";
		// 		bValidationError = true;
		// 	}

		// 	oInput.setValueState(sValueState);

		// 	return bValidationError;
		// },
		// onChange: function(oEvent){
		// 	var oInput = oEvent.getSource();
		// 	this._validateInput(oInput);
		// 	// var oBinding = oInput.getBinding('value');
			
		// 	// var sValueState = "None";
		// 	// var bValidationError = false;
		// 	// try {
		// 	// 	oBinding.getType().validateValue(oInput.getValue())
		// 	// } catch (oException) {
		// 	// 	sValueState = "Error";
		// 	// 	bValidationError = true;			
		// 	// }
		// 	// oInput.setValueState(sValueState);

		// 	// return bValidationError;
		// },
	

		// onNameChange1: function(oEvent) {
		// 	var oInput = oEvent.getSource();
		// 	this._validateInput(oInput);
		// },
		productListFactory: function (sId, oContext) {
			sap.ui.getCore().getModel('products')

			var oUIControl;

			// Decide based on the data which dependent to clone
			if (oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")) {
				// The item is discontinued, so use a StandardListItem
				oUIControl = this.byId("productSimple").clone(sId);
			} else {
				// The item is available, so we will create an ObjectListItem
				oUIControl = this.byId("productExtended").clone(sId);

				// The item is temporarily out of stock, so we will add a status
				if (oContext.getProperty("UnitsInStock") < 1) {
					oUIControl.addAttribute(new ObjectAttribute({
						text : {
							path: "i18n>outOfStock"
						}
					}));
				}
			}

			return oUIControl;
		}
    });
});