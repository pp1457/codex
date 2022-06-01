<?php
    $account = $_POST['Account'];
   
    $_1;
    $_2;
    $_3;

    if (!file_exists("users/" . $account)) {
        mkdir("users/" . $account, 0777, true);
        $_1File=fopen("users/template/1.txt","r");
        $_1=fread($_1File,filesize("users/template/1.txt"));
        fclose($_1File);
        $_2File=fopen("users/template/2.txt","r");
        $_2=fread($_2File,filesize("users/template/2.txt"));
        fclose($_2File);
        $_3File=fopen("users/template/3.txt","r");
        $_3=fread($_3File,filesize("users/template/3.txt"));
        fclose($_3File);

        $_1=str_replace("{account}",$account,$_1);

        $_1New=fopen("users/" . $account . "/1.txt","w");
        fwrite($_1New,$_1);
        fclose($_1New);
        $_2New=fopen("users/" . $account . "/2.txt","w");
        fwrite($_2New,$_2);
        fclose($_2New);
        $_3New=fopen("users/" . $account . "/3.txt","w");
        fwrite($_3New,$_3);
        fclose($_3New);
    }
    if(!file_exists("../ui/users/" . $account . ".html")){
        $userFile=fopen("../ui/users/" . $account . ".html","w");
        fwrite($userFile,$_1 . $_2 . $_3);
        fclose($userFile);
    }
    echo "users/" . $account . ".html";

    
?>