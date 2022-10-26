import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  adminLoginAction,
  adminResetPasswordAction
} from "../actions/adminActions";
import Swal from "sweetalert2";
import api from "../utils/api";
import Toasty from "../utils/toast";

import "react-toastify/dist/ReactToastify.css";
import { validateEmail } from "../utils/ValidateEmail";
import InputNumber from "../Components/InputNumer";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [code, setcode] = useState();
  const [confirm_password, setconfirm_password] = useState();
  const [new_password, setnew_password] = useState();
  const [showicon, setshowicon] = useState(true);
  const [showicon2, setshowicon2] = useState(true);
  const [showicon3, setshowicon3] = useState(true);
  const [loading, setloading] = useState(false);

  const [forgotpasswordModal, setforgotpasswordModal] = useState(0);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const submitHandler = async () => {
    const emailvalidation = validateEmail(email);
    console.log("emmmm", emailvalidation);
    console.log("addEmployeeHandler");
    if (emailvalidation == true) {
      try {
        setloading(true);

        console.log("submitHandler");
        await dispatch(adminLoginAction(email, password, history));
        setemail("");
        setpassword("");
        setloading(false);
      } catch (error) {
        setloading(false);
      }
      setloading(false);
    } else {
      Toasty("error", `Please enter a valid email`);
    }
    setloading(false);
  };

  useEffect(() => {
    if (adminInfo) {
      history.replace("/dashboard");
    }
  }, [adminInfo]);
  const forgotpasswordHandler = async (e) => {
    const emailvalidation = validateEmail(email);
    console.log("emmmm", emailvalidation);
    console.log("addEmployeeHandler");
    if (emailvalidation == true) {
      const body = { email };
      console.log("TEST");
      try {
        setloading(true);
        const res = await api.post("/auth/adminRecoverPassword", body);
        setloading(false);

        console.log("res", res);
        if (res?.status == 201) {
          Swal.fire({
            icon: "success",
            title: "SUCCESS",
            text: "Verification Code Sent to your mail",
            showConfirmButton: false,
            timer: 1500
          });
          setforgotpasswordModal(1);
        }
      } catch (error) {
        setloading(false);

        setforgotpasswordModal(0);

        console.log("IN HERE");
        console.log(error?.response?.data);
        Toasty("error", `🦄 Invalid Email!`);
      }
      setloading(false);
    } else {
      Toasty("error", `Please enter a valid email`);
    }
    setloading(false);
  };
  const verificationCodeHandler = async (e) => {
    if (code?.length > 0) {
      try {
        console.log("code, email", code, email);
        const body = { code, email };
        console.log("TEST");
        // try {
        setloading(true);

        const res = await api.post("/auth/adminverifyRecoverCode", body);
        setloading(false);

        console.log("res", res);
        setforgotpasswordModal(2);
      } catch (error) {
        setloading(false);

        console.log("error", error?.response);
        Toasty("error", `🦄 ${error?.response?.data?.message}!`);
      }
    } else {
      Toasty("error", `Please fill out all the required fields`);
    }
    setloading(false);
  };

  const resetPasswordHandler = (e) => {
    console.log("addEmployeeHandler");

    console.log("resetPasswordHandler");
    if (new_password?.length > 0 && confirm_password?.length > 0) {
      dispatch(
        adminResetPasswordAction(
          new_password,
          confirm_password,
          code,
          email,
          (res) => {
            console.log("res", res);
            setforgotpasswordModal(3);
          },
          (err) => {
            console.log("err of SIGNIN -->", err);
            setconfirm_password("");
            setnew_password("");
          }
        )
      );
    } else {
      Toasty("error", `Please fill out all the required fields`);
    }
  };
  return (
    <>
      <section className="login-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-10 mx-auto">
              <div className="login-card bg-img p-0">
                <div className="row justify-content-end">
                  <div className="col-12 col-lg-6 d-flex align-items-stretch">
                    <div className="left d-flex align-items-center justify-content-center position-relative">
                      <img
                        src="assets/images/login-logo.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="right">
                      {/* <div className="logo text-center">
                        <img src="assets/images/logo.png" alt="" />
                      </div> */}
                      <h1 className="mt-5">Login</h1>
                      <p className="mb-5">Please Login to Continue</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor>
                            Email <span className="text-black">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => {
                              setemail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-1">
                          <label htmlFor>
                            Password <span className="text-black">*</span>{" "}
                          </label>
                          <div className="position-relative">
                            <input
                              type={showicon ? "password" : "text"}
                              className="form-control enter-input"
                              placeholder="Enter Your Passowrd"
                              value={password}
                              onChange={(e) => {
                                setpassword(e.target.value);
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
                        <div className="form-group mt-2">
                          <div className="d-flex justify-content-end">
                            <div className="forgot-pass">
                              <a
                                href="password-recovery-1.php"
                                className="fw-700"
                                data-bs-toggle="modal"
                                data-bs-target=".forgot-password"
                              >
                                Forgot Password?
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="form-group text-center mt-4 mb-0">
                          {!loading ? (
                            <button
                              type="button"
                              onClick={() =>
                                email?.length > 0 && password?.length > 0
                                  ? submitHandler()
                                  : Toasty(
                                      "error",
                                      `Please fill out all the required fields!`
                                    )
                              }
                              className="btn btn-login orange-btn full-btn"
                            >
                              Login
                            </button>
                          ) : (
                            <i className="fas fa-spinner fa-pulse"></i>
                          )}
                        </div>
                        {/* <div class="form-group text-center bck-btn mb-0 mt-4">
                                  <a href="dashboard.php">Back To Website</a>
                              </div> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade forgot-password p-0"
        data-bs-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-labelledby
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content modal-login">
            <div className="modal-header">
              <h5 className="modal-title" />
              <button
                type="button"
                className="btn close shadow-sm"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="modal-body px-5">
              <div className="row">
                <div className="col-12">
                  <div className="modal-login-card">
                    <div className="right">
                      <div className="text-center">
                        <h1 className="mt-5">Forgot Password</h1>
                        <p className="mb-5">
                          {forgotpasswordModal == 0
                            ? " Please Enter Your Email Address To Receive Verification"
                            : forgotpasswordModal == 1
                            ? "Please Enter The Verification Code Sent To Your Email"
                            : forgotpasswordModal == 2
                            ? "Please Reset Your Password"
                            : null}
                        </p>
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor>
                            {forgotpasswordModal == 0
                              ? " Email*"
                              : forgotpasswordModal == 1
                              ? "Verification Code*"
                              : null}{" "}
                          </label>
                          {forgotpasswordModal == 0 ? (
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email"
                              value={email}
                              onChange={(e) => {
                                setemail(e.target.value);
                              }}
                            />
                          ) : forgotpasswordModal == 1 ? (
                            <InputNumber
                              value={code}
                              onChange={setcode}
                              max={9}
                              className=" w-100 all-input"
                            />
                          ) : forgotpasswordModal == 2 ? (
                            <>
                              <div className="form-group position-relative mb-1">
                                <label htmlFor className="f-p">
                                  Enter Password{" "}
                                </label>

                                <div className="position-relative">
                                  <input
                                    type={showicon2 ? "password" : "text"}
                                    className="form-control enter-input"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Password"
                                    value={new_password}
                                    onChange={(e) => {
                                      setnew_password(e.target.value);
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
                                    />{" "}
                                  </button>
                                </div>
                              </div>
                              <div
                                style={{
                                  height: 23
                                }}
                              ></div>
                              <div className="form-group position-relative mb-1">
                                <label htmlFor className="f-p">
                                  Confirm Password{" "}
                                </label>
                                <div className="position-relative">
                                  <input
                                    type={showicon3 ? "password" : "text"}
                                    className="form-control enter-input"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Confirm Password"
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
                                    />{" "}
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : null}
                          {forgotpasswordModal == 1 && (
                            <div className="text-right">
                              {!loading ? (
                                <Link
                                  to="#"
                                  className="f-p"
                                  onClick={() => {
                                    email?.length > 0
                                      ? forgotpasswordHandler()
                                      : Toasty(
                                          "error",
                                          `Please fill out all the required fields`
                                        );
                                  }}
                                >
                                  Resend Code
                                </Link>
                              ) : (
                                <i className="fas fa-spinner fa-pulse"></i>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="form-group text-center mt-2 mt-lg-3">
                          {!loading ? (
                            <button
                              type="button"
                              onClick={
                                forgotpasswordModal == 0
                                  ? forgotpasswordHandler
                                  : forgotpasswordModal == 1
                                  ? verificationCodeHandler
                                  : forgotpasswordModal == 2
                                  ? resetPasswordHandler
                                  : null
                              }
                              className="btn px-4 orange-btn full-btn"
                            >
                              {forgotpasswordModal == 0
                                ? "Continue"
                                : forgotpasswordModal == 1
                                ? "Continue"
                                : forgotpasswordModal == 2
                                ? "Update"
                                : null}
                            </button>
                          ) : (
                            <i className="fas fa-spinner fa-pulse"></i>
                          )}
                        </div>
                        <div className="form-group text-center bck-btn mb-0 mt-2 mt-lg-2">
                          <Link
                            to="#"
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            Back To Login
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-4 pb-5 text-center d-flex justify-content-center flex-column flex-sm-row align-items-stretch"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
