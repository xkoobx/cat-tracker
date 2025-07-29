export default function ConfirmDialog({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-fit text-5xl">
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2" onClick={onCancel}>Abbrechen</button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}
