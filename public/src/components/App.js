import React from 'react';
import Calendar from './components/Calendar';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Calendar</h1>
      </header>
      <main>
        <Calendar />
      </main>
    </div>
  );
}

export default App;
