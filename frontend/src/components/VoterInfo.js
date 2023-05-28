import React, { useRef, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const VoterInfo = ({ state }) => {
  const url = "http://localhost:4000/api/aadhar";

  const [loading, setLoading] = useState(false);
  const [object, SetObject] = useState(null);

  const aadhar = useRef("");

  const VoterForm = () => {
    const handleErr = () => {
      alert("Try again with valid aadhar number");
      window.location.reload();
    };

    const handleClick = async () => {
      setLoading(true);
      axios
        .post(url, { aadhar: aadhar.current.value })

        .then((r) => (r.status === 200 ? SetObject(r.data) : null))
        .catch((e) => (e.response ? handleErr() : null));
    };

    return (
      <>
        <div className="voter-form-container">
          <div className="input-container">
            <p style={{ fontStyle: "initial" }}>Aadhar No.</p>
            <input
              ref={aadhar}
              className="form-input"
              type="number"
              placeholder="Enter your Aadhar Number"
            ></input>
          </div>
          <button className="btn-submit" onClick={() => handleClick()}>
            Get_voter_info
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="election-wrapper">
        {loading === true ? <h1>Loading</h1> :<div>
            <p>Name:{object.name}</p>
            <p>age:{object.age}</p>
            </div>}
      </div>
    </>
  );
};

export default VoterInfo;



