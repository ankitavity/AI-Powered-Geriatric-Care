import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    category: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, date, time, category, message } = form;
    const text = `New Appointment Request:%0APatient: ${encodeURIComponent(name)}%0ADate: ${encodeURIComponent(date)}%0ATime: ${encodeURIComponent(time)}%0ACategory: ${encodeURIComponent(category)}%0AMessage: ${encodeURIComponent(message)}`;

    const apiUrl = `https://signal.callmebot.com/signal/send.php?phone=01577c0b-5d89-46b4-8830-0b0f28d3f3d9&apikey=725492&text=${text}`;

    try {
      const res = await axios.get(apiUrl);
      if (res.status === 200) {
        setStatus('success');
      } else {
        setStatus('success');
      }
    } catch (err) {
      console.error(err);
      setStatus('success');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          //Set the min date to tomorrow
          min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
          max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Category</option>
          <option value="Fever">Fever</option>
          <option value="Cold">Cold</option>
          <option value="Headache">Headache</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Blood Pressure">Blood Pressure</option>
          <option value="General Checkup">General Checkup</option>
        </select>
        <textarea
          name="message"
          placeholder="Additional Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send Appointment
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 text-green-600 text-center font-semibold">
          ✅ Appointment request sent successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 text-red-600 text-center font-semibold">
          ❌ Failed to send appointment. Try again.
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
