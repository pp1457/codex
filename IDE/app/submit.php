<?php
    $author = $_POST['author'];
    $language = strtolower($_POST['language']);
    $code = $_POST['code'];
    $problemID = $_POST['problemID'];
    $price = $_POST['price'];
    $save = $_POST['save'];
    $score;

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

    if($save==1){

        $subCntFile=fopen("submissionCnt.txt","r");
        $subID=(int)fread( $subCntFile,filesize("submissionCnt.txt"));
        fclose($subCntFile);

        if (!file_exists("submissions/" . $subID)) {
            mkdir("submissions/" . $subID, 0777, true);
        }
        $soldFile=fopen("submissions/" . $subID . "/soldCnt.txt","w");
        $sold=0;
        fwrite($soldFile,$sold);
        fclose($soldFile);

        $proSubCntFile=fopen("problems/" . $problemID . "/subCnt.txt","r");
        $proSubID=(int)fread( $proSubCntFile,filesize("problems/" . $problemID . "/subCnt.txt"));
        fclose($proSubCntFile);

        $addFile=fopen("problems/template/tmpl.txt","r");
        $add=fread($addFile,filesize("problems/template/tmpl.txt"));
        $add=str_replace("{problemSubCnt}",$proSubID,$add);
        $add=str_replace("{author}",$author,$add);
        $add=str_replace("{subID}",$subID,$add);
        $add=str_replace("{score}",$score,$add);
        $add=str_replace("{price}",$price,$add);
        fclose($addFile);

        $upperFile=fopen("problems/" . $problemID . "/upper.txt","r");
        $upper=fread($upperFile,filesize("problems/" . $problemID . "/upper.txt"));
        fclose($upperFile);

        $lowerFile=fopen("problems/template/lower.txt","r");
        $lower=fread($lowerFile,filesize("problems/template/lower.txt"));
        fclose($lowerFile);

        $upper = $upper . $add;
        $problemContent = $upper . $lower;

        $problemFile=fopen("../ui/problem_id/problem_" . $problemID . ".html","w");
        fwrite($problemFile,$problemContent);
        fclose($problemFile);

        $upperFile2=fopen("problems/" . $problemID . "/upper.txt","w");
        fwrite($upperFile2,$upper);
        fclose($upperFile2);

        $subCntFile2=fopen("submissionCnt.txt","w");
        fwrite($subCntFile2,($subID+1));
        fclose($subCntFile2);

        $proSubCntFile2=fopen("problems/" . $problemID . "/subCnt.txt","w");
        fwrite($proSubCntFile2,($proSubID+1));
        fclose($proSubCntFile2);
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
