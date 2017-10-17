import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";
export interface DynamicRadioGroupModelConfig<T> extends DynamicOptionControlModelConfig<T> {
    legend?: string;
}
export declare class DynamicRadioGroupModel<T> extends DynamicOptionControlModel<T> {
    legend: string | null;
    readonly type: string;
    constructor(config: DynamicRadioGroupModelConfig<T>, cls?: ClsConfig);
    select(index: number): void;
}
