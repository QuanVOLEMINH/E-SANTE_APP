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
import { DynamicFormControlModel, } from "../dynamic-form-control.model";
import { serializable, serialize } from "../../decorator/serializable.decorator";
var DynamicFormArrayGroupModel = /** @class */ (function () {
    function DynamicFormArrayGroupModel(context, group, index) {
        if (group === void 0) { group = []; }
        if (index === void 0) { index = -1; }
        this.$implicit = this;
        this.context = context;
        this.group = group;
        this.index = index;
    }
    Object.defineProperty(DynamicFormArrayGroupModel.prototype, "parent", {
        get: function () {
            return this.context;
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormArrayGroupModel.prototype.get = function (index) {
        return this.group[index];
    };
    DynamicFormArrayGroupModel.prototype.toJSON = function () {
        return serialize(this);
    };
    __decorate([
        serializable(),
        __metadata("design:type", Array)
    ], DynamicFormArrayGroupModel.prototype, "group", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Number)
    ], DynamicFormArrayGroupModel.prototype, "index", void 0);
    return DynamicFormArrayGroupModel;
}());
export { DynamicFormArrayGroupModel };
export var DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";
var DynamicFormArrayModel = /** @class */ (function (_super) {
    __extends(DynamicFormArrayModel, _super);
    function DynamicFormArrayModel(config, cls) {
        var _this = _super.call(this, config, cls) || this;
        _this.groups = [];
        _this.type = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
        if (typeof config.groupFactory === "function") {
            _this.groupFactory = config.groupFactory;
        }
        else {
            throw new Error("group factory function must be specified for DynamicFormArrayModel");
        }
        _this.asyncValidator = config.asyncValidator || null;
        _this.groupAsyncValidator = config.groupAsyncValidator || null;
        _this.groupPrototype = _this.groupFactory();
        _this.groupValidator = config.groupValidator || null;
        _this.initialCount = typeof config.initialCount === "number" ? config.initialCount : 1;
        _this.validator = config.validator || null;
        if (Array.isArray(config.groups)) {
            config.groups.forEach(function (arrayGroup, index) {
                _this.groups.push(new DynamicFormArrayGroupModel(_this, arrayGroup.group, arrayGroup.index || index));
            });
        }
        else {
            for (var index = 0; index < _this.initialCount; index++) {
                _this.addGroup();
            }
        }
        return _this;
    }
    DynamicFormArrayModel.prototype.updateGroupIndex = function () {
        this.groups.forEach(function (group, index) { return group.index = index; });
    };
    Object.defineProperty(DynamicFormArrayModel.prototype, "size", {
        get: function () {
            return this.groups.length;
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormArrayModel.prototype.get = function (index) {
        return this.groups[index];
    };
    DynamicFormArrayModel.prototype.addGroup = function () {
        return this.insertGroup(this.groups.length);
    };
    DynamicFormArrayModel.prototype.insertGroup = function (index) {
        var group = new DynamicFormArrayGroupModel(this, this.groupFactory());
        this.groups.splice(index, 0, group);
        this.updateGroupIndex();
        return group;
    };
    DynamicFormArrayModel.prototype.moveGroup = function (index, step) {
        (_a = this.groups).splice.apply(_a, [index + step, 0].concat(this.groups.splice(index, 1)));
        this.updateGroupIndex();
        var _a;
    };
    DynamicFormArrayModel.prototype.removeGroup = function (index) {
        this.groups.splice(index, 1);
        this.updateGroupIndex();
    };
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicFormArrayModel.prototype, "asyncValidator", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicFormArrayModel.prototype, "groupAsyncValidator", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicFormArrayModel.prototype, "groupValidator", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Array)
    ], DynamicFormArrayModel.prototype, "groups", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Number)
    ], DynamicFormArrayModel.prototype, "initialCount", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Object)
    ], DynamicFormArrayModel.prototype, "validator", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", Array)
    ], DynamicFormArrayModel.prototype, "groupPrototype", void 0);
    __decorate([
        serializable(),
        __metadata("design:type", String)
    ], DynamicFormArrayModel.prototype, "type", void 0);
    return DynamicFormArrayModel;
}(DynamicFormControlModel));
export { DynamicFormArrayModel };

//# sourceMappingURL=dynamic-form-array.model.js.map
