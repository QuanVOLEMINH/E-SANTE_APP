import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormGroupModel, DynamicFormGroupModelConfig } from "../form-group/dynamic-form-group.model";
import { DynamicCheckboxModel } from "./dynamic-checkbox.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";
export declare class DynamicCheckboxGroupModel extends DynamicFormGroupModel {
    group: DynamicCheckboxModel[];
    readonly type: string;
    constructor(config: DynamicFormGroupModelConfig, cls?: ClsConfig);
    check(...indices: number[]): void;
    uncheck(...indices: number[]): void;
    checkAll(): void;
    uncheckAll(): void;
}
