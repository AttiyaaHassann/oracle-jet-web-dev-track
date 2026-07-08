/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojtranslation','../accUtils','knockout','utils/core','ojs/ojinputtext','ojs/ojinputnumber','ojs/ojformlayout','ojs/ojcollapsible','ojs/ojcheckboxset','ojs/ojoption'],
  function(Translations,accUtils,ko,CoreUtils) 
 {
  function CustomerViewModel()
      {
        this._initAllIds();
        this._initAllLabels();
        this._initAllObservables();
      
      //   this.connected = () => {
      //     accUtils.announce('Customers page loaded.', 'assertive');
      //     document.title = "Customers";
      //     // Implement further logic if needed
      //   };


      }
  /**
 * @function _initAllIds
 * @description Initializes all ids.
 */
CustomerViewModel.prototype._initAllIds = function() {
  // this.inputFirstNameId = 'input-first-name';
  this.inputFirstNameId = CoreUtils.generateUniqueId();
  this.inputLastNameId = CoreUtils.generateUniqueId();
  this.inputFullNameId = CoreUtils.generateUniqueId();
  this.inputAgeId = CoreUtils.generateUniqueId();
  
  //dynamic ID //
};

   /**
 * @function _initAllLabels
 * @description Initializes all labels(translations).
 */
   
CustomerViewModel.prototype._initAllLabels = function() {

  this.inputFirstNameLabel = 'First Name';
  //for translating labels
  //this.inputFirstNameLabel = Translations.getTranslatedString('inputs.firstName');
};

       /**
 * @function _initAllObservables
 * @description Initializes all observables values.
 */
   
CustomerViewModel.prototype._initAllObservables = function(){
      this.inputFirstNameValue = ko.observable("");
      this.inputLastNameValue = ko.observable("");
      this.age=ko.observable();
      this.Interests = ko.observableArray([]);
      this.isInputLastNameDisabled=ko.observable(true);

      this.inputFirstNameValue = ko.observable("");
      this.inputLastNameValue = ko.observable("");
      this.age=ko.observable();
      this.Interests = ko.observableArray([]);
      this.isInputLastNameDisabled=ko.observable(false);

      this.inputFullNameValue= ko.computed(()=>
        {
          if(this.inputFirstNameValue()&& this.inputLastNameValue())
          {return `${this.inputFirstNameValue()} ${this.inputLastNameValue()}`}
        return '';},this);

      this.isInputFullNameDisabled = ko.computed(()=>{
        if(this.inputFirstNameValue()&& this.inputLastNameValue())
        {
          return false;
        }
        return true;
      })

        this.isInputLastNameDisabled = ko.computed(()=>{if(this.inputFirstNameValue()){return false;} else {return true;}}, this);
              
        this.onInputFirstNameValueChanged = function (event) 
        {
              this.val = event.detail.value;
              if(val)
              {
                this.isInputLastNameDisabled(false);
                return;
              }
              this.isInputLastNameDisabled(true);
        }.bind(this);

    };




    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return CustomerViewModel;
  }
);
