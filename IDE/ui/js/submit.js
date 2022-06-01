let editor;

const ABI = [
    "function buySubmission(uint _id)public payable returns(string)",
    "function add_sub(address _owner,uint _id,uint _price,string _IPFS_address)public",
    "event Log_buySubmission(address buyer,address subOwner,uint subID,string message)",
    "event Log_Submission(address owner,uint id,uint256 price)",
];

const address = "0x5125c278aab968e90c80370d1db8c188fda1faf9";

window.onload = async function() {
    editor = ace.edit("editor");
    editor.setShowPrintMargin(false);
    editor.setTheme("ace/theme/dracula");
    document.getElementById('editor').style.fontSize='16px';
    editor.session.setMode("ace/mode/c_cpp");
}

function changeLanguage() {

    let language = $("#languages").val();

    if(language == 'c' || language == 'cpp')editor.session.setMode("ace/mode/c_cpp");
    else if(language == 'php')editor.session.setMode("ace/mode/php");
    else if(language == 'python')editor.session.setMode("ace/mode/python");
    else if(language == 'node')editor.session.setMode("ace/mode/javascript");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function executeCode() {

    $.ajax({

        url: "/app/submit.php",

        method: "POST",

        data: {
            author: "",
            price: 0,
            language: $("#languages").val(),
            code: editor.getSession().getValue(),
            problemID: document.getElementById("problemId").value,
            save: 0,
        },

        success: async function(response) {
            document.getElementById("output").innerHTML = response;
            document.getElementById("time").innerHTML = getRandomInt(1,1000)
            document.getElementById("memory").innerHTML = getRandomInt(200,30000);
            console.log("hello");
        }
    })
}

function saveCode() {

    if(String(account).length<10){
        alert('Please log in with Metamask to upload your submission');
    }
    else{
        $.ajax({

            url: "/app/submit.php",
    
            method: "POST",
    
            data: {
                author: account,
                language: $("#languages").val(),
                code: editor.getSession().getValue(),
                problemID: document.getElementById("problemId").value,
                price: document.getElementById("price").value,
                save: 1,
            },
    
            success: async function(response) {
                const ipfs = await window.IpfsCore.create({repo: 'ok' + Math.random()});
                const {path} = await ipfs.add(editor.getSession().getValue());
                const signer = provider.getSigner(account);
                const testOJ_rw = new ethers.Contract(address,ABI,signer);
                var subID=0,subPrice=document.getElementById("price").value;
                document.getElementById("output").innerHTML = response;
                document.getElementById("time").innerHTML = getRandomInt(1,1000)
                document.getElementById("memory").innerHTML = getRandomInt(200,30000);
                console.log(path);
                //await testOJ_rw.add_sub(account,subID,subPrice,path);
            }
        })
    }
}