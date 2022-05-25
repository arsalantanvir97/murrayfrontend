import React from "react";

const Invoice = () => {
  return (
    <div className="app-content content">
      <div className="content-wrapper">
        <section id="invoice-detail" className="inquiry-page">
          <div className="content-body bg-white rounded-20 shadow-none p-4 p-lg-5">
            <div className="page-title mb-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h2>Invoices</h2>
                </div>
                <div className="col-md-6 text-md-end">
                  {/* <button
                    type="button"
                    className="btn add-btn orange-btn"
                    data-bs-toggle="modal"
                    data-bs-target=".generate-invoice"
                  >
                    Add Invoice
                  </button> */}
                </div>
              </div>
            </div>
            <div className="dataTables_wrapper">
              <div className="user-listing-top">
                <div className="row align-items-end d-flex mb-3">
                  <div className="col-12 col-xl-5 col-xxl-4 align-items-start">
                    <div className="dataTables_filter d-flex justify-content-start flex-shrink-1 mt-3">
                      <label
                        htmlFor
                        className="d-md-inline-block me-2 me-lg-3 my-0 align-self-center flex-shrink-0"
                      >
                        Search
                      </label>
                      <div className="filter-wrap d-md-flex d-block flex-xl-column align-items-start align-items-xl-end justify-content-end">
                        <div className="select-wrapper d-block w-auto mb-0 mb-md-0 me-0 me-md-0 me-xl-0">
                          <select name className="form-control shadow-sm" id>
                            <option value>Status</option>
                            <option value>Active</option>
                            <option value>Expire</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-5 col-xxl-4 align-items-start">
                    <div className="dataTables_filter d-flex justify-content-start flex-shrink-1 mt-3">
                      <label
                        htmlFor
                        className="d-md-inline-block me-2 me-lg-3 my-0 align-self-center flex-shrink-0"
                      >
                        Filter by
                      </label>
                      <div className="d-sm-flex d-block flex-grow-1">
                        <div className="input-wrap me-0 me-sm-2 mb-2 mb-sm-0">
                          <input
                            type="date"
                            placeholder="From"
                            className="form-control bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 col-xxl-4 align-items-start">
                    <div className="dataTables_filter d-flex justify-content-start flex-shrink-1 mt-3">
                      <div className="search-wrap flex-grow-1">
                        <input
                          type="search"
                          className="form-control shadow-sm"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-tabble table-responsive mx-n2">
                <table className="table dataTable px-2">
                  <thead>
                    <tr>
                      <th className="sorting">S.No</th>
                      <th className="sorting">Customer Name</th>
                      <th className="sorting">Service Name</th>
                      <th className="sorting">Generated On</th>
                      <th className="sorting">Total Cost</th>
                      <th className="sorting">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>ADCF</td>
                      <td>Web Service</td>
                      <td>
                        03<span>/</span>02<span>/</span>2020
                      </td>
                      <td>
                        <span>$</span>123
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
                              data-bs-target=".complete-invoice"
                            >
                              <i className="fa fa-eye" />
                              View
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>02</td>
                      <td>ADCF</td>
                      <td>Web Service</td>
                      <td>
                        03<span>/</span>02<span>/</span>2020
                      </td>
                      <td>
                        <span>$</span>123
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
                              data-bs-target=".complete-invoice"
                            >
                              <i className="fa fa-eye" />
                              View
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>03</td>
                      <td>ADCF</td>
                      <td>Web Service</td>
                      <td>
                        03<span>/</span>02<span>/</span>2020
                      </td>
                      <td>
                        <span>$</span>123
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
                              data-bs-target=".complete-invoice"
                            >
                              <i className="fa fa-eye" />
                              View
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>04</td>
                      <td>ADCF</td>
                      <td>Web Service</td>
                      <td>
                        03<span>/</span>02<span>/</span>2020
                      </td>
                      <td>
                        <span>$</span>123
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
                              data-bs-target=".complete-invoice"
                            >
                              <i className="fa fa-eye" />
                              View
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>05</td>
                      <td>ADCF</td>
                      <td>Web Service</td>
                      <td>
                        03<span>/</span>02<span>/</span>2020
                      </td>
                      <td>
                        <span>$</span>123
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
                              data-bs-target=".complete-invoice"
                            >
                              <i className="fa fa-eye" />
                              View
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  <div className="row mt-3">
                    <div className="col-sm-12 col-xxl-12 d-flex justify-content-center justify-content-xxl-center">
                      <div className="dataTables_paginate d-flex align-items-center">
                        <a href="#" className="page-link previous">
                          <i className="fas fa-chevron-circle-left" />
                        </a>
                        <ul className="pagination">
                          {/* <li class="paginate_button page-item previous disabled"></li> */}
                          <li className="paginate_button page-item active">
                            <a href="#" className="page-link">
                              <span>1</span>
                            </a>
                          </li>
                          <li className="paginate_button page-item">
                            <a href="#" className="page-link">
                              <span>2</span>
                            </a>
                          </li>
                          <li className="paginate_button page-item">
                            <a href="#" className="page-link">
                              <span>3</span>
                            </a>
                          </li>
                          <li className="paginate_button page-item">
                            <a href="#" className="page-link">
                              <span>4</span>
                            </a>
                          </li>
                          <li className="paginate_button page-item">
                            <a href="#" className="page-link">
                              <span>5</span>
                            </a>
                          </li>
                          <li className="paginate_button page-item">
                            <a href="#" className="page-link">
                              <span>6</span>
                            </a>
                          </li>
                          <li className="paginate_button page-item">
                            <a href="#" className="page-link">
                              <span>7</span>
                            </a>
                          </li>
                          <li className="paginate_button page-item">
                            <a href="#" className="page-link">
                              <span>8</span>
                            </a>
                          </li>
                          {/* <li class="paginate_button page-item next disabled" i=""></li> */}
                        </ul>
                        <a href="#" className="page-link next">
                          <i className="fas fa-chevron-circle-right" />
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-12 col-xxl-12 align-self-center text-center text-xxl-center">
                      <div className="dataTables_info pl-2">
                        Showing 10 of 52 Enteries
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

export default Invoice;
