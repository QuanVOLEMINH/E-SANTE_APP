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
import { DynamicOptionControlModel } from "../dynamic-option-control.model";
import { serializable } from "../../decorator/serializable.decorator";
export var DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";
var DynamicSelectModel = /** @class */ (function (_super) {
    __extends(DynamicSelectModel, _super);
    function DynamicSelectModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_SELECT;
        _this.filterable = typeof config.filterable === "boolean" ? config.filterable : false;
        _this.multiple = typeof config.multiple === "boolean" ? config.multiple : false;
        _this.placeholder = config.placeholder || "";
        return _this;
    }
    DynamicSelectModel.prototype.select = function () {
        var _this = this;
        var indices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            indices[_i] = arguments[_i];
        }
        var value = this.multiple ? indices.map(function (index) { return _this.get(index).value; }) : this.get(indices[0]).value;
        this.valueUpdates.next(value);
    };
    __decorate([
        serializable(),
        __metadata("design:type", Boolean)
    ], DynamicSelectModel.prototype, "filterable", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Boolean)
    ], DynamicSelectModel.prototype, "multiple", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicSelectModel.prototype, "placeholder", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicSelectModel.prototype, "type", void 0);
    return DynamicSelectModel;
}(DynamicOptionControlModel));
export { DynamicSelectModel };

//# sourceMappingURL=dynamic-select.model.js.map
