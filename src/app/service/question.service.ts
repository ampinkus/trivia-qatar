import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Users } from '../users/users';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  // if we wish to test with a local JSON in the asset folder
  getTriviaJson() {
    return this.http.get<any>("assets/trivia.json");
  }

  /* 
  // para la version con Back End
  getTriviaJson() {
    // para pruebas locales con un JSON en assets, cambiar questionList...... por qustionlist[0]!......
    //return this.http.get<any>("assets/trivia.json");

    // para pegarle a la base de datos con el back end local
    return this.http.get<any>("http://localhost:8080/cuestionario");

    // para pegarle al back en remoto
    // return this.http.get<any>("https://fenix-back-senioritty.cleverapps.io/cuestionario");
  }

  postTriviaJson(postMessage: Users): Observable<Users> {
    // para pegarle a la base de datos con el back end local
    return this.http.post<Users>("http://localhost:8080/validar", postMessage);

    // para pegarle al back
    // return this.http.post<Users>("https://fenix-back-senioritty.cleverapps.io/validar", postMessage);
  }
 */
}
