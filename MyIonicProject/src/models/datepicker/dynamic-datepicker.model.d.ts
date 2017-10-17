import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicDateControlModel, DynamicDateControlModelConfig } from "../dynamic-date-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER = "DATEPICKER";
export interface DynamicDatePickerModelConfig extends DynamicDateControlModelConfig {
    focusedDate?: string | Date;
    inline?: boolean;
    toggleIcon?: string;
}
export declare class DynamicDatePickerModel extends DynamicDateControlModel {
    focusedDate: string | Date | null;
    inline: boolean;
    toggleIcon: string | null;
    readonly type: string;
    constructor(config: DynamicDatePickerModelConfig, cls?: ClsConfig);
}
