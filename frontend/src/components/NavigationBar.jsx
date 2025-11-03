import { formatDisplayDate, getNextFeeding, getPrevFeeding } from '../utils/date.js';
import { getTodayString, getFeedingTime} from '../utils/date.js';
import morningImage from '../assets/morning.jpg';
import eveningImage from '../assets/evening.jpg';

export default function NavigationBar({ date, timeOfDay, navigate }) {
  const handleNav = (direction) => {
    const [nextDate, nextTime] = direction === 'left'
      ? getPrevFeeding(date, timeOfDay)
      : getNextFeeding(date, timeOfDay);
    navigate(`/${nextDate}/${nextTime}`);
  };

  const displayTime = timeOfDay === 'MORNING' ? 'Morgens' : 'Abends';
  const isMorning = timeOfDay === 'MORNING';

  return (
    <div className="relative p-4 flex justify-between items-center">
      <div className="absolute inset-0 bg-center bg-cover" style={{
        backgroundImage: `url(${ isMorning ? morningImage : eveningImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}></div>
      {/* Fade-Overlay an den Rändern */}
      <div className={`absolute inset-0 pointer-events-none bg-gradient-to-r 
        ${isMorning ? 'from-white/70' : 'from-white/40'} 
        via-transparent 
        ${isMorning ? 'to-white/70' : 'to-white/40'}
     `}></div>

      <div className={`flex relative z-10 items-center justify-between px-4 py-2 ${
        isMorning ? 'text-black' : 'text-white'
      }`}>
        <button className="text-8xl" onClick={() => handleNav('left')}>&larr;</button>
        <div className="text-center" onClick={() => navigate(`/${getTodayString()}/${getFeedingTime()}`)}>
          <div className="text-8xl font-semibold">{formatDisplayDate(date)}</div>
          <div className="text-6xl text-gray-400">{displayTime}</div>
        </div>
        <button className="text-8xl" onClick={() => handleNav('right')}>&rarr;</button>
      </div>
    </div>
  );
}
