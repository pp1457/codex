function addChecker() {

    $.ajax({

        url: "/app/addChecker.php",

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