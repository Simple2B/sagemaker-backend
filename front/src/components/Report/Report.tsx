import React from "react";
import { useTypedSelector } from "../../redux/useTypeSelector";
import Loader from "../Loader/Loader";
import "./_Report.sass";

interface IReport {}

const Report: React.FC<IReport> = () => {
  const { report, loading, error } = useTypedSelector((state) => state.form);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="containerReports">
      {loading && <Loader />}
      {report.map((report, index) => {
        return (
          <div className="report" key={index}>
            <div className="report_title">
              {index + 1}. {report.name}
            </div>
            <div></div>
            <div className="report_subTitle">{report.subTitle}</div>
            {report.info.map((item, index) => {
              return (
                <div className="report_data" key={index}>
                  <div className="dataTitle">{item.name}</div>
                  <div className="dataValue">
                    <div className="textDataValue">
                      {item.value}
                      {item.text}
                    </div>
                    <div className="viewDataValue">
                      {item.value && item.value > 0 && (
                        <div
                          className="viewDataValue_color"
                          style={{ width: `${(item.value / 100) * 100}%` }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Report;
