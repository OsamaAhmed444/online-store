import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Truck,
  Package,
  Clock3,
  CheckCircle2,
  MapPin,
  CreditCard,
  XCircle,
  Loader2,
} from "lucide-react";

import { getMyOrder, cancelMyOrder } from "../api/ordersApi";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getMyOrder(id);

        const data =
          response?.data?.data || response?.data?.order || response?.data;

        setOrder(data);
      } catch (error) {
        console.error("Failed to get order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    try {
      setCancelLoading(true);

      const response = await cancelMyOrder(id);

      const updatedOrder =
        response?.data?.data || response?.data?.order || response?.data;

      setOrder((prev) => ({
        ...prev,
        ...updatedOrder,
        status: "Cancelled",
      }));
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070809] text-orange-500">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#070809] px-5 py-20 text-center text-white">
        <h2 className="text-3xl font-bold">Order Not Found</h2>

        <button
          onClick={() => navigate("/orders")}
          className="px-6 py-3 mt-6 font-bold text-black bg-orange-500 rounded-xl"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const status = order?.status || "Confirmed";

  const items = order?.items || order?.products || [];

  const total = order?.totalAmount ?? order?.total ?? order?.grandTotal ?? 0;

  const address = order?.shippingAddress || order?.address || {};

  const paymentMethod =
    order?.paymentMethod || order?.payment?.method || "Cash";

  const isCancelled = status.toLowerCase().includes("cancel");

  return (
    <div className="min-h-screen bg-[#070809] text-white">
      <main className="px-5 py-10 mx-auto max-w-7xl md:px-10">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 mb-8 text-orange-500 transition hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="flex flex-col justify-between gap-5 mb-8 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              Order Details
            </p>

            <h1 className="text-4xl font-black md:text-5xl">
              Order <span className="text-orange-500">Details</span>
            </h1>

            <p className="mt-3 text-gray-400">
              Order #{String(id).slice(-8).toUpperCase()}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-5 py-2 text-sm font-bold ${
              isCancelled
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {status}
          </span>
        </div>

        <section className="mb-5 rounded-2xl border border-white/10 bg-[#111214] p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-12 h-12 text-orange-500 rounded-xl bg-orange-500/10">
              <Truck size={25} />
            </div>

            <div>
              <h2 className="text-xl font-bold">Order Progress</h2>

              <p className="text-sm text-gray-500">
                Track your order in real-time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            <ProgressStep icon={<Clock3 size={20} />} title="Pending" active />

            <ProgressStep
              icon={<CheckCircle2 size={20} />}
              title="Confirmed"
              active={!isCancelled}
            />

            <ProgressStep
              icon={<Clock3 size={20} />}
              title="Processing"
              active={false}
            />

            <ProgressStep
              icon={<Package size={20} />}
              title="Shipped"
              active={false}
            />

            <ProgressStep
              icon={<CheckCircle2 size={20} />}
              title="Delivered"
              active={false}
            />
          </div>
        </section>

        <section className="mb-5 rounded-2xl border border-white/10 bg-[#111214] p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 text-orange-500 rounded-xl bg-orange-500/10">
              <Package size={25} />
            </div>

            <div>
              <h2 className="text-xl font-bold">Items</h2>

              <p className="text-sm text-gray-500">Product(s) in this order.</p>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => {
              const product = item?.product || item;

              const name = product?.name || item?.productName || "Item";

              const quantity = item?.quantity || item?.qty || 1;

              const price = item?.price || product?.price || 0;

              return (
                <div
                  key={item?._id || index}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#17181c] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#22242a] text-gray-300">
                      <Package size={28} />
                    </div>

                    <div>
                      <h3 className="font-semibold">{name}</h3>

                      <p className="text-sm text-gray-500">
                        Qty: {quantity} × EGP {Number(price).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-orange-500">
                    EGP {(Number(price) * quantity).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-[#111214] p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center justify-center text-orange-500 h-11 w-11 rounded-xl bg-orange-500/10">
                <MapPin size={23} />
              </div>

              <div>
                <h2 className="font-bold">Shipping Address</h2>

                <p className="text-sm text-gray-500">
                  Where we'll deliver your order.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#17181c] p-5">
              <p className="font-bold">
                {address?.name || address?.fullName || "Customer"}
              </p>

              <p className="mt-1 text-gray-400">
                {address?.street || address?.address || "Street address"}
              </p>

              <p className="text-gray-400">
                {address?.city || "Cairo"}, {address?.country || "Egypt"}
              </p>

              <p className="text-gray-400">{address?.phone || "0000000000"}</p>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#111214] p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center justify-center text-orange-500 h-11 w-11 rounded-xl bg-orange-500/10">
                <CreditCard size={23} />
              </div>

              <div>
                <h2 className="font-bold">Payment</h2>

                <p className="text-sm text-gray-500">
                  Payment method and summary.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#17181c] p-4">
              {paymentMethod}
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-500">Total</p>

              <p className="text-3xl font-black text-orange-500">
                EGP {Number(total).toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Placed on{" "}
                {order?.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "Sep 12, 2026"}
              </p>
            </div>
          </section>
        </div>

        {!isCancelled && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleCancelOrder}
              disabled={cancelLoading}
              className="flex items-center gap-2 px-8 py-3 font-bold transition bg-red-600 rounded-xl hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cancelLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <XCircle size={20} />
              )}

              {cancelLoading ? "Cancelling..." : "Cancel Order"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

const ProgressStep = ({ icon, title, active }) => {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full border ${
          active
            ? "border-orange-500 bg-orange-500 text-black"
            : "border-gray-700 bg-[#17181c] text-gray-500"
        }`}
      >
        {icon}
      </div>

      <p
        className={`mt-3 text-xs font-semibold md:text-sm ${
          active ? "text-orange-500" : "text-gray-500"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

export default OrderDetailPage;
