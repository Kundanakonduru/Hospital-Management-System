import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SinglePatient() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();

  async function fetchData() {
    try {
      console.log("Patient ID:", id);

      const res = await axios.get(
        `https://doc-back.onrender.com/patients/${id}`
      );

      console.log("Patient data:", res.data);

      setPatient(res.data);
    } catch (error) {
      console.log("Patient error:", error);
    } finally {
      console.log("At end");
    }
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card patient-card">
      <div className="card-body">
        <h5 className="card-title">
          Patient Name:{" "}
          <span className="patient-value">
            {patient.name}
          </span>
        </h5>

        <p className="card-text">
          Weight:{" "}
          <span className="patient-value">
            {patient.weight}
          </span>
        </p>

        <p className="card-text">
          Age:{" "}
          <span className="patient-value">
            {patient.age}
          </span>
        </p>

        <p className="card-text">
          Gender:{" "}
          <span className="patient-value">
            {patient.gender}
          </span>
        </p>

        <p className="card-text">
          Email:{" "}
          <span className="patient-value">
            {patient.email}
          </span>
        </p>

        <p className="card-text">
          Disease:{" "}
          <span className="patient-value">
            {patient.disease}
          </span>
        </p>

        <p className="card-text">
          Doctor Name:{" "}
          <span className="patient-value">
            {patient.doctor?.name}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SinglePatient;