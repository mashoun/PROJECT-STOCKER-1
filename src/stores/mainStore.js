import { defineStore } from "pinia";

export const useStore = defineStore('store', {
  state: () => ({

    version: '1.1',
    isLogedIn: false,
    spinner: false,
    username: '',
    password: '',
    stocker: {
      "tags": [
        {
          "id": "",
          "name": "",
          "value": "",
          "index": ""
        }
      ],
      "invoices": [
        {
          "id": "",
          "timestamp": "",
          "clientName": "",
          "clientNumber": "",
          "clientEmail": "",
          "itemId": "",
          "itemName": "",
          "itemModelNumber": "",
          "itemModelType": "",
          "itemModelBrand": "",
          "quantity": "",
          "unitCost": "",
          "unitPrice": "",
          "currency": "",
          "totalPrice": "",
          "index": ""
        }
      ],
      "collections": [
        {
          "record": {
            "id": "",
            "timestamp": "",
            "name": "",
            "description": "",
            "thumbnail": "",
            "index": ""
          },
          "items": [
            {
              "id": "",
              "timestamp": "",
              "name": "",
              "quantity": "",
              "unitPrice": "",
              "barcode": "",
              "modelNumber": "",
              "modelType": "",
              "modelBrand": "",
              "status": "",
              "color": "",
              "madeIn": "",
              "size": "",
              "weight": "",
              "power": "",
              "voltage": "",
              "ampers": "",
              "stand": "",
              "image": "",
              "currency": "",
              "unitCost": "",
              "index": ""
            }
          ]
        }
      ]
    },

    selectedCollection: '',
    selectedItem: '',

    invoices:[ ]


  }),
  actions: {

    getApi(query = '') {
      return 'https://script.google.com/macros/s/AKfycbwcpTfO5WTWAJC1Q_NcHuznTqsjO-plzRvAtX4frkry7MgRAd2MfhtAs9mS75RYyCW5lw/exec' + query
    },



  }
})