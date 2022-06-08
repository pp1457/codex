const ABI = [
  "function buySubmission(uint _id)public payable returns(string)",
  "function add_sub(address _owner,uint _id,uint _price,string _IPFS_address)public",
  "function getHash(uint _id)public view returns(string)",
  "event Log_buySubmission(address buyer,address subOwner,uint subID,string message)",
  "event Log_Submission(address owner,uint id,uint256 price)",
];

const address = "0xece3BEa3f6cfd4A984e82978C7513760C85E69db";

window.addEventListener('load', function() { 
    if (!window.ethereum) {
        alert('MetaMask is not installed');
        document.getElementById("User").innerText="Log In";
        return false
      }
    checkConnection();
 });

const provider = new ethers.providers.Web3Provider(window.ethereum)
var account="guest";



function checkConnection() {
    ethereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(console.error);
}

function handleAccountsChanged(accounts) {
    console.log(accounts);
    account=accounts[0];
    if (accounts.length === 0) {
        document.getElementById("User").innerText="Log In";
    } else{
        document.getElementById("User").innerText="Users";
        document.getElementById("userPage").href="../users/" + account + ".html";
    }
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

function toggleButton() {
  if (!window.ethereum) {
    alert('MetaMask is not installed');

    return false
  }
  if(String(account).length<10 )loginWithMetaMask();
  else{
    console.log("hi hi");
    $.ajax({

      url: "/app/checkUser.php",
  
      method: "POST",
  
      data: {
        Account: account,
      },
  
      success: async function(response) {
        document.getElementById("userPage").href="../" + response;
        console.log(response);
        console.log("hahaha");
      }
    })
  }
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
    window.location.reload();
}

function signOutOfMetaMask() {
  window.userWalletAddress = "";
  //userWallet.innerText = ''
  //userBalance.innerText = ''
  loginButton.innerText = 'Sign in with MetaMask'

  loginButton.removeEventListener('click', signOutOfMetaMask)
  setTimeout(() => {
    loginButton.addEventListener('click', loginWithMetaMask)
  }, 200)
}

async function buySub(subID){
  if(String(account).length<10){
    alert("Please log in with Metamask to buy other's submission");
  }
  else{
    console.log("subID = ",subID);
    var subId=parseInt(subID);
    const signer = provider.getSigner(account);
    const testOJ_rw = new ethers.Contract(address,ABI,signer);
    await testOJ_rw.buySubmission(subId);
  }
}

async function viewSub(subID){
  var subId=parseInt(subID);
  const signer = provider.getSigner(account);
  const testOJ_rw = new ethers.Contract(address,ABI,signer);
  const path=await testOJ_rw.getHash(subId);
  console.log("hi");
  const myModal = new bootstrap.Modal(document.getElementById('myModal'));
  myModal.show();
  console.log(path);
  document.getElementById("ipfsPath").innerText="http://ipfs.io/ipfs/" + path;
  document.getElementById("ipfsPath").href="http://ipfs.io/ipfs/" + path;
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