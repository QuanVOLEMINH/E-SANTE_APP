import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicCheckControlModel, DynamicCheckControlModelConfig } from "../dynamic-check-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";
export interface DynamicCheckboxModelConfig extends DynamicCheckControlModelConfig {
    indeterminate?: boolean;
}
export declare class DynamicCheckboxModel extends DynamicCheckControlModel {
    indeterminate: boolean;
    readonly type: string;
    constructor(config: DynamicCheckboxModelConfig, cls?: ClsConfig);
}
