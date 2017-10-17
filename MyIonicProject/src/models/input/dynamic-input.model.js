var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DynamicInputControlModel } from "../dynamic-input-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";
export var DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR = "color";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE = "date";
//export const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME = "datetime";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL = "datetime-local";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE = "file";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH = "month";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL = "tel";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME = "time";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";
export var DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK = "week";
var DynamicInputModel = /** @class */ (function (_super) {
    __extends(DynamicInputModel, _super);
    function DynamicInputModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.files = null;
        _this.listId = null;
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_INPUT;
        _this.accept = config.accept || null;
        _this.inputType = config.inputType || DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT;
        _this.list = Array.isArray(config.list) ? config.list : null;
        _this.mask = config.mask || null;
        _this.max = config.max !== undefined ? config.max : null;
        _this.min = config.min !== undefined ? config.min : null;
        _this.multiple = typeof config.multiple === "boolean" ? config.multiple : null;
        _this.pattern = config.pattern || null;
        _this.step = typeof config.step === "number" ? config.step : null;
        if (_this.list) {
            _this.listId = _this.id + "List";
        }
        return _this;
    }
    DynamicInputModel.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        if (this.mask !== null) {
            json.mask = Utils.maskToString(this.mask);
        }
        return json;
    };
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicInputModel.prototype, "accept", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicInputModel.prototype, "inputType", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicInputModel.prototype, "list", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicInputModel.prototype, "mask", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicInputModel.prototype, "max", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicInputModel.prototype, "min", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicInputModel.prototype, "multiple", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicInputModel.prototype, "pattern", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicInputModel.prototype, "step", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicInputModel.prototype, "type", void 0);
    return DynamicInputModel;
}(DynamicInputControlModel));
export { DynamicInputModel };

//# sourceMappingURL=dynamic-input.model.js.map
