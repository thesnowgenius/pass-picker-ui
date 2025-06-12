import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [numDays, setNumDays] = useState(10);
  const [weekends, setWeekends] = useState(true);
  const [blackout, setBlackout] = useState(false);
  const [category, setCategory] = useState("None");
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const body = {
      location: "West Newton, MA",
      weekend: weekends,
      total_days: parseInt(numDays),
      people: [{ age: 39, category: category }]
    };

    const response = await axios.post("https://pass-picker.onrender.com/score_pass", body);
    setResults(response.data);
  };

  return (
    <div className="p-6 font-sans text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Snow Genius Pass Picker</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4 border p-4 rounded">
          <label>Number of Days:</label>
          <input type="number" value={numDays} onChange={(e) => setNumDays(e.target.value)} className="w-full p-2 border rounded" />

          <label>Weekends:</label>
          <select value={weekends} onChange={(e) => setWeekends(e.target.value === 'true')} className="w-full p-2 border rounded">
            <option value="true">Required</option>
            <option value="false">Not Needed</option>
          </select>

          <label>Blackout Days Allowed:</label>
          <select value={blackout} onChange={(e) => setBlackout(e.target.value === 'true')} className="w-full p-2 border rounded">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>

          <label>Special Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
            <option>None</option>
            <option>Military</option>
            <option>Student</option>
            <option>Nurse</option>
          </select>

          <button onClick={fetchResults} className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded">Get My Results</button>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xl font-semibold mb-2">Your Pass</h2>
          {results.length === 0 ? (
            <p>No results yet.</p>
          ) : (
            results.map((pass, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>{pass.name}</span>
                  <span>{Math.round(pass.score)}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded">
                  <div className="h-3 rounded bg-gradient-to-r from-orange-400 via-yellow-300 to-green-500" style={{ width: `${Math.round(pass.score)}%` }}></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
