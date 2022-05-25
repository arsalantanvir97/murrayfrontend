import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminverfyadnresetpasword } from "../actions/adminActions";
import Toasty from "../utils/toast";

const ChangePassword = ({ history }) => {
  const dispatch = useDispatch();
  const [existingpassword, setexistingpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [showicon, setshowicon] = useState(true);
  const [showicon2, setshowicon2] = useState(true);
  const [showicon3, setshowicon3] = useState(true);
  const [loading, setloading] = useState(false);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const submitHandler = async () => {
    console.log("submitHandler");
    console.log(
      "submitHandlerreqbody",
      existingpassword,
      newpassword,
      confirm_password
    );
    try {
      setloading(true);
      await dispatch(
        adminverfyadnresetpasword(
          existingpassword,
          newpassword,
          confirm_password,
          adminInfo?.email,
          history
        )
      );
      setloading(false);
    } catch (error) {
      setloading(false);
    }
    setloading(false);

    setexistingpassword("");
    setnewpassword("");
    setconfirm_password("");
  };
  return (
    <div className="app-content content">
      <div className="content-wrapper">
        <section id="change_password" className="my-profile">
          <div className="page-title mb-4">
            <div className="row">
              <div className="col-12 col-lg-12">
                <h2>
                  <Link
                    to="#"
                    onClick={() => {
                      history?.goBack();
                    }}
                  >
                    <i className="fa fa-chevron-left" />
                  </Link>{" "}
                  Update Password
                </h2>
              </div>
            </div>
          </div>
          <div className="content-body bg-white rounded-10 shadow-sm p-4 p-lg-5">
            <div className="row">
              <div className="col-12 col-lg-7 col-xxl-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="row form-group">
                    <div className="col-12">
                      <label className="fw-medium ps-1 mb-2">
                        Change Password<span className="text-danger">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type={showicon ? "password" : "text"}
                          className="form-control enter-input"
                          placeholder="Enter New Password"
                          value={existingpassword}
                          onChange={(e) => {
                            setexistingpassword(e.target.value);
                          }}
                        />
                        <button className="btn view-btn position-absolute">
                          <i
                            onClick={() => setshowicon(!showicon)}
                            className={
                              showicon
                                ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                            }
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-12">
                      <label className="fw-medium ps-1 mb-2">
                        New Password<span className="text-danger">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type={showicon2 ? "password" : "text"}
                          className="form-control enter-input"
                          placeholder="Enter New Password"
                          value={newpassword}
                          onChange={(e) => {
                            setnewpassword(e.target.value);
                          }}
                        />
                        <button className="btn view-btn position-absolute">
                          <i
                            onClick={() => setshowicon2(!showicon2)}
                            className={
                              showicon2
                                ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                            }
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-12">
                      <label className="fw-medium ps-1 mb-2">
                        Confirm Password<span className="text-danger">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type={showicon3 ? "password" : "text"}
                          className="form-control enter-input"
                          placeholder="Enter Confirm Password"
                          value={confirm_password}
                          onChange={(e) => {
                            setconfirm_password(e.target.value);
                          }}
                        />
                        <button className="btn view-btn position-absolute">
                          <i
                            onClick={() => setshowicon3(!showicon3)}
                            className={
                              showicon3
                                ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                            }
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row detail-row">
                    <div className="col-12 mt-3">
                      {!loading ? (
                        <Link
                          to="#"
                          onClick={() =>
                            existingpassword?.length > 0 &&
                            newpassword?.length > 0 &&
                            confirm_password?.length > 0
                              ? submitHandler()
                              : Toasty(
                                  "error",
                                  `Please fill out all the required fields!`
                                )
                          }
                          className="btn btn-primary text-uppercase px-5 me-3"
                        >
                          Update
                        </Link>
                      ) : (
                        <i className="fas fa-spinner fa-pulse"></i>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-12 col-lg-5 col-xxl-7 text-center d-none d-lg-block">
                <img src="../images/forgot-pass-img.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
