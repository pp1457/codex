pragma solidity ^0.4.25;
contract testOJ
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
    event Log_Submission(address owner,uint id,uint256 price);
    event Log_printtrans(address from,uint value);

    mapping(uint=>bool) exist;
    mapping(uint=>Submission) sub;

    function() public payable {}

    function send_ether(address _to,string _message)public payable
    {
        require(msg.value>0);
        require(msg.sender.balance>=msg.value,"Not enough ether to send QQ");
        _to.transfer(msg.value);
        if(copy[_to].value[msg.sender]==0)copy[_to].from.push(msg.sender);
        copy[_to].value[msg.sender]+=msg.value;
        emit Log_transaction(msg.sender,_to,msg.value,_message);
    }

    function get_income()public
    {
        for(uint i=0;i<copy[msg.sender].from.length;i++)
        {
            address _from=copy[msg.sender].from[i];
            emit Log_printtrans(_from,copy[msg.sender].value[_from]);
        }
    }

    function buySubmission(uint _id)public returns(string)
    {
        require(exist[_id],"submission does not exist");
        require(address(msg.sender).balance>=sub[_id].price * 1e15 ,"Not enough ether to send QQ");
        address(sub[_id].owner).transfer(sub[_id].price * 1e15 wei);
        emit Log_buySubmission(msg.sender,sub[_id].owner,_id,"buy a Submission");
        return sub[_id].IPFS_address;
    }
    //submissions

    function add_sub(address _owner,uint _id,uint256 _price,string _IPFS_address)public
    {
        require(!exist[_id]);
        sub[_id].IPFS_address=_IPFS_address;
        sub[_id].price=_price;
        sub[_id].owner=_owner;
        exist[_id]=true;
        emit Log_Submission(_owner,_id,_price);
    }

    struct Submission
    {
        address owner;
        string IPFS_address;
        uint256 price;
    }

}
