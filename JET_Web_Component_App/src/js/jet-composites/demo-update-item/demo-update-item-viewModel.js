/**
  Copyright (c) 2015, 2026, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/demo-update-item-strings', 'ojs/ojcontext','ojs/ojresponsiveutils','ojs/ojresponsiveknockoututils','ojs/ojconverter-number','ojs/ojasyncvalidator-length','ojs/ojformlayout','ojs/ojinputtext','ojs/ojknockout','ojs/ojlabelvalue'], function (ko, componentStrings, Context,ResponsiveUtils,ResponsiveKnockoutUtils,converterModule,AsyncLengthValidator) {
    
 var IntlNumberConverter = converterModule.IntlNumberConverter;
            function ExampleComponentModel(context) {
        var self = this;
        //At the start of your viewModel constructor
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = {"description": "Web Component Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from demo-update-item');
        self.properties = context.properties;
        self.res = componentStrings['demo-update-item'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }
        this.currency = new IntlNumberConverter({style:"currency",
            currency:"USD",currencyDisplay:"code",
        });

        
        this.smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
    
        this.isSmall = ResponsiveKnockoutUtils.createMediaQueryObservable(this.smQuery);
        this.labelEdge = ko.computed (()=>{
            return this.isSmall() ? "top":"start";
        },this);

        this.lengthValue1 = ko.observable("");
        this.validators= ko.observableArray([
            new AsyncLengthValidator({ min:5, max:50}),
        ])
        
        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnected = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
});
