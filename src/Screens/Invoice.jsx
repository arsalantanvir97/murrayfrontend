import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Invoice = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [loading, setloading] = useState(false);
  const [hideDownload, sethideDownload] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [totalcost, settotalcost] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [invoices, setinvoices] = useState([]);
  const [invoicedetail, setinvoicedetail] = useState();
  const inputRef = useRef(null);
  const printDocument = async () => {
    await sethideDownload(true);
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape"
      });
      const imgProps = pdf.getImageProperties(imgData);
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("invoice.pdf");
    });
    sethideDownload(false);
  };
  useEffect(() => {
    handleGetUsers();
  }, [page, perPage, from, to, status, searchString]);

  const handleGetUsers = async () => {
    setloading(true);
    try {
      const res = await axios({
        url: `${baseURL}/invoice/logs`,
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
      setinvoices(res.data?.invoice);
    } catch (err) {
      console.log("err", err);
      setloading(false);
    }
  };
  return (
    <>
      <div className="app-content content">
        <div className="content-wrapper">
          <section id="invoice-detail" className="inquiry-page">
            <div className="content-body bg-white rounded-20 shadow-none p-4 p-lg-5">
              <div className="page-title mb-4">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h2>Invoices</h2>
                  </div>
                  <div className="col-md-6 text-md-end"></div>
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
                            <th className="sorting">Customer Name</th>
                            <th className="sorting">Service Name</th>
                            <th className="sorting">Generated On</th>
                            <th className="sorting">Payment Status</th>
                            <th className="sorting">Total Cost</th>
                            <th className="sorting">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices?.docs?.length > 0 ? (
                            invoices?.docs?.map((inv, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{inv?.userid?.fullName}</td>
                                <td>{inv?.services[0]?.name}</td>
                                <td>{moment(inv?.createdAt).format("LL")}</td>
                                <td>{inv?.isPaid ? "Paid" : "Not Paid"}</td>
                                <td>
                                  <span>$</span>
                                  {inv?.total}
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
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target=".generate-invoice"
                                        onClick={() => {
                                          setinvoicedetail(inv);
                                        }}
                                      >
                                        <i className="fa fa-eye" />
                                        View
                                      </a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <p>No Invoice Found</p>
                          )}
                        </tbody>
                      </>
                    )}
                  </table>
                  {invoices?.docs?.length > 0 && (
                    <Pagination
                      totalDocs={invoices?.totalDocs}
                      totalPages={invoices?.totalPages}
                      currentPage={invoices?.page}
                      setPage={setPage}
                      hasNextPage={invoices?.hasNextPage}
                      hasPrevPage={invoices?.hasPrevPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
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
        <div id="divToPrint"  ref={inputRef}>
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-xl"
            style={{ textAlign: "center",minWidth:'85vw' }}
          >
            <div className="modal-content modal-login" >
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
                    <div className="modal-add-customer">
                    <div className="col-md-12 d-flex flex-column justify-content-between" style={{textAlign:'left'}}>
                            <div>
                              <p style={{fontWeight:'bold'}} className="m-0">Business Contact:</p>
                              <p className="m-0">954-993-2527</p>
                            </div>
                            <div>
                              <p style={{fontWeight:'bold'}} className="m-0 mt-1">Business Email:</p>
                              <p className="m-0 abbb" onClick={(e) => {
                                  window.location = `mailto:NSM@CNTMSERVICES.COM`
                                  e.preventDefault()
                                }} >NSM@CNTMSERVICES.COM</p>
                            </div>
                            <div>
                              <p style={{fontWeight:'bold'}} className="m-0 mt-1">Business Address:</p>
                              <p className="m-0">13205 SW 42nd St. Miramar, Fl.33027</p>
                            </div>
                          </div>
                      <div className="right">
                        <div className="text-center">
                          <h1 className="mt-5 ff-demo">Invoice Details</h1>
                          <p className="invoice-num mb-5">
                            Invoice No : {invoicedetail?._id}
                          </p>
                        </div>
                        <div className="invoice-details">
                          <div className="row">
                            <div className="col-md-6 d-flex flex-column justify-content-between">
                              <div>
                                <p className="m-0">
                                  {invoicedetail?.userid?.address}
                                </p>
                                <p className="m-0">Billing #.844-243-4219</p>
                              </div>
                              <div>
                                <p className="m-0">Payment Method:</p>
                                <p className="m-0">CC/Debit Card</p>
                              </div>
                              <div>
                                <p className="m-0">Payment Status:</p>
                                <p className="m-0">
                                  {invoicedetail?.isPaid == true
                                    ? "Paid"
                                    : "Not Paid"}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 text-md-end d-flex flex-column justify-content-between">
                              <div className="mt-3 mb-4">
                                <p className="m-0">Bill To</p>
                                <p className="m-0">
                                  {invoicedetail?.userid?.fullName}
                                </p>
                              </div>
                              <div className="mb-4">
                                <p className="m-0">
                                  {invoicedetail?.userid?.email}
                                </p>
                                <p className="m-0">
                                  +{invoicedetail?.userid?.phone}
                                </p>
                              </div>
                              <div className="mb-4">
                                <p className="m-0">Order Date:</p>
                                <p className="m-0">
                                  {moment(invoicedetail?.createdAt).format(
                                    "LL"
                                  )}
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
                                    <th>User Name</th>
                                  <th>User Address</th>
                                  <th>User Email</th>
                                  <th>User Contact</th>
                                  <th>Description</th>
                                    <th>Unit Cost</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {invoicedetail?.services?.length > 0 &&
                                    invoicedetail?.services?.map((invoi) => (
                                      <tr>
                                        <td>
                                          <p>{invoi?.name}</p>
                                        </td>
                                        <td>
                                          <p>{invoi?.username}</p>
                                        </td>
                                        <td>
                                          <p>{invoi?.useraddress}</p>
                                        </td>
                                        <td>
                                          <p>{invoi?.useremail}</p>
                                        </td>
                                        <td>
                                          <p>{invoi?.usercontact}</p>
                                        </td>
                                        <td>
                                          <p>{invoi?.description}</p>
                                        </td>
                                        <td>
                                          <p>{invoi?.cost}</p>
                                        </td>
                                        <td>
                                          <p>{invoi?.quantity}</p>
                                        </td>
                                        <td>
                                          <p>{invoi?.total}</p>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <h3 className="d-flex justify-content-end text-decoration-underline fs-14 fw-700">
                            {/* <Link to="#" onClick={handleclickfields}>
                            Add Service Field
                          </Link> */}
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
                                      {invoicedetail?.total}
                                    </h6>
                                  </div>
                                </div>
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
                {!hideDownload && (
                  <>
                    <button
                      type="button"
                      onClick={printDocument}
                      className="btn orange-btn full-btn mx-5 my-0"
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${
                            window?.location?.href?.split("Invoice")[0]
                          }InvoiceDetails/${invoicedetail?._id}`
                        )
                      }
                      className="btn orange-btn full-btn mx-5 my-0 mt-3"
                    >
                      Copy Link
                    </button>{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
