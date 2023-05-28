import abi from "./contract/Voting.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddVoter from "./components/AddVoter";
import AddCandidate from "./components/AddCandidate";
import SetElection from "./components/SetElection";
import Home from "./components/Home";
import Election from "./components/Election";
import Results from "./components/Results";
import Stats from "./components/Stats";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x99d1620b4968e6AaEb80CE2784e3824973a60B69";
      const contractAbi = abi.abi;

      // console.log(contractAbi);

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <>
      {state ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route
              path="/addvoter"
              element={<AddVoter state={state} />}
            ></Route>

            <Route
              path="/setelection"
              element={<SetElection state={state} />}
            ></Route>

            <Route
              path="/election"
              element={<Election state={state} />}
            ></Route>

            <Route path="/result" element={<Results state={state} />}></Route>

            <Route
              path="/addcandidate"
              element={<AddCandidate state={state} />}
            ></Route>

            <Route
              path="/stats"
              element={<Stats state={state} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      ) : null}
    </>
  );
}

export default App;
