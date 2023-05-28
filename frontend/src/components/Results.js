import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Results = ({ state }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    const resultt = async () => {
        const genResult = async () => {
          const res = await state.contract.Update_Result();
           res.wait();
           console.log(res);
          result();
        };

      const result = await state.contract.Get_Result();
      console.log(result)
      setData(() => result);

      if (result.length === 0) {
        genResult();
      }
    };

      resultt();
  }, [state.contract]);

  const ResultContainer = () => {
    const Candidate = ({ name, party, votes }) => {
      return (
        <div className="candidate-card">
          <h1>
            Name: <span>{name}</span>
          </h1>
          <p>
            Party: <span>{party}</span>
          </p>
          <p>
            Votes: <span>{votes}</span>
          </p>
        </div>
      );
    };

    const mapCandidate = (i) => {
      return (
        <Candidate
          key={i.Id._hex}
          name={i[0]}
          party={i[1]}
          votes={parseInt(i.Candidate_Vote_Count._hex)}
        />
      );
    };

    return (
      <div className="results-container">
        <h1>Results</h1>
        {data.map((i) => mapCandidate(i))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {data ? <ResultContainer /> : <h1 className="results-container">Result Yet Not Ready </h1>}
    </>
  );
};

export default Results;
