<?php
    $file = $_POST['file'];
    $problemID = $_POST['problemID'];

    $random = "always";
    $filePath = "testCase/" . $problemID . "." . "txt";
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $file);
    fclose($programFile);
    echo "add new Test Case!!!";
?>