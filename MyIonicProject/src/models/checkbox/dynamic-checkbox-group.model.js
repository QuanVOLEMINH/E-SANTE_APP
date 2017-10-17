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
import { DynamicFormGroupModel } from "../form-group/dynamic-form-group.model";
import { serializable } from "../../decorator/serializable.decorator";
export var DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";
var DynamicCheckboxGroupModel = /** @class */ (function (_super) {
    __extends(DynamicCheckboxGroupModel, _super);
    function DynamicCheckboxGroupModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
        return _this;
    }
    DynamicCheckboxGroupModel.prototype.check = function () {
        var _this = this;
        var indices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            indices[_i] = arguments[_i];
        }
        indices.forEach(function (index) { return _this.group[index].checked = true; });
    };
    DynamicCheckboxGroupModel.prototype.uncheck = function () {
        var _this = this;
        var indices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            indices[_i] = arguments[_i];
        }
        indices.forEach(function (index) { return _this.group[index].checked = false; });
    };
    DynamicCheckboxGroupModel.prototype.checkAll = function () {
        this.group.forEach(function (model) { return model.checked = true; });
    };
    DynamicCheckboxGroupModel.prototype.uncheckAll = function () {
        this.group.forEach(function (model) { return model.checked = false; });
    };
    __decorate([
        serializable(),
        __metadata("design:type", Array)
    ], DynamicCheckboxGroupModel.prototype, "group", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicCheckboxGroupModel.prototype, "type", void 0);
    return DynamicCheckboxGroupModel;
}(DynamicFormGroupModel));
export { DynamicCheckboxGroupModel };

//# sourceMappingURL=dynamic-checkbox-group.model.js.map
