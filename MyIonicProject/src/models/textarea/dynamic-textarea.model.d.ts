import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";
export declare const DYNAMIC_FORM_TEXTAREA_WRAP_HARD = "hard";
export declare const DYNAMIC_FORM_TEXTAREA_WRAP_SOFT = "soft";
export interface DynamicTextAreaModelConfig extends DynamicInputControlModelConfig<string> {
    cols?: number;
    rows?: number;
    wrap?: string;
}
export declare class DynamicTextAreaModel extends DynamicInputControlModel<string> {
    cols: number;
    rows: number;
    wrap: string;
    readonly type: string;
    constructor(config: DynamicTextAreaModelConfig, cls?: ClsConfig);
}
