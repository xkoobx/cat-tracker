import catHappy from '../assets/cat-happy.jpg';
import dogHappy from '../assets/dog-happy.jpg';
import catHungry from '../assets/cat-hungry.jpg';
import dogHungry from '../assets/dog-hungry.png';
import on from '../assets/on.png';
import off from '../assets/off.png';


export default function CatCard({ cat, fed, onToggle, onDelete }) {
  return (
    <div className={`flex items-center gap-4 p-4 border rounded-lg shadow-md `}
         onClick={() => onToggle(cat.id, !fed)}>
      <img
        src={fed ? cat.dog ? dogHappy : catHappy : cat.dog ? dogHungry : catHungry}
        alt={cat.name}
        className="h-40"
      />
      <span className="text-6xl font-medium flex-1">{cat.name} {cat.dog}</span>
      <img
        src={fed ? on : off}
        className="h-20 object-cover"
      />
      <button
        onClick={() => onDelete(cat)}
        className="ml-3 text-red-500 text-6xl font-bold"
        title="Löschen"
      >
        &minus;
      </button>
    </div>
  );
}
