<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://thomasmarques.github.io");
header("Access-Control-Allow-Origin: https://thomasmarques.github.io");

$errors = "";

if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors = '"email":"invalid",';
}

if (!isset($_POST['name']) || empty($_POST['name'])) {
    $errors = $errors . '"name":"invalid",';
}

if (!isset($_POST['subject']) || empty($_POST['subject'])) {
    $errors = $errors . '"subject":"invalid",';
}

if (!isset($_POST['message']) || empty($_POST['message'])) {
    $errors = $errors . '"message":"invalid",';
}

if(empty($errors)) {

    $mail = 'marquesthom@gmail.com'; // Déclaration de l'adresse de destination.

    $passage_ligne = "\n";

    //=====Déclaration des messages au format texte et au format HTML.
    $message_txt = $_POST['message'];
    $message_html = "<html><head></head><body>" . $message_txt . "</body></html>";
    //==========

    //=====Création de la boundary.
    $boundary = "-----=".md5(rand());
    $boundary_alt = "-----=".md5(rand());
    //==========

    //=====Définition du sujet.
    $sujet = "[Github.io] " . $_POST['subject'];
    //=========

    //=====Création du header de l'e-mail.
    $header = "From: \"" . $_POST['name'] . "\"<" . $_POST['email'] . ">".$passage_ligne;
    $header.= "Reply-to: \"" . $_POST['name'] . "\"<" . $_POST['email'] . ">".$passage_ligne;
    $header.= "MIME-Version: 1.0".$passage_ligne;
    $header.= "Content-Type: multipart/mixed;".$passage_ligne." boundary=\"$boundary\"".$passage_ligne;
    //==========

    //=====Création du message.
    $message = $passage_ligne."--".$boundary.$passage_ligne;
    $message.= "Content-Type: multipart/alternative;".$passage_ligne." boundary=\"$boundary_alt\"".$passage_ligne;
    $message.= $passage_ligne."--".$boundary_alt.$passage_ligne;
    //=====Ajout du message au format texte.
    $message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".$passage_ligne;
    $message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
    $message.= $passage_ligne.$message_txt.$passage_ligne;
    //==========

    $message.= $passage_ligne."--".$boundary_alt.$passage_ligne;

    //=====Ajout du message au format HTML.
    $message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".$passage_ligne;
    $message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
    $message.= $passage_ligne.$message_html.$passage_ligne;
    //==========

    //=====On ferme la boundary alternative.
    $message.= $passage_ligne."--".$boundary_alt."--".$passage_ligne;
    //==========

    $message.= $passage_ligne."--".$boundary.$passage_ligne;

    //=====Envoi de l'e-mail.
    mail($mail,$sujet,$message,$header);

    //==========
}

echo "{" . $errors . '"success":' . (empty($errors)?'true':'false') ."}";

?>