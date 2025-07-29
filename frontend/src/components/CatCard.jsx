import catHappy from '../assets/cat-happy.jpg';
import catHungry from '../assets/cat-hungry.jpg';
import on from '../assets/on.png';
import off from '../assets/off.png';
import toggleOn from '../assets/toggle-on.png';
import toggleOff from '../assets/toggle-off.png';

export default function CatCard({ cat, fed, onToggle, onDelete }) {
  return (
    <div className={`flex items-center gap-4 p-4 border rounded-lg shadow-md `}
         onClick={() => onToggle(cat.id, !fed)}>
      <img
        src={fed ? catHappy : catHungry}
        alt={cat.name}
        className="w-17 h-16"
      />
      <span className="text-lg font-medium flex-1">{cat.name}</span>
      <img
        src={fed ? on : off}
        className="w-20 h-13 object-cover"
      />
      <button
        onClick={() => onDelete(cat)}
        className="ml-3 text-red-500 text-xl"
        title="Löschen"
      >
        &minus;
      </button>
    </div>
  );
}
