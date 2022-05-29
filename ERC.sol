//Bruh
pragma solidity ^0.4.25;
interface IERC20
{
    function totalSupply()external view returns(uint256 totalsupply);
    
    function userbalance(address user)external view returns(uint256 balance);
    
    function transfer(address to,uint256 value)external returns(bool success);
    
    function allowance(address user,address to)external view returns(uint256 remaining);
    
    function approve(address to,uint256 value)external returns(bool success);
    
    function transferFrom(address from,address to,uint256 value) external returns(bool success);
    
    event Transfer(address indexed from,address indexed to,uint256 value);
    
    event Approval(address indexed owner,address indexed spender,uint256 value);
}
library SafeMath
{
    function mul(uint256 a,uint256 b)internal pure returns(uint256)
    {
        uint256 c=a*b;
        require(c/a==b);
        return c;
    }
    function div(uint256 a,uint256 b)internal pure returns(uint256)
    {
        require(b>0);
        uint c=a/b;
        return c;
    }
    function add(uint256 a,uint256 b)internal pure returns(uint256)
    {
        uint c=a+b;
        require(c>=a);
        return c;
    }
    function sub(uint256 a,uint256 b)internal pure returns(uint256)
    {
        require(b<=a);
        uint c=a-b;
        return c;
    }
    function mod(uint256 a,uint256 b)internal pure returns(uint256)
    {
        require(b!=0);
        return a%b;
    }
}
contract ERC20 is IERC20
{
    using SafeMath for uint256;

    string public constant name="Paul_Liao Token";
    uint8 public constant decimals=18;
    string public constant symbol="PLT";

    uint256 private _totalSupply;
    
    mapping(address=>uint256)_balances;

    mapping(address=>mapping(address=>uint256))_approve;

    function totalSupply()external view returns(uint256 totalsupply)
    {
        return _totalSupply;
    }
    
    function balanceOf(address user)external view returns(uint256 balance)
    {
        return _balances[user];
    }
    
    function transfer(address to,uint256 value)external returns(bool success)
    {
        return _transfer(msg.sender,to,value);
    }
    
    function allowance(address user,address to)external view returns(uint256 remaining)
    {
        return _approve[user][to];
    }
    
    function approve(address spender,uint256 value)external returns(bool success)
    {
        _approve[msg.sender][spender]=value;
        emit Approval(msg.sender,spender,value);
        return true;
    }
    
    function transferFrom(address from,address to,uint256 value) external returns(bool success)
    {
        _approve[from][msg.sender]=_approve[from][msg.sender].sub(value);
        return _transfer(from,to,value);
    }
    function _transfer(address from,address to,uint256 value)internal returns(bool success)
    {
        _balances[from]=_balances[from].sub(value);
        _balances[to]=_balances[to].add(value);
        emit Transfer(from,to,value);
        return true;
    }
}
