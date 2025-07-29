import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import FeedingPage from './pages/FeedingPage.jsx';
import {getFeedingTime, getTodayString} from './utils/date.js';

export default function App() {
  // Redirect root to today's morning view
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={`/${getTodayString()}/${getFeedingTime()}`} />} />
      <Route path="/:date/:time" element={<Wrapper />} />
      <Route path="*" element={<div className="p-4 text-red-600">404 - Seite nicht gefunden</div>} />
    </Routes>
  );
}

// Wrapper to re-render FeedingPage on param change
function Wrapper() {
  const { date, time } = useParams();
  const navigate = useNavigate();
  return (
    <FeedingPage
      date={date}
      timeOfDay={time}
      navigate={navigate}
    />
  );
}
