
export interface IFormData {
    name: string,
    email: string,
    title: string,
    abstract: string,
    study_field: string
}

interface IResData {
    name: string,
    value: number,
    text: string
}
  
export interface IResInfoData {
    name: "",
    subTitle: "",
    info: IResData[]
}

export interface IReportInitialState {
    report: IResInfoData[],
    loading: boolean,
    error: null | string
}


export enum ReportActionTypes {
    FETCH_REPORT = "FETCH_REPORT",
    FETCH_REPORT_SUCCESS = "FETCH_REPORT_SUCCESS",
    FETCH_REPORT_ERROR = "FETCH_REPORT_ERROR",
}

interface FetchReportAction {
    type: ReportActionTypes.FETCH_REPORT;
}

interface FetchReportSuccessAction {
    type: ReportActionTypes.FETCH_REPORT_SUCCESS;
    payload: any[];
}

interface FetchReportErrorAction {
    type: ReportActionTypes.FETCH_REPORT_ERROR;
    payload: string
}

export type ReportAction = FetchReportAction | FetchReportSuccessAction | FetchReportErrorAction
