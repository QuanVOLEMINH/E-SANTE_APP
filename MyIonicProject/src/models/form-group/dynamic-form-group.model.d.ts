import { DynamicFormControlModel, DynamicFormControlModelConfig, DynamicValidatorsMap, ClsConfig } from "../dynamic-form-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_GROUP = "GROUP";
export interface DynamicFormGroupModelConfig extends DynamicFormControlModelConfig {
    asyncValidator?: DynamicValidatorsMap;
    group?: DynamicFormControlModel[];
    legend?: string;
    validator?: DynamicValidatorsMap;
}
export declare class DynamicFormGroupModel extends DynamicFormControlModel {
    asyncValidator: DynamicValidatorsMap | null;
    group: DynamicFormControlModel[];
    legend: string | null;
    validator: DynamicValidatorsMap | null;
    readonly type: string;
    constructor(config: DynamicFormGroupModelConfig, cls?: ClsConfig);
    get(index: number): DynamicFormControlModel;
    set(index: number, controlModel: DynamicFormControlModel): void;
    add(controlModel: DynamicFormControlModel): void;
    insert(index: number, controlModel: DynamicFormControlModel): void;
    move(index: number, step: number): void;
    remove(index: number): void;
    size(): number;
}
