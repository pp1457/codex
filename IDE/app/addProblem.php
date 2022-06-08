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

    // checker

    $language = strtolower($_POST['language']);
    $code = $_POST['code'];

    $filePath = "checker/" . $problemID . "." . $language;
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $code);
    fclose($programFile);

    // testcase

    $file = $_POST['file'];

    $random = "always";
    $filePath = "testCase/" . $problemID . "." . "txt";
    if(file_exists($filePath)){
        echo "This problem already had test case, sorry";
    }
    else{
        $programFile = fopen($filePath, "w");
        fwrite($programFile, $file);
        fclose($programFile);
    }

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

    $content = $upContent . "\n" . $lowContent; 

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

    $voteCnt = fopen("problems/" . $problemID . "/voteCnt.txt" ,"w");
    $hadVoted = fopen("problems/" . $problemID . "/hadVoted.txt", "w");
    fwrite($voteCnt,0);
    fwrite($hadVoted,"hello");
    fclose($voteCnt);
    fclose($hadVoted);

    // user
    $userProCntFile=fopen("users/" . $author . "/proCnt.txt","r");
    $userProID=(int)fread( $userProCntFile,filesize("users/" . $author . "/proCnt.txt"));
    fclose($userProCntFile);

    $userFile_1 = fopen("users/" . $author . "/1.txt" ,"r");
    $userFile_2 = fopen("users/" . $author . "/2.txt" ,"r");
    $userFile_3 = fopen("users/" . $author . "/3.txt" ,"r");
    $proFile = fopen("users/template/pro.txt" , "r");
    $pro = fread($proFile,filesize("users/template/pro.txt"));
    $_1 = fread($userFile_1 , filesize("users/" . $author . "/1.txt"));
    $_2 = fread($userFile_2 , filesize("users/" . $author . "/2.txt"));
    $_3 = fread($userFile_3 , filesize("users/" . $author . "/3.txt"));
    fclose($proFile);
    fclose($userFile_1);
    fclose($userFile_2);
    fclose($userFile_3);

    $pro = str_replace("{proCnt}" , $userProID , $pro);
    $pro = str_replace("{proID}" , $problemID , $pro);
    $pro = str_replace("{proLink}" , "../problem_id/problem_" . $problemID . ".html" , $pro);
    $pro = str_replace("{title}" , $title , $pro);
    
    $_2 = $_2 . "\n" . $pro;

    $newUser = $_1  . "\n" . $_2 . "\n" . $_3;
    $userHTML = fopen("../ui/users/" . $author . ".html" ,"w");
    fwrite($userHTML,$newUser);
    fclose($userHTML);

    $userFile_2 = fopen("users/" . $author . "/2.txt" ,"w");
    fwrite($userFile_2,$_2);
    fclose($userFile_2);

    $userProCntFile=fopen("users/" . $author . "/proCnt.txt","w");
    fwrite($userProCntFile,($userProID+1));
    fclose($userProCntFile);

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