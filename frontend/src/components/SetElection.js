import React, { useRef } from "react";

//Components
import Navbar from "./Navbar";

const SetElection = ({ state }) => {
  const start = useRef(null);
  const end = useRef(null);

  //handlers
  const handleClick = async () => {
    
    const transaction = await state.contract.Set_Voting_time(
      start.current.value,
      end.current.value
    );

    transaction.wait();

    alert("Elelction time Updated");
  };

  const Election = () => {
    return (
      <div className="container">
        <div className="form-container">
          <div className="form-election">
            <div className="form-heading">Set Election Time</div>
            <div className="field">
              <label>Start Time</label>
              <input
                ref={start}
                className="form-input"
                type="number"
                placeholder="UNIX TIME : 12323232"
              ></input>
            </div>
            <div className="field">
              <p>End Time</p>
              <input
                ref={end}
                className="form-input"
                type="number"
                placeholder="UNIX TIME : 12323232"
              ></input>
            </div>
            <button className="btn-submit" onClick={() => handleClick()}>
              Set Election Time
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar></Navbar>
        <Election />
    </>
  );
};

export default SetElection;
