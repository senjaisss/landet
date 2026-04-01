type DialogType = "success" | "error" | "confirm";

type Props = {
  open: boolean;
  type?: DialogType;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmationDialog({
  open,
  type = "confirm",
  message,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-6 w-80 shadow-xl text-center">
        <p className="mb-6 text-black">{message}</p>

        <div className="flex justify-center gap-4">
          {type === "confirm" ? (
            <>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-red-200"
              >
                Ja
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-green-200"
              >
                Nej
              </button>
            </>
          ) : (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
