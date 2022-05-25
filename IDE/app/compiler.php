<?php
    $language = strtolower($_POST['language']);
    $code = $_POST['code'];
    $problemID = $_POST['problemID'];

    $random = "always";
    $filePath = "temp/" . $random . "." . $language;
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $code);
    fclose($programFile);

    if($language == "cpp") {
        $outputExe = $random . ".exe";
        shell_exec("g++ $filePath -o $outputExe");
        $output = shell_exec(__DIR__ . "//$outputExe < testCase//$problemID.txt ");
        $outputFile = fopen("temp/tmp.txt", "w");
        fwrite($outputFile, $output);
        fclose($outputFile);

        $checkerFilePath = "checker/" . $problemID . "." . $language;


        $checkerExe = "tmp.exe";
        shell_exec("g++ $checkerFilePath -o $checkerExe");
        $score = shell_exec(__DIR__ . "//$checkerExe < temp/tmp.txt ");
        echo  $score ;
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