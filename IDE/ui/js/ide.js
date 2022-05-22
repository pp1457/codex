let editor;

window.onload = function() {
    editor = ace.edit("editor");
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
            $(".output").text(response);
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
            const {cid} = await ipfs.add(editor.getSession().getValue());
            $(".output").text(response);
            console.log(cid);
        }
    })
}
