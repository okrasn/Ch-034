define(function(require) {
    "use strict";

    var CMS = require("CMS"),
    Model = require("../models/managementModel"),
    View = CMS.View.extend({
        el: false,
        template: _.template(require("text!../templates/managementTemplate.html")),

        events: {
            "click #managementDel": "deleteManagement",
            "click #managementEdit": "editManagement",
            "click #saveManagementEdit": "saveEditManagement",
            "click #cenceleManagementEdit": "cenceleEdit",
        },

        serialize: function() {
            return {
                model: this.model,
            };
        },

        initialize: function() {
            this.listenTo(this.model, "reset change", this.render, this);
        },

        deleteManagement: function(ev) {
            this.model.destroy();
        },

        editManagement: function(ev) {
           var evModelEl = ev.target.parentNode;
           console.log(ev.target.parentNode);
           evModelEl.previousSibling.previousSibling.lastChild.removeAttribute("disabled");
           evModelEl.previousSibling.previousSibling.lastChild.focus();
           $(evModelEl.parentNode).find(".managementEdit").attr({"value":"Зберегти", "class":"btn btn-success", "id":"saveManagementEdit"});
           $(evModelEl.parentNode).find("#managementDel").attr({"value":"Відмінити", "class":"btn btn-warning", "id":"cenceleManagementEdit"});
        },

        saveEditManagement: function(ev) {
           console.log(ev);
           var newValue = $(ev.target.parentNode.parentNode).find("#managementName").val(); //previousSibling.previousSibling.lastChild.value;
           ev.target.parentNode.previousSibling.previousSibling.lastChild.setAttribute("disabled","disabled");
           console.log(newValue);
            $(ev.target.parentNode.parentNode).find(".managementEdit").attr({"value":"Редагувати", "class":"btn btn-primary", "id":"managementEdit"});
           this.model.set({name:newValue});
           this.model.save();
           this.model.fetch({reset:true});
        },

        cenceleEdit: function(ev) {
          $(ev.target.parentNode.parentNode).find("#managementName").val(this.model.get("name"));
          console.log($(ev.target.parentNode.parentNode).find("#managementName").val(this.model.get("name")));
          this.saveEditManagement(ev);
        },

    });

    return View;
});
