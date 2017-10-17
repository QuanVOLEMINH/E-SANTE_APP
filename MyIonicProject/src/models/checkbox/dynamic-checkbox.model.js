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
import { DynamicCheckControlModel } from "../dynamic-check-control.model";
import { serializable } from "../../decorator/serializable.decorator";
export var DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";
var DynamicCheckboxModel = /** @class */ (function (_super) {
    __extends(DynamicCheckboxModel, _super);
    function DynamicCheckboxModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
        _this.indeterminate = typeof config.indeterminate === "boolean" ? config.indeterminate : false;
        return _this;
    }
    __decorate([
        serializable(),
        __metadata("design:type", Boolean)
    ], DynamicCheckboxModel.prototype, "indeterminate", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicCheckboxModel.prototype, "type", void 0);
    return DynamicCheckboxModel;
}(DynamicCheckControlModel));
export { DynamicCheckboxModel };

//# sourceMappingURL=dynamic-checkbox.model.js.map
