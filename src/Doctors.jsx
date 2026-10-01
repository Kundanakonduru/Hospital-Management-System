import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./index.css";

function Doctors() {
  const [Doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [deBouncingSearch, setDebouncingSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
    gender: "",
    age: "",
    specialization: "",
  });

  const [editId, setEditId] = useState(null);

  // Handle form input changes
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Add / Update doctor
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editId) {
        // Update existing doctor
        const res = await axios.put(
          `https://doc-back.onrender.com/Doctors/${editId}`,
          formData
        );

        console.log(res.data);
      } else {
        // Add new doctor
        const res = await axios.post(
          "https://doc-back.onrender.com/Doctors",
          formData
        );

        console.log(res.data);
      }

      // Clear form
      setFormData({
        name: "",
        salary: "",
        gender: "",
        age: "",
        specialization: "",
      });

      setEditId(null);

      await fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Doctor added/updated");
    }
  }

  // Edit doctor
  function handleEdit(doctorinfo) {
    setFormData({
      name: doctorinfo.name,
      salary: doctorinfo.salary,
      gender: doctorinfo.gender,
      age: doctorinfo.age,
      specialization: doctorinfo.specialization,
    });

    setEditId(doctorinfo.id);
  }

  // Fetch doctor data
  async function fetchData() {
    try {
      const res = await axios.get(
        "https://doc-back.onrender.com/Doctors"
      );

      console.log(res.data);
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("At end");
    }
  }

  // Fetch data when component loads
  useEffect(() => {
    fetchData();
  }, []);

  // Debouncing search
  useEffect(() => {
    const trigger = setTimeout(() => {
      setDebouncingSearch(search);
    }, 800);

    return () => clearTimeout(trigger);
  }, [search]);

  // Filter doctors
  const filterDoctors = Doctors.filter((doctor) => {
    const searchValue = deBouncingSearch.toLowerCase();

    return (
      doctor.name
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      doctor.salary
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      doctor.age
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      doctor.gender
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      doctor.specialization
        ?.toString()
        .toLowerCase()
        .includes(searchValue)
    );
  });
   useEffect(()=>{fetchData()},[])
   const filterdoctors=useMemo(()=>{
    console.log("calling less number of times handling expensive calls")
    return Doctors.filter((patientinfo)=>{
      let query=deBouncingSearch.toLowerCase(search)
      return patientinfo.name.toLowerCase().includes(query.toLowerCase())||
      patientinfo.doctoor?.namr.toLowerCase().includes(query.toLowerCase())
    })
   },[])

  // Delete doctor
  async function handleDelete(id) {
    try {
      const res = await axios.delete(
        `https://doc-back.onrender.com/Doctors/${id}`
      );

      console.log(res.data);

      await fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Doctor deleted");
    }
  }

  return (
    <>
      {/* Add Doctor Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter doctor name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="Enter doctor salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gender"
          placeholder="Enter doctor gender"
          value={formData.gender}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Enter doctor age"
          value={formData.age}
          onChange={handleChange}
        />

        <input
          type="text"
          name="specialization"
          placeholder="Enter doctor specialization"
          value={formData.specialization}
          onChange={handleChange}
        />

        {/* Always Add Doctor */}
        <button type="submit">Add Doctor</button>
      </form>

      <div>
        {/* Search Bar */}
        <center>
          <input
            type="text"
            className="patient-search"
            placeholder="Search doctor details"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </center>

        {/* No doctors available */}
        {Doctors.length === 0 ? (
          <h2>
            <center>Doctors Data not available</center>
          </h2>
        ) : (
          <>
            <h2 className="patient-heading">
              Doctor Information
            </h2>

            <div className="container">
              <div className="row">

                {/* No matching doctors */}
                {filterDoctors.length === 0 ? (
                  <h3 className="no-Doctors">
                    <center>
                      No matching Doctors found
                    </center>
                  </h3>
                ) : (
                  filterDoctors.map((v, i) => (
                    <div
                      className="col-md-6 mb-4"
                      key={v.id || i}
                    >
                      <div className="card patient-card">
                        <div className="card-body">

                          <h5 className="card-title">
                            Doctor Name:{" "}
                            <span className="patient-value">
                              {v.name}
                            </span>
                          </h5>

                          <p className="card-text">
                            Doctor Age:{" "}
                            <span className="patient-value">
                              {v.age}
                            </span>
                          </p>

                          <p className="card-text">
                            Gender:{" "}
                            <span className="patient-value">
                              {v.gender}
                            </span>
                          </p>

                          <p className="card-text">
                            Salary:{" "}
                            <span className="patient-value">
                              {v.salary}
                            </span>
                          </p>

                          <p className="card-text">
                            Specialization:{" "}
                            <span className="patient-value">
                              {v.specialization}
                            </span>
                          </p>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(v.id)}
                          >
                            Delete
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(v)}
                          >
                            Edit
                          </button>

                        </div>
                      </div>
                    </div>
                  ))
                )}

              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Doctors;