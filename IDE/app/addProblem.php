<?php
    $title = $_POST['title'];
    $description = $_POST['description'];
    $input = $_POST['input'];
    $output = $_POST['output'];
    $scoring = $_POST['scoring'];

    $pIdFile = fopen("problemCnt.txt","r");
    $problemID=(int)fread($pIdFile,filesize("../ui/problem_id/problemTemplate.html"));
    fclose($pIdFile);

    $template = fopen("../ui/problem_id/problemTemplate.html","r");
    $content=fread($template,filesize("../ui/problem_id/problemTemplate.html"));
    $content=str_replace("{title}",$problemID . " . " . $title,$content);
    $content=str_replace("{description}",$description,$content);
    $content=str_replace("{input}",$input,$content);
    $content=str_replace("{output}",$output,$content);
    $content=str_replace("{scoring}",$scoring,$content);
    fclose($template);

    $filePath = "../ui/problem_id/" . "problem_". $problemID . ".html";
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $content);
    fclose($programFile);

    $filePath2 = "../ui/problem_id/" . "problem_preview" . ".html";
    $programFile2 = fopen($filePath2, "w");
    fwrite($programFile2, $content);
    fclose($programFile2);

    $problemID++;
    $problemIdFile = fopen("problemCnt.txt","w");
    fwrite($problemIdFile, $problemID);
    fclose($problemIdFile);

    echo "add new Problem!!!";

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