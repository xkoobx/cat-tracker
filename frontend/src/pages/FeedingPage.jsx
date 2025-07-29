import { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar.jsx';
import CatCard from '../components/CatCard.jsx';
import AddCatModal from '../components/AddCatModal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import {
  getCats,
  createCat,
  deleteCat,
  updateFeeding,
  resetFeeding,
} from '../services/api.js';
import reset from '../assets/reset.png';
import plus from '../assets/plus.png';


export default function FeedingPage({ date, timeOfDay, navigate }) {
  const [cats, setCats] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmState, setConfirmState] = useState({ open: false, cat: null });

  // fetch cats on mount
  useEffect(() => {
    getCats(date, timeOfDay).then(setCats);
  }, [date, timeOfDay]);

  const handleToggle = (catId, fed) => {
    updateFeeding(catId, date, timeOfDay, fed).then(() => {
      setCats(prev => prev.map(c =>
        c.id === catId
          ? { ...c, fed }
          : c
      ));
    });
  };

  const handleAddCat = cat => {
    createCat(cat).then(newCat => setCats(prev => [...prev, newCat]));
  };

  const handleReset = () => {
    resetFeeding(date, timeOfDay).then(() => {
      setCats(prev => prev.map(cat => ({ ...cat, fed: false })));
    });
  };

  const handleDelete = () => {
    const cat = confirmState.cat;
    if (!cat) return;
    deleteCat(cat.id).then(() => {
      setCats(prev => prev.filter(c => c.id !== cat.id));
      setConfirmState({ open: false, cat: null });
    });
  };

  return (
    <div className="p-4">
      <NavigationBar date={date} timeOfDay={timeOfDay} navigate={navigate}/>
      <div className="grid gap-4 mt-4">
        {cats.map(cat => (
          <CatCard
            key={cat.id}
            cat={cat}
            fed={cat.fed}
            onToggle={handleToggle}
            onDelete={() => setConfirmState({open: true, cat})}
          />
        ))}
      </div>
      <div class="grid-cols-2 grid gap-4">
        <div className="flex justify-start mt-4">
          <img
            src={reset}
            className="h-1/3 flex items-center justify-center"
            onClick={() => handleReset()}
          />
        </div>
        <div className="flex justify-end mt-4">
          <img
            className="h-1/3 flex items-center justify-center"
            onClick={() => setShowAddModal(true)}
            src={plus}
          />
        </div>
      </div>


      <AddCatModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCat}
      />

      <ConfirmDialog
        isOpen={confirmState.open}
        message={`Katze "${confirmState.cat?.name}" wirklich löschen?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmState({open: false, cat: null})}
      />
    </div>
  );
}
