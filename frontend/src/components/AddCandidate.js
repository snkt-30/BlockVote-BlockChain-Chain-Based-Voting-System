import React, { useRef } from "react";

import Navbar from "./Navbar";

const AddCandidate = ({ state }) => {
  const aadhar = useRef("");
  const name = useRef("");
  const age = useRef(null);
  const gender = useRef(null);
  const party = useRef("");

  // console.log(state);

  const handleClick = async () => {
    let Gender = gender.current.value.toUpperCase() === "MALE" ? 1 : 2;


    const transaction = await state.contract.Add_Candidate(
      name.current.value,
      Gender,
      age.current.value,
      party.current.value,
      aadhar.current.value
    );

    transaction.wait();

    console.log(transaction);
  };

  const CandidateForm = () => {
    return (
      <div className="container">
        <div className="form-container">
          <div className="form-election">
            <div className="form-heading">Register Candidate</div>
            <div className="form-row">
              <div className="form-column">
                <div className="field">
                  <label>Candidate Name</label>
                  <input
                    ref={name}
                    className="form-input"
                    type="text"
                    placeholder="Sachin Pilot"
                  ></input>
                </div>
                <div className="field">
                  <label>Gender</label>
                  <input
                    ref={gender}
                    className="form-input"
                    type="text"
                    placeholder="Male"
                  ></input>
                </div>
                <div className="field">
                  <label>Age</label>
                  <input
                    ref={age}
                    className="form-input"
                    type="number"
                    placeholder="35"
                  ></input>
                </div>
              </div>
              <div className="form-column">
                <div className="field">
                  <label>Party Name</label>
                  <input
                    ref={party}
                    className="form-input"
                    type="text"
                    placeholder="INC"
                  ></input>
                </div>
                <div className="field">
                  <label>Aadhar No.</label>
                  <input
                    ref={aadhar}
                    className="form-input"
                    type="number"
                    placeholder="Enter Adhar No"
                  ></input>
                </div>
              </div>
            </div>
            <button className="btn-submit" onClick={() => handleClick()}>
              Add Candidate
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <CandidateForm />
    </>
  );
};

export default AddCandidate;
