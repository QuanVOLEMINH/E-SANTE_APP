import { DynamicFormControlModel,
  DynamicFormControlModelConfig,
  DynamicPathable,
  DynamicValidatorsMap,
  ClsConfig } from "../dynamic-form-control.model";
export declare class DynamicFormArrayGroupModel implements DynamicPathable {
    $implicit: DynamicFormArrayGroupModel;
    context: DynamicFormArrayModel;
    group: DynamicFormControlModel[];
    index: number;
    constructor(context: DynamicFormArrayModel, group?: DynamicFormControlModel[], index?: number);
    readonly parent: DynamicFormArrayModel;
    get(index: number): DynamicFormControlModel;
    toJSON(): Object;
}
export declare const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";
export interface DynamicFormArrayModelConfig extends DynamicFormControlModelConfig {
    asyncValidator?: DynamicValidatorsMap;
    groupAsyncValidator?: DynamicValidatorsMap;
    groupFactory?: () => DynamicFormControlModel[];
    groupValidator?: DynamicValidatorsMap;
    groups?: DynamicFormArrayGroupModel[];
    initialCount?: number;
    validator?: DynamicValidatorsMap;
}
export declare class DynamicFormArrayModel extends DynamicFormControlModel {
    asyncValidator: DynamicValidatorsMap | null;
    groupAsyncValidator: DynamicValidatorsMap | null;
    groupFactory: () => DynamicFormControlModel[];
    groupValidator: DynamicValidatorsMap | null;
    groups: DynamicFormArrayGroupModel[];
    initialCount: number;
    validator: DynamicValidatorsMap | null;
    readonly groupPrototype: DynamicFormControlModel[];
    readonly origin: DynamicFormControlModel[];
    readonly type: string;
    constructor(config: DynamicFormArrayModelConfig, cls?: ClsConfig);
    private updateGroupIndex();
    readonly size: number;
    get(index: number): DynamicFormArrayGroupModel;
    addGroup(): DynamicFormArrayGroupModel;
    insertGroup(index: number): DynamicFormArrayGroupModel;
    moveGroup(index: number, step: number): void;
    removeGroup(index: number): void;
}
