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
import { DynamicFormControlModel } from "../dynamic-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
export var DYNAMIC_FORM_CONTROL_TYPE_GROUP = "GROUP";
var DynamicFormGroupModel = /** @class */ (function (_super) {
    __extends(DynamicFormGroupModel, _super);
    function DynamicFormGroupModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.group = [];
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_GROUP;
        _this.asyncValidator = config.asyncValidator || null;
        _this.group = Array.isArray(config.group) ? config.group : [];
        _this.legend = config.legend || null;
        _this.validator = config.validator || null;
        return _this;
    }
    DynamicFormGroupModel.prototype.get = function (index) {
        return this.group[index];
    };
    DynamicFormGroupModel.prototype.set = function (index, controlModel) {
        this.group[index] = controlModel;
    };
    DynamicFormGroupModel.prototype.add = function (controlModel) {
        this.group.push(controlModel);
    };
    DynamicFormGroupModel.prototype.insert = function (index, controlModel) {
        this.group.splice(index, 0, controlModel);
    };
    DynamicFormGroupModel.prototype.move = function (index, step) {
        (_a = this.group).splice.apply(_a, [index + step, 0].concat(this.group.splice(index, 1)));
        var _a;
    };
    DynamicFormGroupModel.prototype.remove = function (index) {
        this.group.splice(index, 1);
    };
    DynamicFormGroupModel.prototype.size = function () {
        return this.group.length;
    };
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicFormGroupModel.prototype, "asyncValidator", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Array)
    ], DynamicFormGroupModel.prototype, "group", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicFormGroupModel.prototype, "legend", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicFormGroupModel.prototype, "validator", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicFormGroupModel.prototype, "type", void 0);
    return DynamicFormGroupModel;
}(DynamicFormControlModel));
export { DynamicFormGroupModel };

//# sourceMappingURL=dynamic-form-group.model.js.map
