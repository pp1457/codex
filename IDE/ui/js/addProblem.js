let problemCnt=1;

function addProblem() {

    $.ajax({

        url: "/app/addProblem.php",

        method: "POST",

        data: {
            problemID: problemCnt,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            input: document.getElementById("input").value,
            output: document.getElementById("output").value,
            scoring: document.getElementById("scoring").value,
        },

        success: async function(response) {
            problemCnt++;
            console.log(response);
        }
    })
}

function preview() {

    $.ajax({

        url: "/app/previewProblem.php",

        method: "POST",

        data: {
            problemID: problemCnt,
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