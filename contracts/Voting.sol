// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Voting {
    // All the Struct Schema

    struct verify {
        bool isVoted;
        bool isRegistered;
        string Gender;
        string email;
    }

    //    struct User_Otp
    //    {
    //       uint Otp_Expires_At;
    //       uint otp;
    //    }

    struct Candidate_info {
        string Candidate_Name;
        uint Candidate_Age;
        string Candidate_Gender;
        string Candidate_Party_Name;
        uint Candidate_Vote_Count;
        uint Candidate_Id;
    }

    struct Elections {
        string Election_Name;
        uint Starts_At;
        uint Expires_At;
        uint Election_Id;
    }

    struct Voter_info {
        string Voter_Name;
        uint Voter_Age;
        uint Voter_Adhar_No;
    }

    // make array of this for candidate
    struct Candidate_List_info {
        string Name;
        string Party_Name;
        uint Age;
        string Gender;
        uint Id;
    }

    struct Candidate_Voting_info {
        string Candidate_Name;
        string Candidate_Party_Name;
        uint Candidate_Vote_Count;
        uint Id;
    }

    struct Voter_Data {
        uint Total_Voters;
        uint Total_Male_Voters;
        uint Total_Female_Voters;
        uint Total_Vote_Voted;
        uint Total_Male_Voted;
        uint Total_Female_Voted;
        uint Total_Candidate;
        uint Total_Female_Candidate;
        uint Total_Male_Candidate;
    }

    // All the Events

    event Create_Candidate(
        string Candididate_Name,
        uint Candidate_Age,
        string Candidate_Gender,
        string Candidate_Party_Name,
        uint Candidate_Aadhar_No
    );

    event Create_Voter(
        string Voter_Name,
        uint Voter_Age,
        string Voter_Gender,
        uint Voter_Adhar_No
    );

    event Final_Winner(
        string Candididate_Name,
        uint Candidate_Age,
        string Candidate_Gender,
        string Candidate_Party_Name,
        uint Candidate_Aadhar_No,
        uint Candidate_Vote_Count
    );

    mapping(uint => verify) private Voter_Check;

    mapping(uint => bool) private Candidate_Check;

    mapping(uint => Candidate_info) private Candidate_Track; // make to track the coutn of candidate ;

    mapping(address => bool) private Admin_Panel;

    mapping(address => bool) private Voting_Panel;

    Candidate_List_info[] private Registered_Candidate_List; // store the list of candi which we have to return

    Voter_info[] private Registered_Voter_List; /// store the list of all voters

    Candidate_Voting_info[] private Results; // Results of the Candidate

    Elections private Election_time_track;

    uint private Total_Voters;
    uint private Total_Male_Voters;
    uint private Total_Female_Voters;
    uint private Total_Vote_Voted;
    uint private Total_Male_Voted;
    uint private Total_Female_Voted;
    uint private Total_Candidate;
    uint private Total_Female_Candidate;
    uint private Total_Male_Candidate;

    constructor() {
        //for Set Candidate and Set Voter funtions
        Admin_Panel[0xad204354Aa54B84105b3f17E2f761bb8092abBE5] = true; // Uchiha Itachi
        Admin_Panel[0xad204354Aa54B84105b3f17E2f761bb8092abBE5] = true; // Uchiha Sasuke

        ///for Voting funtions
        Voting_Panel[0x82734d85a2dB6CfB42247ccD523C9a7F15D2fdAc] = true; // Uchiha Obito
        Voting_Panel[0x84b0E37f832d6B465474CFe41dAB6932584dCb9c] = true; // Hatake Kakashi
    }

    function Set_Voting_time(uint _st_time, uint _End_time) public {
        uint Panel = Check_Authentication(msg.sender);

        require(Panel == 1, "Only Admin Panel can Acces Add Voter Function");

        require(
            _st_time < _End_time,
            "End Time Cannot Be Less Than Start Time"
        );

        // require( Election_time_track.Starts_At==0 && Election_time_track.Starts_At < _st_time ,"Start Time is Already Set");

        // require( Election_time_track.Expires_At==0 && Election_time_track.Expires_At < _End_time ,"End Time is Already Set");

        Election_time_track.Starts_At = _st_time;

        Election_time_track.Expires_At = _End_time;

        require(
            Election_time_track.Starts_At < Election_time_track.Expires_At,
            "Invalid Time Set"
        );
    }

    // check from which acc the funciton is accesing
    function Check_Authentication(
        address _address
    ) private view returns (uint) {
        uint Panel = 0;

        if (Admin_Panel[_address] == true) {
            Panel = 1;
        }

        if (Voting_Panel[_address] == true) {
            Panel = 2;
        }

        return Panel;
    }

    function Add_Voter(
        string memory _Name,
        uint _Age,
        uint _Gender,
        uint _Adhar_No,
        string memory _email
    ) public {
        uint currentTime = block.timestamp;

        require(
            currentTime < Election_time_track.Starts_At,
            "Adding Voter Time is Over"
        );

        uint Panel = Check_Authentication(msg.sender);

        require(Panel == 1, "Only Admin Panel can Acces Add Voter Function");

        require(_Age >= 18, "Voter Age is invalid For Voting");

        require(
            Voter_Check[_Adhar_No].isRegistered == false,
            "Voter is Already Registered"
        );

        Total_Voters += 1;

        string memory Sex = "";

        if (_Gender == 1) {
            Total_Male_Voters += 1;
            Sex = "Male";
        }

        if (_Gender == 2) {
            Total_Female_Voters += 1;
            Sex = "Female";
        }

        Voter_info memory temp;
        temp.Voter_Name = _Name;
        temp.Voter_Age = _Age;
        temp.Voter_Adhar_No = _Adhar_No;

        Registered_Voter_List.push(temp);

        Voter_Check[_Adhar_No].isRegistered = true;
        Voter_Check[_Adhar_No].isVoted = false;
        Voter_Check[_Adhar_No].Gender = Sex;
        Voter_Check[_Adhar_No].email = _email;

        emit Create_Voter(_Name, _Age, Sex, _Adhar_No); // emit Valid Voter to blockchain
    }

    // get email

    function Get_Email(uint _Adhar_No) public view returns (string memory) {
        string memory email = Voter_Check[_Adhar_No].email;

        return email;
    }

    // this is the function of Adding Candidate
    function Add_Candidate(
        string memory _Name,
        uint _Gender,
        uint _Age,
        string memory _Party_Name,
        uint _Adhar_No
    ) public {
        uint currentTime = block.timestamp;

        require(
            currentTime < Election_time_track.Starts_At,
            "Adding Candidate Time is Over"
        );

        uint Panel = Check_Authentication(msg.sender);

        require(Panel == 1, "Only Admin Panel can Acces Add Voter Function");

        require(_Age >= 25, "Candidate Age is InValid For Election");

        require(
            Candidate_Check[_Adhar_No] == false,
            "Candidate is Already Registered"
        );

        Candidate_Check[_Adhar_No] == true; // registereing Candidate

        Total_Candidate += 1;

        string memory Sex = "";
        if (_Gender == 1) {
            Total_Male_Candidate += 1;
            Sex = "Male";
        }

        if (_Gender == 2) {
            Total_Female_Candidate += 1;
            Sex = "Female";
        }

        Candidate_List_info memory temp;

        temp.Name = _Name;
        temp.Party_Name = _Party_Name;
        temp.Age = _Age;
        temp.Gender = Sex;
        temp.Id = Total_Candidate;

        Registered_Candidate_List.push(temp);

        Candidate_Track[Total_Candidate].Candidate_Name = _Name;
        Candidate_Track[Total_Candidate].Candidate_Age = _Age;
        Candidate_Track[Total_Candidate].Candidate_Gender = Sex;
        Candidate_Track[Total_Candidate].Candidate_Party_Name = _Party_Name;
        Candidate_Track[Total_Candidate].Candidate_Vote_Count = 0;
        Candidate_Track[Total_Candidate].Candidate_Vote_Count = 0;

        emit Create_Candidate(_Name, _Age, Sex, _Party_Name, _Adhar_No); // emit Valid Candidate it to the blockchain
    }

    //verify otp

    // function Verify_Otp(uint _Otp, uint _Adhar_No) public view returns(bool){

    //     uint currentTime = block.timestamp;

    //   uint n=Otp_Track[_Adhar_No].length;
    //   User_Otp[] memory temp=Otp_Track[_Adhar_No];

    //   for(uint i=0;i<n;i++)
    //   {
    //        User_Otp memory t;

    //        t.Otp_Expires_At = temp[i].Otp_Expires_At;
    //        t.otp = temp[i].otp;

    //        if(currentTime<t.Otp_Expires_At)
    //        {
    //            if(t.otp==_Otp)
    //            {
    //                return true;
    //            }
    //        }
    //   }
    //   return false;
    // }


    //vote casting
    function Cast_Vote(uint _Adhar_No, uint _Candidate_Id) public {
        uint currentTime = block.timestamp;
        uint Voting_Start_Time = Election_time_track.Starts_At;
        uint Voting_End_Time = Election_time_track.Expires_At;

        require(Voting_Start_Time < Voting_End_Time, "Invalid Voting time Set");

        require(
            currentTime > Voting_Start_Time,
            "Voting  has not Started Yet, Cast Vote When Voting Started"
        );

        require(
            currentTime < Voting_End_Time,
            "Voting Has Ended, You Cannot Vote Now"
        );

        uint Panel = Check_Authentication(msg.sender);

        require(Panel == 2, "Only Voting Panel Can Acces Voting Fucntion"); // checking valid panel

        require(
            _Candidate_Id > 0 && _Candidate_Id <= Total_Candidate,
            "Invalid Candidate"
        ); // check valid candidate

        require(
            Voter_Check[_Adhar_No].isRegistered == true,
            "Voter is Not Registered"
        ); // checking  voter registered validity

        require(
            Voter_Check[_Adhar_No].isVoted == false,
            "Voter is Already Voted"
        ); // checking voter is voted or not

        // bool val = Verify_Otp(_otp,_Adhar_No);

        // require(val==true,"Verificationi Failed");

        Voter_Check[_Adhar_No].isVoted = true;

        Total_Vote_Voted++;

        Candidate_Track[_Candidate_Id].Candidate_Vote_Count += 1;

        if (
            keccak256(
                abi.encodePacked(
                    Candidate_Track[Total_Candidate].Candidate_Gender
                )
            ) == keccak256(abi.encodePacked("Female"))
        ) {
            Total_Female_Voted++;
        }
        if (
            keccak256(
                abi.encodePacked(
                    Candidate_Track[Total_Candidate].Candidate_Gender
                )
            ) == keccak256(abi.encodePacked("Male"))
        ) {
            Total_Male_Voted++;
        }
    }

    // will get the cadidaate list
    function Get_Candidates()
        public
        view
        returns (Candidate_List_info[] memory)
    {
        return Registered_Candidate_List;
    }

    // this function will not return anyting but will ensure that otp will be set to voter id if it is valid vote

    //    mapping(uint => User_Otp[]) private Otp_Track;

    //    function Add_Otp(uint _Adhar_No)public {

    //     require(Voter_Check[_Adhar_No].isRegistered==true,"Voter is Not Registered"); // checking  voter registered validity

    //     require(Voter_Check[_Adhar_No].isVoted==false,"Voter is Already Voted");

    //     uint currentTime = block.timestamp;
    //     uint fiveMinutes = 5 * 60; // 5 minutes in seconds
    //     uint Expires_At = currentTime+fiveMinutes;

    // User_Otp memory temp;

    // temp.Otp_Expires_At=Expires_At;
    // temp.otp=_otp;

    // Otp_Track[_Adhar_No].push(temp);

    //   }

    bool private check = false; // to update once only

    function Update_Result() public {

        uint currentTime = block.timestamp;

        require(
            currentTime > Election_time_track.Expires_At,
            "Voting yet Not finish"
        );

        uint Panel = Check_Authentication(msg.sender);

        require(Panel == 1, "Only Admin Panel can Acces Add Voter Function");

        // require(check == true, "Result already Updated");

        for (uint i = 1; i <= Total_Candidate; i++) {
            Candidate_Voting_info memory temp;

            temp.Id = i;
            temp.Candidate_Name = Candidate_Track[i].Candidate_Name;
            temp.Candidate_Party_Name = Candidate_Track[i].Candidate_Party_Name;
            temp.Candidate_Vote_Count = Candidate_Track[i].Candidate_Vote_Count;

            Results.push(temp);
        }
        check = true;
    }



    function Get_Result() public view returns (Candidate_Voting_info[] memory) {

        uint currentTime = block.timestamp;

        uint Voting_End_Time = Election_time_track.Expires_At;

        require(currentTime > Voting_End_Time, "Voting yet Not finish");

        // require(check==true,"result not updated yet");

        uint Panel = Check_Authentication(msg.sender);

        require(Panel == 1, "Only Admin Panel can Acces Add Voter Function");

        return Results;
    }

    // return all the stats of Election
    function Election_Data_Stats() public view returns (Voter_Data memory) {
        Voter_Data memory res;

        res.Total_Voters = Total_Voters;

        res.Total_Male_Voters = Total_Male_Voters;

        res.Total_Female_Voters = Total_Female_Voters;

        res.Total_Vote_Voted = Total_Vote_Voted;

        res.Total_Male_Voted = Total_Male_Voted;

        res.Total_Female_Voted = Total_Female_Voted;

        res.Total_Candidate = Total_Candidate;

        res.Total_Female_Candidate = Total_Female_Candidate;

        res.Total_Male_Candidate = Total_Male_Candidate;

        return res;
    }
}
