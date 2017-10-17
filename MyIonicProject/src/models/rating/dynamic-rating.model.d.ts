import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_RATING = "RATING";
export interface DynamicRatingModelConfig extends DynamicFormValueControlModelConfig<number> {
    max?: number;
}
export declare class DynamicRatingModel extends DynamicFormValueControlModel<number> {
    max: number | null;
    readonly type: string;
    constructor(config: DynamicRatingModelConfig, cls?: ClsConfig);
}
