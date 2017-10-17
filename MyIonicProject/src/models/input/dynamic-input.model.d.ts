import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_INPUT = "INPUT";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_COLOR = "color";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATE = "date";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL = "datetime-local";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE = "file";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_MONTH = "month";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEL = "tel";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_TIME = "time";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_URL = "url";
export declare const DYNAMIC_FORM_CONTROL_INPUT_TYPE_WEEK = "week";
export interface DynamicInputModelConfig extends DynamicInputControlModelConfig<string | number | Date | string[]> {
    accept?: string;
    inputType?: string;
    list?: string[];
    mask?: string | RegExp | (string | RegExp)[];
    max?: number | string | Date;
    min?: number | string | Date;
    multiple?: boolean;
    pattern?: string;
    step?: number;
}
export declare class DynamicInputModel extends DynamicInputControlModel<string | number | Date | string[]> {
    accept: string | null;
    inputType: string;
    files: FileList | null;
    list: string[] | null;
    mask: string | RegExp | (string | RegExp)[] | null;
    max: number | string | Date | null;
    min: number | string | Date | null;
    multiple: boolean | null;
    pattern: string | null;
    step: number | null;
    private listId;
    readonly type: string;
    constructor(config: DynamicInputModelConfig, cls?: ClsConfig);
    toJSON(): any;
}
