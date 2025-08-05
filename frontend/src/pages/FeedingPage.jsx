
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {getNextFeeding, getPrevFeeding } from '../utils/date.js';
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
  const [direction, setDirection] = useState(0);

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

  // 🧠 Swipe logic: navigate to previous or next day
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setDirection(1);
      const [nextDate, nextTime] = getNextFeeding(date, timeOfDay);
      navigate(`/${nextDate}/${nextTime}`);
    },
    onSwipedRight: () => {
      setDirection(-1);
      const [nextDate, nextTime] = getNextFeeding(date, timeOfDay);
      navigate(`/${nextDate}/${nextTime}`);
    },
    trackTouch: true,
    trackMouse: true
  });

  const variants = {
    initial: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={`${date}-${timeOfDay}`}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.1 }}
        {...swipeHandlers}
        className="p-4"
      >
        <div {...swipeHandlers} className="p-4">
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
      <div className="grid-cols-2 grid gap-4">
        <div className="flex justify-center mt-10">
          <img
            src={reset}
            className="h-1/5 flex items-center justify-center"
            onClick={() => handleReset()}
          />
        </div>
        <div className="flex justify-center mt-10">
          <img
            className="h-1/5 flex items-center justify-center"
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
      </motion.div>
    </AnimatePresence>
  );
}
