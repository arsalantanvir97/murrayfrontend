import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Calender from "../Components/Calender";
import InputPhone from "../Components/InputPhone";
import SearchFilter from "../Components/SearchFilter";
import { baseURL } from "../utils/api";
import { countries } from "../utils/countries";
import Toasty from "../utils/toast";
import Pagination from "../Components/Pagination";
import moment from "moment";
import { Link } from "react-router-dom";

const Customers = ({ enable_dot }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [loading, setloading] = useState(false);
  const [isedit, setisedit] = useState(false);
  const [editid, seteditid] = useState(false);
  const [users, setusers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [totalcost, settotalcost] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [inputfields, setInputfields] = useState([
    {
      name: "",
      description: "",
      cost: "",
      quantity: "",
      total: ""
    }
  ]);
  const handleclickfields = () => {
    setInputfields([
      ...inputfields,
      {
        name: "",
        description: "",
        cost: "",
        quantity: 0,
        total: 0
      }
    ]);
  };
  const handlechangeinput = (index, event) => {
    let totall = 0;
    console.log("event.target.value", event.target.value);
    const values = [...inputfields];
    values[index][event.target.name] =
      event.target.name === "cost" || event.target.name === "quantity"
        ? Number(event.target.value)
        : event.target.value;
    if (event.target.name === "cost" || event.target.name === "quantity") {
      values[index]["total"] = values[index]?.cost * values[index]?.quantity;
    }
    console.log("values", values);
    values?.map((val) => (totall = totall + val?.total));
    settotalcost(totall);
    setInputfields(values);
  };
  useEffect(() => {
    handleGetUsers();
  }, [page, perPage, from, to, status, searchString]);

  const handleGetUsers = async () => {
    setloading(true);
    try {
      const res = await axios({
        url: `${baseURL}/user/logs`,
        method: "GET",
        params: {
          page,
          perPage,
          searchString,
          from,
          to,
          status
        },
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      setloading(false);

      console.log("res", res);
      setusers(res.data?.users);
    } catch (err) {
      console.log("err", err);
      setloading(false);
    }
  };

  useEffect(() => {
    console.log("window", window?.location.href.split("Customers")[0]);
  }, [window]);

  const toggleActiveStatus = async (id) => {
    try {
      const res = await axios({
        url: `${baseURL}/user/toggle-active/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      Swal.fire({
        icon: "success",
        title: "",
        text: res.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      handleGetUsers();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: err?.response?.data?.message
          ? err?.response?.data?.message
          : "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const submitHandler = async (e) => {
    let res;
    try {
      console.log("TEST", isedit);
      // try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      };
      if (isedit === false) {
        res = await axios.post(
          `${baseURL}/auth/registerUser`,
          {
            fullName,
            address,
            country,
            email,
            phone
          },
          config
        );
      } else {
        res = await axios.post(
          `${baseURL}/user/editProfile`,
          {
            fullName,
            address,
            country,
            email,
            phone,
            editid
          },
          config
        );
      }
      setloading(false);
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: `Customer ${isedit ? "Updated" : "Added"} Successfully`,
        showConfirmButton: false,
        timer: 1500
      });
      console.log("res", res);
      handleGetUsers();
      window?.$(".modal").modal("hide");
      window?.$(".modal-backdrop").remove();
      setfullName("");
      setemail("");
      setphone("");
      setaddress("");
      setcountry("");
      setloading("");
      setisedit(false);
      seteditid("");
    } catch (error) {
      setloading(false);

      console.log("error", error?.response);
      Toasty("error", `🦄 ${error?.response?.data?.message}!`);
    }

    setloading(false);
  };
  const populateField = (user, status) => {
    if (status == true) {
      setisedit(true);
      seteditid(user?._id);
    }
    setfullName(user?.fullName);
    setemail(user?.email);
    setphone(user?.phone);
    setaddress(user?.address);
    setcountry(user?.country);
  };

  function formatInput(e) {
    // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
    let checkIfNum;
    if (e.key !== undefined) {
      // Check if it's a "e", ".", "+" or "-"
      const filter = enable_dot
        ? e.key === "e" || e.key === "+" || e.key === "-"
        : e.key === "e" || e.key === "." || e.key === "+" || e.key === "-";
      checkIfNum = filter;
    } else if (e.keyCode !== undefined) {
      // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
      checkIfNum =
        e.keyCode === 69 ||
        e.keyCode === 190 ||
        e.keyCode === 187 ||
        e.keyCode === 189;
    }
    return checkIfNum && e.preventDefault();
  }

  const generateInVoiceHandler = async () => {
    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      };
      const res = await axios.post(
        `${baseURL}/invoice/generateInvoice`,
        {
          userid: editid,
          email,
          services: inputfields,
          total: totalcost,
          url: window?.location?.href?.split("Customers")[0]
        },
        config
      );
      Swal.fire({
        icon: "success",
        title: "",
        text: "Invoice generated successfully",
        showConfirmButton: false,
        timer: 1500
      });
      setloading(false);

      console.log("res", res);
    } catch (error) {
      setloading(false);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
      console.log("error", error?.response);
      Toasty("error", `🦄 ${error?.response?.data?.message}!`);
      setfullName("");
      setemail("");
      setphone("");
      setaddress("");
      setcountry("");
      setloading("");
      setisedit(false);
      seteditid("");
      setInputfields([
        {
          name: "",
          description: "",
          cost: "",
          quantity: "",
          total: ""
        }
      ]);
    }
    setloading(false);

    window?.$(".modal").modal("hide");
    window?.$(".modal-backdrop").remove();
  };

  return (
    <>
      <div className="app-content content">
        <div className="content-wrapper">
          {" "}
          <section id="customers-detail" className="inquiry-page">
            <div className="content-body bg-white rounded-20 shadow-none p-4 p-lg-5">
              <div className="page-title mb-4">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h2>Customers</h2>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <button
                      type="button"
                      className="btn btn-login orange-btn"
                      data-bs-toggle="modal"
                      data-bs-target=".new-customer"
                    >
                      Add Customer
                    </button>
                  </div>
                </div>
              </div>
              <div className="dataTables_wrapper">
                <div className="user-listing-top">
                  <div className="row align-items-end d-flex mb-3">
                    <div className="col-12 col-xl-6 col-xxl-3 align-items-start">
                      <div className="dataTables_filter d-flex justify-content-start flex-shrink-1 mt-3">
                        <label
                          htmlFor
                          className="d-md-inline-block me-2 me-lg-3 my-0 align-self-center flex-shrink-0"
                        >
                          Status
                        </label>
                        <div className="filter-wrap d-md-flex d-block flex-xl-column align-items-start align-items-xl-end justify-content-end">
                          <div className="select-wrapper d-block w-auto mb-0 mb-md-0 me-0 me-md-0 me-xl-0">
                            <select
                              value={status}
                              onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                              }}
                              name
                              className="form-control shadow-sm"
                              id
                            >
                              <option value={""}>Select</option>
                              <option value={true}>Active</option>
                              <option value={false}>Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Calender
                      from={from}
                      setFrom={setFrom}
                      to={to}
                      setTo={setTo}
                    />

                    <div className="col-12 col-xl-6 col-xxl-3 align-items-start">
                      <div className="dataTables_filter d-flex justify-content-start flex-shrink-1 mt-3">
                        <div className="search-wrap flex-grow-1">
                          <SearchFilter
                            searchString={searchString}
                            setSearchString={setSearchString}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-tabble table-responsive mx-n2">
                  <table className="table dataTable px-2">
                    {loading ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <div className="custommloader"></div>
                      </div>
                    ) : (
                      <>
                        <thead>
                          <tr>
                            <th className="sorting">S.No</th>
                            <th className="sorting">Full Name</th>
                            <th className="sorting">Email</th>
                            <th className="sorting">Registered On</th>
                            <th className="sorting">Phone</th>
                            <th className="sorting">Status</th>
                            <th className="sorting">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users?.docs?.length > 0 ? (
                            users?.docs?.map((use, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{use?.fullName}</td>
                                <td>{use?.email}</td>
                                <td>{moment(use?.createdAt).format("LL")}</td>
                                <td>{use?.phone}</td>
                                <td
                                  className={
                                    use?.status == true
                                      ? "active-status"
                                      : "inactive-status"
                                  }
                                >
                                  {" "}
                                  {use?.status == true ? "Active" : "Inactive"}
                                </td>
                                <td>
                                  <div className="btn-group ml-1">
                                    <button
                                      type="button"
                                      className="btn dropdown-toggle btn-sm"
                                      data-bs-toggle="dropdown"
                                    >
                                      <i className="fa fa-ellipsis-v" />
                                    </button>
                                    <div className="dropdown-menu">
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={() => populateField(use, true)}
                                        data-bs-toggle="modal"
                                        data-bs-target=".customer-details"
                                      >
                                        <i className="fa fa-eye" />
                                        View
                                      </Link>
                                      <Link
                                        onClick={() =>
                                          toggleActiveStatus(
                                            use?._id,
                                            !use?.status
                                          )
                                        }
                                        className="dropdown-item"
                                        to="#"
                                      >
                                        <i className="fas fa-toggle-on" />
                                        {!use?.status ? "Active" : "Inactive"}
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        onClick={() => populateField(use, true)}
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target=".generate-invoice"
                                      >
                                        <i className="fas fa-receipt" />
                                        Generate Invoice
                                      </Link>
                                      <Link
                                        onClick={() => populateField(use, true)}
                                        className="dropdown-item"
                                        to="#"
                                        data-bs-toggle="modal"
                                        data-bs-target=".new-customer"
                                      >
                                        <i className="fas fa-edit" />
                                        Edit
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <p>No Customers Found</p>
                          )}
                        </tbody>
                      </>
                    )}
                  </table>
                  {users?.docs?.length > 0 && (
                    <Pagination
                      totalDocs={users?.totalDocs}
                      totalPages={users?.totalPages}
                      currentPage={users?.page}
                      setPage={setPage}
                      hasNextPage={users?.hasNextPage}
                      hasPrevPage={users?.hasPrevPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div
        className="modal fade new-customer p-0"
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
                onClick={() => {
                  setfullName("");
                  setemail("");
                  setphone("");
                  setaddress("");
                  setcountry("");
                  setloading("");
                  setisedit(false);
                  seteditid("");
                }}
              >
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="modal-body px-5">
              <div className="row">
                <div className="col-12">
                  <div className="modal-add-customer">
                    <div className="right">
                      <div className="text-center">
                        <h1 className="mb-5 ff-demo">
                          {isedit ? "Edit" : "Add New"} Customer
                        </h1>
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor>
                            Full Name <span className="text-danger">*</span>
                          </label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control enter-input"
                              placeholder="Enter Full Name"
                              value={fullName}
                              onChange={(e) => {
                                setfullName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor>
                            Email Address <span className="text-danger">*</span>
                          </label>
                          <div className="position-relative">
                            <input
                              type="email"
                              className="form-control enter-input"
                              placeholder="Enter Email Address"
                              value={email}
                              onChange={(e) => {
                                setemail(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor>
                            Phone No. <span className="text-danger">*</span>
                          </label>
                          <div className="position-relative">
                            <InputPhone value={phone} onChange={setphone} />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor>
                            Country <span className="text-danger">*</span>
                          </label>
                          <select
                            placeholder="Select Country"
                            className="form-control shadow-sm"
                            color="#000"
                            value={country}
                            onChange={(e) => {
                              setcountry(e.target.value);
                            }}
                          >
                            <option>Select Country</option>
                            {countries?.length > 0 &&
                              countries?.map((co) => (
                                <option value={co}>{co}</option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor>
                            Full Address <span className="text-danger">*</span>
                          </label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control enter-input"
                              placeholder="Enter Full Address"
                              value={address}
                              onChange={(e) => {
                                setaddress(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group text-center mt-2 mt-lg-3">
                          {!loading ? (
                            <button
                              type="button"
                              onClick={() =>
                                fullName?.length > 0 &&
                                address?.length > 0 &&
                                country?.length > 0 &&
                                email?.length > 0 &&
                                phone?.length > 0
                                  ? submitHandler()
                                  : Toasty(
                                      "error",
                                      `Please fill out all the required fields!`
                                    )
                              }
                              className="btn px-4 orange-btn full-btn"
                            >
                              {isedit ? "Update" : "Add"} Customer
                            </button>
                          ) : (
                            <i className="fas fa-spinner fa-pulse"></i>
                          )}
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

      <div
        className="modal fade customer-details p-0"
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
                onClick={() => {
                  setfullName("");
                  setemail("");
                  setphone("");
                  setaddress("");
                  setcountry("");
                  setloading("");
                  setisedit(false);
                  seteditid("");
                }}
              >
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="modal-body px-5">
              <div className="row">
                <div className="col-12">
                  <div className="modal-add-customer">
                    <div className="right">
                      <div className="text-center">
                        <h1 className="mb-5 ff-demo">Customer Details</h1>
                      </div>
                      <div className="invoice-details">
                        <div className="row">
                          <div className="col-12 col-sm-6 d-flex flex-column justify-content-between">
                            <p className="m-0">Full Name</p>
                            <p className="m-0">Email Address</p>
                            <p className="m-0">Phone No.</p>
                            <p className="m-0">Location</p>
                          </div>
                          <div className="col-12 col-sm-6 text-sm-end d-flex flex-column justify-content-between">
                            <h6>{fullName}</h6>
                            <h6>{email}</h6>
                            <h6>{phone}</h6>
                            <h6>{address}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-4 pb-5 text-center d-flex justify-content-center flex-sm-row align-items-stretch">
              <button
                type="button"
                className="btn orange-btn full-btn mx-5 my-0"
                data-bs-toggle="modal"
                data-bs-target=".new-customer"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade generate-invoice p-0"
        id="custome-width"
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
                onClick={() => {
                  setfullName("");
                  setemail("");
                  setphone("");
                  setaddress("");
                  setcountry("");
                  setloading("");
                  setisedit(false);
                  seteditid("");
                  setInputfields([
                    {
                      name: "",
                      description: "",
                      cost: "",
                      quantity: "",
                      total: ""
                    }
                  ]);
                }}
              >
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="modal-body px-5">
              <div className="row">
                <div className="col-12">
                  <div className="modal-add-customer">
                    <div className="right">
                      <div className="text-center">
                        <h1 className="mt-5 ff-demo">Generate Invoice</h1>
                        {/* <p className="invoice-num mb-5">
                          Invoice No :{" "}
                          {Math.floor(100000 + Math.random() * 900000)}
                        </p> */}
                      </div>
                      <div className="invoice-details">
                        <div className="row">
                          <div className="col-md-6 d-flex flex-column justify-content-between">
                            <div>
                              <p className="m-0">{address}</p>
                              <p className="m-0">Billing #.844-243-4219</p>
                            </div>
                            <div>
                              <p className="m-0">Payment Method:</p>
                              <p className="m-0">CC/Debit Card</p>
                            </div>
                          </div>
                          <div className="col-md-6 text-md-end d-flex flex-column justify-content-between">
                            <div className="mt-3 mb-4">
                              <p className="m-0">Bill To</p>
                              <p className="m-0">{fullName}</p>
                            </div>
                            <div className="mb-4">
                              <p className="m-0">{email}</p>
                              <p className="m-0">+{phone}</p>
                            </div>
                            <div className="mb-4">
                              <p className="m-0">Order Date:</p>
                              <p className="m-0">
                                {new Date()
                                  .toJSON()
                                  .slice(0, 10)
                                  .replace(/-/g, "/")}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 overflow-auto">
                            <table className="table mt-4">
                              <thead>
                                <tr>
                                  <th>Service Name</th>
                                  <th>Description</th>
                                  <th>Unit Cost</th>
                                  <th>Quantity</th>
                                  <th>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {inputfields?.length > 0 &&
                                  inputfields?.map((inputfield, index) => (
                                    <tr>
                                      <td>
                                        <input
                                          type="text"
                                          name="name"
                                          className="form-control"
                                          placeholder="Enter Service"
                                          value={inputfield.name}
                                          onChange={(event) =>
                                            handlechangeinput(index, event)
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="description"
                                          className="form-control"
                                          placeholder="Enter Description"
                                          value={inputfield.description}
                                          onChange={(event) =>
                                            handlechangeinput(index, event)
                                          }
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          onKeyDown={formatInput}
                                          value={Number(inputfield.cost)}
                                          onChange={(event) =>
                                            handlechangeinput(index, event)
                                          }
                                          min={0}
                                          max={8}
                                          name="cost"
                                          className="form-control"
                                          placeholder="Enter Unit"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          onKeyDown={formatInput}
                                          value={Number(inputfield.quantity)}
                                          onChange={(event) =>
                                            handlechangeinput(index, event)
                                          }
                                          min={0}
                                          max={8}
                                          name="quantity"
                                          className="form-control"
                                          placeholder="Enter Unit"
                                        />
                                      </td>
                                      <td>
                                        <p>{inputfield?.total}</p>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <h3 className="d-flex justify-content-end text-decoration-underline fs-14 fw-700">
                          <Link to="#" onClick={handleclickfields}>
                            Add Service Field
                          </Link>
                        </h3>
                        <div className="calculation mt-5">
                          <div className="row justify-content-end">
                            <div className="col-md-3">
                              <div className="row">
                                <div className="col-6">
                                  <p>Total :</p>
                                </div>
                                <div className="col-6">
                                  <h6 className="text-end">
                                    <span>$</span>
                                    {totalcost}
                                  </h6>
                                </div>
                              </div>
                              {/* <div className="row">
                                <div className="col-6">
                                  <p>Paid Amount :</p>
                                </div>
                                <div className="col-6">
                                  <h6 className="text-end">
                                    <span>$</span>00
                                  </h6>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <p>Balance :</p>
                                </div>
                                <div className="col-6">
                                  <h6 className="text-end">
                                    <span>$</span>00
                                  </h6>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 pt-4 pb-5 text-center d-flex justify-content-center flex-sm-row align-items-stretch">
              {!loading ? (
                <button
                  type="button"
                  className="btn orange-btn full-btn mx-5 my-0"
                  onClick={generateInVoiceHandler}
                  // data-bs-toggle="modal"
                  // data-bs-target=".invoice-generated"
                >
                  Generate Invoice
                </button>
              ) : (
                <i className="fas fa-spinner fa-pulse"></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
