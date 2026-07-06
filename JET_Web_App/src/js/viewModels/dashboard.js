/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */

define([
  "knockout",
  "text!../../store_data.json",
  "../accUtils",
  "ojs/ojmutablearraydataprovider",
  "ojs/ojlistview",
  "ojs/ojknockout-keyset",
  "ojs/ojrestdataprovider",
  "ojs/ojdataprovider",
  "ojs/ojdialog",
  "ojs/ojinputtext",
  "ojs/ojbutton",
  "ojs/ojlabel",
  "ojs/ojselectsingle",
  "ojs/ojchart",
  "ojs/ojavatar",
  "demo-update-item/loader"
], function (
  ko,
  storeData,
  accUtils,
  MutableArrayDataProvider,
  ojListView,
  keySet,
  RESTDataProvider,
  DataProvider,
) 

{
  const RESTDP = RESTDataProvider.RESTDataProvider;
  const ObservableKeySet = keySet.ObservableKeySet;

  function DashboardViewModel() {
    // const TextFilter = DataProvider.TextFilter;
    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */

    this.dataFetched = ko.observable(true);

    this.fetchErrorHandler = (errorDetail) => {
      this.dataFetched(false);
      if (errorDetail.response) {
        this.fetchError = String(errorDetail.response.status);
      } else {
        this.fetchError = errorDetail.error.message;
      }
    };

    this.itemName = ko.observable("");
    this.price = ko.observable();
    this.short_desc = ko.observable("");
    this.quantity_instock = ko.observable();
    this.quantity_shipped = ko.observable();
    this.quantity = 0;
    this.inputImageFile = "css/images/product_images/jet_logo_256.png";

    this.InputItemID = ko.observable();
    this.inputItemName = ko.observable("");
    this.inputPrice = ko.observable();
    this.inputShortDesc = ko.observable("");
    this.selectedRow = ko.observable();

    this.showCreateDialog = (event) => {
      document.getElementById("createDialog").open();
    };

    this.createItem = async (event) => {
      this.quantity = this.quantity_instock() + this.quantity_shipped();

      //   const row = {name: this.itemName(),
      //     short_desc: this.short_desc(),
      // price: parseFloat(this.price()),
      // quantity_instock: parseInt(this.quantity_instock()),
      // quantity_shipped: parseInt(this.quantity_shipped()),
      // quantity: this.quantity,
      // activity_id: this.activityKey(),
      // image: this.inputImageFile,
      //   };
      const row = {
        name: this.itemName(),
        short_desc: this.short_desc(),
        price: this.price(),
        quantity_instock: this.quantity_instock(),
        quantity_shipped: this.quantity_shipped(),
        quantity: this.quantity,
        activity_id: this.activityKey(), // ✅ CALL THE OBSERVABLE
        image: this.inputImageFile,
      };

      const request = new Request(this.restServerURLItems, {
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(row),
        method: "POST",
      });
      const response = await fetch(request);
      const addedRow = await response.json();

      const addedRowKey = addedRow[this.keyAttributes];
      const addedRowMetaData = { key: addedRowKey };
      this.itemsDataProvider.mutate({
        add: {
          data: [addedRow],
          keys: new Set([addedRowKey]),
          metadata: [addedRowMetaData],
        },
      });
      this.itemsDataProvider.refresh();
      document.getElementById("createDialog").close();
    };

    this.showEditDialog = (event) => {
      this.inputItemName(this.itemsData().name);
      this.inputPrice(this.itemsData().price);
      this.inputShortDesc(this.itemsData().short_desc);
      this.InputItemID(this.itemsData().id); // ✅ Also populate the ID field

      setTimeout(() => {
        const editDialog = document.getElementById("editDialog");
        if (editDialog) {
          editDialog.open();
        }
      }, 0);
    };

    this.updateItemSubmit = async (event) => {
      const currentRow = this.selectedRow;
      if (currentRow != null) {
        const row = {
          itemId: this.itemsData().id,
          name: this.inputItemName(),
          price: this.inputPrice(),
          short_desc: this.inputShortDesc(),
        };

        const request = new Request(
          `${this.restServerURLItems}${this.itemsData().id}`,
          {
            headers: new Headers({
              "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(row),
            method: "PUT", //update resource
          },
        );
        const response = await fetch(request);
        if(!response.ok){
          console.error("Update failed", response.status);
          return;
        }
        const updatedRow = await response.json();

        const updatedRowKey = this.itemsData().id;
        const updatedRowData = { key: updatedRowKey };
        this.itemsDataProvider.mutate({
          update: {
            data: [updatedRow],
            keys: new Set([updatedRowKey]),
            metadata: [updatedRowData],
          },
        });
        this.itemsData(updatedRow);
        this.itemsDataProvider.refresh();
      }
      document.getElementById("editDialog").close();
    }; //end of updateitem


    this.deleteItemSubmit = async (event) =>{
      
      let itemID = this.firstSelectedItem().data.id;
      const currentRow = this.selectedRow;

        if(currentRow!=null){
              let really = confirm("Do you really want to delete this item ?");
              if(really)
              {
                const request = new Request(
                  `${this.restServerURLItems}${itemID}`,
                  {method: "DELETE"}
                );
                const response = await fetch(request);

                if(response.status === 200)
                {const removedRowKey = itemID;
                const removedRowMetaData = {key: removedRowKey};

                this.itemsDataProvider.mutate({
                  remove:
                  {
                    data: [itemID],
                    keys: new Set([removedRowKey]),
                    metadata: [removedRowMetaData,]
                  },
                });
                this.itemsDataProvider.refresh();
                }

                else{
                  alert("Delete failed with status" + response.status + ":"+ response.statusText)
                }
              }
        }
    };
    //activity key attributes that i will pass as a parameter when creating a REST DP Instance
    this.keyAttributes = "id";
    //REST endpoint that returns Activity data
    this.restServerURLActivities =
      "https://oracleapex.com/ords/oraclejet/lp/activities/";

    //no  longer needed when implementing a restful service //this.activityDataProvider = new MutableArrayDataProvider(JSON.parse(storeData),{keyAttributes: "id",});

    // console.log("RESTDataProvider =", RESTDataProvider);
    // console.log("DataProvider =", DataProvider);
    this.activityDataProvider = new RESTDP({
      keyAttributes: this.keyAttributes,
      url: this.restServerURLActivities,
      error: this.fetchErrorHandler,
      transforms: {
        fetchFirst: {
          request: async (options) => {
            const url = new URL(options.url);
            const { size, offset } = options.fetchParameters;

            url.searchParams.set("limit", String(size));
            url.searchParams.set("offset", String(offset));

            return new Request(url.href);
          },

          response: async ({ body }) => {
            const { items, count, hasMore } = body;
            return {
              data: items,
              totalSize: count,
              hasMore: hasMore,
            };
          },
        },
      },
    });
    this.activityKey = ko.observable();
    this.activitiesArray = JSON.parse(storeData);
    this.itemsArray = this.activitiesArray[0].items;
    this.textFilter = ko.observable("");

    this.restServerURLItems =
      "https://oracleapex.com/ords/oraclejet/lp/activities/" +
      this.activityKey() +
      "/items/";
    this.itemsData = ko.observable("");
    this.itemsData(this.activitiesArray[0].items[0]);

    this.pieSeriesValue = ko.observableArray([{}]);

    this.selectedActivity = new ObservableKeySet();
    this.activitySelected = ko.observable(false);
    this.firstSelectedActivity = ko.observable();
    this.selectedActivityIds = ko.observable();

    this.itemSelected = ko.observable(false);
    this.selectedItem = ko.observable();
    this.firstSelectedItem = ko.observable();

    this.pieSeries = [
      { name: "Quantity in Stock", items: [this.itemsData().quantity_instock] },
      { name: "Quantity Shipped", items: [this.itemsData().quantity_shipped] },
    ];

    this.pieSeriesValue(this.pieSeries);

    this.selectedActivityChanged = (event) => {
      this.itemContext = event.detail.value.data;
      if (this.itemContext != null) {
        this.activitySelected(false);
        this.activityKey(event.detail.value.data.id);
        this.restServerURLItems =
          "https://oracleapex.com/ords/oraclejet/lp/activities/" +
          this.activityKey() +
          "/items/";

        this.itemsDataProvider = new RESTDP({
          keyAttributes: this.keyAttributes,
          capabilities: {
            filter: {
              textFilter: this.textFilter(true),
            },
          },
          url: this.restServerURLItems,
          textFilterAttributes: ["name"],
          transforms: {
            fetchFirst: {
              request: async (options) => {
                const url = new URL(options.url);
                const { size, offset } = options.fetchParameters;
                url.searchParams.set("limit", String(size));
                url.searchParams.set("offset", String(offset));
                const filterCriterion = options.fetchParameters.filterCriterion;
                const { textFilterAttributes } = options.fetchOptions;
                if (
                  filterCriterion &&
                  filterCriterion.text &&
                  textFilterAttributes
                ) {
                  const { text } = filterCriterion;
                  textFilterAttributes.forEach((attribute) => {
                    url.searchParams.set(attribute, text);
                  });
                }
                return new Request(url.href);
              },

              response: async ({ body }) => {
                const { items, totalSize, hasMore } = body;
                return { data: items, totalSize, hasMore };
              },
            },
          },
        });

        this.activitySelected(true);
        this.itemSelected(false);
        this.selectedItem();
        this.itemsData();
      } else {
        this.activitySelected(false);
        this.itemSelected(false);
      }
    };

    this.selectedItemChanged = (event) => {
      this.isClicked = event.detail.value.data;
      if (this.isClicked != null) {
        this.itemsData(event.detail.value.data);

        this.pieSeries = [
          {
            name: "Quantity in Stock",
            items: [this.itemsData().quantity_instock],
          },
          {
            name: "Quantity Shipped",
            items: [this.itemsData().quantity_shipped],
          },
        ];

        this.pieSeriesValue(this.pieSeries);

        this.itemSelected(true);
      } else {
        this.itemSelected(false);
      }
    };
    this.connected = () => {
      accUtils.announce("Dashboard page loaded.", "assertive");
      document.title = "Dashboard";
      // Implement further logic if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    this.disconnected = () => {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    this.transitionCompleted = () => {
      // Implement if needed
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return DashboardViewModel;
});

// The npx ojet serve command builds and serves the content of the JET_Web_Application/src folder to the JET_Web_Application/web folder.
