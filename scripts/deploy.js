const hre =require("hardhat");

async function main(){

   const voting= await hre.ethers.getContractFactory("Voting");
   const contract = await voting.deploy();

   await contract.deployed();

   console.log("Address of Contract", contract.address);
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });
 