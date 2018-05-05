pragma solidity ^0.4.23;

// import "./zeppelin/ownership/Whitelist.sol";

// contract SimpleAHD is Whitelist {
contract SimpleAHD {

  struct Patient {
    bytes32 name;
    uint requiredVotes;
    bytes32[] preferenceIndex;
    mapping(bytes32 => bool) preferences;
    address[] circleIndex;
    mapping(address => bool) circle;
    mapping(address => uint) accessTime;
  }

  mapping(address => Patient) patients;

  event PatientRegistered(address patient);
  event AddedToCircle(address patient, address substitute);
  event RemovedFromCircle(address patient, address substitute);
  event UpdatedPreference(address patient, bytes32 question, bool answer);
  event GrantedDataAccess(address patient, address other, uint end);
  event RevokedDataAccess(address patient, address other);
  event ViewedPreferences(address patient, address other);

  modifier onlyRegistered() {
    require(isRegistered(msg.sender) == true);
    _;
  }

  modifier onlySubstitutes(address other) {
    require(patients[other].circle[msg.sender] == true);
    _;
  }

  modifier onlyGranted(address other) {
    require(patients[other].accessTime[msg.sender] > now);
    _;
  }


  constructor() public {}

  function register(bytes32 name) public returns(bool) {
    if (isRegistered(msg.sender) == true) return false;
    patients[msg.sender].name = name;
    patients[msg.sender].circle[msg.sender] = true;
    emit PatientRegistered(msg.sender);
    return true;
  }

  function isRegistered(address patient) public view returns(bool) {
    if (patients[patient].circle[patient] == true) return true;
    return false;
  }

  function setRequiredVotes(uint numVotes) public onlyRegistered {
    patients[msg.sender].requiredVotes = numVotes;
  }

  function getRequiredVotes() public view onlyRegistered returns(uint) {
    return patients[msg.sender].requiredVotes;
  }

  function addToCircle(address other) public onlyRegistered returns(bool) {
    require(isRegistered(other));
    require(patients[msg.sender].circle[other] == false);
    patients[msg.sender].circle[other] = true;
    patients[msg.sender].circleIndex.push(other);
    emit AddedToCircle(msg.sender, other);
    return true;
  }

  function removeFromCircle(address other) public onlyRegistered returns(bool) {
    require(isRegistered(other));
    require(patients[msg.sender].circle[other] == true);
    patients[msg.sender].circle[other] = false;
    for(uint i = 0; i < patients[msg.sender].circleIndex.length; i++) {
      if(patients[msg.sender].circleIndex[i] == other) {
        delete patients[msg.sender].circleIndex[i];
        emit RemovedFromCircle(msg.sender, other);
        return true;
      }
    }
    return false;
  }

  function getCircleMembers() public view onlyRegistered returns(bytes32[], address[]) {
    uint n = patients[msg.sender].circleIndex.length;
    bytes32[] memory names = new bytes32[](n);
    address[] memory addresses = new address[](n);

    for(uint i = 0; i < n; i++) {
      names[i] = patients[msg.sender].name;
      addresses[i] = patients[msg.sender].circleIndex[i];
    }
    return (names, addresses);
  }

  function updateSinglePreference(bytes32 question, bool answer) public onlyRegistered returns(bool) {
    // require(patients[msg.sender].preferences[question] != answer);
    patients[msg.sender].preferences[question] = answer;
    patients[msg.sender].preferenceIndex.push(question);
    emit UpdatedPreference(msg.sender, question, answer);
    return true;
  }


  function updateManyPreferences(bytes32[] questions, bool[] answers) public onlyRegistered returns(bool) {
    // require(patients[msg.sender].preferences[question] != answer);
    for(uint i = 0; i < questions.length; i++) {
      // patients[msg.sender].preferences[questions[i]] = answers[i];
      // patients[msg.sender].preferenceIndex.push(questions[i]);
      updateSinglePreference(questions[i], answers[i]);
      // emit UpdatedPreference(msg.sender, questions[i], answers[i]);
    }
    return true;
  }

  function viewPreference(bytes32 question) public onlyRegistered returns(bool) {
    emit ViewedPreferences(msg.sender, msg.sender);
    return patients[msg.sender].preferences[question];
  }

  /*function viewAllPreferences() public view onlyRegistered returns(bytes32[], bool[]) {
    emit ViewedPreferences(msg.sender, msg.sender);
    bool[] memory answers = new bool[](patients[msg.sender].preferenceIndex.length);
    for(uint i = 0; i < patients[msg.sender].preferenceIndex.length; i++) {
      answers[i] = patients[msg.sender].preferences[patients[msg.sender].preferenceIndex[i]];
    }
    return (patients[msg.sender].preferenceIndex, answers);
  }*/

  function viewPreferenceAsProxy(address other, bytes32 question)
  public onlyRegistered onlyGranted(other) returns(bool) {
    require(isRegistered(other));
    emit ViewedPreferences(msg.sender, other);
    return patients[other].preferences[question];
  }

  function viewAllPreferencesAsProxy(address other)
  public onlyRegistered onlyGranted(other) returns(bytes32[]) {
    require(isRegistered(other));
    emit ViewedPreferences(msg.sender, other);
    return patients[other].preferenceIndex;
  }

  function grantDataAccess(address other, uint endTime) public onlyRegistered returns(bool) {
    require(isRegistered(other));
    if (patients[msg.sender].accessTime[other] == endTime) return false;
    patients[msg.sender].accessTime[other] = endTime;
    emit GrantedDataAccess(msg.sender, other, endTime);
    return true;
  }

  function revokeDataAccess(address other) public onlyRegistered returns(bool) {
    require(isRegistered(other));
    if (patients[msg.sender].accessTime[other] == 0) return false;
    patients[msg.sender].accessTime[other] = 0;
    emit RevokedDataAccess(msg.sender, other);
    return true;
  }

  function grantDataAccessAsProxy(address other, address requester, uint endTime) 
  public onlyRegistered onlySubstitutes(other) {
    require(isRegistered(other));
    patients[other].accessTime[requester] = endTime;
    emit GrantedDataAccess(msg.sender, requester, endTime);
  }

  function revokeDataAccessAsProxy(address other, address requester)
  public onlyRegistered onlySubstitutes(other) {
    require(isRegistered(other));
    patients[other].accessTime[requester] = 0;
    emit RevokedDataAccess(msg.sender, requester);
  }

}