let formdata;

function addProblem() {

    $.ajax({

        url: "/app/addProblem.php",

        method: "POST",

        data: { 
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            input: document.getElementById("input").value,
            output: document.getElementById("output").value,
            scoring: document.getElementById("scoring").value,
            language: $("#languages").val(),
            code: editor.getSession().getValue(),
            author: account,
            file: formData,
        },

        success: async function(response) {
            console.log(response);
            document.getElementById("result").innerText="Submit successful ! You can see your problem in Problem Set."
        }
    })
}

function preview() {

    $.ajax({

        url: "/app/previewProblem.php",

        method: "POST",

        data: {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            input: document.getElementById("input").value,
            output: document.getElementById("output").value,
            scoring: document.getElementById("scoring").value,
        },

        success: async function(response) {
            console.log(response);
        }
    })
}

async function loadFile(file) {
    formData = await file.text();
}
