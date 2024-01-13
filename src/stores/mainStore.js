import { defineStore } from "pinia";

export const useStore = defineStore('store', {
  state: () => ({

    version: '1.5',
    isLogedIn: false,
    spinner: false,
    username: 'jabakhanji',
    password: '2024',
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
    updatedCollectionId: '',

    invoices: []


  }),
  actions: {

    getApi(query = '') {
      return 'https://script.google.com/macros/s/AKfycbykOj--0etsxnHzVH9PtAfZhz-L__oS4zPa4VetArVR8dVZwIpy7Nn8DABwVR0kWVuCyg/exec' + query
    },



  }
})