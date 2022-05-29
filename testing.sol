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
    //submissions
    struct submissions
    {
        string IPFS_address;//we could change it into any other capable forms as if we want to or our skill allows
        uint price;
    }
    mapping(address=>submissions[])own_subs;
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
