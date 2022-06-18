sap.ui.define([
    "sap/ui/core/mvc/XMLView"  
], function (XMLView) {
    'use strict';  
    
     sap.ui.model.SimpleType.extend('sap.ui.sample.onlyDigit', {
        formatValue: function (oValue) {
            return oValue;
        },
        parseValue: function (oValue) {
            return oValue;
        },
        validateValue: function (oValue) {
            if (!/^(\d{5})?$/.test(oValue)) {
                throw new sap.ui.model.ValidateException(`Zip code ${oValue} must have 5 digits!`);
            }
        }

     })    

    new XMLView({
        viewName: "dataBinding.view.App"
    }).placeAt("content");
   
    
});