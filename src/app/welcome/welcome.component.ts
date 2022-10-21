import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public nombreValido: boolean = true;

  // to use and store local variables we tell that we will use the input that we defined as #name in the .html
  @ViewChild('name') nameKey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  startQuiz(){
    /*
    localStorage.setItem(keyname, value)
    Parameter	  Description
    keyname	    Required. A String specifying the name of the key you want to set the value of
    value	      Required. A String specifying the value of the key you want to set the value of
    */
    localStorage.setItem("name",this.nameKey.nativeElement.value); // we save in the variable "name" the value of the input. 
  }

  // si la longitud del nombre es 0 no habilito el boton comenzar
  verificaNombre(name: string){  
    if(name.length > 0){
      this.nombreValido = false;
      return this.nombreValido;
    }
    else{
      this.nombreValido = true;
      return this.nombreValido;
    }
  }

}
