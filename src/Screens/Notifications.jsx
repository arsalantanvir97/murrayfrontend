import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Components/Pagination";
import { baseURL } from "../utils/api";

const Notifications = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [totalcost, settotalcost] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [notificaitons, setnotificaitons] = useState("");

  useEffect(() => {
    handleGetNotifications();
  }, [page, perPage, from, to, status, searchString]);

  const handleGetNotifications = async () => {
    setloading(true);
    try {
      const res = await axios({
        url: `${baseURL}/notification/getAllNotificationlogs`,
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
      setnotificaitons(res.data?.notification);
    } catch (err) {
      console.log("err", err);
      setloading(false);
    }
  };
  return (
    <div>
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="notifications-page">
              <div className="page-title mb-4">
                <div className="row">
                  <div className="col-12">
                    <h2>Notifications</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card rounded-10 shadow-none">
                    <div className="card-body p-4 p-lg-5">
                      <div className=" row">
                        <div className="col-12">
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
                          ) : notificaitons?.docs?.length > 0 ? (
                            notificaitons?.docs?.map((not, index) => (
                              <div className="card">
                                <div className="media">
                                  <div className="media-body align-self-center">
                                    <p>{not?.body}</p>
                                    <div className="meta text-right mt-1">
                                      <time className="time-meta" dateTime>
                                        {moment(not?.createdAt).fromNow()}{" "}
                                      </time>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No Notification Found</p>
                          )}
                        </div>
                      </div>
                      {notificaitons?.docs?.length > 0 && (
                        <Pagination
                          totalDocs={notificaitons?.totalDocs}
                          totalPages={notificaitons?.totalPages}
                          currentPage={notificaitons?.page}
                          setPage={setPage}
                          hasNextPage={notificaitons?.hasNextPage}
                          hasPrevPage={notificaitons?.hasPrevPage}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
