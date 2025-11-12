export default function ToastContainer({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className="fixed right-6 bottom-6">
      <div className="bg-white p-3 rounded shadow border">
        <div className="flex items-start gap-3">
          <div className="font-semibold">{toast.title}</div>
          <div className="text-sm text-gray-600">{toast.message}</div>
          <button onClick={onClose} className="ml-2">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
