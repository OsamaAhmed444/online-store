import { ChevronRight } from "lucide-react";

const OrderCard = ({ order, onClick }) => {
  const orderId = order?._id || order?.id || order?.orderId || "59623A3F";

  const status = order?.status || order?.orderStatus || "Confirmed";

  const date = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Sep 12, 2026";

  const items = order?.items || order?.products || [];

  const total =
    order?.totalPrice ?? order?.totalAmount ?? order?.total ?? order?.grandTotal ?? 0;

  const firstItem = items?.[0];

  const productName =
    firstItem?.name ||
    firstItem?.product?.name ||
    firstItem?.productName ||
    "Product";

  const description =
    firstItem?.product?.description || firstItem?.description || "";

  const getStatusClass = () => {
    const value = status.toLowerCase();

    if (value.includes("cancel")) {
      return "bg-red-500/20 text-red-400 border-red-500/20";
    }

    if (value.includes("return")) {
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
    }

    return "bg-green-500/20 text-green-400 border-green-500/20";
  };

  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-border bg-surface p-5 text-left transition duration-300 hover:border-primary/50 hover:bg-surface-hover"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-bold text-foreground">
              #{String(orderId).slice(-8).toUpperCase()}
            </h3>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass()}`}
            >
              {status}
            </span>
          </div>

          <div className="mt-2 text-sm text-muted-foreground">
            {date}
            <span className="mx-2">•</span>
            {items.length || 0} item(s)
          </div>

          <div className="mt-2">
            <p className="font-semibold text-foreground">{productName}</p>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 md:min-w-[240px] md:justify-end">
          <div className="md:border-l md:border-border md:pl-8">
            <p className="text-sm text-muted-foreground">Total Amount</p>

            <p className="text-2xl font-bold text-primary">
              EGP {Number(total).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center justify-center w-12 h-12 text-muted-foreground transition border rounded-xl border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ChevronRight size={23} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default OrderCard;
