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
export var DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";
var DynamicRadioGroupModel = /** @class */ (function (_super) {
    __extends(DynamicRadioGroupModel, _super);
    function DynamicRadioGroupModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
        _this.legend = config.legend || null;
        return _this;
    }
    DynamicRadioGroupModel.prototype.select = function (index) {
        this.valueUpdates.next(this.get(index).value);
    };
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicRadioGroupModel.prototype, "legend", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicRadioGroupModel.prototype, "type", void 0);
    return DynamicRadioGroupModel;
}(DynamicOptionControlModel));
export { DynamicRadioGroupModel };

//# sourceMappingURL=dynamic-radio-group.model.js.map
