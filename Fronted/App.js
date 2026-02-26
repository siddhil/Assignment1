frontend/src/App.js
Copy code
Javascript
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/jobs");
    setJobs(res.data);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/jobs", form);
    fetchJobs();
  };

  return (
    <div className="container">
      <h1>💼 Job Hunt Portal</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" onChange={handleChange} required />
        <input name="company" placeholder="Company" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="salary" placeholder="Salary" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <button type="submit">Post Job</button>
      </form>

      <h2>Available Jobs</h2>

      {jobs.map((job, index) => (
        <div key={index} className="job-card">
          <h3>{job.title}</h3>
          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Salary:</b> {job.salary}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
