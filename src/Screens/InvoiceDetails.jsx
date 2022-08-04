import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseURL } from "../utils/api";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

const InvoiceDetails = ({ match }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [invoiceDetails, setinvoiceDetails] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getSingleInvoice();
  }, []);

  const getSingleInvoice = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/invoice/invoiceDetails/${match?.params?.id}`,
        method: "GET",
      
      });
      console.log("res", res);
      setinvoiceDetails(res?.data?.invoice);
    } catch (err) {
      console.log(err);
    }
  };
  async function handleToken(token) {
    setloading(true);

    const config = {
      header: {
        Authorization: "Bearer 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"
      }
    };
    const response = await axios.post(
      `${baseURL}/checkout`,
      { token, product: 100 },
      config
    );
    console.log("response", response);
    const { status } = response.data;

    console.log(
      "res",
      response.data.id,
      response.data.status,
      response.headers.date,
      response.data.receipt_email
    );
    if (status === "succeeded") {
      
      const res = await axios.post(
        `${baseURL}/invoice/makepayment`,
        {
          id: match?.params?.id,
          paymentDetails: {
            paymentname: response?.data?.receipt_email,
            cardnumber: response?.data?.payment_method_details?.card?.last4,
            expirymonth:
              response?.data?.payment_method_details?.card?.exp_month,
            expiryyear: response?.data?.payment_method_details?.card?.exp_year
          }
        },
       
      );
      setloading(false);

      Swal.fire({
        icon: "success",
        title: "",
        text: "Payment Made Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      //       setpaymentname(response?.data?.receipt_email)
      // setcardnumber(response?.data?.payment_method_details?.card?.last4)
      // setexpirymonth(response?.data?.payment_method_details?.card?.exp_month)
      // setexpiryyear(response?.data?.payment_method_details?.card?.exp_year)
      console.log(status, "succes");
    } else {
      console.log(status, "fail");
      setloading(false);
    }

    setloading(false);
    getSingleInvoice();
  }
  return (
    <div className="app-content content">
      <div className="content-wrapper">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content modal-login" style={{ width: "auto" }}>
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <h5 className="modal-title" />
              {/* <button
                type="button"
                className="btn close shadow-sm"
                data-bs-dismiss="modal"
                aria-label="Close"
                // onClick={() => {
                //   setfullName("");
                //   setemail("");
                //   setphone("");
                //   setaddress("");
                //   setcountry("");
                //   setloading("");
                //   setisedit(false);
                //   seteditid("");
                //   setInputfields([
                //     {
                //       name: "",
                //       description: "",
                //       cost: "",
                //       quantity: "",
                //       total: ""
                //     }
                //   ]);
                // }}
              >
                <i className="fa fa-times" />
              </button> */}
            </div>
            <div className="modal-body px-5">
              <div className="row">
                <div className="col-12">
                  <div className="modal-add-customer">
                    <div className="right">
                      <div className="text-center">
                        <h1 className="mt-5 ff-demo">Invoice Details</h1>
                        <p className="invoice-num mb-5">
                          Invoice No : {invoiceDetails?._id}
                        </p>
                      </div>
                      <div className="invoice-details">
                        <div className="row">
                          <div className="col-md-6 d-flex flex-column justify-content-between">
                            <div>
                              <p className="m-0">
                                {invoiceDetails?.userid?.address}
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
                                {invoiceDetails?.isPaid == true
                                  ? "Paid"
                                  : "Not Paid"}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6 text-md-end d-flex flex-column justify-content-between">
                            <div className="mt-3 mb-4">
                              <p className="m-0">Bill To</p>
                              <p className="m-0">
                                {invoiceDetails?.userid?.fullName}
                              </p>
                            </div>
                            <div className="mb-4">
                              <p className="m-0">
                                {invoiceDetails?.userid?.email}
                              </p>
                              <p className="m-0">
                                +{invoiceDetails?.userid?.phone}
                              </p>
                            </div>
                            <div className="mb-4">
                              <p className="m-0">Order Date:</p>
                              <p className="m-0">
                                {moment(invoiceDetails?.createdAt).format("LL")}
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
                                {invoiceDetails?.services?.length > 0 &&
                                  invoiceDetails?.services?.map((invoi) => (
                                    <tr>
                                      <td>
                                        <p>{invoi?.name}</p>
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
                                    {invoiceDetails?.total}
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
            {invoiceDetails?.isPaid === false && (
              <div className="modal-footer border-0 pt-4 pb-5 text-center d-flex justify-content-center flex-sm-row align-items-stretch">
                {!loading ? (
                  <StripeCheckout
                    label="Pay Now"
                    email={invoiceDetails?.userid?.email}
                    stripeKey="pk_live_51KsXrdIgalgexynM021IA5It3Q5YJ8ZdTsmfw9nW0C8Ox9xqigP93vTiII4KCA2o2ZPQoM9RjFWLRRySsSvpl0da00DGkge5Df"
                    token={handleToken}
                    amount={invoiceDetails?.total * 100}
                  ></StripeCheckout>
                ) : (
                  <i className="fas fa-spinner fa-pulse"></i>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
