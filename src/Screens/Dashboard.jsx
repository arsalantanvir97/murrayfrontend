import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Graph from "../Components/Graph";
import { baseURL } from "../utils/api";

const Dashboard = ({history}) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [loading, setloading] = useState(false);

  const [user, setUser] = useState("");
  const [year, setyear] = useState("");

  const [dashboarddata, setdashboarddata] = useState("");
  useEffect(() => {
    if (!adminInfo) {
      history.replace("/");
    }
  }, []);
  useEffect(() => {
    handleGetDashboarddata();
  }, [year]);

  const handleGetDashboarddata = async () => {
    try {
      setloading(true)
      const res = await axios({
        url: `${baseURL}/auth/getCountofallCollection`,
        params: { year },
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("handleGetDashboarddatares", res);
      setdashboarddata(res?.data);
      setloading(false)

    } catch (err) {
      console.log(err);
      setloading(false)

    }
    setloading(false)

  };

  return (
    <div className="app-content content">
      <div className="content-wrapper">
        {/* Basic form layout section start */}
        <section id="dashboard" className="dashboard">
          <div className="row">
            <div className="col-12">
              <div className="card bg-transparent shadow-none mb-0">
                <div className="card-body p-md-2 p-lg-2">
                  <div className="card-dashboard mt-2 mt-md-3 mb-0 mb-md-3">
                    <div className="row d-flex justify-content-center">
                      <div className="col-12 col-md-12 col-lg-10 col-xl-10 col-xxl-8">
                        <div className="row">
                          <div className="col-12 col-lg-6 mb-2">
                            <div className="card text-center">
                              <div className="card-title green-title pt-4">
                                <img
                                  src="assets/images/invoice.png"
                                  alt=""
                                />
                              </div>
                              <div className="card-body py-1">
                                <div className="media align-items-center d-flex w-100">
                                  <div className="media-body text-left flex-grow-1">
                                    <h6 className="text-uppercase fw-700 fc-gray fs-20">
                                      Invoices
                                    </h6>{loading ?
                                   <div
                                   style={{
                                     width: "100%",
                                     display: "flex",
                                     justifyContent: "center"
                                   }}
                                 >
                                   <div className="custommloader"></div>
                                 </div>:
                                    <h3>{dashboarddata?.invoice}</h3>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 mb-2">
                            <div className="card text-center">
                              <div className="card-title purple-title pt-4">
                                <img src="assets/images/group.png" alt="" />
                              </div>
                              <div className="card-body py-1">
                                <div className="media align-items-center d-flex w-100">
                                  <div className="media-body text-left flex-grow-1">
                                    <h6 className="text-uppercase fw-700 fc-gray fs-20">
                                      Customers
                                    </h6>
                                    {loading ?
                                   <div
                                   style={{
                                     width: "100%",
                                     display: "flex",
                                     justifyContent: "center"
                                   }}
                                 >
                                   <div className="custommloader"></div>
                                 </div>:
                                    <h3>{dashboarddata?.user}</h3>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* <div className="col-lg-4">
                      <div className="card d-block card-chart border-none bg-white rounded-10 p-5 align-items-center">
                        <div className="card-header bg-transparent border-0 p-0 text-center">
                          <h3 className="fw-bold mb-3">Performance</h3>
                          <div className>
                            <div className="select-wrapper mt-1 mt-sm-0 me-2">
                              <select name id className="form-control">
                                <option value>1 Month</option>
                                <option value>2 Month</option>
                                <option value>3 Month</option>
                                <option value>4 Month</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="card-body px-0 pt-0 pb-0">
                          <div className="chartbox position-relative text-center">
                            <img
                              src="../assets/images/performance-chart.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-lg-12">
                      <div className="card d-block card-chart border-none bg-white rounded-10 p-5 align-items-center">
                        <div className="card-header bg-transparent border-0 p-0 text-center">
                          <h3 className="fw-bold mb-3">Total Customers</h3>
                          <div className>
                            <div className="select-wrapper mt-1 mt-sm-0 me-2">
                              <select
                                name
                                id
                                className="form-control"
                                value={year}
                                onChange={(e) => {
                                  setyear(e.target.value);
                                }}
                              >
                                <option>Year</option>
                                <option value={"2021"}>2021</option>
                                <option value={"2022"}>2022</option>
                                <option value={"2023"}>2023</option>
                                <option value={"2024"}>2024</option>
                                <option value={"2025"}>2025</option>
                                <option value={"2026"}>2026</option>
                                <option value={"2027"}>2027</option>
                                <option value={"2028"}>2028</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="card-body px-0 pt-5 pb-0">
                          {/* <div className="chartbox position-relative text-center">
                            <img src="../assets/images/chart.png" alt="" />
                          </div> */}
                          {loading ?
                                   <div
                                   style={{
                                     width: "100%",
                                     display: "flex",
                                     justifyContent: "center"
                                   }}
                                 >
                                   <div className="custommloader"></div>
                                 </div>:
                                     <Graph graph_data={dashboarddata?.graph_data} />}
                           
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
