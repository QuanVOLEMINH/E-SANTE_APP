import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";
export interface DynamicSelectModelConfig<T> extends DynamicOptionControlModelConfig<T> {
    filterable?: boolean;
    multiple?: boolean;
    placeholder?: string;
}
export declare class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {
    filterable: boolean;
    multiple: boolean;
    placeholder: string;
    readonly type: string;
    constructor(config: DynamicSelectModelConfig<T>, cls?: ClsConfig);
    select(...indices: number[]): void;
}
