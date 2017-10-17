import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFileControlModelConfig, DynamicFileControlModel } from "../dynamic-file-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD = "FILE_UPLOAD";
export interface DynamicFileUploadModelConfig extends DynamicFileControlModelConfig {
    accept?: string[];
    autoUpload?: boolean;
    maxSize?: number;
    minSize?: number;
    removeUrl?: string;
    showFileList?: boolean;
    url?: string;
}
export declare class DynamicFileUploadModel extends DynamicFileControlModel {
    accept: string[] | null;
    autoUpload: boolean;
    maxSize: number | null;
    minSize: number | null;
    removeUrl: string | null;
    showFileList: boolean;
    url: string | null;
    readonly type: string;
    constructor(config: DynamicFileUploadModelConfig, cls?: ClsConfig);
}
