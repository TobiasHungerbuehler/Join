<?php

########### CONFIG ###############


$recipient = 'your@mail.com';
#hier link from server Join Gruppe

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email - $_POST['email'];

        $message - "Dear Guest,
        \n You can now reset your password for your " . $email . " account by following the link bellow \n
        \n https://gruppe-558.developerakademie.net/Join/resetPassword.html?email=" . $email . "\n
        \n In case you got this email by misstake, please ignore this email. \n
        \nThank You,\n
        \nYour Join Team\n";

    
        $recipient = $email;
        $subject = "JOIN App - Reset your Passwort";
        $headers = "From: noreply@join.de"

        $result - mail($recipient, $subject, $message, $headers);
        print($result);
        # header("Location: " , $redirect);
    

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}