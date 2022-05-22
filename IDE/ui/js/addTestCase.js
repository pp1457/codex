let formData;

function addTestCase() {

    console.log("HI hi");

    console.log(formData);

    $.ajax({

        url: "/app/addTestCase.php",

        method: "POST",

        data: {
            file: formData,
            problemID: document.getElementById("problemId").value,
        },

        success: async function(response) {
            console.log(response);
        }
    })
}

async function loadFile(file) {
    formData = await file.text();
}