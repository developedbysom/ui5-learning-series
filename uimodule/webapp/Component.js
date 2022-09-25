sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/sap/crud/ui5demo/model/models",
    "com/sap/crud/ui5demo/model/AppModel"
  ],
  function (UIComponent, Device, models, AppModel) {
    "use strict";

    return UIComponent.extend("com.sap.crud.ui5demo.Component", {
      metadata: {
        manifest: "json"
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");
        var oAppModel = new AppModel();
        // @ts-ignore
        jQuery.get({
          contentType: "application/json",
          url: "/Products",
          dataType: "json",
          success: function (oData) {
            oAppModel.setData(oData.value);
          },
          error: function () {
            console.log("an error occurred retrieving the Data");
          }
        });
        this.setModel(oAppModel, "products");
      }
    });
  }
);