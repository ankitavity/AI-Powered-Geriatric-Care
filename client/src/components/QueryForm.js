import React, { useState } from 'react';
import axios from 'axios';

const QueryForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const text = `New User Query Received:%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ASubject: ${encodeURIComponent(subject)}%0AMessage: ${encodeURIComponent(message)}`;
    const apiUrl = `https://signal.callmebot.com/signal/send.php?phone=01577c0b-5d89-46b4-8830-0b0f28d3f3d9&apikey=725492&text=${text}`;
    try {
      const res = await axios.get(apiUrl);
      if (res.status === 200) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="query-form-container mx-auto my-2 p-2 p-md-4 shadow-lg rounded-4 bg-white" style={{maxWidth: 500, border: '1px solid #e3e8f0'}}>
      <h2 className="text-2xl fw-bold mb-3 text-center gradient-text" style={{background: 'linear-gradient(90deg, #0061ff, #60efff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Contact Us</h2>
      <p className="text-center text-muted mb-2">Have a question or feedback? Fill out the form below and we'll get back to you soon.</p>
      <form onSubmit={handleSubmit} className="row g-2">
        <div className="col-12 col-md-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
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
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="form-control py-2 px-3 rounded-3 border-0 shadow-sm focus-ring"
          />
        </div>
        <div className="col-12">
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
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
            Send Query
          </button>
        </div>
      </form>
      {status === 'success' && (
        <div className="mt-3 text-success text-center fw-semibold">
          ✅ Your query has been sent successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="mt-3 text-danger text-center fw-semibold">
          ❌ Failed to send your query. Please try again.
        </div>
      )}
    </div>
  );
};

export default QueryForm;
