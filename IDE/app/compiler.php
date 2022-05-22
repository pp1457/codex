<?php
    $language = strtolower($_POST['language']);
    $code = $_POST['code'];
    $problemID = (int) $_POST['problemID'];

    $random = "always";
    $filePath = "temp/" . $random . "." . $language;
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $code);
    fclose($programFile);

    if($language == "cpp") {
        $outputExe = $random . ".exe";
        shell_exec("g++ $filePath -o $outputExe");
        $output = shell_exec(__DIR__ . "//$outputExe < testCase//$problemID.txt ");
        echo($output);
    }

    /*
    if($language == "c") {
        $outputExe = $random . ".exe";
        shell_exec("gcc $filePath -o $outputExe");
        $output = shell_exec(__DIR__ . "//$outputExe");
        echo($output);
    }

    if($language == "node") {
        rename($filePath, $filePath.".js");
        $output = shell_exec("/usr/local/bin/node $filePath.js 2>&1");
        echo $output;
    }

    if($language == "python") {
        $output = shell_exec("/usr/local/bin/python3 $filePath 2>&1");
        echo $output;
    }

    if($language == "php") {
        $output = shell_exec("php $filePath 2>&1");
        echo $output;
    }
    */
    
?>
