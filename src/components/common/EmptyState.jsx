
export default function EmptyState({
  title = "No data found",
  description,
  message,
  action,
}) {
  const text = description || message || "There is nothing to display here.";

  return (
    <div
      className="
        flex min-h-60
        flex-col items-center justify-center
        rounded-xl
        border border-border
        bg-surface
        px-6 py-10
        text-center
      "
    >
      <h2 className="text-lg font-semibold text-foreground">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {text}
      </p>

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}