export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded p-4 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
