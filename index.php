<?php

  if (!empty($_POST)) {
    if (isset($_POST['result'])) {
      var_dump($_POST['result']);
      $resultData = json_decode($_POST['result']);
      
      foreach($resultData as $item) {
        echo "{$item->correct} | {$item->selected} \n";
        var_dump($item->isCorrect);
      }

    }

    die();
  }

?>

<!DOCTYPE html>


<html>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Quiz Builder</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <style>
               .quiz {
    
     padding: 20px;
   }
   
   
   

   .myQ {
     font-size: 24px;
     font-weight: bold;
     padding: 10px;
   }
   
   .btnAns {
     border: 1px solid #ddd;
     padding: 10px;
     text-align: center;
     display: block;
     font-size: 16px;
   }
   
   .selAnswer {
     background-color: cadetblue;
     color: white;
   }
   
   .endScore {
     font-size: 20px;
   }
   
   .btnAns:hover {
     background-color: cornflowerblue;
     color: azure;
   }



        </style>
    </head>
<body>
      <div class="container">
          <div class="row quiz">
            <div id="output"></div>
              </div>
                <div class="row">
                  <div class="col-sm-6">
                  <div id="btnPre" class="btn btn-primary pull-left">Previous</div>
                    </div>
                      <div class="col-sm-6">
                    <div id="btnNxt" class="btn btn-primary pull-right">Next</div>
                    </div>
                   </div>
                <div></div>
             </div>
          <div id="output"></div>
                
        

        <script src="assets/quizapp.js"></script>
</body>
</html>

</html>




