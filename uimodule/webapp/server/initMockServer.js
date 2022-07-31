sap.ui.define([
  //   "../Service/FakeRest.min",
  "sap/ui/thirdparty/sinon"
], function (sinon) {
  "use strict";

  // initialize the mock server
  // @ts-ignore
  jQuery.get({
    url: "../Service/Products.json",
    success: function (oData) {
      initAppWithFakeRest(oData);
    },
    error: function () {
      alert("Could not start server");
    }
  });
  var initAppWithFakeRest = function (oData) {
    // initialize fake REST server
    // @ts-ignore
    var restServer = new FakeRest.Server();
    restServer.init(oData);
    var server = sinon.fakeServer.create();
    server.xhr.useFilters = true;
    server.autoRespond = true;
    server.autoRespondAfter = 0;
    server.xhr.addFilter(function (method, url) {
      //whenever the this regular expression returns true the
      //request will not be intercepted by FakeRest
      return !url.match(/Products/);
    });
    // use sinon.js to monkey-patch XmlHttpRequest
    server.respondWith(restServer.getHandler());
  }
  // initialize the embedded component on the HTML page
  sap.ui.require(["sap/ui/core/ComponentSupport"]);
});