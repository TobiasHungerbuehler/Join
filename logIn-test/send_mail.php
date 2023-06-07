<?php

########### CONFIG ###############


#$redirect = 'success.html';
$link1 = "www.aleksandar-miler.developerakademie.net/index.html";
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

        $subject = "Reset Passwort" . $_POST['name'];
        $headers = "From:  info@join.de";
        $message = 'Dear Guest,
        You can now reset your password by following the link bellow
          "<a href=\www.aleksandar-miler.developerakademie.net/index.html"".$link1."\">$link1</a>"';

        mail($recipient, $subject, $_POST['message'], $headers);
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
