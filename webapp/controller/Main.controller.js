sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  function (Controller, JSONModel, MessageToast) {
    "use strict";
    return Controller.extend("myapp.controller.Main", {
      onInit: function () {
        var oData = {
          recipient: {
            name: "Default Name",
            email: "default@example.com",
            address: "Default Address",
            phone: "123456", // sau orice valoare default vrei pentru telefon
          },
          recipients: [
            {
              name: "Default",
              email: "default@example.com",
              address: "123 Default St",
              phone: "123-456-7890",
            },
          ],
          newRecipient: {
            name: "",
            email: "",
            address: "",
            phone: "",
          },
        };
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
      },

      onButtonPress: function () {
        MessageToast.show("button pressed");
      },

      onShowInputPress: function () {
        var oInput = this.getView().byId("myInputField");
        var sValue = oInput.getValue().trim();

        if (!sValue) {
          MessageToast.show("Input is empty!");
        } else {
          MessageToast.show("Input value: " + sValue);
        }
      },

      onShowNamePress: function () {
        var oModel = this.getView().getModel();
        var sName = oModel.getProperty("/recipient/name");
        MessageToast.show("Current Name: " + sName);
      },

      onResetNamePress: function () {
        var oModel = this.getView().getModel();
        oModel.setProperty("/recipient/name", "Default Name");
        MessageToast.show("Reset successfully executed!");
      },

      // Funcție pentru a deschide dialogul
      onOpenAddDialog: function () {
        var oView = this.getView();
        var oDialog = oView.byId("addRecipientDialog");
        oDialog.open();
      },

      // Funcție pentru a închide dialogul
      onCloseDialog: function () {
        var oView = this.getView();
        var oDialog = oView.byId("addRecipientDialog");
        oDialog.close();
      },

      // Funcție pentru a salva noul recipient în model
      onSaveRecipient: function () {
        var oModel = this.getView().getModel();
        var aRecipients = oModel.getProperty("/recipients");
        var oNewRecipient = oModel.getProperty("/newRecipient");

        // Adăugăm noul recipient în lista existentă
        aRecipients.push({
          name: oNewRecipient.name,
          email: oNewRecipient.email,
          address: oNewRecipient.address,
          phone: oNewRecipient.phone,
        });

        // Setăm lista actualizată în model
        oModel.setProperty("/recipients", aRecipients);

        // Resetăm câmpurile de input din dialog
        oModel.setProperty("/newRecipient", {
          name: "",
          email: "",
          address: "",
          phone: "",
        });

        // Închidem dialogul
        this.onCloseDialog();

        MessageToast.show("Recipient added successfully!");
      },
    });
  }
);
