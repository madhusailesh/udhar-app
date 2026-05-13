import { useEffect, useState } from "react";
import socket from "../socket/socket";
import { getCustomerLedgers } from "../services/ledgerService";
import {
  getCustomerPendingRequests,
  approvePendingRequest,
  rejectPendingRequest,
} from "../services/pendingRequestService";
import Navbar from "../components/Navbar";

function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [ledgers, setLedgers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  
  // TOAST NOTIFICATION STATE
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // CUSTOM TOAST FUNCTION
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    // 3 seconds ke baad toast automatically hide ho jayega
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // FETCH LEDGERS
  const fetchLedgers = async () => {
    try {
      const data = await getCustomerLedgers();
      setLedgers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH PENDING REQUESTS
  const fetchPendingRequests = async () => {
    try {
      const data = await getCustomerPendingRequests();
      setPendingRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user._id) {
      socket.emit("registerUser", user._id);
    }

    fetchLedgers();
    fetchPendingRequests();

    // REALTIME REQUEST
    socket.on("new_pending_request", () => {
      fetchPendingRequests();
    });

    return () => {
      socket.off("new_pending_request");
    };
  }, []);

  // APPROVE REQUEST
  const handleApprove = async (id) => {
    try {
      await approvePendingRequest(id);
      showToast("Request Approved Successfully!", "success"); // Animated Alert
      fetchPendingRequests();
      fetchLedgers();
    } catch (error) {
      console.log(error);
      showToast("Failed to approve request", "error"); // Animated Alert
    }
  };

  // REJECT REQUEST
  const handleReject = async (id) => {
    try {
      await rejectPendingRequest(id);
      showToast("Request Rejected", "error"); // Animated Alert
      fetchPendingRequests();
    } catch (error) {
      console.log(error);
      showToast("Failed to reject request", "error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen w-full bg-gray-50 p-4 transition-colors duration-300 dark:bg-gray-950 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
              Customer Dashboard
            </h1>
            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-300">
              Total Ledgers:{" "}
              <span className="text-blue-500">{ledgers.length}</span>
            </div>
          </div>

          {/* PENDING REQUESTS */}
          {pendingRequests.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                <span>⏳</span> Pending Approval Requests
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {pendingRequests.map((request) => (
                  <div
                    key={request._id}
                    className="group relative overflow-hidden rounded-2xl border border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-md transition-all hover:shadow-lg dark:border-yellow-800 dark:from-yellow-900/20 dark:to-orange-900/20"
                  >
                    <h2 className="mb-1 text-xl font-bold text-gray-800 dark:text-white">
                      {request.shopkeeper?.name}
                    </h2>
                    <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                      {request.shopkeeper?.email}
                    </p>
                    
                    <div className="mb-4 rounded-xl bg-white/60 p-3 dark:bg-black/20">
                      <p className="text-2xl font-black text-red-500">
                        ₹{request.amount?.toLocaleString("en-IN")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Note: {request.note || "No details provided"}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2.5 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-green-500/30 active:scale-[0.98]"
                      >
                        ✅ Approve
                      </button>

                      <button
                        onClick={() => handleReject(request._id)}
                        className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2.5 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-red-500/30 active:scale-[0.98]"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {ledgers.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-white/50 py-20 dark:border-gray-700 dark:bg-gray-800/50">
              <span className="mb-4 text-6xl drop-shadow-md">📭</span>
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                No Ledgers Found
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Aapka koi udhar pending nahi hai!
              </p>
            </div>
          )}

          {/* LEDGERS GRID */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {ledgers.map((ledger) => (
              <div
                key={ledger._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/80"
              >
                {/* SHOPKEEPER */}
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {ledger.shopkeeper?.name || "Unknown Shop"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {ledger.shopkeeper?.email}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {ledger.shopkeeper?.name?.charAt(0).toUpperCase() || "S"}
                  </div>
                </div>

                {/* BALANCE */}
                <div className="mb-6 rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-800/50">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Pending Balance
                  </p>
                  <p className="text-3xl font-black tracking-tight text-red-500 dark:text-red-400">
                    ₹{ledger.totalBalance?.toLocaleString("en-IN") || 0}
                  </p>
                </div>

                {/* ENTRIES */}
                <div className="flex-1">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Approved Transactions
                  </h3>

                  <div className="max-h-60 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {ledger.entries?.length > 0 ? (
                      ledger.entries.map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-xl border border-gray-50 bg-white p-3 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800 dark:hover:bg-gray-700/80"
                        >
                          <div className="flex flex-col">
                            <span className="text-base font-bold text-gray-800 dark:text-gray-200">
                              ₹{entry.amount?.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                              {entry.note || "No details"}
                            </span>
                            <span className="mt-1 text-[10px] text-gray-400">
                              {new Date(entry.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          <span
                            className={`flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                              entry.type === "credit"
                                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            }`}
                          >
                            {entry.type === "credit" ? "↓ Udhar" : "↑ Jama"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-gray-400">No transactions yet.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CUSTOM ANIMATED TOAST NOTIFICATION */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex max-w-sm transform items-center gap-4 rounded-2xl p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-in-out sm:bottom-10 sm:right-10 ${
          toast.show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
        } ${
          toast.type === "success"
            ? "border border-green-200 bg-green-50/90 text-green-800 dark:border-green-800 dark:bg-green-900/80 dark:text-green-100"
            : "border border-red-200 bg-red-50/90 text-red-800 dark:border-red-800 dark:bg-red-900/80 dark:text-red-100"
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/50 text-2xl shadow-inner dark:bg-black/20">
          {toast.type === "success" ? "🎉" : "⚠️"}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold">{toast.type === "success" ? "Success!" : "Notice"}</p>
          <p className="text-sm font-medium opacity-90">{toast.message}</p>
        </div>
      </div>
    </>
  );
}

export default CustomerDashboard;