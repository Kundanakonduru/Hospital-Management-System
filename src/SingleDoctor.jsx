import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleDoctor() {
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();

  async function fetchData() {
    try {
      console.log("Doctor ID:", id);

      const res = await axios.get(
        `https://doc-back.onrender.com/Doctors/${id}`
      );

      console.log("Doctor data:", res.data);

      setDoctor(res.data);
    } catch (error) {
      console.log("Doctor error:", error);
    } finally {
      console.log("At end");
    }
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          Doctor Name:{" "}
          <span className="patient-value">
            {doctor.name}
          </span>
        </h5>

        <p className="card-text">
          Doctor age:{" "}
          <span className="patient-value">
            {doctor.age}
          </span>
        </p>

        <p className="card-text">
          Gender:{" "}
          <span className="patient-value">
            {doctor.gender}
          </span>
        </p>

        <p className="card-text">
          Salary:{" "}
          <span className="patient-value">
            {doctor.salary}
          </span>
        </p>

        <p className="card-text">
          Specialization:{" "}
          <span className="patient-value">
            {doctor.specialization}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SingleDoctor;