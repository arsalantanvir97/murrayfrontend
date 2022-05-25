import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/adminActions";
import { baseURL, imageURL } from "../utils/api";
import axios from "axios";
import moment from "moment";

const Header = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  // const [notifications, setnotifications] = useState([]);
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const logOutHandler = async () => {
    console.log("logOutHandler");
    dispatch(logout());
  };
  // const getAllNotification = async () => {
  //   try {
  //     // dispatch({
  //     //   type: ADMIN_LOGIN_REQUEST,
  //     // })

  //     console.log("getallNotification");
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${adminInfo.token}`
  //       }
  //     };

  //     const res = await axios.get(
  //       `${baseURL}/notification/adminnotification`,
  //       config
  //     );
  //     console.log("res", res);
  //     if (res?.status == 201) {
  //       setnotifications(res?.data?.notification);
  //     }
  //   } catch (error) {}
  // };

  return (
    <div id="header">
      <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
        <div className="navbar-wrapper w-100 d-md-flex">
          <div className="navbar-header d-flex">
            <ul className="nav navbar-nav flex-row flex-grow-1 mb-3">
              <li className="nav-item d-md-none align-self-center ps-3">
                <Link
                  className="nav-link menu-toggle hidden-xs is-active"
                  to="#"
                >
                  <i className="ft-menu font-large-1" />
                </Link>
              </li>
              <li className="nav-item align-self-center flex-grow-1 text-center">
                <Link to="/dashboard" className="navbar-brand">
                  {" "}
                  <img
                    className="brand-logo img-fluid"
                    alt="stack admin logo"
                    src="../assets/images/logo-admin.png"
                  />
                </Link>
              </li>
              <li className="nav-item d-md-none align-self-center pe-3">
                <a
                  className="nav-link open-navbar-container"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbar-mobile"
                >
                  <i className="fa fa-ellipsis-v" />
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-container flex-grow-1 align-self-center">
            <div className="collapse navbar-collapse" id="navbar-mobile">
              <ul className="nav navbar-nav ms-auto justify-content-end">
                <li className="dropdown dropdown-notification nav-item d-flex">
                  <a
                    className="nav-link nav-link-label align-self-center"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="true"
                  >
                    <i className="fas fa-bell" />{" "}
                    {/* <span class="badge badge-pill badge-default badge-danger badge-default badge-up">5</span> */}{" "}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end me-3 me-md-0 ms-3 ms-md-0">
                    {/* <li class="dropdown-menu-header">
                                <h6 class="dropdown-header">Notifications</h6>
                                <span class="notification-tag badge badge-default badge-danger float-right m-0">5 New</span>
                            </li> */}
                    <li
                      className="scrollable-container media-list ps-container ps-theme-dark"
                      data-ps-id="63782363-01f0-264d-6e57-4e7fbe98d9d4"
                    >
                      <a href="javascript:void(0)">
                        <div className="media d-flex">
                          <div className="media-left flex-shrink-0 align-self-top">
                            <i className="far fa-bell" />
                          </div>
                          <div className="media-body flex-grow-1">
                            <h6 className="media-heading">
                              New user has been registered on the platform
                            </h6>
                            <small>
                              <time
                                className="date-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                Dec19, 2020
                              </time>
                              <time
                                className="time-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                10:30 AM{" "}
                              </time>
                            </small>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0)">
                        <div className="media d-flex">
                          <div className="media-left flex-shrink-0 align-self-top">
                            <i className="far fa-bell" />
                          </div>
                          <div className="media-body flex-grow-1">
                            <h6 className="media-heading">
                              New user has been registered on the platform
                            </h6>
                            <small>
                              <time
                                className="date-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                Dec19, 2020
                              </time>
                              <time
                                className="time-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                10:30 AM{" "}
                              </time>
                            </small>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0)">
                        <div className="media d-flex">
                          <div className="media-left flex-shrink-0 align-self-top">
                            <i className="far fa-bell" />
                          </div>
                          <div className="media-body flex-grow-1">
                            <h6 className="media-heading">
                              New user has been registered on the platform
                            </h6>
                            <small>
                              <time
                                className="date-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                Dec19, 2020
                              </time>
                              <time
                                className="time-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                10:30 AM{" "}
                              </time>
                            </small>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0)">
                        <div className="media d-flex">
                          <div className="media-left flex-shrink-0 align-self-top">
                            <i className="far fa-bell" />
                          </div>
                          <div className="media-body flex-grow-1">
                            <h6 className="media-heading">
                              New user has been registered on the platform
                            </h6>
                            <small>
                              <time
                                className="date-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                Dec19, 2020
                              </time>
                              <time
                                className="time-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                10:30 AM{" "}
                              </time>
                            </small>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0)">
                        <div className="media d-flex">
                          <div className="media-left flex-shrink-0 align-self-top">
                            <i className="far fa-bell" />
                          </div>
                          <div className="media-body flex-grow-1">
                            <h6 className="media-heading">
                              New user has been registered on the platform
                            </h6>
                            <small>
                              <time
                                className="date-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                Dec19, 2020
                              </time>
                              <time
                                className="time-meta"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                10:30 AM{" "}
                              </time>
                            </small>
                          </div>
                        </div>
                      </a>
                      <div
                        className="ps-scrollbar-x-rail"
                        style={{ left: "0px", bottom: "3px" }}
                      >
                        <div
                          className="ps-scrollbar-x"
                          tabIndex={0}
                          style={{ left: "0px", width: "0px" }}
                        />
                      </div>
                      <div
                        className="ps-scrollbar-y-rail"
                        style={{ top: "0px", right: "0px" }}
                      >
                        <div
                          className="ps-scrollbar-y"
                          tabIndex={0}
                          style={{ top: "0px", height: "0px" }}
                        />
                      </div>
                    </li>
                    <li className="dropdown-menu-footer">
                      <Link
                        className="dropdown-item text-center"
                        to="/notifications"
                      >
                        View All
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown dropdown-user nav-item">
                  <Link
                    className="dropdown-toggle nav-link dropdown-user-link"
                    to="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="avatar avatar-online">
                      {" "}
                      <img
                        src={
                          adminInfo?.userImage && adminInfo?.userImage !== null
                            ? `${imageURL}${adminInfo?.userImage}`
                            : "../assets/images/online-avatar.png"
                        }
                        alt="avatar"
                      />{" "}
                    </span>
                    <div>
                      <span className="user-name d-block">
                        {adminInfo?.firstName + " " + adminInfo?.lastName}
                      </span>
                      <span className="user-role">Admin</span>
                    </div>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right me-3 me-md-0 ms-3 ms-md-0">
                    <Link className="dropdown-item" to="/profile">
                      <i className="fa fa-user" />
                      Profile
                    </Link>
                    <a
                      className="dropdown-item"
                      href="javascript:void(0);"
                      data-bs-toggle="modal"
                      data-bs-target=".profile-logout"
                    >
                      <i className="fa fa-power-off" />
                      Logout
                    </a>
                  </div>
                </li>
                <li className="nav-item d-none d-md-flex menu-toggle is-active">
                  <a className="nav-link hidden-xs align-self-center" href="#">
                    <i className="ft-menu" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/*Top Bar END here*/}
    </div>
  );
};

export default Header;
