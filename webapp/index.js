sap.ui.define([
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (XMLView,JSONModel,ResourceModel) {
    'use strict';
  
    var oEmployee = new JSONModel({
        firstName: "Somnath",
        lastName: "Paul",
        enabled: false,
        Address: {
            street: 'C P Town',
            City: 'Kolkata',
            Country: 'India',
            enabled:false
        },
        thresholdValue:20
    })
    // oEmployee.setDefaultBindingMode("OneWay")
    sap.ui.getCore().setModel(oEmployee, 'employee')
    
    //product model
    var oProduct = new JSONModel()
    oProduct.loadData('./model/products.json')
    sap.ui.getCore().setModel(oProduct, 'products')

    //Resource Model

    var oResourceModel = new ResourceModel({
        bundleName: "dataBinding.i18n.i18n",
        supportedLocales: ["", "de"],
        fallbackLocale: ""
    })
    sap.ui.getCore().setModel(oResourceModel, "i18n")
    
    var oModelConstraints = new JSONModel({

        OrderQuantity: '',
        date: new Date()
    })
    sap.ui.getCore().setModel(oModelConstraints, 'Constraints');

    new XMLView({
        viewName: "dataBinding.view.App"
    }).placeAt("content");
    
});