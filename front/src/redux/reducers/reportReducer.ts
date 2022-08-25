import { ReportAction, IReportInitialState, ReportActionTypes } from "../types/reportTypes";

export const initialDataReport: IReportInitialState = {
    report: [],
    loading: false,
    error: null
};

export const reportReducer = (
  state = initialDataReport,
  action: ReportAction
): IReportInitialState => {
  switch (action.type) {
    case ReportActionTypes.FETCH_REPORT:
        return {loading: true, error: null, report: []}
    case ReportActionTypes.FETCH_REPORT_SUCCESS:
        return {loading: false, error: null, report: action.payload}
    case ReportActionTypes.FETCH_REPORT_ERROR:
        return {loading: false, error: action.payload, report: []}
    
    default:
      return state;
  }
};
