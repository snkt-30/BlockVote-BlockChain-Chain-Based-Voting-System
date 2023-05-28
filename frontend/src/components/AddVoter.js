import React, { useRef, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const AddVoter = ({ state }) => {
  const url = "http://localhost:4000/api/aadhar";

  const [loading, setLoading] = useState(false);

  const aadhar = useRef("");

  const VoterForm = () => {
    const addVoter = async (voter) => {
      console.log(voter);
      let Gender = voter.gender.toUpperCase() === "MALE" ? 1 : 2;

      try {
        const transaction = await state.contract.Add_Voter(
          voter.name,
          voter.age,
          Gender,
          voter.aadharNo,
          voter.email
        );

        transaction.wait();
        alert("Voter added successfully.");
        setLoading(false);
      } catch (error) {
        alert("Something went wrong. try again");
        window.location.reload();
      }
    };

    //Handlers

    const handleErr = () => {
      alert("Try again with valid aadhar number");
      window.location.reload();
    };

    const handleClick = async () => {
      setLoading(true);
      axios
        .post(url, { aadhar: aadhar.current.value })

        .then((r) => (r.status === 200 ? addVoter(r.data) : null))
        .catch((e) => (e.response ? handleErr() : null));
    };

    return (
      <div className="container">
        <div className="form-container">
          <div className="form-election">
            <div className="form-heading">Add Voter</div>
            <div className="field">
              <p style={{ fontStyle: "initial" }}>Aadhar No.</p>
              <input
                ref={aadhar}
                className="form-input"
                type="number"
                placeholder="Enter your Aadhar Number"
              ></input>
            </div>
            
            <button className="btn-submit" onClick={() => handleClick()}>
              Add Voter
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="election-wrapper">
        {loading === true ? <h1>Loading</h1> : <VoterForm />}
      </div>
    </>
  );
};

export default AddVoter;
