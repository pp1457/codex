pragma solidity ^0.4.25;
contract not_admin 
//contract for everyone,functions like transactions,save submissions and buy submissions are required
{
    //transactions
    struct trans
    {
        address[] from;
        mapping(address=>uint)value;
    }
    mapping(address=>trans)copy;
    event Log_transaction(address from,address to,uint value,string message);
    event Log_buySubmission(address buyer,address subOwner,uint subID,string message);
    event LogSubmission(address owner,uint id,uint price);
    function send_ether(address _to,string _message)public payable
    {
        require(msg.value>0);
        _to.transfer(msg.value);
        if(copy[_to].value[msg.sender]==0)copy[_to].from.push(msg.sender);
        copy[_to].value[msg.sender]+=msg.value;
        emit Log_transaction(msg.sender,_to,msg.value,_message);
    }
    event printtrans(address from,uint value);
    function get_income()public
    {
        for(uint i=0;i<copy[msg.sender].from.length;i++)
        {
            address _from=copy[msg.sender].from[i];
            emit printtrans(_from,copy[msg.sender].value[_from]);
        }
    }

    function buySubmission(address subOwner,uint subID)public returns(string){
        require(exist[subOwner][subID]);
        require(address(msg.sender).balance>who_owns_what[subOwner][subID].price);
        subOwner.transfer(who_owns_what[subOwner][subID].price);
        emit Log_buySubmission(msg.sender,subOwner,subID,"buySub");
        return who_owns_what[subOwner][subID].IPFS_address;
    }
    //submissions

    function add_sub(address _owner,uint _id,uint _price,string _IPFS_address)public
    {
        who_owns_what[_owner][_id].IPFS_address=_IPFS_address;
        who_owns_what[_owner][_id].price=_price;
        exist[_owner][_id]=true;
        emit LogSubmission(_owner,_id,_price);
    }

    struct Submission{
        string IPFS_address;
        uint price;
    }
    mapping(address=>mapping(uint=>bool)) exist;
    mapping(address=>mapping(uint=>Submission))who_owns_what;

}

contract admin //sample of admin,may not be used in final version
{
    address Admin=0x37CA53200171F584E734c94cF82DB2875401757E;
    modifier ADMIN(address id)
    {
        require(id==Admin,"You are not allow to use this function");
        _;
    }
    function Hello_World()ADMIN(msg.sender)public view returns(string)
    {
        return "Hello World";
    }
}
