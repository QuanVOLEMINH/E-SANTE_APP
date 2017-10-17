import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_SLIDER = "SLIDER";
export interface DynamicSliderModelConfig extends DynamicFormValueControlModelConfig<number> {
    max?: number;
    min?: number;
    step?: number;
    vertical?: boolean;
}
export declare class DynamicSliderModel extends DynamicFormValueControlModel<number> {
    max: number | null;
    min: number | null;
    step: number | null;
    vertical: boolean;
    readonly type: string;
    constructor(config: DynamicSliderModelConfig, cls?: ClsConfig);
}
