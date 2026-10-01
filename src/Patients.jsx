import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import useFetch from "./useFetch";

function Patients() {
  const { data, load, error } = useFetch(
    "https://doc-back.onrender.com/patients"
  );

  const [search, setSearch] = useState("");
  const [deBouncingSearch, setDebouncingSearch] = useState("");

  // Debouncing search
  useEffect(() => {
    const trigger = setTimeout(() => {
      setDebouncingSearch(search);
    }, 800);

    return () => clearTimeout(trigger);
  }, [search]);

  // Loading
  if (load) {
    return (
      <h2>
        <center>Loading patients...</center>
      </h2>
    );
  }

  // Error
  if (error) {
    return (
      <h2>
        <center>Failed to load patients data</center>
      </h2>
    );
  }

  // Filter patients
  const filterPatients = data.filter((patientinfo) => {
    const searchValue = deBouncingSearch.toLowerCase();

    return (
      patientinfo.name
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      patientinfo.weight
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      patientinfo.age
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      patientinfo.gender
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      patientinfo.email
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      patientinfo.disease
        ?.toString()
        .toLowerCase()
        .includes(searchValue) ||

      patientinfo.doctor?.name
        ?.toString()
        .toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div>
      {/* Search Bar */}
      <center>
        <input
          type="text"
          className="patient-search"
          placeholder="Search patient details"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </center>

      {/* No patient data */}
      {data.length === 0 ? (
        <h2>
          <center>Patients Data not available</center>
        </h2>
      ) : (
        <>
          <h2 className="patient-heading">
            Patient Information
          </h2>

          <div className="container">
            <div className="row">

              {/* No matching patients */}
              {filterPatients.length === 0 ? (
                <h3 className="no-patients">
                  <center>
                    No matching patients found
                  </center>
                </h3>
              ) : (
                filterPatients.map((v, i) => (
                  <div
                    className="col-md-6 mb-4"
                    key={v.id || i}
                  >
                    <div className="card patient-card">
                      <div className="card-body">

                        {/* Patient Name */}
                        <h5 className="card-title">
                          Patient Name:{" "}
                          <span className="patient-value">
                            {v.name}
                          </span>
                        </h5>

                        {/* Weight */}
                        <p className="card-text">
                          Weight:{" "}
                          <span className="patient-value">
                            {v.weight}
                          </span>
                        </p>

                        {/* Age */}
                        <p className="card-text">
                          Age:{" "}
                          <span className="patient-value">
                            {v.age}
                          </span>
                        </p>

                        {/* Gender */}
                        <p className="card-text">
                          Gender:{" "}
                          <span className="patient-value">
                            {v.gender}
                          </span>
                        </p>

                        {/* Email */}
                        <p className="card-text">
                          Email:{" "}
                          <span className="patient-value">
                            {v.email}
                          </span>
                        </p>

                        {/* Disease */}
                        <p className="card-text">
                          Disease:{" "}
                          <span className="patient-value">
                            {v.disease}
                          </span>
                        </p>

                        {/* Doctor Name */}
                        <p className="card-text">
                          Doctor Name:{" "}
                          <span className="patient-value">
                            {v.doctor?.name}
                          </span>
                        </p>

                        {/* View Patient */}
                        <Link to={`/patients/${v.id}`}>
                          View Patient
                        </Link>

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
  );
}

export default Patients;