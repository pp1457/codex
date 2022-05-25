window.userWalletAddress = null
const userBalance = document.getElementById('userBalance')
const provider = new ethers.providers.Web3Provider(window.ethereum)
const loginButton = document.getElementById('loginButton')
const userWallet = document.getElementById('userWallet')

const BeAddress = "";

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
    loginButton.innerText = 'MetaMask is not installed'
    loginButton.classList.remove('bg-purple-500', 'text-white')
    loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
    return false
  }

  loginButton.addEventListener('click', loginWithMetaMask)
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
  userWallet.innerText = window.userWalletAddress;
  userBalance.innerText = userTokenBalance;
  loginButton.innerText = 'Sign out of MetaMask'

  loginButton.removeEventListener('click', loginWithMetaMask)
  setTimeout(() => {
    loginButton.addEventListener('click', signOutOfMetaMask)
  }, 200)
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

window.addEventListener('DOMContentLoaded', () => {
  toggleButton()
});