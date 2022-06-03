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
var account="guest";
const userWallet = document.getElementById('userWallet');


function checkConnection() {
    ethereum
        .request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(console.error);
}

async function handleAccountsChanged(accounts) {
    account=accounts[0];
    if (accounts.length === 0) {
        document.getElementById("User").innerText="Log In";
    } else{
        console.log(account);
        document.getElementById("User").innerText="Users";
        document.getElementById("userPage").href="users/" + account +".html";
        var userTokenBalance = await provider.getBalance(accounts[0]);
        userTokenBalance = ethers.utils.formatEther(userTokenBalance);
        $.ajax({

          url: "/app/checkUser.php",
      
          method: "POST",
      
          data: {
            Account: account,
          },
      
          success: async function(response) {
            document.getElementById("userPage").href=response;
            console.log(response);
            console.log("hahaha");
          }
        })
        //userWallet.innerText = accounts[0];
        //userBalance.innerText = userTokenBalance;
    }
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

function toggleButton() {
  if (!window.ethereum) {
    alert('MetaMask is not installed');
    
    return false;
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
        document.getElementById("userPage").href=response;
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

    window.userWalletAddress = accounts[0];
    account = accounts[0];
    //userWallet.innerText = window.userWalletAddress;
    //userBalance.innerText = userTokenBalance;
    connected=true;
    document.getElementById("User").innerText="Users";
    window.location.reload();
}

function signOutOfMetaMask() {
  window.userWalletAddress = "";
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