import { useEffect, useState } from "react";
import { PackageOpen, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getMyOrders } from "../api/ordersApi";
import OrderCard from "../components/profile/OrderCard";

const MyOrdersPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyOrders();

      const data =
        response?.data?.data || response?.data?.orders || response?.data;

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to get orders:", error);
      setError("Unable to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#070809] text-white">
      <main>
        <section className="relative overflow-hidden border-b border-orange-500/30">
          <div className="absolute inset-0 " />

          <div className="relative px-5 py-20 mx-auto max-w-7xl md:px-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              My Orders
            </p>

            <h1 className="text-5xl font-black md:text-6xl">
              My <span className="text-orange-500">Orders</span>
            </h1>

            <p className="max-w-xl mt-4 text-lg text-gray-400">
              Track your purchases and stay updated.
              <br />
              Quality products. Faster delivery. A brighter tomorrow.
            </p>
          </div>
        </section>

        <section className="max-w-6xl px-5 py-12 mx-auto md:px-10">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-2xl font-bold">Your Orders</h2>

              <p className="mt-1 text-sm text-gray-500">
                {orders.length} order(s)
              </p>
            </div>

            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 transition border rounded-xl border-white/10 bg-white/5 hover:border-orange-500 hover:text-orange-500"
            >
              <RefreshCw size={17} />
              Refresh
            </button>
          </div>

          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-36 animate-pulse rounded-2xl border border-white/10 bg-[#111214]"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="p-8 text-center border rounded-2xl border-red-500/20 bg-red-500/10">
              <p className="text-red-400">{error}</p>

              <button
                onClick={fetchOrders}
                className="px-5 py-2 mt-4 font-semibold text-black bg-orange-500 rounded-xl"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#111214] px-5 py-20 text-center">
              <PackageOpen size={60} className="mx-auto text-orange-500" />

              <h2 className="mt-5 text-2xl font-bold">No Orders Yet</h2>

              <p className="mt-2 text-gray-500">
                Your orders will appear here after you make a purchase.
              </p>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => {
                const id = order?._id || order?.id || order?.orderId;

                return (
                  <OrderCard
                    key={id}
                    order={order}
                    onClick={() => navigate(`/orders/${id}`)}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyOrdersPage;
