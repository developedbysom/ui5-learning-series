sap.ui.define(["sap/ui/test/Opa5"],
    /**
     * @param {typeof sap.ui.test.Opa5} Opa5 
     */
    function (Opa5) {
        "use strict";

        return Opa5.extend("com.sap.crud.ui5demo.test.integration.arrangements.Startup", {
            iStartMyApp: function () {
                this.iStartMyUIComponent({
                    componentConfig: {
                        name: "com.sap.crud.ui5demo",
                        async: true,
                        manifest: true
                    }
                });
            }
        });
    });
