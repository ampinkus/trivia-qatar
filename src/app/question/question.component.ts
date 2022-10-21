import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { Users } from '../users/users';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})

export class QuestionComponent implements OnInit {
  public name: string = ""; //initial name of the user
  public questionList: any = []; //initial question list is an empty array
  public currentQuestion: number = 0; //the question number, an array index
  public points: number = 0; // Number of points of the player
  public segundos: number = 60; // seconds that we give to answer a question
  public questionId: number = 1; // to save the Id of the question
  public answerId: number = 0;  // to save the Id of the answer
  public numeroPreguntas: number = 0 // number of question of the trivia, number of elements of the JSON
  counter = this.segundos; // The seconds we give each question 
  correctAnswer: number = 0; // correct answer counter 
  inCorrectAnswer: number = 0; //  incorrect answer counter 
  interval$: any; // used for the time counter 
  progress: string = "0"; // for the progress bar
  isQuizCompleted: boolean = false; // If it is false the trivia did not end, is used to change to the last screen
  public answerPoints: any = 0; // to save the points I receive from the answer
  public questionNumber: any = []; // unordered list of quiestion we change the order at each start
  public numberQuestionTrivia: any = 5; // number of questions per trivia game
  public notAnsweredQuestions: any = 0;  // number of not answered questions 

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    // console.log('ngOnInit started') // for debugging
    this.name = localStorage.getItem("name")!; // we get the name from the local storage, the "!" indicates that the string wil
    this.getAllQuestions(); // we get all the questions
    this.startCounter(); // we need to start the counter, if not we get an error
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
    this.progress = "0";
  }

  getAllQuestions() { // Get the questions for the Trivia from the database
    this.questionService.getTriviaJson()
      .subscribe(res => {
        this.questionList = res;
        this.numeroPreguntas = this.questionList.length;
        /* console.log('This question list')  // for debugging
        console.log(this.questionList); // for debugging
        console.log('This question list lenght')  // for debugging
        console.log(this.numeroPreguntas);  // for debugging 
        console.log('This points'); // for debugging
        console.log(this.points); // for debugging */
        this.Shuffle(); // create an unordered array of number of questions
      })
  }
  nextQuestion() { // jump to the next question method
    if (this.currentQuestion + 1 == this.numberQuestionTrivia) { // do we completed the number of questions?
      // console.log('Salte a la ultima pregunta')
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    this.currentQuestion++;
    this.resetCounter();
    this.getProgressPercent();
    this.notAnsweredQuestions++; // add one to the not answered questions
  }

  // core of the Trivia logic
  answer(currentQno: number, option: any) {
    // the next block adds the points after each answer
    // block for debugging
    /*  console.log('Respuesta Correcta');
     console.log(this.questionList[this.questionNumber[this.currentQuestion]].respuestaCorrecta);
     console.log('option.idRespuesta');
     console.log(option.idRespuesta);
  */
    // check if the answer is correct
    if (this.questionList[this.questionNumber[this.currentQuestion]].respuestaCorrecta == option.idRespuesta) {
      this.points += 1; // add one point 
      this.correctAnswer++; // add one correct answer
    }
    else {
      this.inCorrectAnswer++; // add one incorrect answer
    }

    if (currentQno == this.numberQuestionTrivia) { // do we completed the number of questions?
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    this.currentQuestion++; // jump to the next question
    this.resetCounter();
    this.getProgressPercent(); // calculate the new progress 

  }

  startCounter() {
    this.interval$ = interval(1000) // we define an interval of 1 second
      .subscribe(val => {
        this.counter--; //each second we decrease the val by one 
        console.log(this.currentQuestion);
        if (this.counter === 0) {
          this.currentQuestion++;
          if (this.currentQuestion + 1 > this.numberQuestionTrivia) { // the Trivia is completed
            this.notAnsweredQuestions++;
            this.isQuizCompleted = true;
            this.stopCounter();
          }
          else {
            this.counter = this.segundos;
            this.getProgressPercent();
            this.notAnsweredQuestions++; // add one to the not answered questions 
          }
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();// after 10 minutes unsubscribe to this interval and we stop the counter
    }, 6000000);
  }

  stopCounter() {
    this.interval$.unsubscribe(); //unsubscribe the interval 
    this.counter = 0; // reset the counter to 0
  }

  resetCounter() {
    this.stopCounter(); // stop the counter
    this.counter = this.segundos; // put counter on segundos 
    this.startCounter(); // start again the counter
  }

  getProgressPercent() { // calculate the progress as the ratio between the total number of questions and the questions we are now. 
    this.progress = ((this.currentQuestion / this.numberQuestionTrivia) * 100).toString();
    return this.progress;
  }

  Shuffle() { // function that return an array of unordered numbers of questions
    var n = this.numeroPreguntas;
    this.questionNumber = [...Array(n).keys()];
    // shuffle the array
    let i = this.questionNumber.length;
    while (--i > 0) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [this.questionNumber[randIndex], this.questionNumber[i]] = [this.questionNumber[i], this.questionNumber[randIndex]];
    }
    /* console.log('questionNumber') //for debugging
    console.log(this.questionNumber) //for debugging */
    return this.questionNumber;
  }

}