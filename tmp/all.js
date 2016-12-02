"use strict";
var guid = require('guid');
var Dispatcher = (function () {
    function Dispatcher() {
        this.listeners = {};
    }
    Dispatcher.prototype.register = function (cb) {
        var id = guid.raw();
        this.listeners[id] = cb;
        return id;
    };
    Dispatcher.prototype.dispatch = function (payload) {
        console.info("Dispatching..", payload);
        for (var id in this.listeners) {
            var listener = this.listeners[id];
            listener(payload);
        }
    };
    return Dispatcher;
}());
var dispatcher = new Dispatcher();
exports.dispatcher = dispatcher;

"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var doctor_profile_list_1 = require('./components/doctor-profile-list');
var doctor_profile_presenter_1 = require('./presenters/doctor-profile-presenter');
function render(items) {
    ReactDOM.render(React.createElement(doctor_profile_list_1.DoctorProfileList, {items: items}), document.getElementById('app'));
}
//groceryItemStore.onChange(render);
render(doctor_profile_presenter_1.doctorProfilePresenter.getItems());

"use strict";

"use strict";
var dispatcher_1 = require('../dispatcher');
var GroceryItemActions = (function () {
    function GroceryItemActions() {
    }
    GroceryItemActions.prototype.add = function (item) {
        console.log("Dispatching grocery-item:add", item);
        this._dispatch(item, 0 /* add */);
    };
    GroceryItemActions.prototype.delete = function (item) {
        console.log("Dispatching grocery-item:delete", item);
        this._dispatch(item, 1 /* delete */);
    };
    GroceryItemActions.prototype.unbuy = function (item) {
        this._dispatch(item, 4 /* unbuy */);
    };
    GroceryItemActions.prototype.buy = function (item) {
        this._dispatch(item, 3 /* buy */);
    };
    GroceryItemActions.prototype._dispatch = function (item, action) {
        dispatcher_1.dispatcher.dispatch({
            payload: item,
            type: 'grocery-item:' + action
        });
    };
    return GroceryItemActions;
}());
var groceryItemActions = new GroceryItemActions;
exports.groceryItemActions = groceryItemActions;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var doctor_profile_1 = require('./doctor-profile');
var DoctorProfileList = (function (_super) {
    __extends(DoctorProfileList, _super);
    function DoctorProfileList() {
        _super.call(this);
    }
    DoctorProfileList.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("h1", null, "Doctors "), React.createElement("div", null, this.props.items.map(function (item, idx) { return React.createElement(doctor_profile_1.DoctorProfile, {item: item, key: "item" + idx}); }))));
    };
    return DoctorProfileList;
}(React.Component));
exports.DoctorProfileList = DoctorProfileList;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DoctorProfile = (function (_super) {
    __extends(DoctorProfile, _super);
    function DoctorProfile() {
        _super.call(this);
    }
    // delete(e:Event){
    // 	e.preventDefault();
    // 	groceryItemActions.delete(this.props.item);
    // }
    // togglePurchase(e:Event){
    // 	e.preventDefault();
    // 	let item = this.props.item;
    // 	item.purchased ? groceryItemActions.unbuy(item) : groceryItemActions.buy(item);
    // }
    DoctorProfile.prototype.render = function () {
        return (React.createElement("h3", null, " ", this.props.item.doctorName, " "));
    };
    return DoctorProfile;
}(React.Component));
exports.DoctorProfile = DoctorProfile;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var GroceryItemActionCreator_1 = require('../actions/GroceryItemActionCreator');
var GroceryItem = (function (_super) {
    __extends(GroceryItem, _super);
    function GroceryItem() {
        _super.call(this);
    }
    GroceryItem.prototype.delete = function (e) {
        e.preventDefault();
        GroceryItemActionCreator_1.groceryItemActions.delete(this.props.item);
    };
    GroceryItem.prototype.togglePurchase = function (e) {
        e.preventDefault();
        var item = this.props.item;
        item.purchased ? GroceryItemActionCreator_1.groceryItemActions.unbuy(item) : GroceryItemActionCreator_1.groceryItemActions.buy(item);
    };
    GroceryItem.prototype.render = function () {
        return (React.createElement("article", {className: 'grocery-item row'}, React.createElement("section", {className: 'six columns'}, React.createElement("h4", {className: this.props.item.purchased ? 'strikethrough' : ''}, this.props.item.name)), React.createElement("form", {className: "three columns", onSubmit: this.delete.bind(this)}, React.createElement("button", null, "×")), React.createElement("form", {className: "three columns", onSubmit: this.togglePurchase.bind(this)}, React.createElement("button", {className: this.props.item.purchased ? "" : "button-primary"}, this.props.item.purchased ? "Unbuy" : "Buy"))));
    };
    return GroceryItem;
}(React.Component));
exports.GroceryItem = GroceryItem;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var GroceryItem_1 = require('./GroceryItem');
var GroceryListAddItem_1 = require('./GroceryListAddItem');
var GroceryItemList = (function (_super) {
    __extends(GroceryItemList, _super);
    function GroceryItemList() {
        _super.call(this);
    }
    GroceryItemList.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("h1", null, "Grocery List"), React.createElement("div", null, this.props.items.map(function (item, idx) { return React.createElement(GroceryItem_1.GroceryItem, {item: item, key: "item" + idx}); })), React.createElement(GroceryListAddItem_1.GroceryListAddItem, null)));
    };
    return GroceryItemList;
}(React.Component));
exports.GroceryItemList = GroceryItemList;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var GroceryItemActionCreator_1 = require('../actions/GroceryItemActionCreator');
var GroceryListAddItem = (function (_super) {
    __extends(GroceryListAddItem, _super);
    function GroceryListAddItem() {
        _super.call(this);
        this.state = {};
        this.state.input = "";
    }
    GroceryListAddItem.prototype.handleInputName = function (e) {
        this.setState({ input: e.target.value });
    };
    GroceryListAddItem.prototype.addItem = function (e) {
        e.preventDefault();
        GroceryItemActionCreator_1.groceryItemActions.add({
            name: this.state.input
        });
        this.state.input = "";
    };
    GroceryListAddItem.prototype.render = function () {
        return (React.createElement("div", {className: 'grocery-addItem'}, React.createElement("form", {onSubmit: this.addItem.bind(this)}, React.createElement("input", {type: "text", value: this.state.input, onChange: this.handleInputName.bind(this)}), React.createElement("button", null, "Add Item"))));
    };
    return GroceryListAddItem;
}(React.Component));
exports.GroceryListAddItem = GroceryListAddItem;

"use strict";
//<reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/es6-Promise/es6-Promise.d.ts" />
var $ = require('jquery');
var es6_promise_1 = require('es6-promise');
var RestHelper = (function () {
    function RestHelper() {
    }
    RestHelper.prototype.get = function (url) {
        return new es6_promise_1.Promise(function (success, error) {
            $.ajax({
                url: url,
                dataType: 'json',
                success: success,
                error: error
            });
        });
    };
    RestHelper.prototype.post = function (url, data) {
        return new es6_promise_1.Promise(function (success, error) {
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: success,
                error: error
            });
        });
    };
    RestHelper.prototype.patch = function (url, data) {
        return new es6_promise_1.Promise(function (success, error) {
            $.ajax({
                url: url,
                method: 'PATCH',
                data: data,
                success: success,
                error: error
            });
        });
    };
    RestHelper.prototype.del = function (url) {
        return new es6_promise_1.Promise(function (success, error) {
            $.ajax({
                url: url,
                method: 'DELETE',
                success: success,
                error: error
            });
        });
    };
    return RestHelper;
}());
var restHelper = new RestHelper;
exports.restHelper = restHelper;

"use strict";
var RestHelper_1 = require('../helpers/RestHelper');
var DoctorProfilePresenter = (function () {
    function DoctorProfilePresenter() {
        this.APIBASE = 'api/profiles/';
        this.items = [];
        this.listeners = [];
        //	this.dispatcherId = dispatcher.register(this.handleDispatch.bind(this));
        this.initialize();
    }
    DoctorProfilePresenter.prototype.getItems = function () {
        return this.items;
    };
    // onChange(listener){
    // 	this.listeners.push(listener);
    // }
    DoctorProfilePresenter.prototype.initialize = function () {
        var _this = this;
        RestHelper_1.restHelper.get(this.APIBASE).then(function (data) {
            _this.items = data;
        });
    };
    return DoctorProfilePresenter;
}());
var doctorProfilePresenter = new DoctorProfilePresenter;
exports.doctorProfilePresenter = doctorProfilePresenter;

"use strict";
var dispatcher_1 = require('../dispatcher');
var RestHelper_1 = require('../helpers/RestHelper');
var GroceryItemStore = (function () {
    function GroceryItemStore() {
        this.APIBASE = 'api/items/';
        this.items = [];
        this.listeners = [];
        this.dispatcherId = dispatcher_1.dispatcher.register(this.handleDispatch.bind(this));
        this.initialize();
    }
    GroceryItemStore.prototype.getItems = function () {
        return this.items;
    };
    GroceryItemStore.prototype.onChange = function (listener) {
        this.listeners.push(listener);
    };
    GroceryItemStore.prototype.initialize = function () {
        var _this = this;
        RestHelper_1.restHelper.get(this.APIBASE).then(function (data) {
            _this.items = data;
            _this.triggerListeners();
        });
    };
    GroceryItemStore.prototype.addItem = function (item) {
        RestHelper_1.restHelper.post(this.APIBASE, item).then(function (id) { return item._id = id; });
        this.items.push(item);
        this.triggerListeners();
    };
    GroceryItemStore.prototype.triggerListeners = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(this.items);
        }
    };
    GroceryItemStore.prototype.updatePurchaseStatus = function (item, purchase) {
        var matchIdx = this._getItemIndex(item);
        if (~matchIdx) {
            var item_1 = this.items.slice(matchIdx, matchIdx + 1).pop();
            item_1.purchased = purchase;
        }
        this.triggerListeners();
        RestHelper_1.restHelper.patch(this.APIBASE + item._id, item);
    };
    GroceryItemStore.prototype.deleteItem = function (item) {
        var matchIdx = this._getItemIndex(item);
        if (~matchIdx) {
            this.items.splice(matchIdx, 1);
        }
        this.triggerListeners();
        RestHelper_1.restHelper.del(this.APIBASE + item._id);
    };
    GroceryItemStore.prototype._getItemIndex = function (item) {
        return this.items.indexOf(item);
    };
    GroceryItemStore.prototype.handleDispatch = function (event) {
        var parts = event.type.split(':'), mainKey = parts[0], action = +parts[1];
        if (mainKey === 'grocery-item') {
            switch (action) {
                case 0 /* add */:
                    this.addItem(event.payload);
                    break;
                case 1 /* delete */:
                    this.deleteItem(event.payload);
                    break;
                case 3 /* buy */:
                    this.updatePurchaseStatus(event.payload, true);
                    break;
                case 4 /* unbuy */:
                    this.updatePurchaseStatus(event.payload, false);
                    break;
            }
        }
    };
    return GroceryItemStore;
}());
var groceryItemStore = new GroceryItemStore;
exports.groceryItemStore = groceryItemStore;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BhdGNoZXIuanMiLCJtYWluLmpzIiwiYWN0aW9ucy9CYXNlQWN0aW9ucy5qcyIsImFjdGlvbnMvR3JvY2VyeUl0ZW1BY3Rpb25DcmVhdG9yLmpzIiwiY29tcG9uZW50cy9kb2N0b3ItcHJvZmlsZS1saXN0LmpzIiwiY29tcG9uZW50cy9kb2N0b3ItcHJvZmlsZS5qcyIsImNvbXBvbmVudHMvR3JvY2VyeUl0ZW0uanMiLCJjb21wb25lbnRzL0dyb2NlcnlJdGVtTGlzdC5qcyIsImNvbXBvbmVudHMvR3JvY2VyeUxpc3RBZGRJdGVtLmpzIiwiaGVscGVycy9SZXN0SGVscGVyLmpzIiwicHJlc2VudGVycy9kb2N0b3ItcHJvZmlsZS1wcmVzZW50ZXIuanMiLCJzdG9yZXMvR3JvY2VyeUl0ZW1TdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBndWlkID0gcmVxdWlyZSgnZ3VpZCcpO1xudmFyIERpc3BhdGNoZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpc3BhdGNoZXIoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gICAgfVxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHZhciBpZCA9IGd1aWQucmF3KCk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2lkXSA9IGNiO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfTtcbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIkRpc3BhdGNoaW5nLi5cIiwgcGF5bG9hZCk7XG4gICAgICAgIGZvciAodmFyIGlkIGluIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyc1tpZF07XG4gICAgICAgICAgICBsaXN0ZW5lcihwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIERpc3BhdGNoZXI7XG59KCkpO1xudmFyIGRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuZXhwb3J0cy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTtcbnZhciBkb2N0b3JfcHJvZmlsZV9saXN0XzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvZG9jdG9yLXByb2ZpbGUtbGlzdCcpO1xudmFyIGRvY3Rvcl9wcm9maWxlX3ByZXNlbnRlcl8xID0gcmVxdWlyZSgnLi9wcmVzZW50ZXJzL2RvY3Rvci1wcm9maWxlLXByZXNlbnRlcicpO1xuZnVuY3Rpb24gcmVuZGVyKGl0ZW1zKSB7XG4gICAgUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoZG9jdG9yX3Byb2ZpbGVfbGlzdF8xLkRvY3RvclByb2ZpbGVMaXN0LCB7aXRlbXM6IGl0ZW1zfSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XG59XG4vL2dyb2NlcnlJdGVtU3RvcmUub25DaGFuZ2UocmVuZGVyKTtcbnJlbmRlcihkb2N0b3JfcHJvZmlsZV9wcmVzZW50ZXJfMS5kb2N0b3JQcm9maWxlUHJlc2VudGVyLmdldEl0ZW1zKCkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBkaXNwYXRjaGVyXzEgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyJyk7XG52YXIgR3JvY2VyeUl0ZW1BY3Rpb25zID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcm9jZXJ5SXRlbUFjdGlvbnMoKSB7XG4gICAgfVxuICAgIEdyb2NlcnlJdGVtQWN0aW9ucy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJEaXNwYXRjaGluZyBncm9jZXJ5LWl0ZW06YWRkXCIsIGl0ZW0pO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaChpdGVtLCAwIC8qIGFkZCAqLyk7XG4gICAgfTtcbiAgICBHcm9jZXJ5SXRlbUFjdGlvbnMucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGlzcGF0Y2hpbmcgZ3JvY2VyeS1pdGVtOmRlbGV0ZVwiLCBpdGVtKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2goaXRlbSwgMSAvKiBkZWxldGUgKi8pO1xuICAgIH07XG4gICAgR3JvY2VyeUl0ZW1BY3Rpb25zLnByb3RvdHlwZS51bmJ1eSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoKGl0ZW0sIDQgLyogdW5idXkgKi8pO1xuICAgIH07XG4gICAgR3JvY2VyeUl0ZW1BY3Rpb25zLnByb3RvdHlwZS5idXkgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB0aGlzLl9kaXNwYXRjaChpdGVtLCAzIC8qIGJ1eSAqLyk7XG4gICAgfTtcbiAgICBHcm9jZXJ5SXRlbUFjdGlvbnMucHJvdG90eXBlLl9kaXNwYXRjaCA9IGZ1bmN0aW9uIChpdGVtLCBhY3Rpb24pIHtcbiAgICAgICAgZGlzcGF0Y2hlcl8xLmRpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgICAgICAgICAgcGF5bG9hZDogaXRlbSxcbiAgICAgICAgICAgIHR5cGU6ICdncm9jZXJ5LWl0ZW06JyArIGFjdGlvblxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBHcm9jZXJ5SXRlbUFjdGlvbnM7XG59KCkpO1xudmFyIGdyb2NlcnlJdGVtQWN0aW9ucyA9IG5ldyBHcm9jZXJ5SXRlbUFjdGlvbnM7XG5leHBvcnRzLmdyb2NlcnlJdGVtQWN0aW9ucyA9IGdyb2NlcnlJdGVtQWN0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgZG9jdG9yX3Byb2ZpbGVfMSA9IHJlcXVpcmUoJy4vZG9jdG9yLXByb2ZpbGUnKTtcbnZhciBEb2N0b3JQcm9maWxlTGlzdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERvY3RvclByb2ZpbGVMaXN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERvY3RvclByb2ZpbGVMaXN0KCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgRG9jdG9yUHJvZmlsZUxpc3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCBcIkRvY3RvcnMgXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHsgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZG9jdG9yX3Byb2ZpbGVfMS5Eb2N0b3JQcm9maWxlLCB7aXRlbTogaXRlbSwga2V5OiBcIml0ZW1cIiArIGlkeH0pOyB9KSkpKTtcbiAgICB9O1xuICAgIHJldHVybiBEb2N0b3JQcm9maWxlTGlzdDtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnRzLkRvY3RvclByb2ZpbGVMaXN0ID0gRG9jdG9yUHJvZmlsZUxpc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIERvY3RvclByb2ZpbGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEb2N0b3JQcm9maWxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERvY3RvclByb2ZpbGUoKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICAvLyBkZWxldGUoZTpFdmVudCl7XG4gICAgLy8gXHRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gXHRncm9jZXJ5SXRlbUFjdGlvbnMuZGVsZXRlKHRoaXMucHJvcHMuaXRlbSk7XG4gICAgLy8gfVxuICAgIC8vIHRvZ2dsZVB1cmNoYXNlKGU6RXZlbnQpe1xuICAgIC8vIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIFx0bGV0IGl0ZW0gPSB0aGlzLnByb3BzLml0ZW07XG4gICAgLy8gXHRpdGVtLnB1cmNoYXNlZCA/IGdyb2NlcnlJdGVtQWN0aW9ucy51bmJ1eShpdGVtKSA6IGdyb2NlcnlJdGVtQWN0aW9ucy5idXkoaXRlbSk7XG4gICAgLy8gfVxuICAgIERvY3RvclByb2ZpbGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgXCIgXCIsIHRoaXMucHJvcHMuaXRlbS5kb2N0b3JOYW1lLCBcIiBcIikpO1xuICAgIH07XG4gICAgcmV0dXJuIERvY3RvclByb2ZpbGU7XG59KFJlYWN0LkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Eb2N0b3JQcm9maWxlID0gRG9jdG9yUHJvZmlsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgR3JvY2VyeUl0ZW1BY3Rpb25DcmVhdG9yXzEgPSByZXF1aXJlKCcuLi9hY3Rpb25zL0dyb2NlcnlJdGVtQWN0aW9uQ3JlYXRvcicpO1xudmFyIEdyb2NlcnlJdGVtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoR3JvY2VyeUl0ZW0sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gR3JvY2VyeUl0ZW0oKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBHcm9jZXJ5SXRlbS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBHcm9jZXJ5SXRlbUFjdGlvbkNyZWF0b3JfMS5ncm9jZXJ5SXRlbUFjdGlvbnMuZGVsZXRlKHRoaXMucHJvcHMuaXRlbSk7XG4gICAgfTtcbiAgICBHcm9jZXJ5SXRlbS5wcm90b3R5cGUudG9nZ2xlUHVyY2hhc2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5wcm9wcy5pdGVtO1xuICAgICAgICBpdGVtLnB1cmNoYXNlZCA/IEdyb2NlcnlJdGVtQWN0aW9uQ3JlYXRvcl8xLmdyb2NlcnlJdGVtQWN0aW9ucy51bmJ1eShpdGVtKSA6IEdyb2NlcnlJdGVtQWN0aW9uQ3JlYXRvcl8xLmdyb2NlcnlJdGVtQWN0aW9ucy5idXkoaXRlbSk7XG4gICAgfTtcbiAgICBHcm9jZXJ5SXRlbS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIsIHtjbGFzc05hbWU6ICdncm9jZXJ5LWl0ZW0gcm93J30sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIHtjbGFzc05hbWU6ICdzaXggY29sdW1ucyd9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDRcIiwge2NsYXNzTmFtZTogdGhpcy5wcm9wcy5pdGVtLnB1cmNoYXNlZCA/ICdzdHJpa2V0aHJvdWdoJyA6ICcnfSwgdGhpcy5wcm9wcy5pdGVtLm5hbWUpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwge2NsYXNzTmFtZTogXCJ0aHJlZSBjb2x1bW5zXCIsIG9uU3VibWl0OiB0aGlzLmRlbGV0ZS5iaW5kKHRoaXMpfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBudWxsLCBcIsOXXCIpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwge2NsYXNzTmFtZTogXCJ0aHJlZSBjb2x1bW5zXCIsIG9uU3VibWl0OiB0aGlzLnRvZ2dsZVB1cmNoYXNlLmJpbmQodGhpcyl9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtjbGFzc05hbWU6IHRoaXMucHJvcHMuaXRlbS5wdXJjaGFzZWQgPyBcIlwiIDogXCJidXR0b24tcHJpbWFyeVwifSwgdGhpcy5wcm9wcy5pdGVtLnB1cmNoYXNlZCA/IFwiVW5idXlcIiA6IFwiQnV5XCIpKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIEdyb2NlcnlJdGVtO1xufShSZWFjdC5Db21wb25lbnQpKTtcbmV4cG9ydHMuR3JvY2VyeUl0ZW0gPSBHcm9jZXJ5SXRlbTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgR3JvY2VyeUl0ZW1fMSA9IHJlcXVpcmUoJy4vR3JvY2VyeUl0ZW0nKTtcbnZhciBHcm9jZXJ5TGlzdEFkZEl0ZW1fMSA9IHJlcXVpcmUoJy4vR3JvY2VyeUxpc3RBZGRJdGVtJyk7XG52YXIgR3JvY2VyeUl0ZW1MaXN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoR3JvY2VyeUl0ZW1MaXN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEdyb2NlcnlJdGVtTGlzdCgpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIEdyb2NlcnlJdGVtTGlzdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgUmVhY3QuY3JlYXRlRWxlbWVudChcImgxXCIsIG51bGwsIFwiR3JvY2VyeSBMaXN0XCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHsgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JvY2VyeUl0ZW1fMS5Hcm9jZXJ5SXRlbSwge2l0ZW06IGl0ZW0sIGtleTogXCJpdGVtXCIgKyBpZHh9KTsgfSkpLCBSZWFjdC5jcmVhdGVFbGVtZW50KEdyb2NlcnlMaXN0QWRkSXRlbV8xLkdyb2NlcnlMaXN0QWRkSXRlbSwgbnVsbCkpKTtcbiAgICB9O1xuICAgIHJldHVybiBHcm9jZXJ5SXRlbUxpc3Q7XG59KFJlYWN0LkNvbXBvbmVudCkpO1xuZXhwb3J0cy5Hcm9jZXJ5SXRlbUxpc3QgPSBHcm9jZXJ5SXRlbUxpc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIEdyb2NlcnlJdGVtQWN0aW9uQ3JlYXRvcl8xID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9Hcm9jZXJ5SXRlbUFjdGlvbkNyZWF0b3InKTtcbnZhciBHcm9jZXJ5TGlzdEFkZEl0ZW0gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhHcm9jZXJ5TGlzdEFkZEl0ZW0sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gR3JvY2VyeUxpc3RBZGRJdGVtKCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLnN0YXRlLmlucHV0ID0gXCJcIjtcbiAgICB9XG4gICAgR3JvY2VyeUxpc3RBZGRJdGVtLnByb3RvdHlwZS5oYW5kbGVJbnB1dE5hbWUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXQ6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgIH07XG4gICAgR3JvY2VyeUxpc3RBZGRJdGVtLnByb3RvdHlwZS5hZGRJdGVtID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBHcm9jZXJ5SXRlbUFjdGlvbkNyZWF0b3JfMS5ncm9jZXJ5SXRlbUFjdGlvbnMuYWRkKHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuc3RhdGUuaW5wdXRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhdGUuaW5wdXQgPSBcIlwiO1xuICAgIH07XG4gICAgR3JvY2VyeUxpc3RBZGRJdGVtLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiAnZ3JvY2VyeS1hZGRJdGVtJ30sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIsIHtvblN1Ym1pdDogdGhpcy5hZGRJdGVtLmJpbmQodGhpcyl9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCB2YWx1ZTogdGhpcy5zdGF0ZS5pbnB1dCwgb25DaGFuZ2U6IHRoaXMuaGFuZGxlSW5wdXROYW1lLmJpbmQodGhpcyl9KSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCBudWxsLCBcIkFkZCBJdGVtXCIpKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIEdyb2NlcnlMaXN0QWRkSXRlbTtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnRzLkdyb2NlcnlMaXN0QWRkSXRlbSA9IEdyb2NlcnlMaXN0QWRkSXRlbTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2pxdWVyeS9qcXVlcnkuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9lczYtUHJvbWlzZS9lczYtUHJvbWlzZS5kLnRzXCIgLz5cbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG52YXIgZXM2X3Byb21pc2VfMSA9IHJlcXVpcmUoJ2VzNi1wcm9taXNlJyk7XG52YXIgUmVzdEhlbHBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVzdEhlbHBlcigpIHtcbiAgICB9XG4gICAgUmVzdEhlbHBlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IGVzNl9wcm9taXNlXzEuUHJvbWlzZShmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVzdEhlbHBlci5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBlczZfcHJvbWlzZV8xLlByb21pc2UoZnVuY3Rpb24gKHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVzdEhlbHBlci5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgZXM2X3Byb21pc2VfMS5Qcm9taXNlKGZ1bmN0aW9uIChzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVzdEhlbHBlci5wcm90b3R5cGUuZGVsID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IGVzNl9wcm9taXNlXzEuUHJvbWlzZShmdW5jdGlvbiAoc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFJlc3RIZWxwZXI7XG59KCkpO1xudmFyIHJlc3RIZWxwZXIgPSBuZXcgUmVzdEhlbHBlcjtcbmV4cG9ydHMucmVzdEhlbHBlciA9IHJlc3RIZWxwZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBSZXN0SGVscGVyXzEgPSByZXF1aXJlKCcuLi9oZWxwZXJzL1Jlc3RIZWxwZXInKTtcbnZhciBEb2N0b3JQcm9maWxlUHJlc2VudGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb2N0b3JQcm9maWxlUHJlc2VudGVyKCkge1xuICAgICAgICB0aGlzLkFQSUJBU0UgPSAnYXBpL3Byb2ZpbGVzLyc7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgLy9cdHRoaXMuZGlzcGF0Y2hlcklkID0gZGlzcGF0Y2hlci5yZWdpc3Rlcih0aGlzLmhhbmRsZURpc3BhdGNoLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgRG9jdG9yUHJvZmlsZVByZXNlbnRlci5wcm90b3R5cGUuZ2V0SXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgIH07XG4gICAgLy8gb25DaGFuZ2UobGlzdGVuZXIpe1xuICAgIC8vIFx0dGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgLy8gfVxuICAgIERvY3RvclByb2ZpbGVQcmVzZW50ZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIFJlc3RIZWxwZXJfMS5yZXN0SGVscGVyLmdldCh0aGlzLkFQSUJBU0UpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIF90aGlzLml0ZW1zID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9jdG9yUHJvZmlsZVByZXNlbnRlcjtcbn0oKSk7XG52YXIgZG9jdG9yUHJvZmlsZVByZXNlbnRlciA9IG5ldyBEb2N0b3JQcm9maWxlUHJlc2VudGVyO1xuZXhwb3J0cy5kb2N0b3JQcm9maWxlUHJlc2VudGVyID0gZG9jdG9yUHJvZmlsZVByZXNlbnRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIGRpc3BhdGNoZXJfMSA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXInKTtcbnZhciBSZXN0SGVscGVyXzEgPSByZXF1aXJlKCcuLi9oZWxwZXJzL1Jlc3RIZWxwZXInKTtcbnZhciBHcm9jZXJ5SXRlbVN0b3JlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcm9jZXJ5SXRlbVN0b3JlKCkge1xuICAgICAgICB0aGlzLkFQSUJBU0UgPSAnYXBpL2l0ZW1zLyc7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVySWQgPSBkaXNwYXRjaGVyXzEuZGlzcGF0Y2hlci5yZWdpc3Rlcih0aGlzLmhhbmRsZURpc3BhdGNoLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgR3JvY2VyeUl0ZW1TdG9yZS5wcm90b3R5cGUuZ2V0SXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgIH07XG4gICAgR3JvY2VyeUl0ZW1TdG9yZS5wcm90b3R5cGUub25DaGFuZ2UgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBHcm9jZXJ5SXRlbVN0b3JlLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBSZXN0SGVscGVyXzEucmVzdEhlbHBlci5nZXQodGhpcy5BUElCQVNFKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBfdGhpcy5pdGVtcyA9IGRhdGE7XG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyTGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgR3JvY2VyeUl0ZW1TdG9yZS5wcm90b3R5cGUuYWRkSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIFJlc3RIZWxwZXJfMS5yZXN0SGVscGVyLnBvc3QodGhpcy5BUElCQVNFLCBpdGVtKS50aGVuKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gaXRlbS5faWQgPSBpZDsgfSk7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyTGlzdGVuZXJzKCk7XG4gICAgfTtcbiAgICBHcm9jZXJ5SXRlbVN0b3JlLnByb3RvdHlwZS50cmlnZ2VyTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5saXN0ZW5lcnM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBfYVtfaV07XG4gICAgICAgICAgICBsaXN0ZW5lcih0aGlzLml0ZW1zKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgR3JvY2VyeUl0ZW1TdG9yZS5wcm90b3R5cGUudXBkYXRlUHVyY2hhc2VTdGF0dXMgPSBmdW5jdGlvbiAoaXRlbSwgcHVyY2hhc2UpIHtcbiAgICAgICAgdmFyIG1hdGNoSWR4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KGl0ZW0pO1xuICAgICAgICBpZiAofm1hdGNoSWR4KSB7XG4gICAgICAgICAgICB2YXIgaXRlbV8xID0gdGhpcy5pdGVtcy5zbGljZShtYXRjaElkeCwgbWF0Y2hJZHggKyAxKS5wb3AoKTtcbiAgICAgICAgICAgIGl0ZW1fMS5wdXJjaGFzZWQgPSBwdXJjaGFzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyaWdnZXJMaXN0ZW5lcnMoKTtcbiAgICAgICAgUmVzdEhlbHBlcl8xLnJlc3RIZWxwZXIucGF0Y2godGhpcy5BUElCQVNFICsgaXRlbS5faWQsIGl0ZW0pO1xuICAgIH07XG4gICAgR3JvY2VyeUl0ZW1TdG9yZS5wcm90b3R5cGUuZGVsZXRlSXRlbSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBtYXRjaElkeCA9IHRoaXMuX2dldEl0ZW1JbmRleChpdGVtKTtcbiAgICAgICAgaWYgKH5tYXRjaElkeCkge1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UobWF0Y2hJZHgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlckxpc3RlbmVycygpO1xuICAgICAgICBSZXN0SGVscGVyXzEucmVzdEhlbHBlci5kZWwodGhpcy5BUElCQVNFICsgaXRlbS5faWQpO1xuICAgIH07XG4gICAgR3JvY2VyeUl0ZW1TdG9yZS5wcm90b3R5cGUuX2dldEl0ZW1JbmRleCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgfTtcbiAgICBHcm9jZXJ5SXRlbVN0b3JlLnByb3RvdHlwZS5oYW5kbGVEaXNwYXRjaCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgcGFydHMgPSBldmVudC50eXBlLnNwbGl0KCc6JyksIG1haW5LZXkgPSBwYXJ0c1swXSwgYWN0aW9uID0gK3BhcnRzWzFdO1xuICAgICAgICBpZiAobWFpbktleSA9PT0gJ2dyb2NlcnktaXRlbScpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIGFkZCAqLzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGV2ZW50LnBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEgLyogZGVsZXRlICovOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW0oZXZlbnQucGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMyAvKiBidXkgKi86XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHVyY2hhc2VTdGF0dXMoZXZlbnQucGF5bG9hZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiB1bmJ1eSAqLzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQdXJjaGFzZVN0YXR1cyhldmVudC5wYXlsb2FkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gR3JvY2VyeUl0ZW1TdG9yZTtcbn0oKSk7XG52YXIgZ3JvY2VyeUl0ZW1TdG9yZSA9IG5ldyBHcm9jZXJ5SXRlbVN0b3JlO1xuZXhwb3J0cy5ncm9jZXJ5SXRlbVN0b3JlID0gZ3JvY2VyeUl0ZW1TdG9yZTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
