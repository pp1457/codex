<?php
    $account = $_POST['account'];
    $change = (int)($_POST['change']);
    $proID = $_POST['proID'];
    $proID = str_replace("http://localhost:8888/ui/problem_id/problem_","",$proID);
    $proID = str_replace(".html","",$proID);
    $proID = str_replace("#loaded","",$proID);


    $hadVoted = "problems/" . $proID . "/hadVoted.txt";

    $voteCnt = fopen("problems/" . $proID . "/voteCnt.txt","r");
    $cnt = (int)(fread($voteCnt,filesize("problems/" . $proID . "/voteCnt.txt")));

    if (strpos(file_get_contents($hadVoted), $account) !== false){
        echo $cnt;
    }
    else{
        $hadVotedFile = fopen($hadVoted,"r");
        $content = fread($hadVotedFile , filesize($hadVoted));
        $content = $content . "\n" . $account;
        fclose($hadVotedFile);
        $hadVotedFile = fopen($hadVoted,"w");
        fwrite($hadVotedFile,$content);
        fclose($hadVotedFile);
        
        $voteCnt = fopen("problems/" . $proID . "/voteCnt.txt","w");
        $cnt+=$change;
        fwrite($voteCnt,$cnt);
        fclose($voteCnt);
        echo $cnt;
    }

?>