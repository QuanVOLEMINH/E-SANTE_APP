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
export var DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";
export var DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
export var DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";
var DynamicTextAreaModel = /** @class */ (function (_super) {
    __extends(DynamicTextAreaModel, _super);
    function DynamicTextAreaModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA;
        _this.cols = typeof config.cols === "number" ? config.cols : 20;
        _this.rows = typeof config.rows === "number" ? config.rows : 2;
        _this.wrap = config.wrap || DYNAMIC_FORM_TEXTAREA_WRAP_SOFT;
        return _this;
    }
    __decorate([
        serializable(),
        __metadata("design:type", Number)
    ], DynamicTextAreaModel.prototype, "cols", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Number)
    ], DynamicTextAreaModel.prototype, "rows", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicTextAreaModel.prototype, "wrap", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicTextAreaModel.prototype, "type", void 0);
    return DynamicTextAreaModel;
}(DynamicInputControlModel));
export { DynamicTextAreaModel };

//# sourceMappingURL=dynamic-textarea.model.js.map
