<?php
    $title = $_POST['title'];
    $description = $_POST['description'];
    $input = $_POST['input'];
    $output = $_POST['output'];
    $scoring = $_POST['scoring'];
    $author = $_POST['author'];

    $pIdFile = fopen("problemCnt.txt","r");
    $problemID=(int)fread($pIdFile,filesize("problemCnt.txt"));
    fclose($pIdFile);

    $tUpper = fopen("problems/template/upper.txt","r");
    $upContent=fread($tUpper,filesize("problems/template/upper.txt"));

    $upContent=str_replace("{title}",$problemID . " . " . $title,$upContent);
    $upContent=str_replace("{description}",$description,$upContent);
    $upContent=str_replace("{input}",$input,$upContent);
    $upContent=str_replace("{output}",$output,$upContent);
    $upContent=str_replace("{scoring}",$scoring,$upContent);
    fclose($tUpper);

    $tLower = fopen("problems/template/lower.txt","r");
    $lowContent=fread($tLower,filesize("problems/template/lower.txt"));
    fclose($tLower);

    $content = $upContent . $lowContent; 

    $filePath = "../ui/problem_id/" . "problem_". $problemID . ".html";
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $content);
    fclose($programFile);

    $filePath2 = "../ui/problem_id/" . "problem_preview" . ".html";
    $programFile2 = fopen($filePath2, "w");
    fwrite($programFile2, $content);
    fclose($programFile2);

    if (!file_exists("problems/" . $problemID)) {
        mkdir("problems/" . $problemID, 0777, true);
    }
    $upFilePath = "problems/" . $problemID . "/upper.txt";
    $upFile = fopen($upFilePath, "w");
    fwrite($upFile, $upContent);
    fclose($upFile);

    $subCntPath = "problems/" . $problemID . "/subCnt.txt";
    $subCntFile = fopen($subCntPath, "w");
    fwrite($subCntFile, 1);
    fclose($subCntFile);


    $problemID++;
    $problemIdFile = fopen("problemCnt.txt","w");
    fwrite($problemIdFile, $problemID);
    fclose($problemIdFile);

    // add elements in problems.html
    $problemID--;

    $u = fopen("problemListTemplate/upper.txt","r");
    $t = fopen("problemListTemplate/tmpl.txt","r");
    $l = fopen("problemListTemplate/lower.txt","r"); 
    $upper = fread($u,filesize("problemListTemplate/upper.txt"));
    $tmpl  = fread($t,filesize("problemListTemplate/tmpl.txt"));
    $lower = fread($l,filesize("problemListTemplate/lower.txt"));
    
    $tmpl = str_replace("{PID}",$problemID,$tmpl);
    $tmpl = str_replace("{TITLE}",$title,$tmpl);
    $tmpl = str_replace("{AUTHOR}",$author,$tmpl);
    $upper = $upper . "\n" . $tmpl;
    $result = $upper . "\n" . $lower;

    fclose($u); fclose($t); fclose($l);

    $u = fopen("problemListTemplate/upper.txt","w");
    $h = fopen("../ui/problems.html","w");
    fwrite($u,$upper); 
    fwrite($h,$result);
    fclose($u); fclose($h);

    echo "add new Problem!!!" . $problemID . " author = " . $author;

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
