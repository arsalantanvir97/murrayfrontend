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
const RedirectHandler=()=>{
  console.log('RedirectHandler');
  history?.push('/notifications')
}
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
                    src="assets/images/login-logo.jpg"
                  />
                </Link>
              </li>
              <li className="nav-item d-md-none align-self-center pe-3">
                <Link
                  className="nav-link open-navbar-container"
                 to='/notifications'
                 
                >
                  <i className="fa fa-ellipsis-v" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-container flex-grow-1 align-self-center">
            <div className="collapse navbar-collapse" id="navbar-mobile">
              <ul className="nav navbar-nav ms-auto justify-content-end">
                <li className="dropdown dropdown-notification nav-item d-flex">
                  <Link
                    className="nav-link nav-link-label align-self-center"
                    to="#"
                    aria-expanded="true"
                    onClick={RedirectHandler}

                  >
                    <i className="fas fa-bell" />{" "}
                    {/* <span class="badge badge-pill badge-default badge-danger badge-default badge-up">5</span> */}{" "}
                  </Link>
              
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
                            : "assets/images/online-avatar.png"
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
                      onClick={logOutHandler}
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
