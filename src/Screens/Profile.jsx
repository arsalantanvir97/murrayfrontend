import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ImageSelector from "../Components/ImageSelector";
import { updateAdminInfoAction } from "../actions/adminActions";
import Toasty from "../utils/toast";
import InputPhone from "../Components/InputPhone";

const Profile = ({ history }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");

  const [image, setimage] = useState("");
  const [is_edit, setIsEdit] = useState(false);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      setfirstName(adminInfo?.firstName);
      setlastName(adminInfo?.lastName);
      setemail(adminInfo?.email);
      setimage(adminInfo?.userImage);
      setphone(adminInfo?.phone);
    }
  }, [adminInfo]);

  const updateProfileData = async (e) => {
    if (firstName?.length > 0 && lastName?.length > 0) {
      try {
        setloading(true);
        const formData = new FormData();

        formData.append("user_image", image);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("phone", phone);

        await dispatch(updateAdminInfoAction(formData));
        setloading(false);

        setIsEdit(false);
      } catch (error) {
        setloading(false);
      }
    } else {
      Toasty("error", `Please fill out all the required fields!`);
      setloading(false);
    }
    setloading(false);
  };
  return (
    <div className="app-content content">
      <div className="content-wrapper">
        <section id="protfolio_edit_page" className="profile-edit-page">
          <div className="page-title mb-4">
            <div className="row">
              <div className="col-12 col-lg-4">
                <h2>
                  <Link
                    to="#"
                    onClick={() => {
                      history?.goBack();
                    }}
                  >
                    <i className="fa fa-chevron-left" />
                  </Link>{" "}
                  {is_edit && "Edit"} Profile Information
                </h2>
              </div>
            </div>
          </div>
          <div className="content-body shadow-sm bg-white rounded-10 p-4 p-lg-5">
            <div className="detail-block media d-lg-flex d-block">
              <div className="media-left flex-shrink-0 mb-5 mb-lg-0">
                <ImageSelector
                  setImage={setimage}
                  image={image}
                  is_edit={is_edit}
                />
              </div>
              <div className="media-body flex-grow-1 ps-0 ps-lg-5 ms-0 ms-lg-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="row form-group">
                    <div className="col-12 col-lg-4 col-xl-3 col-xxl-3 align-self-center">
                      <label className="fw-light">
                        First Name<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-12 col-lg-8 col-xl-6 col-xxl-5">
                      {is_edit ? (
                        <input
                          type="text"
                          className="form-control"
                          value={firstName}
                          onChange={(e) => {
                            setfirstName(e.target.value);
                          }}
                        />
                      ) : (
                        <p>{firstName}</p>
                      )}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-12 col-lg-4 col-xl-3 col-xxl-3 align-self-center">
                      <label className="fw-light">
                        Last Name<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-12 col-lg-8 col-xl-6 col-xxl-5">
                      {is_edit ? (
                        <input
                          type="text"
                          className="form-control"
                          value={lastName}
                          onChange={(e) => {
                            setlastName(e.target.value);
                          }}
                        />
                      ) : (
                        <p>{lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-12 col-lg-4 col-xl-3 col-xxl-3 align-self-center">
                      <label className="fw-light">
                        Email<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-12 col-lg-8 col-xl-6 col-xxl-5">
                      {email}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-12 col-lg-4 col-xl-3 col-xxl-3 align-self-center">
                      <label className="fw-light">
                        Phone No<span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-12 col-lg-8 col-xl-6 col-xxl-5">
                      {is_edit ? (
                        <InputPhone value={phone} onChange={setphone} />
                      ) : (
                        <p>{phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="row detail-row">
                    <div className="col-12 mt-3">
                      {!loading ? (
                        <Link
                          to="#"
                          onClick={() => {
                            if (!is_edit) {
                              setIsEdit(true);
                            } else {
                              updateProfileData();
                            }
                          }}
                          className="btn btn-blue text-uppercase px-5 me-3"
                        >
                          {is_edit ? "Update" : "Edit"}
                        </Link>
                      ) : (
                        <i className="fas fa-spinner fa-pulse"></i>
                      )}
                      {/* <a
                        href="profile.php"
                        className="btn btn-secondary text-uppercase px-5"
                      >
                        Cancel
                      </a> */}
                    </div>
                    {!is_edit &&
                    <div className="row mb-3">
                      <div className="col-12 mt-3 d-flex text-center">
                        <div className="d-flex flex-column">
                          <Link to='/ChangePassword'
                            className="inline-link mt-3"
                          >
                            Change Password
                          </Link>
                        </div>
                      </div>
                    </div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
