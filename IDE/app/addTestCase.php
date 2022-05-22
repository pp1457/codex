<?php
    $file = $_POST['file'];
    $problemID = (int) $_POST['problemID'];

    $random = "always";
    $filePath = "testCase/" . $problemID . "." . "txt";
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $file);
    fclose($programFile);
    //echo "AC";
?>
