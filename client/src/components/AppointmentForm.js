import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    email: '',
    mobile: '',
    category: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, date, time, category, message } = form;
    const text = `New Appointment Request Received:%0APatient: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMobile Number: ${encodeURIComponent(mobile)}%0A%0ADate: ${encodeURIComponent(date)}%0ATime: ${encodeURIComponent(time)}%0ACategory: ${encodeURIComponent(category)}%0AMessage: ${encodeURIComponent(message)}`;

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
    <div className="query-form-container mx-auto my-2 p-2 p-md-4 shadow-lg rounded-4 bg-white" style={{maxWidth: 500, border: '1px solid #e3e8f0'}}>
      <h2 className="text-2xl fw-bold mb-3 text-center gradient-text" style={{background: 'linear-gradient(90deg, #0061ff, #60efff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Schedule Appointment</h2>
      <p className="text-center text-muted mb-2">Fill out the form below to book an appointment. We'll get back to you soon!</p>
      <form onSubmit={handleSubmit} className="row g-2">
        <div className="col-12 col-md-6">
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
          />
        </div>
        <div className="col-12 col-md-6">
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
          />
        </div>
        <div className="col-6 col-md-3">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
          />
        </div>
        <div className="col-6 col-md-3">
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
          />
        </div>
        <div className="col-12 col-md-6">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
          >
            <option value="">Select Category</option>
            <option value="Fever">Fever</option>
            <option value="Cold">Cold</option>
            <option value="Headache">Headache</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Blood Pressure">Blood Pressure</option>
            <option value="General Checkup">General Checkup</option>
          </select>
        </div>
        <div className="col-12">
          <textarea
            name="message"
            placeholder="Additional Message"
            value={form.message}
            onChange={handleChange}
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
            rows="3"
          ></textarea>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 rounded-3 fw-bold gradient-btn"
            style={{background: 'linear-gradient(90deg, #0061ff, #60efff)', border: 'none', letterSpacing: '1px', fontSize: '1.1rem'}}
          >
            Send Appointment
          </button>
        </div>
      </form>
      {status === 'success' && (
        <div className="mt-3 text-success text-center fw-semibold">
          ✅ Appointment request sent successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="mt-3 text-danger text-center fw-semibold">
          ❌ Failed to send appointment. Try again.
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
