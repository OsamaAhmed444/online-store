
export default function EmptyState({
  title = "No data found",
  description = "There is nothing to display here.",
  action,
}) {
  return (
    <div
      className="
        flex min-h-60
        flex-col items-center justify-center
        rounded-xl
        border border-white/10
        bg-white/[0.02]
        px-6 py-10
        text-center
      "
    >
      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}