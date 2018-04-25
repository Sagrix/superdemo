pragma solidity ^0.4.23;

// import "./zeppelin/ownership/Whitelist.sol";

// contract SimpleAHD is Whitelist {
contract SimpleAHD {

  struct Patient {
    uint id;
    bytes32 name;
    uint requiredVotes;
    bytes32[] preferenceIndex;
    mapping(bytes32 => bool) preferences;
    mapping(address => bool) circle;
    mapping(address => uint) accessTime;
  }

  mapping(address => Patient) private patients;
  address[] private patientIndex; 

  event PatientRegistered(address patient, uint patientID);
  event AddedToCircle(address patient, address substitute);
  event RemovedFromCircle(address patient, address substitute);
  event UpdatedPreference(address patient, bytes32 question, bool answer); // for demo purposes
  event GrantedDataAccess(address patient, address other, uint duration);
  event ModifiedDataAccess(address patient, address other, uint duration);
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
    require(patients[other].accessTime[msg.sender] > 0);
    _;
  }


  constructor() public {}

  function register(bytes32 name) public returns(bool) {
    if (isRegistered(msg.sender)) return false;
    patients[msg.sender].name = name;
    patients[msg.sender].id = patientIndex.push(msg.sender)-1;
    emit PatientRegistered(msg.sender, patients[msg.sender].id);
    return true;
  }

  function isRegistered(address patient) public view returns(bool) {
    require(patientIndex.length > 0);
    return (patientIndex[patients[patient].id] == patient);
  }

  function setRequiredVotes(uint numVotes) public onlyRegistered {
    patients[msg.sender].requiredVotes = numVotes;
  }

  function addToCircle(address name) public onlyRegistered returns(bool) {
    if (patients[msg.sender].circle[name] == true) return false;
    patients[msg.sender].circle[name] = true;
    emit AddedToCircle(msg.sender, name);
    return true;
  }

  function removeFromCircle(address name) public onlyRegistered returns(bool) {
    if (patients[msg.sender].circle[name] == false) return false;
    patients[msg.sender].circle[name] = false;
    emit RemovedFromCircle(msg.sender, name);
    return true;
  }

  function updatePreference(bytes32 question, bool answer) public onlyRegistered returns(bool) {
    patients[msg.sender].preferences[question] = answer;
    patients[msg.sender].preferenceIndex.push(question);
    emit UpdatedPreference(msg.sender, question, answer);
    return true;
  }

  function grantDataAccess(address other, uint duration) public onlyRegistered onlyRegistered returns(bool) {
    if (patients[msg.sender].accessTime[other] == duration) return false;
    patients[msg.sender].accessTime[other] = duration;
    emit GrantedDataAccess(msg.sender, other, duration);
    return true;
  }

  function modifyDataAccess(address other, uint duration) public onlyRegistered returns(bool) {
    if (patients[msg.sender].accessTime[other] == 0) return false;
    if (patients[msg.sender].accessTime[other] == duration) return false;
    patients[msg.sender].accessTime[other] = duration;
    emit ModifiedDataAccess(msg.sender, other, duration);
    return true;
  }

  function revokeDataAccess(address other) public onlyRegistered returns(bool) {
    if (patients[msg.sender].accessTime[other] == 0) return false;
    patients[msg.sender].accessTime[other] = 0;
    emit RevokedDataAccess(msg.sender, other);
    return true;
  }

  function grantDataAccessAsProxy(address other, address requester, uint duration) 
  public onlyRegistered onlySubstitutes(other) {
    patients[other].accessTime[requester] = duration;
    emit GrantedDataAccess(msg.sender, requester, duration);
  }

  function modifyDataAccessAsProxy(address other, address requester, uint duration)
  public onlyRegistered onlySubstitutes(other) {
    patients[other].accessTime[requester] = duration;
    emit ModifiedDataAccess(msg.sender, requester, duration);
  }

  function revokeDataAccessAsProxy(address other, address requester)
  public onlyRegistered onlySubstitutes(other) {
    patients[other].accessTime[requester] = 0;
    emit RevokedDataAccess(msg.sender, requester);
  }

  /*function viewPreferences(address other)
  public onlyRegistered onlyGranted(other) returns(bytes32[]) {
    emit ViewedPreferences(msg.sender, other);
    return patients[other].preferences;
  }*/

}