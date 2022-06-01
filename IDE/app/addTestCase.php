<?php
    $file = $_POST['file'];
    $problemID = $_POST['problemID'];

    $random = "always";
    $filePath = "testCase/" . $problemID . "." . "txt";
    if(file_exists($filePath)){
        echo "This problem already had test case, sorry";
    }
    else{
        $programFile = fopen($filePath, "w");
        fwrite($programFile, $file);
        fclose($programFile);
        echo "add new test case!!!" . "Problem : " . $problemID;
    }
?>