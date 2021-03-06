(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Observable'), require('rxjs/operators'), require('rxjs/Subject'), require('@angular/common/http'), require('@angular/forms'), require('rxjs/observable/timer'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Observable', 'rxjs/operators', 'rxjs/Subject', '@angular/common/http', '@angular/forms', 'rxjs/observable/timer', '@angular/common'], factory) :
	(factory((global.ng2 = global.ng2 || {}, global.ng2.completer = {}),global.ng.core,global.Rx,global.Rx.Observable.prototype,global.Rx,global.ng.common.http,global.ng.forms,global.Rx.Observable,global.ng.common));
}(this, (function (exports,core,Observable,operators,Subject,http,forms,timer,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

"use strict";
var Observable_1 = require('../../Observable');
var catch_1 = require('../../operator/catch');
Observable_1.Observable.prototype.catch = catch_1._catch;
Observable_1.Observable.prototype._catch = catch_1._catch;

/**
 * @license ng2-completer
 * MIT license
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MAX_CHARS = 524288; // the default max length per the html maxlength attribute
var MIN_SEARCH_LENGTH = 3;
var PAUSE = 10;
var TEXT_SEARCHING = "Searching...";
var TEXT_NO_RESULTS = "No results found";
var CLEAR_TIMEOUT = 50;
/**
 * @param {?} value
 * @return {?}
 */
function isNil(value) {
    return typeof value === "undefined" || value === null;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var CompleterBaseData = (function (_super) {
    __extends(CompleterBaseData, _super);
    function CompleterBaseData() {
        return _super.call(this) || this;
    }
    /**
     * @return {?}
     */
    CompleterBaseData.prototype.cancel = /**
     * @return {?}
     */
    function () {
        return;
    };
    /**
     * @param {?} searchFields
     * @return {?}
     */
    CompleterBaseData.prototype.searchFields = /**
     * @param {?} searchFields
     * @return {?}
     */
    function (searchFields) {
        this._searchFields = searchFields;
        return this;
    };
    /**
     * @param {?} titleField
     * @return {?}
     */
    CompleterBaseData.prototype.titleField = /**
     * @param {?} titleField
     * @return {?}
     */
    function (titleField) {
        this._titleField = titleField;
        return this;
    };
    /**
     * @param {?} descriptionField
     * @return {?}
     */
    CompleterBaseData.prototype.descriptionField = /**
     * @param {?} descriptionField
     * @return {?}
     */
    function (descriptionField) {
        this._descriptionField = descriptionField;
        return this;
    };
    /**
     * @param {?} imageField
     * @return {?}
     */
    CompleterBaseData.prototype.imageField = /**
     * @param {?} imageField
     * @return {?}
     */
    function (imageField) {
        this._imageField = imageField;
        return this;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    CompleterBaseData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ image = null;
        var /** @type {?} */ formattedText;
        var /** @type {?} */ formattedDesc = null;
        if (this._titleField) {
            formattedText = this.extractTitle(data);
        }
        else {
            formattedText = data;
        }
        if (typeof formattedText !== "string") {
            formattedText = JSON.stringify(formattedText);
        }
        if (this._descriptionField) {
            formattedDesc = this.extractValue(data, this._descriptionField);
        }
        if (this._imageField) {
            image = this.extractValue(data, this._imageField);
        }
        if (isNil(formattedText)) {
            return null;
        }
        return /** @type {?} */ ({
            description: formattedDesc,
            image: image,
            originalObject: data,
            title: formattedText
        });
    };
    /**
     * @param {?} data
     * @param {?} term
     * @return {?}
     */
    CompleterBaseData.prototype.extractMatches = /**
     * @param {?} data
     * @param {?} term
     * @return {?}
     */
    function (data, term) {
        var _this = this;
        var /** @type {?} */ matches = [];
        var /** @type {?} */ searchFields = this._searchFields ? this._searchFields.split(",") : null;
        if (this._searchFields !== null && this._searchFields !== undefined && term !== "") {
            matches = data.filter(function (item) {
                var /** @type {?} */ values = searchFields ? _this.extractBySearchFields(searchFields, item) : [item];
                return values.some(function (value) {
                    return value
                        .toString()
                        .toLowerCase()
                        .indexOf(term.toString().toLowerCase()) >= 0;
                });
            });
        }
        else {
            matches = data;
        }
        return matches;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CompleterBaseData.prototype.extractTitle = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        // split title fields and run extractValue for each and join with ' '
        if (!this._titleField) {
            return "";
        }
        return this._titleField.split(",")
            .map(function (field) {
            return _this.extractValue(item, field);
        })
            .reduce(function (acc, titlePart) { return acc ? acc + " " + titlePart : titlePart; });
    };
    /**
     * @param {?} obj
     * @param {?} key
     * @return {?}
     */
    CompleterBaseData.prototype.extractValue = /**
     * @param {?} obj
     * @param {?} key
     * @return {?}
     */
    function (obj, key) {
        var /** @type {?} */ keys;
        var /** @type {?} */ result;
        if (key) {
            keys = key.split(".");
            result = obj;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                key = keys_1[_i];
                if (result) {
                    result = result[key];
                }
            }
        }
        else {
            result = obj;
        }
        return result;
    };
    /**
     * @param {?} matches
     * @return {?}
     */
    CompleterBaseData.prototype.processResults = /**
     * @param {?} matches
     * @return {?}
     */
    function (matches) {
        var /** @type {?} */ i;
        var /** @type {?} */ results = [];
        if (matches && matches.length > 0) {
            for (i = 0; i < matches.length; i++) {
                var /** @type {?} */ item = this.convertToItem(matches[i]);
                if (item) {
                    results.push(item);
                }
            }
        }
        return results;
    };
    /**
     * @param {?} searchFields
     * @param {?} item
     * @return {?}
     */
    CompleterBaseData.prototype.extractBySearchFields = /**
     * @param {?} searchFields
     * @param {?} item
     * @return {?}
     */
    function (searchFields, item) {
        var _this = this;
        return searchFields
            .map(function (searchField) { return _this.extractValue(item, searchField); }).filter(function (value) { return !!value; });
    };
    return CompleterBaseData;
}(Subject.Subject));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LocalData = (function (_super) {
    __extends(LocalData, _super);
    function LocalData() {
        var _this = _super.call(this) || this;
        _this.dataSourceChange = new core.EventEmitter();
        return _this;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    LocalData.prototype.data = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data instanceof Observable.Observable) {
            var /** @type {?} */ data$ = /** @type {?} */ (data);
            data$
                .pipe(operators.catchError(function () { return []; }))
                .subscribe(function (res) {
                _this._data = res;
                if (_this.savedTerm) {
                    _this.search(_this.savedTerm);
                }
                _this.dataSourceChange.emit();
            });
        }
        else {
            this._data = data;
        }
        this.dataSourceChange.emit();
        return this;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    LocalData.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (!this._data) {
            this.savedTerm = term;
        }
        else {
            this.savedTerm = null;
            var /** @type {?} */ matches = this.extractMatches(this._data, term);
            this.next(this.processResults(matches));
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    LocalData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    return LocalData;
}(CompleterBaseData));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RemoteData = (function (_super) {
    __extends(RemoteData, _super);
    function RemoteData(http$$1) {
        var _this = _super.call(this) || this;
        _this.http = http$$1;
        _this.dataSourceChange = new core.EventEmitter();
        _this._urlFormater = null;
        _this._dataField = null;
        return _this;
    }
    /**
     * @param {?} remoteUrl
     * @return {?}
     */
    RemoteData.prototype.remoteUrl = /**
     * @param {?} remoteUrl
     * @return {?}
     */
    function (remoteUrl) {
        this._remoteUrl = remoteUrl;
        this.dataSourceChange.emit();
        return this;
    };
    /**
     * @param {?} urlFormater
     * @return {?}
     */
    RemoteData.prototype.urlFormater = /**
     * @param {?} urlFormater
     * @return {?}
     */
    function (urlFormater) {
        this._urlFormater = urlFormater;
    };
    /**
     * @param {?} dataField
     * @return {?}
     */
    RemoteData.prototype.dataField = /**
     * @param {?} dataField
     * @return {?}
     */
    function (dataField) {
        this._dataField = dataField;
    };
    /**
     * @param {?} requestOptions
     * @return {?}
     */
    RemoteData.prototype.requestOptions = /**
     * @param {?} requestOptions
     * @return {?}
     */
    function (requestOptions) {
        this._requestOptions = requestOptions;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    RemoteData.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        this.cancel();
        // let params = {};
        var /** @type {?} */ url = "";
        if (this._urlFormater) {
            url = this._urlFormater(term);
        }
        else {
            url = this._remoteUrl + encodeURIComponent(term);
        }
        this.remoteSearch = this.http
            .get(url, Object.assign({}, this._requestOptions))
            .pipe(operators.map(function (data) {
            var /** @type {?} */ matches = _this.extractValue(data, _this._dataField);
            return _this.extractMatches(matches, term);
        }), operators.catchError(function () { return []; }))
            .subscribe(function (matches) {
            var /** @type {?} */ results = _this.processResults(matches);
            _this.next(results);
        });
    };
    /**
     * @return {?}
     */
    RemoteData.prototype.cancel = /**
     * @return {?}
     */
    function () {
        if (this.remoteSearch) {
            this.remoteSearch.unsubscribe();
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    RemoteData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    return RemoteData;
}(CompleterBaseData));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LocalDataFactory = (function () {
    function LocalDataFactory() {
    }
    /**
     * @return {?}
     */
    LocalDataFactory.prototype.create = /**
     * @return {?}
     */
    function () {
        return new LocalData();
    };
    LocalDataFactory.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    LocalDataFactory.ctorParameters = function () { return []; };
    return LocalDataFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RemoteDataFactory = (function () {
    function RemoteDataFactory(http$$1) {
        this.http = http$$1;
    }
    /**
     * @return {?}
     */
    RemoteDataFactory.prototype.create = /**
     * @return {?}
     */
    function () {
        return new RemoteData(this.http);
    };
    RemoteDataFactory.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    RemoteDataFactory.ctorParameters = function () { return [
        { type: http.HttpClient, },
    ]; };
    return RemoteDataFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CompleterService = (function () {
    function CompleterService(localDataFactory, remoteDataFactory // Using any instead of () => LocalData because of AoT errors
    ) {
        this.localDataFactory = localDataFactory;
        this.remoteDataFactory = remoteDataFactory;
    }
    /**
     * @param {?} data
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    CompleterService.prototype.local = /**
     * @param {?} data
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    function (data, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var /** @type {?} */ localData = this.localDataFactory.create();
        return localData
            .data(data)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    /**
     * @param {?} url
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    CompleterService.prototype.remote = /**
     * @param {?} url
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    function (url, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var /** @type {?} */ remoteData = this.remoteDataFactory.create();
        return remoteData
            .remoteUrl(url)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    CompleterService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    CompleterService.ctorParameters = function () { return [
        { type: LocalDataFactory, },
        { type: RemoteDataFactory, },
    ]; };
    return CompleterService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

var CtrCompleter = (function () {
    function CtrCompleter() {
        this.selected = new core.EventEmitter();
        this.highlighted = new core.EventEmitter();
        this.opened = new core.EventEmitter();
        this.dataSourceChange = new core.EventEmitter();
        this._hasHighlighted = false;
        this._hasSelected = false;
        this._cancelBlur = false;
        this._isOpen = false;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    CtrCompleter.prototype.registerList = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        this.list = list;
    };
    /**
     * @param {?} dropdown
     * @return {?}
     */
    CtrCompleter.prototype.registerDropdown = /**
     * @param {?} dropdown
     * @return {?}
     */
    function (dropdown) {
        this.dropdown = dropdown;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CtrCompleter.prototype.onHighlighted = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.highlighted.emit(item);
        this._hasHighlighted = !!item;
    };
    /**
     * @param {?} item
     * @param {?=} clearList
     * @return {?}
     */
    CtrCompleter.prototype.onSelected = /**
     * @param {?} item
     * @param {?=} clearList
     * @return {?}
     */
    function (item, clearList) {
        if (clearList === void 0) { clearList = true; }
        this.selected.emit(item);
        if (item) {
            this._hasSelected = true;
        }
        if (clearList) {
            this.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.onDataSourceChange = /**
     * @return {?}
     */
    function () {
        if (this.hasSelected) {
            this.selected.emit(null);
            this._hasSelected = false;
        }
        this.dataSourceChange.emit();
    };
    /**
     * @param {?} term
     * @return {?}
     */
    CtrCompleter.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (this._hasSelected) {
            this.selected.emit(null);
            this._hasSelected = false;
        }
        if (this.list) {
            this.list.search(term);
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._hasHighlighted = false;
        this.isOpen = false;
        if (this.dropdown) {
            this.dropdown.clear();
        }
        if (this.list) {
            this.list.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.selectCurrent = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.selectCurrent();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.nextRow = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.nextRow();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.prevRow = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.prevRow();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.hasHighlighted = /**
     * @return {?}
     */
    function () {
        return this._hasHighlighted;
    };
    /**
     * @param {?} cancel
     * @return {?}
     */
    CtrCompleter.prototype.cancelBlur = /**
     * @param {?} cancel
     * @return {?}
     */
    function (cancel) {
        this._cancelBlur = cancel;
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.isCancelBlur = /**
     * @return {?}
     */
    function () {
        return this._cancelBlur;
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.open = /**
     * @return {?}
     */
    function () {
        if (!this._isOpen) {
            this.isOpen = true;
            this.list.open();
        }
    };
    Object.defineProperty(CtrCompleter.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isOpen;
        },
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            this._isOpen = open;
            this.opened.emit(this._isOpen);
            if (this.list) {
                this.list.isOpen(open);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrCompleter.prototype, "autoHighlightIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoHighlightIndex;
        },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._autoHighlightIndex = index;
            if (this.dropdown) {
                this.dropdown.highlightRow(this._autoHighlightIndex);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrCompleter.prototype, "hasSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasSelected;
        },
        enumerable: true,
        configurable: true
    });
    CtrCompleter.decorators = [
        { type: core.Directive, args: [{
                    selector: "[ctrCompleter]",
                },] },
    ];
    /** @nocollapse */
    CtrCompleter.ctorParameters = function () { return []; };
    CtrCompleter.propDecorators = {
        "selected": [{ type: core.Output },],
        "highlighted": [{ type: core.Output },],
        "opened": [{ type: core.Output },],
        "dataSourceChange": [{ type: core.Output },],
    };
    return CtrCompleter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

var CtrRowItem = (function () {
    function CtrRowItem(row, index) {
        this.row = row;
        this.index = index;
    }
    return CtrRowItem;
}());
var CtrDropdown = (function () {
    function CtrDropdown(completer, el) {
        this.completer = completer;
        this.el = el;
        this.rows = [];
        this._rowMouseDown = false;
        this.completer.registerDropdown(this);
    }
    /**
     * @return {?}
     */
    CtrDropdown.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.completer.registerDropdown(null);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ css = getComputedStyle(this.el.nativeElement);
        var /** @type {?} */ autoHighlightIndex = this.completer.autoHighlightIndex;
        this.isScrollOn = !!css.maxHeight && css.overflowY === "auto";
        if (autoHighlightIndex) {
            setTimeout(function () {
                _this.highlightRow(autoHighlightIndex);
            }, 0);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrDropdown.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this._rowMouseDown) {
            this._rowMouseDown = false;
            this.completer.cancelBlur(true);
            setTimeout(function () {
                _this.completer.cancelBlur(false);
            }, 0);
            return;
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    CtrDropdown.prototype.registerRow = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var /** @type {?} */ arrIndex = this.rows.findIndex(function (_row) { return _row.index === row.index; });
        if (arrIndex >= 0) {
            this.rows[arrIndex] = row;
        }
        else {
            this.rows.push(row);
        }
    };
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    CtrDropdown.prototype.unregisterRow = /**
     * @param {?} rowIndex
     * @return {?}
     */
    function (rowIndex) {
        var /** @type {?} */ arrIndex = this.rows.findIndex(function (_row) { return _row.index === rowIndex; });
        this.rows.splice(arrIndex, 1);
        if (this.currHighlighted && rowIndex === this.currHighlighted.index) {
            this.highlightRow(null);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    CtrDropdown.prototype.highlightRow = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ highlighted = this.rows.find(function (row) { return row.index === index; });
        if (isNil(index) || /** @type {?} */ ((index)) < 0) {
            if (this.currHighlighted) {
                this.currHighlighted.row.setHighlighted(false);
            }
            this.currHighlighted = undefined;
            this.completer.onHighlighted(null);
            return;
        }
        if (!highlighted) {
            return;
        }
        if (this.currHighlighted) {
            this.currHighlighted.row.setHighlighted(false);
        }
        this.currHighlighted = highlighted;
        this.currHighlighted.row.setHighlighted(true);
        this.completer.onHighlighted(this.currHighlighted.row.getDataItem());
        if (this.isScrollOn && this.currHighlighted) {
            var /** @type {?} */ rowTop = this.dropdownRowTop();
            if (!rowTop) {
                return;
            }
            if (rowTop < 0) {
                this.dropdownScrollTopTo(rowTop - 1);
            }
            else {
                var /** @type {?} */ row = this.currHighlighted.row.getNativeElement();
                if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
                    this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
                    if (this.el.nativeElement.getBoundingClientRect().bottom - this.dropdownRowOffsetHeight(row) < row.getBoundingClientRect().top) {
                        this.dropdownScrollTopTo(row.getBoundingClientRect().top - (this.el.nativeElement.getBoundingClientRect().top + parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).paddingTop), 10)));
                    }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.rows = [];
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CtrDropdown.prototype.onSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.completer.onSelected(item);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.rowMouseDown = /**
     * @return {?}
     */
    function () {
        this._rowMouseDown = true;
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.selectCurrent = /**
     * @return {?}
     */
    function () {
        if (this.currHighlighted) {
            this.onSelected(this.currHighlighted.row.getDataItem());
        }
        else if (this.rows.length > 0) {
            this.onSelected(this.rows[0].row.getDataItem());
        }
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.nextRow = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ nextRowIndex = 0;
        if (this.currHighlighted) {
            nextRowIndex = this.currHighlighted.index + 1;
        }
        this.highlightRow(nextRowIndex);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.prevRow = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ nextRowIndex = -1;
        if (this.currHighlighted) {
            nextRowIndex = this.currHighlighted.index - 1;
        }
        this.highlightRow(nextRowIndex);
    };
    /**
     * @param {?} offset
     * @return {?}
     */
    CtrDropdown.prototype.dropdownScrollTopTo = /**
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop + offset;
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.dropdownRowTop = /**
     * @return {?}
     */
    function () {
        if (!this.currHighlighted) {
            return;
        }
        return this.currHighlighted.row.getNativeElement().getBoundingClientRect().top -
            (this.el.nativeElement.getBoundingClientRect().top +
                parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).paddingTop), 10));
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.dropdownHeight = /**
     * @return {?}
     */
    function () {
        return this.el.nativeElement.getBoundingClientRect().top +
            parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).maxHeight), 10);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    CtrDropdown.prototype.dropdownRowOffsetHeight = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var /** @type {?} */ css = getComputedStyle(row.parentElement);
        return row.parentElement.offsetHeight +
            parseInt(/** @type {?} */ (css.marginTop), 10) + parseInt(/** @type {?} */ (css.marginBottom), 10);
    };
    CtrDropdown.decorators = [
        { type: core.Directive, args: [{
                    selector: "[ctrDropdown]",
                },] },
    ];
    /** @nocollapse */
    CtrDropdown.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: core.Host },] },
        { type: core.ElementRef, },
    ]; };
    CtrDropdown.propDecorators = {
        "onMouseDown": [{ type: core.HostListener, args: ["mousedown", ["$event"],] },],
    };
    return CtrDropdown;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// keyboard events
var KEY_DW = 40;
var KEY_RT = 39;
var KEY_UP = 38;
var KEY_LF = 37;
var KEY_ES = 27;
var KEY_EN = 13;
var KEY_TAB = 9;
var KEY_BK = 8;
var KEY_SH = 16;
var KEY_CL = 20;
var KEY_F1 = 112;
var KEY_F12 = 123;
var CtrInput = (function () {
    function CtrInput(completer, ngModel, el) {
        var _this = this;
        this.completer = completer;
        this.ngModel = ngModel;
        this.el = el;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.overrideSuggested = false;
        this.fillHighlighted = true;
        this.openOnFocus = false;
        this.openOnClick = false;
        this.selectOnClick = false;
        this.selectOnFocus = false;
        this.ngModelChange = new core.EventEmitter();
        this._searchStr = "";
        this._displayStr = "";
        this.blurTimer = null;
        this.completer.selected.subscribe(function (item) {
            if (!item) {
                return;
            }
            if (_this.clearSelected) {
                _this.searchStr = "";
            }
            else {
                _this.searchStr = item.title;
            }
            _this.ngModelChange.emit(_this.searchStr);
        });
        this.completer.highlighted.subscribe(function (item) {
            if (_this.fillHighlighted) {
                if (item) {
                    _this._displayStr = item.title;
                    _this.ngModelChange.emit(item.title);
                }
                else {
                    _this._displayStr = _this.searchStr;
                    _this.ngModelChange.emit(_this.searchStr);
                }
            }
        });
        this.completer.dataSourceChange.subscribe(function () {
            _this.completer.search(_this.searchStr);
        });
        if (this.ngModel.valueChanges) {
            this.ngModel.valueChanges.subscribe(function (value) {
                if (!isNil(value) && _this._displayStr !== value) {
                    if (_this.searchStr !== value) {
                        _this.completer.search(value);
                    }
                    _this.searchStr = value;
                }
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.keyupHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT || event.keyCode === KEY_TAB) {
            // do nothing
            return;
        }
        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
            event.preventDefault();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.search(this.searchStr);
        }
        else if (event.keyCode === KEY_ES) {
            if (this.completer.isOpen) {
                this.restoreSearchValue();
                this.completer.clear();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.pasteHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.completer.open();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ keyCode = event.keyCode || event.which;
        if (keyCode === KEY_EN) {
            if (this.completer.hasHighlighted()) {
                event.preventDefault();
            }
            this.handleSelection();
        }
        else if (keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.open();
            this.completer.nextRow();
        }
        else if (keyCode === KEY_UP) {
            event.preventDefault();
            this.completer.prevRow();
        }
        else if (keyCode === KEY_TAB) {
            this.handleSelection();
        }
        else if (keyCode === KEY_BK) {
            this.completer.open();
        }
        else if (keyCode === KEY_ES) {
            // This is very specific to IE10/11 #272
            // without this, IE clears the input text
            event.preventDefault();
            if (this.completer.isOpen) {
                event.stopPropagation();
            }
        }
        else {
            if (keyCode !== 0 && keyCode !== KEY_SH && keyCode !== KEY_CL &&
                (keyCode <= KEY_F1 || keyCode >= KEY_F12) &&
                !event.ctrlKey && !event.metaKey && !event.altKey) {
                this.completer.open();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.onBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // Check if we need to cancel Blur for IE
        if (this.completer.isCancelBlur()) {
            setTimeout(function () {
                // get the focus back
                // get the focus back
                _this.el.nativeElement.focus();
            }, 0);
            return;
        }
        if (this.completer.isOpen) {
            this.blurTimer = timer.timer(200).pipe(operators.take(1)).subscribe(function () { return _this.doBlur(); });
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.onfocus = /**
     * @return {?}
     */
    function () {
        if (this.blurTimer) {
            this.blurTimer.unsubscribe();
            this.blurTimer = null;
        }
        if (this.selectOnFocus) {
            this.el.nativeElement.select();
        }
        if (this.openOnFocus) {
            this.completer.open();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.selectOnClick) {
            this.el.nativeElement.select();
        }
        if (this.openOnClick) {
            if (this.completer.isOpen) {
                this.completer.clear();
            }
            else {
                this.completer.open();
            }
        }
    };
    Object.defineProperty(CtrInput.prototype, "searchStr", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchStr;
        },
        set: /**
         * @param {?} term
         * @return {?}
         */
        function (term) {
            this._searchStr = term;
            this._displayStr = term;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CtrInput.prototype.handleSelection = /**
     * @return {?}
     */
    function () {
        if (this.completer.hasHighlighted()) {
            this._searchStr = "";
            this.completer.selectCurrent();
        }
        else if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            if (this.clearUnselected && !this.completer.hasSelected) {
                this.searchStr = "";
                this.ngModelChange.emit(this.searchStr);
            }
            this.completer.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.restoreSearchValue = /**
     * @return {?}
     */
    function () {
        if (this.fillHighlighted) {
            if (this._displayStr != this.searchStr) {
                this._displayStr = this.searchStr;
                this.ngModelChange.emit(this.searchStr);
            }
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.doBlur = /**
     * @return {?}
     */
    function () {
        if (this.blurTimer) {
            this.blurTimer.unsubscribe();
            this.blurTimer = null;
        }
        if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            if (this.clearUnselected && !this.completer.hasSelected) {
                this.searchStr = "";
                this.ngModelChange.emit(this.searchStr);
            }
            else {
                this.restoreSearchValue();
            }
        }
        this.completer.clear();
    };
    CtrInput.decorators = [
        { type: core.Directive, args: [{
                    selector: "[ctrInput]",
                },] },
    ];
    /** @nocollapse */
    CtrInput.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: core.Host },] },
        { type: forms.NgModel, },
        { type: core.ElementRef, },
    ]; };
    CtrInput.propDecorators = {
        "clearSelected": [{ type: core.Input, args: ["clearSelected",] },],
        "clearUnselected": [{ type: core.Input, args: ["clearUnselected",] },],
        "overrideSuggested": [{ type: core.Input, args: ["overrideSuggested",] },],
        "fillHighlighted": [{ type: core.Input, args: ["fillHighlighted",] },],
        "openOnFocus": [{ type: core.Input, args: ["openOnFocus",] },],
        "openOnClick": [{ type: core.Input, args: ["openOnClick",] },],
        "selectOnClick": [{ type: core.Input, args: ["selectOnClick",] },],
        "selectOnFocus": [{ type: core.Input, args: ["selectOnFocus",] },],
        "ngModelChange": [{ type: core.Output },],
        "keyupHandler": [{ type: core.HostListener, args: ["keyup", ["$event"],] },],
        "pasteHandler": [{ type: core.HostListener, args: ["paste", ["$event"],] },],
        "keydownHandler": [{ type: core.HostListener, args: ["keydown", ["$event"],] },],
        "onBlur": [{ type: core.HostListener, args: ["blur", ["$event"],] },],
        "onfocus": [{ type: core.HostListener, args: ["focus", [],] },],
        "onClick": [{ type: core.HostListener, args: ["click", ["$event"],] },],
    };
    return CtrInput;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CtrListContext = (function () {
    function CtrListContext(results, searching, searchInitialized, isOpen) {
        this.results = results;
        this.searching = searching;
        this.searchInitialized = searchInitialized;
        this.isOpen = isOpen;
    }
    return CtrListContext;
}());
var CtrList = (function () {
    function CtrList(completer, templateRef, viewContainer, cd) {
        this.completer = completer;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.ctrListMinSearchLength = MIN_SEARCH_LENGTH;
        this.ctrListPause = PAUSE;
        this.ctrListAutoMatch = false;
        this.ctrListAutoHighlight = false;
        this.ctrListDisplaySearching = true;
        this.term = null;
        this.searchTimer = null;
        this.clearTimer = null;
        this.ctx = new CtrListContext([], false, false, false);
        this._initialValue = null;
        this.viewRef = null;
    }
    /**
     * @return {?}
     */
    CtrList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.completer.registerList(this);
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, new CtrListContext([], false, false, false));
    };
    Object.defineProperty(CtrList.prototype, "dataService", {
        set: /**
         * @param {?} newService
         * @return {?}
         */
        function (newService) {
            this._dataService = newService;
            this.dataServiceSubscribe();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrList.prototype, "initialValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (this._dataService && typeof this._dataService.convertToItem === "function") {
                setTimeout(function () {
                    var /** @type {?} */ initialItem = /** @type {?} */ ((_this._dataService.convertToItem))(value);
                    if (initialItem) {
                        _this.completer.onSelected(initialItem, false);
                    }
                });
            }
            else if (!this._dataService) {
                this._initialValue = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} term
     * @return {?}
     */
    CtrList.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        if (!isNil(term) && term.length >= this.ctrListMinSearchLength && this.term !== term) {
            if (this.searchTimer) {
                this.searchTimer.unsubscribe();
                this.searchTimer = null;
            }
            if (!this.ctx.searching) {
                if (this.ctrListDisplaySearching) {
                    this.ctx.results = [];
                }
                this.ctx.searching = true;
                this.ctx.searchInitialized = true;
                this.refreshTemplate();
            }
            if (this.clearTimer) {
                this.clearTimer.unsubscribe();
            }
            this.searchTimer = timer.timer(this.ctrListPause).pipe(operators.take(1)).subscribe(function () {
                _this.searchTimerComplete(term);
            });
        }
        else if (!isNil(term) && term.length < this.ctrListMinSearchLength) {
            this.clear();
            this.term = "";
        }
    };
    /**
     * @return {?}
     */
    CtrList.prototype.clear = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
        }
        this.clearTimer = timer.timer(CLEAR_TIMEOUT).pipe(operators.take(1)).subscribe(function () {
            _this._clear();
        });
    };
    /**
     * @return {?}
     */
    CtrList.prototype.open = /**
     * @return {?}
     */
    function () {
        if (!this.ctx.searchInitialized) {
            this.search("");
        }
        this.refreshTemplate();
    };
    /**
     * @param {?} open
     * @return {?}
     */
    CtrList.prototype.isOpen = /**
     * @param {?} open
     * @return {?}
     */
    function (open) {
        this.ctx.isOpen = open;
    };
    /**
     * @return {?}
     */
    CtrList.prototype._clear = /**
     * @return {?}
     */
    function () {
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
            this.searchTimer = null;
        }
        if (this.dataService) {
            this.dataService.cancel();
        }
        this.viewContainer.clear();
        this.viewRef = null;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    CtrList.prototype.searchTimerComplete = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        // Begin the search
        if (isNil(term) || term.length < this.ctrListMinSearchLength) {
            this.ctx.searching = false;
            return;
        }
        this.term = term;
        this._dataService.search(term);
    };
    /**
     * @return {?}
     */
    CtrList.prototype.refreshTemplate = /**
     * @return {?}
     */
    function () {
        // create the template if it doesn't exist
        if (!this.viewRef) {
            this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.ctx);
        }
        else if (!this.viewRef.destroyed) {
            /** @type {?} */ ((
            // refresh the template
            this.viewRef)).context.isOpen = this.ctx.isOpen; /** @type {?} */
            ((this.viewRef)).context.results = this.ctx.results; /** @type {?} */
            ((this.viewRef)).context.searching = this.ctx.searching; /** @type {?} */
            ((this.viewRef)).context.searchInitialized = this.ctx.searchInitialized;
            this.viewRef.detectChanges();
        }
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    CtrList.prototype.getBestMatchIndex = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.ctx.results || !this.term) {
            return null;
        }
        // First try to find the exact term
        var /** @type {?} */ bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase() === /** @type {?} */ ((_this.term)).toLocaleLowerCase(); });
        // If not try to find the first item that starts with the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().startsWith(/** @type {?} */ ((_this.term)).toLocaleLowerCase()); });
        }
        // If not try to find the first item that includes the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().includes(/** @type {?} */ ((_this.term)).toLocaleLowerCase()); });
        }
        return bestMatch < 0 ? null : bestMatch;
    };
    /**
     * @return {?}
     */
    CtrList.prototype.dataServiceSubscribe = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._dataService) {
            this._dataService.pipe(operators.catchError(function (err) {
                console.error(err);
                console.error("Unexpected error in dataService: errors should be handled by the dataService Observable");
                return [];
            }))
                .subscribe(function (results) {
                _this.ctx.searchInitialized = true;
                _this.ctx.searching = false;
                _this.ctx.results = results;
                if (_this.ctrListAutoMatch && results && results.length === 1 && results[0].title && !isNil(_this.term) &&
                    results[0].title.toLocaleLowerCase() === /** @type {?} */ ((_this.term)).toLocaleLowerCase()) {
                    // Do automatch
                    // Do automatch
                    _this.completer.onSelected(results[0]);
                    return;
                }
                if (_this._initialValue) {
                    _this.initialValue = _this._initialValue;
                    _this._initialValue = null;
                }
                _this.refreshTemplate();
                if (_this.ctrListAutoHighlight) {
                    _this.completer.autoHighlightIndex = _this.getBestMatchIndex();
                }
            });
            if (this._dataService.dataSourceChange) {
                this._dataService.dataSourceChange.subscribe(function () {
                    _this.term = null;
                    _this.ctx.searchInitialized = false;
                    _this.ctx.searching = false;
                    _this.ctx.results = [];
                    _this.refreshTemplate();
                    _this.completer.onDataSourceChange();
                });
            }
        }
    };
    CtrList.decorators = [
        { type: core.Directive, args: [{
                    selector: "[ctrList]",
                },] },
    ];
    /** @nocollapse */
    CtrList.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: core.Host },] },
        { type: core.TemplateRef, },
        { type: core.ViewContainerRef, },
        { type: core.ChangeDetectorRef, },
    ]; };
    CtrList.propDecorators = {
        "ctrListMinSearchLength": [{ type: core.Input },],
        "ctrListPause": [{ type: core.Input },],
        "ctrListAutoMatch": [{ type: core.Input },],
        "ctrListAutoHighlight": [{ type: core.Input },],
        "ctrListDisplaySearching": [{ type: core.Input },],
        "dataService": [{ type: core.Input, args: ["ctrList",] },],
        "initialValue": [{ type: core.Input, args: ["ctrListInitialValue",] },],
    };
    return CtrList;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CtrRow = (function () {
    function CtrRow(el, renderer, dropdown) {
        this.el = el;
        this.renderer = renderer;
        this.dropdown = dropdown;
        this.selected = false;
    }
    /**
     * @return {?}
     */
    CtrRow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._rowIndex) {
            this.dropdown.unregisterRow(this._rowIndex);
        }
    };
    Object.defineProperty(CtrRow.prototype, "ctrRow", {
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._rowIndex = index;
            this.dropdown.registerRow(new CtrRowItem(this, this._rowIndex));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrRow.prototype, "dataItem", {
        set: /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this._item = item;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.onSelected(this._item);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onMouseEnter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.highlightRow(this._rowIndex);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.rowMouseDown();
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    CtrRow.prototype.setHighlighted = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        this.selected = selected;
        this.renderer.setElementClass(this.el.nativeElement, "completer-selected-row", this.selected);
    };
    /**
     * @return {?}
     */
    CtrRow.prototype.getNativeElement = /**
     * @return {?}
     */
    function () {
        return this.el.nativeElement;
    };
    /**
     * @return {?}
     */
    CtrRow.prototype.getDataItem = /**
     * @return {?}
     */
    function () {
        return this._item;
    };
    CtrRow.decorators = [
        { type: core.Directive, args: [{
                    selector: "[ctrRow]",
                },] },
    ];
    /** @nocollapse */
    CtrRow.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer, },
        { type: CtrDropdown, decorators: [{ type: core.Host },] },
    ]; };
    CtrRow.propDecorators = {
        "ctrRow": [{ type: core.Input },],
        "dataItem": [{ type: core.Input },],
        "onClick": [{ type: core.HostListener, args: ["click", ["$event"],] },],
        "onMouseEnter": [{ type: core.HostListener, args: ["mouseenter", ["$event"],] },],
        "onMouseDown": [{ type: core.HostListener, args: ["mousedown", ["$event"],] },],
    };
    return CtrRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
"use strict";
/**
 * @record
 */

var CompleterListItemCmp = (function () {
    function CompleterListItemCmp() {
        this.parts = [];
    }
    /**
     * @return {?}
     */
    CompleterListItemCmp.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.searchStr) {
            this.parts.push({ isMatch: false, text: this.text });
            return;
        }
        var /** @type {?} */ matchStr = this.text.toLowerCase();
        var /** @type {?} */ matchPos = matchStr.indexOf(this.searchStr.toLowerCase());
        var /** @type {?} */ startIndex = 0;
        while (matchPos >= 0) {
            var /** @type {?} */ matchText = this.text.slice(matchPos, matchPos + this.searchStr.length);
            if (matchPos === 0) {
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length;
            }
            else if (matchPos > 0) {
                var /** @type {?} */ matchPart = this.text.slice(startIndex, matchPos);
                this.parts.push({ isMatch: false, text: matchPart });
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length + matchPart.length;
            }
            matchPos = matchStr.indexOf(this.searchStr.toLowerCase(), startIndex);
        }
        if (startIndex < this.text.length) {
            this.parts.push({ isMatch: false, text: this.text.slice(startIndex, this.text.length) });
        }
    };
    CompleterListItemCmp.decorators = [
        { type: core.Component, args: [{
                    selector: "completer-list-item",
                    template: "<span class=\"completer-list-item-holder\" [ngClass]= \"{'completer-title': type === 'title', 'completer-description': type === 'description'}\" >\n        <span class=\"completer-list-item\" *ngFor=\"let part of parts\" [ngClass]= \"part.isMatch ? matchClass : null\">{{part.text}}</span>\n    </span>"
                },] },
    ];
    /** @nocollapse */
    CompleterListItemCmp.ctorParameters = function () { return []; };
    CompleterListItemCmp.propDecorators = {
        "text": [{ type: core.Input },],
        "searchStr": [{ type: core.Input },],
        "matchClass": [{ type: core.Input },],
        "type": [{ type: core.Input },],
    };
    return CompleterListItemCmp;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
"use strict";
var noop = function () {
    return;
};
var COMPLETER_CONTROL_VALUE_ACCESSOR = {
    multi: true,
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return CompleterCmp; }),
};
var CompleterCmp = (function () {
    function CompleterCmp(completerService, cdr) {
        this.completerService = completerService;
        this.cdr = cdr;
        this.inputName = "";
        this.inputId = "";
        this.pause = PAUSE;
        this.minSearchLength = MIN_SEARCH_LENGTH;
        this.maxChars = MAX_CHARS;
        this.overrideSuggested = false;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.fillHighlighted = true;
        this.placeholder = "";
        this.autoMatch = false;
        this.disableInput = false;
        this.autofocus = false;
        this.openOnFocus = false;
        this.openOnClick = false;
        this.selectOnClick = false;
        this.selectOnFocus = false;
        this.autoHighlight = false;
        this.selected = new core.EventEmitter();
        this.highlighted = new core.EventEmitter();
        this.blurEvent = new core.EventEmitter();
        this.click = new core.EventEmitter();
        this.focusEvent = new core.EventEmitter();
        this.opened = new core.EventEmitter();
        this.keyup = new core.EventEmitter();
        this.keydown = new core.EventEmitter();
        this.control = new forms.FormControl("");
        this.displaySearching = true;
        this.displayNoResults = true;
        this._textNoResults = TEXT_NO_RESULTS;
        this._textSearching = TEXT_SEARCHING;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._focus = false;
        this._open = false;
        this._searchStr = "";
    }
    Object.defineProperty(CompleterCmp.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this.searchStr; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.searchStr) {
                this.searchStr = v;
            }
            // Propagate the change in any case
            this._onChangeCallback(v);
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(CompleterCmp.prototype, "searchStr", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchStr;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === "string" || isNil(value)) {
                this._searchStr = value;
            }
            else {
                this._searchStr = JSON.stringify(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.autofocus) {
            this._focus = true;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._focus) {
            setTimeout(function () {
                _this.ctrInput.nativeElement.focus();
                _this._focus = false;
            }, 0);
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onTouched = /**
     * @return {?}
     */
    function () {
        this._onTouchedCallback();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CompleterCmp.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.searchStr = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CompleterCmp.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CompleterCmp.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    CompleterCmp.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disableInput = isDisabled;
    };
    Object.defineProperty(CompleterCmp.prototype, "datasource", {
        set: /**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            if (source) {
                if (source instanceof Array) {
                    this.dataService = this.completerService.local(source);
                }
                else if (typeof (source) === "string") {
                    this.dataService = this.completerService.remote(source);
                }
                else {
                    this.dataService = /** @type {?} */ (source);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textNoResults", {
        set: /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            if (this._textNoResults !== text) {
                this._textNoResults = text;
                this.displayNoResults = !!this._textNoResults && this._textNoResults !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textSearching", {
        set: /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            if (this._textSearching !== text) {
                this._textSearching = text;
                this.displaySearching = !!this._textSearching && this._textSearching !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.completer.selected.subscribe(function (item) {
            _this.selected.emit(item);
        });
        this.completer.highlighted.subscribe(function (item) {
            _this.highlighted.emit(item);
        });
        this.completer.opened.subscribe(function (isOpen) {
            _this._open = isOpen;
            _this.opened.emit(isOpen);
        });
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.blurEvent.emit();
        this.onTouched();
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.focusEvent.emit();
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.click.emit(event);
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onKeyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keyup.emit(event);
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keydown.emit(event);
        event.stopPropagation();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CompleterCmp.prototype.onChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.open = /**
     * @return {?}
     */
    function () {
        this.completer.open();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.close = /**
     * @return {?}
     */
    function () {
        this.completer.clear();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.focus();
        }
        else {
            this._focus = true;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.blur = /**
     * @return {?}
     */
    function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.blur();
        }
        else {
            this._focus = false;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.isOpen = /**
     * @return {?}
     */
    function () {
        return this._open;
    };
    CompleterCmp.decorators = [
        { type: core.Component, args: [{
                    selector: "ng2-completer",
                    template: "\n        <div class=\"completer-holder\" ctrCompleter>\n            <input #ctrInput [attr.id]=\"inputId.length > 0 ? inputId : null\" type=\"search\"\n                class=\"completer-input\" ctrInput [ngClass]=\"inputClass\"\n                [(ngModel)]=\"searchStr\" (ngModelChange)=\"onChange($event)\"\n                [attr.name]=\"inputName\" [placeholder]=\"placeholder\"\n                [attr.maxlength]=\"maxChars\" [tabindex]=\"fieldTabindex\" [disabled]=\"disableInput\"\n                [clearSelected]=\"clearSelected\" [clearUnselected]=\"clearUnselected\"\n                [overrideSuggested]=\"overrideSuggested\" [openOnFocus]=\"openOnFocus\" [fillHighlighted]=\"fillHighlighted\"\n                [openOnClick]=\"openOnClick\" [selectOnClick]=\"selectOnClick\" [selectOnFocus]=\"selectOnFocus\"\n                (blur)=\"onBlur()\" (focus)=\"onFocus()\" (keyup)=\"onKeyup($event)\"\n                (keydown)=\"onKeydown($event)\" (click)=\"onClick($event)\"\n                autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\n\n            <div class=\"completer-dropdown-holder\"\n                *ctrList=\"dataService;\n                    minSearchLength: minSearchLength;\n                    pause: pause;\n                    autoMatch: autoMatch;\n                    initialValue: initialValue;\n                    autoHighlight: autoHighlight;\n                    displaySearching: displaySearching;\n                    let items = results;\n                    let searchActive = searching;\n                    let isInitialized = searchInitialized;\n                    let isOpen = isOpen;\">\n                <div class=\"completer-dropdown\" ctrDropdown \n                    *ngIf=\"isInitialized && isOpen && (( items?.length > 0|| (displayNoResults && !searchActive)) || (searchActive && displaySearching))\">\n                    <div *ngIf=\"searchActive && displaySearching\" class=\"completer-searching\">{{ _textSearching }}</div>\n                    <div *ngIf=\"!searchActive && (!items || items?.length === 0)\"\n                    class=\"completer-no-results\">{{ _textNoResults }}</div>\n                    <div class=\"completer-row-wrapper\" *ngFor=\"let item of items; let rowIndex=index\">\n                        <div class=\"completer-row\" [ctrRow]=\"rowIndex\" [dataItem]=\"item\">\n                            <div *ngIf=\"item.image || item.image === ''\" class=\"completer-image-holder\">\n                                <img *ngIf=\"item.image != ''\" src=\"{{item.image}}\" class=\"completer-image\" />\n                                <div *ngIf=\"item.image === ''\" class=\"completer-image-default\"></div>\n                            </div>\n                            <div class=\"completer-item-text\"\n                            [ngClass]=\"{'completer-item-text-image': item.image || item.image === '' }\">\n                                <completer-list-item\n                                class=\"completer-title\" [text]=\"item.title\" [matchClass]=\"matchClass\"\n                                [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n                                <completer-list-item *ngIf=\"item.description && item.description != ''\"\n                                class=\"completer-description\" [text]=\"item.description\"\n                                    [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n                                </completer-list-item>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                    styles: ["\n    .completer-dropdown {\n        border-color: #ececec;\n        border-width: 1px;\n        border-style: solid;\n        border-radius: 2px;\n        width: 250px;\n        padding: 6px;\n        cursor: pointer;\n        z-index: 9999;\n        position: absolute;\n        margin-top: -6px;\n        background-color: #ffffff;\n    }\n\n    .completer-row {\n        padding: 5px;\n        color: #000000;\n        margin-bottom: 4px;\n        clear: both;\n        display: inline-block;\n        width: 103%;\n    }\n\n    .completer-selected-row {\n        background-color: lightblue;\n        color: #ffffff;\n    }\n\n    .completer-description {\n        font-size: 14px;\n    }\n\n    .completer-image-default {\n        width: 16px;\n        height: 16px;\n        background-image: url(\"demo/res/img/default.png\");\n    }\n\n    .completer-image-holder {\n        float: left;\n        width: 10%;\n    }\n    .completer-item-text-image {\n        float: right;\n        width: 90%;\n    }\n    "],
                    providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CompleterCmp.ctorParameters = function () { return [
        { type: CompleterService, },
        { type: core.ChangeDetectorRef, },
    ]; };
    CompleterCmp.propDecorators = {
        "dataService": [{ type: core.Input },],
        "inputName": [{ type: core.Input },],
        "inputId": [{ type: core.Input },],
        "pause": [{ type: core.Input },],
        "minSearchLength": [{ type: core.Input },],
        "maxChars": [{ type: core.Input },],
        "overrideSuggested": [{ type: core.Input },],
        "clearSelected": [{ type: core.Input },],
        "clearUnselected": [{ type: core.Input },],
        "fillHighlighted": [{ type: core.Input },],
        "placeholder": [{ type: core.Input },],
        "matchClass": [{ type: core.Input },],
        "fieldTabindex": [{ type: core.Input },],
        "autoMatch": [{ type: core.Input },],
        "disableInput": [{ type: core.Input },],
        "inputClass": [{ type: core.Input },],
        "autofocus": [{ type: core.Input },],
        "openOnFocus": [{ type: core.Input },],
        "openOnClick": [{ type: core.Input },],
        "selectOnClick": [{ type: core.Input },],
        "selectOnFocus": [{ type: core.Input },],
        "initialValue": [{ type: core.Input },],
        "autoHighlight": [{ type: core.Input },],
        "selected": [{ type: core.Output },],
        "highlighted": [{ type: core.Output },],
        "blurEvent": [{ type: core.Output, args: ["blur",] },],
        "click": [{ type: core.Output },],
        "focusEvent": [{ type: core.Output, args: ["focus",] },],
        "opened": [{ type: core.Output },],
        "keyup": [{ type: core.Output },],
        "keydown": [{ type: core.Output },],
        "completer": [{ type: core.ViewChild, args: [CtrCompleter,] },],
        "ctrInput": [{ type: core.ViewChild, args: ["ctrInput",] },],
        "datasource": [{ type: core.Input },],
        "textNoResults": [{ type: core.Input },],
        "textSearching": [{ type: core.Input },],
    };
    return CompleterCmp;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var providers = [
    CompleterService,
    LocalDataFactory,
    RemoteDataFactory
];
var Ng2CompleterModule = (function () {
    function Ng2CompleterModule() {
    }
    /**
     * @return {?}
     */
    Ng2CompleterModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Ng2CompleterModule,
            providers: providers
        };
    };
    /**
     * @return {?}
     */
    Ng2CompleterModule.forChild = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Ng2CompleterModule,
            providers: providers
        };
    };
    Ng2CompleterModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [
                        CompleterListItemCmp,
                        CtrCompleter,
                        CtrDropdown,
                        CtrInput,
                        CtrList,
                        CtrRow,
                        CompleterCmp
                    ],
                    exports: [
                        CompleterListItemCmp,
                        CtrCompleter,
                        CtrDropdown,
                        CtrInput,
                        CtrList,
                        CtrRow,
                        CompleterCmp
                    ],
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        http.HttpClientModule
                    ],
                    providers: providers
                },] },
    ];
    /** @nocollapse */
    Ng2CompleterModule.ctorParameters = function () { return []; };
    return Ng2CompleterModule;
}());

exports.LocalData = LocalData;
exports.RemoteData = RemoteData;
exports.LocalDataFactory = LocalDataFactory;
exports.RemoteDataFactory = RemoteDataFactory;
exports.CompleterService = CompleterService;
exports.CtrCompleter = CtrCompleter;
exports.CtrDropdown = CtrDropdown;
exports.CtrInput = CtrInput;
exports.CtrList = CtrList;
exports.CtrRow = CtrRow;
exports.CompleterListItemCmp = CompleterListItemCmp;
exports.CompleterCmp = CompleterCmp;
exports.Ng2CompleterModule = Ng2CompleterModule;
exports.ɵa = CtrListContext;
exports.ɵb = CompleterBaseData;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-completer.umd.js.map
