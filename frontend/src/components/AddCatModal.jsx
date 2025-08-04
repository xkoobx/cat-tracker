import { useState } from 'react';

export default function AddCatModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDog, setIsDog] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name, description, isDog });
    setName('');
    setDescription('');
    setIsDog(true)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-fit text-5xl">
        <h2 className="text-6xl font-semibold mb-4">Neue Katze hinzufügen</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Beschreibung"
            className="border p-2 rounded"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder={isDog ? 'Hund' : 'Katze'}
            readOnly
            className="border p-2 rounded"
            value={isDog ? 'Hund' : 'Katze'}
            onClick={() => setIsDog(!isDog)}
            onChange={e => setIsDog(e.target.value === 'Katze')}
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2" onClick={onClose}>Abbrechen</button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => { handleSave(); onClose(); }}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
