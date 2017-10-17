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
import { DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
import { serializable } from "../../decorator/serializable.decorator";
export var DYNAMIC_FORM_CONTROL_TYPE_RATING = "RATING";
var DynamicRatingModel = /** @class */ (function (_super) {
    __extends(DynamicRatingModel, _super);
    function DynamicRatingModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_RATING;
        _this.max = typeof config.max === "number" ? config.max : 10;
        return _this;
    }
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicRatingModel.prototype, "max", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicRatingModel.prototype, "type", void 0);
    return DynamicRatingModel;
}(DynamicFormValueControlModel));
export { DynamicRatingModel };

//# sourceMappingURL=dynamic-rating.model.js.map
