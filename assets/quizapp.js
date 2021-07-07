

// output element with all questions using Ajax 
var output = document.getElementById('output');
var bAnswer = document.getElementsByClassName('btnAns'); //Var to contain all classes  
var myObj = '';
page = 0;
crtAnswer = 0; // creates a var that might be difficult to track in the browser
var myQueRep = [];
loadQuestions();

var test = 'Some Text';

// eventlisteners

btnPre.onclick = function () { buildQuiz(page - 1) };
btnNxt.onclick = function () { buildQuiz(page + 1) };

function ajaxPost(url, formData, cb) {
  var request = new XMLHttpRequest();
  request.onload = function(event) {
    if (request.readyState !== 4) return;
    if (request.status >= 200 && request.status < 300) {
      cb(null, request.responseText);
    }

    if (request.status >= 300) {
      cb(new Error(request.statusText));
    }
  };

  request.open("POST", url, true);
  request.send(formData);
}

//load questions from using ajax from a Json array  
function loadQuestions() {
  var loadJsonQuiz = new XMLHttpRequest(); //loadJsonQuizz would import all the information of the json string into the website
  // loadJsonQuiz.open("GET", "https://sleepy-cliffs-19222.herokuapp.com/vmjCcHhC6.json", true);//alternativ JASONSERVE url von jsonserve.com - 
  loadJsonQuiz.open("GET", "./db/db.json", true);//alternativ JASONSERVE url von jsonserve.com - 
  loadJsonQuiz.onreadystatechange = function () {

    if (loadJsonQuiz.readyState == 4) {
      myObj = JSON.parse(loadJsonQuiz.responseText);
      buildQuiz(0);
    }
  }
  loadJsonQuiz.send();
}
// Building a Quizz and display only 1 Question from the array
function hideshow() {
  if (myObj.length <= page) {
    document.getElementById('btnNxt').style.display = 'none';
  } else {
    document.getElementById('btnNxt').style.display = 'block';
  }
  if (0 >= page) {
    document.getElementById('btnPre').style.display = 'none';
  } else {
    document.getElementById('btnPre').style.display = 'block';
  }
}


function buildQuiz(pg) {
  console.log(page);
  console.log(myObj.length);
  page = pg;
  hideshow();


  if (page >= 0) {
    //if quizz is complete


    if (myObj.length < (page + 1)) {
      page = myObj.length + 1;
      //output.innerHTML ='Completed';
      console.log('Completed');
      var holderHTML = '';
      var score = 0;
      var gylph = '';

      for (var item in myObj) {
        if (myObj[item].correct == myQueRep[item]) {
          score++;
          // add images correct incorrect
          gylph = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
        } else {
          gylph = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';
        }
        holderHTML += '<div class="col-sm-12">' + myObj[item].question + '<br><i> ' + myObj[item].answers[myQueRep[item]] + ' </i> ' + gylph + '</div>';
      }
      output.innerHTML = '<h1>Quiz Results You Scored ' + score + ' correct </h1><div class="endScore">' + holderHTML + '</div>';

      var result = [];
      for (var index = 0; index < myObj.length; index++) {
        var item = myObj[index];

        result.push({
          correct: item.correct,
          selected: Number(item.mySel),
          isCorrect: item.correct === Number(item.mySel)
        });
      }

      var fd = new FormData();
      fd.append('result', JSON.stringify(result));

      ajaxPost('./index.php', fd, function(error, result) {
        console.log(error, result);
      });


    } else {

      var myQuestion = myObj[page].question;
      var myCorrect = myObj[page].correct;
      crtAnswer = myObj[page].answers[myCorrect];//container for the correct answer 
      var questionHolder = '';
      var yesCor = '';
      for (var i in myObj[page].answers) {
        var holdaClass = ''; //to add class into myObj while quizz is looping

        if (myObj[page].mySel == i) {
          holdaClass = 'selAnswer';
        }

        //console.log(i);
        if (i == myCorrect) {
          yesCor = '*';
        }
        else {
          yesCor = ' ';
        }
        //class btnAnss added, 
        //data-id = holds the value of each element as it is presented-  
        questionHolder += '<div><div class="btnAns ' + holdaClass + '" data-id="' + parseInt(i) + '">' + myObj[page].answers[i] + '</div></div>';

      }

      output.innerHTML = '<div>' + myQuestion + '</div>';
      output.innerHTML += questionHolder;

      // add event listeners to the content of BAnswer and sends the value to the function myAnswer
      for (var x = 0; x < bAnswer.length; x++) {
        bAnswer[x].addEventListener('click', myAnswer, false)
      }
      console.log(bAnswer);
    }
  }

}
//answer selection adding event listener
function myAnswer() {
  var myResult = ''; // creates a place to storage value of selected items

  var iId = this.getAttribute("data-id");

  myObj[page].mySel = iId;// adds another class to save into 

  //this.classList.toggle('selAnswer');
  //console.dir(this.innerText);

  //this.classList.toggle('selAnswer'); test class toogle ok

  if (this.innerText == crtAnswer) {
    myResult = "correct";
  }
  else {
    myResult = "incorrect";
  }

  myQueRep[page] = iId;


  //loop over the content bAnswer
  for (var x = 0; x < bAnswer.length; x++) {

    if (iId == x) {
      bAnswer[x].classList.add("selAnswer");
    } //add a class into the selector
    else {
      bAnswer[x].classList.remove("selAnswer");
    }

    //console.dir(bAnswer[x]);
    // };


    console.log(myQueRep);

    console.log(crtAnswer);

    console.log(myResult);


  }


};


