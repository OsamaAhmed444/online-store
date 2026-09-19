import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  variant = "default",
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!isOpen) {
    return null;
  }

  const isConfirmation = variant === "confirmation";

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        px-4
      "
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-md
          rounded-xl
          border border-white/10
          bg-[#111]
          p-6
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-4 top-4
            text-gray-400
            transition
            hover:text-white
          "
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {title && (
          <h2 className="mb-4 pr-8 text-xl font-semibold text-white">
            {title}
          </h2>
        )}

        <div className="text-sm text-gray-400">
          {children}
        </div>

        {isConfirmation && (
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                border border-white/10
                px-4 py-2
                text-sm text-gray-300
                transition
                hover:bg-white/5
              "
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="
                rounded-lg
                bg-orange-500
                px-4 py-2
                text-sm font-medium text-white
                transition
                hover:bg-orange-600
              "
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}