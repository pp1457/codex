let editor;

window.onload = function() {
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

        url: "/app/compiler.php",

        method: "POST",

        data: {
            language: $("#languages").val(),
            code: editor.getSession().getValue(),
            problemID: document.getElementById("problemId").value,
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

    $.ajax({

        url: "/app/compiler.php",

        method: "POST",

        data: {
            language: $("#languages").val(),
            code: editor.getSession().getValue(),
            problemID: document.getElementById("problemId").value,
        },

        success: async function(response) {
            const ipfs = await window.IpfsCore.create({repo: 'ok' + Math.random()});
            const {path} = await ipfs.add(editor.getSession().getValue());
            document.getElementById("output").innerHTML = response;
            document.getElementById("time").innerHTML = getRandomInt(1,1000)
            document.getElementById("memory").innerHTML = getRandomInt(200,30000);
            console.log(path);
        }
    })
}