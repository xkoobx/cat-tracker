import { formatDisplayDate, getNextFeeding, getPrevFeeding } from '../utils/date.js';
import { getTodayString, getFeedingTime} from '../utils/date.js';

export default function NavigationBar({ date, timeOfDay, navigate }) {
  const handleNav = (direction) => {
    const [nextDate, nextTime] = direction === 'left'
      ? getPrevFeeding(date, timeOfDay)
      : getNextFeeding(date, timeOfDay);
    navigate(`/${nextDate}/${nextTime}`);
  };

  const displayTime = timeOfDay === 'MORNING' ? 'Morgens' : 'Abends';

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <button className="text-8xl" onClick={() => handleNav('left')}>&larr;</button>
      <div className="text-center">
        <div className="text-8xl font-semibold">{formatDisplayDate(date)}</div>
        <div className="text-6xl text-gray-600">{displayTime}</div>
        <button className="text-6xl text-blue-600" onClick={() => navigate(`/${getTodayString()}/${getFeedingTime()}`)}>Heute</button>
      </div>
      <button className="text-8xl" onClick={() => handleNav('right')}>&rarr;</button>
    </div>
  );
}
