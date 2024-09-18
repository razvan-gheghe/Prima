sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
  function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("myapp.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        // Apelăm init-ul părintelui (UIComponent)
        UIComponent.prototype.init.apply(this, arguments);

        // Inițializăm modelul JSON cu date
        var oData = {
          recipient: {
            name: "World",
          },
        };

        // Setăm modelul JSON la nivel de aplicație
        var oModel = new JSONModel(oData);
        this.setModel(oModel);
      },
    });
  }
);
