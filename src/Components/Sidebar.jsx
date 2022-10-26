import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div id="sidebar-wrapper">
      <div
        className="main-menu menu-fixed menu-light menu-accordion shadow-sm"
        data-scroll-to-active="true"
      >
        <div
          className="main-menu-content ps-container ps-theme-dark"
          data-ps-id="28cd9503-80cc-38a8-632a-9c585a3b0766"
        >
          <div className="navbar-header d-flex mb-5 mt-3">
            <ul className="nav navbar-nav flex-row flex-grow-1 mb-3">
              <li className="nav-item d-md-none align-self-center ps-3">
                <a
                  className="nav-link menu-toggle hidden-xs is-active"
                  href="#"
                  target='_self'
                >
                  <i className="ft-menu font-large-1" />
                </a>
              </li>
              <li className="nav-item align-self-center flex-grow-1 text-center">
                <a
                  className="navbar-brand"
                  href="/dashboard"
                  target='_self'
                >
                  {" "}
                  <img
                    className="brand-logo img-fluid"
                    alt="stack admin logo"
                    src="assets/images/login-logo.jpg"
                    style={{maxHeight:125,maxWidth:216,minHeight:125,minWidth:216,}}

                  />
                </a>
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
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li
              className={
                props?.match?.path == "/dashboard"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/dashboard" target='_self'>
                <svg
                  id="Group_25619"
                  data-name="Group 25619"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.001"
                  height="20.001"
                  viewBox="0 0 18.001 20.001"
                >
                  <path
                    id="Op_component_1"
                    data-name="Op component 1"
                    d="M104,498a1,1,0,0,0,1,1h3a4,4,0,0,0,4-4v-1a1,1,0,0,0-1-1h-6a1,1,0,0,0-1,1Z"
                    transform="translate(-94 -478.999)"
                    fill="#333"
                  />
                  <path
                    id="Op_component_2"
                    data-name="Op component 2"
                    d="M101,499a1,1,0,0,0,1-1V488a1,1,0,0,0-1-1H95a1,1,0,0,0-1,1v7a4,4,0,0,0,4,4Z"
                    transform="translate(-94 -479)"
                    fill="#333"
                  />
                  <path
                    id="Op_component_3"
                    data-name="Op component 3"
                    d="M105,479a1,1,0,0,0-1,1v10a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1v-7a4,4,0,0,0-4-4Z"
                    transform="translate(-93.999 -479)"
                    fill="#333"
                  />
                  <path
                    id="Op_component_4"
                    data-name="Op component 4"
                    d="M102,480a1,1,0,0,0-1-1H98a4,4,0,0,0-4,4v1a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1Z"
                    transform="translate(-94 -479)"
                    fill="#333"
                  />
                </svg>
                <span className="menu-title" data-i18n>
                  Dashboard
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Customers"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Customers" target='_self'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22.412"
                  height="18.323"
                  viewBox="0 0 22.412 18.323"
                >
                  <g
                    id="Group_25620"
                    data-name="Group 25620"
                    transform="translate(0 0)"
                  >
                    <path
                      id="Vector"
                      d="M99.572,345a4.289,4.289,0,1,0-3.03-1.256A4.282,4.282,0,0,0,99.572,345Z"
                      transform="translate(-91.749 -336.428)"
                      fill="#333"
                    />
                    <path
                      id="Vector-2"
                      data-name="Vector"
                      d="M105.178,348.54A7.826,7.826,0,0,0,91.749,354a.751.751,0,0,0,.75.75h14.145a.751.751,0,0,0,.75-.75,7.553,7.553,0,0,0-.364-2.343,7.771,7.771,0,0,0-1.852-3.116Z"
                      transform="translate(-91.75 -336.428)"
                      fill="#333"
                    />
                    <circle
                      id="Vector-3"
                      data-name="Vector"
                      cx="3.19"
                      cy="3.19"
                      r="3.19"
                      transform="translate(13.591 2.572)"
                      fill="#333"
                    />
                    <path
                      id="Vector-4"
                      data-name="Vector"
                      d="M108.624,346.252a5.614,5.614,0,0,0-2.854.793c.162.146.326.289.48.446a9.292,9.292,0,0,1,2.214,3.724,8.678,8.678,0,0,1,.327,1.411H113.5a.75.75,0,0,0,.75-.75,5.631,5.631,0,0,0-5.626-5.625Z"
                      transform="translate(-91.839 -336.428)"
                      fill="#333"
                    />
                  </g>
                </svg>
                <span className="menu-title">Customers</span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Invoice"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Invoice" target='_self'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23.649"
                  height={22}
                  viewBox="0 0 23.649 22"
                >
                  <g
                    id="Group_25621"
                    data-name="Group 25621"
                    transform="translate(0)"
                  >
                    <path
                      id="Op_component_1"
                      data-name="Op component 1"
                      d="M110,550H96a1,1,0,0,0-.65.25A4,4,0,0,1,98,553.6a1.684,1.684,0,0,1,0,.4v17a1,1,0,0,0,1.65.76l2.85-2.44,2.85,2.44a1,1,0,0,0,1.3,0l2.85-2.44,2.849,2.44A1,1,0,0,0,113,572a1.064,1.064,0,0,0,.42-.09A1,1,0,0,0,114,571V554a4,4,0,0,0-4-4Z"
                      transform="translate(-90.35 -550)"
                      fill="#333"
                    />
                    <path
                      id="Op_component_2"
                      data-name="Op component 2"
                      d="M109,564h-6a1,1,0,1,1,0-2h6a1,1,0,1,1,0,2Z"
                      transform="translate(-91.999 -550)"
                      fill="#fff"
                    />
                    <path
                      id="Op_component_3"
                      data-name="Op component 3"
                      d="M109,560h-6a1,1,0,1,1,0-2h6a1,1,0,1,1,0,2Z"
                      transform="translate(-91.999 -550)"
                      fill="#fff"
                    />
                    <path
                      id="Op_component_4"
                      data-name="Op component 4"
                      d="M109,556h-6a1,1,0,1,1,0-2h6a1,1,0,1,1,0,2Z"
                      transform="translate(-91.999 -550)"
                      fill="#fff"
                    />
                    <path
                      id="Op_component_5"
                      data-name="Op component 5"
                      d="M96,554v8H93a1,1,0,0,1-1-1v-7.4a2.01,2.01,0,0,1,4,.4Z"
                      transform="translate(-91.999 -550)"
                      fill="#333"
                    />
                  </g>
                </svg>
                <span className="menu-title" data-i18n>
                  Invoice
                </span>
              </Link>
            </li>
          </ul>
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
            style={{ top: "0px", right: "3px" }}
          >
            <div
              className="ps-scrollbar-y"
              tabIndex={0}
              style={{ top: "0px", height: "0px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
