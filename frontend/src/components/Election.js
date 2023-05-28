import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Axios from "axios";

import VerifyOTP from "./VerifyOTP";
import VoteContainer from "./VoteContainer";

const Election = ({ state }) => {
  const url = "http://localhost:4000/api/sendotp";

  const aadhar = useRef(null);
  const [sent, setSent] = useState(false);

  //handlers
  const handleErr = (msg) => {
    alert(msg);
    window.location.reload();
  };

  const handleSuccess = (msg) => {
    alert(msg);
    setSent(() => true);
  };

  const handleClick = async () => {
    const email = await state.contract.Get_Email(aadhar.current.value);
    if (!email) {
      alert("Enter Valid Aadhar Number");
    } else {
      Axios.post(url, { aadhar: aadhar.current.value, email: email })
        .then((r) => (r.status === 200 ? handleSuccess(r.data.msg) : null))
        .catch((e) => (e.response ? handleErr(e.response.msg) : null));
    }
  };

  const OtpContainer = () => {
    return (
      <div className="container">
        <div className="form-container">
          <div className="form-election">
            <div className="form-heading">Voting panel</div>
            <div className="field">
              <label>Aadhar Card Number</label>
              <input
                ref={aadhar}
                className="form-input"
                type="number"
                placeholder="Enter the Adhar Card Number"
              ></input>
            </div>
            <button className="btn-submit" onClick={() => handleClick()}>
              Send OTP
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <section className="section-election">
        {!sent ? (
          <OtpContainer />
        ) : (
          <VoteContainer state={state} aadhar={aadhar.current.value} />
        )}
      </section>
    </>
  );
};

export default Election;
