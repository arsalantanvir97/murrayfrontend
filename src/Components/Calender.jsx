import React from "react";
import DatePicker from "react-datepicker";

const Calender = ({ setFrom, from, setTo, to }) => {
  return (
    <>
      {" "}
      <div className="col-12 col-xl-3 col-xxl-3 align-items-start">
        <div className="dataTables_filter d-flex justify-content-start flex-shrink-1 mt-3">
          <label
            htmlFor
            className="d-md-inline-block me-2 me-lg-0 my-0 align-self-center flex-shrink-0"
          >
            Filter From
          </label>
          <div className="d-sm-flex d-block flex-grow-1">
            <div className="input-wrap me-0 me-sm-2 mb-2 mb-sm-0">
              <DatePicker
                selected={from}
                placeholderText="Select a starting date"
                onChange={(from) => setFrom(from)}
                className="sort-date customdate form-control"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-3 col-xxl-3 align-items-start">
        <div className="dataTables_filter d-flex justify-content-start flex-shrink-1 mt-3">
          <label
            htmlFor
            className="d-md-inline-block me-2 me-lg-0 my-0 align-self-center flex-shrink-0"
          >
            Filter To
          </label>
          <div className="d-sm-flex d-block flex-grow-1">
            <div className="input-wrap me-0 me-sm-2 mb-2 mb-sm-0">
              <DatePicker
                selected={to}
                placeholderText="Select an ending date"
                onChange={(to) => setTo(to)}
                className="sort-date customdate form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
