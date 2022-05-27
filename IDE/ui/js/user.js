window.addEventListener('load', function() { 
    if (!window.ethereum) {
        alert('MetaMask is not installed');
        document.getElementById("User").innerText="Log In";
        return false
      }
    checkConnection();
 });

const userBalance = document.getElementById('userBalance')
const provider = new ethers.providers.Web3Provider(window.ethereum)
const userWallet = document.getElementById('userWallet')

const BeAddress = "";


function checkConnection() {
    ethereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(console.error);
}

function handleAccountsChanged(accounts) {
    console.log(accounts);

    if (accounts.length === 0) {
        document.getElementById("User").innerText="Log In";
    } else{
        document.getElementById("User").innerText="Users";
        document.getElementById("userPage").href="user.html";
    }
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}


const BeABI = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    "function balanceOf(address _owner) public view returns (uint256)",

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    "function transfer(address _to, uint256 _value) public returns (bool)",

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    "function transferFrom(address _from, address _to, uint256 _value) public returns (bool)",

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    "function approve(address _spender, uint256 _value) public returns (bool)",

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    "function allowance(address _owner, address _spender) public view returns (uint256)",
];

function toggleButton() {
  if (!window.ethereum) {
    alert('MetaMask is not installed');

    return false
  }

  loginWithMetaMask();
}

async function loginWithMetaMask() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
        console.error(e.message)
        return
        })
    if (!accounts) { return }
    console.log(accounts);
    var userTokenBalance = await provider.getBalance(accounts[0]);
    userTokenBalance = ethers.utils.formatEther(userTokenBalance);
    //Note that userTokenBalance is not a number and it is bigNumber
    console.log(userTokenBalance);

    window.userWalletAddress = accounts[0]
    //userWallet.innerText = window.userWalletAddress;
   // userBalance.innerText = userTokenBalance;
    connected=true;
    document.getElementById("User").innerText="Users";
    document.getElementById("userPage").href="user.html";
    window.location.reload();
}

function signOutOfMetaMask() {
  window.userWalletAddress = null
  userWallet.innerText = ''
  userBalance.innerText = ''
  loginButton.innerText = 'Sign in with MetaMask'

  loginButton.removeEventListener('click', signOutOfMetaMask)
  setTimeout(() => {
    loginButton.addEventListener('click', loginWithMetaMask)
  }, 200)
}


/*$(function() {
    var current_progress = 0;
    var interval = setInterval(function() {
        current_progress += 10;
        $("#dynamic")
        .css("width", current_progress + "%" )
        .attr("aria-valuenow", current_progress);
        if (current_progress >= 100)
            clearInterval(interval);
    }, 1000);
  });*/