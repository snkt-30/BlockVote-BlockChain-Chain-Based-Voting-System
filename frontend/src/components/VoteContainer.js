import React,{useState, useRef} from "react";
import axios from "axios";


const Vote = ({state, aadhar})=>{

    const url = "http://localhost:4000/api/verifyotp";

    const OTP = useRef(null);

    const [data, setData] = useState();


    const addData = async ()=>{
        const candidates = await state.contract.Get_Candidates();
        setData(()=> candidates);
    }

    if(!data){
        addData();
    }
    
    //handlers
    const handleErr = (msg)=>{
        alert("Verification Failed " + msg);
        window.location.reload();
    }

    const handleSuccess =  async (id)=>{
        const transaction = await state.contract.Cast_Vote(aadhar, id);
        await transaction.wait();
        console.log(transaction);
        alert("Voting Done");
        window.location.reload();

    }

    const handleVote = (id) =>{
        axios.post(url, {OTP: String(OTP.current.value), aadhar: aadhar})
        .then(r => (r.status === 200) ? handleSuccess(id) :window.location.reload())
        .catch(e => (e.response) ? handleErr(e.response.msg) : null);
    }

    const Container = ()=>{

        const Candidate = ({name, party, id})=>{
            return(
                 <div className="candidate-card">
                <h1>Name: <span>{name}</span></h1>
                <h2>Party: <span>{party}</span></h2>
                <button className="btn-vote" onClick={()=> handleVote(id)}>Vote</button>
                </div>
            )
        }
        const mapCandidate = (i, k)=>{
            return(
                <Candidate key={k} id={k+1} name={i[0]} party={i[1]}/>
            )
        }

        return(
            <div className="election-container">
                <div className="input-container">
                <p>Enter OTP.</p>
                <input ref={OTP} className="form-input" type="number" placeholder="1103"></input>
                </div>


                <div className="candidates-container">
                    {data.map((i, k) => mapCandidate(i, k))}
                </div>

            </div>
        )
    }

    return(
        <div className="vote-container">
            {(data) ? <Container /> : <h1>Loading</h1>}
            
        </div>
    )
}

export default Vote;