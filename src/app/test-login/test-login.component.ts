import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-login',
  templateUrl: './test-login.component.html',
  styleUrls: ['./test-login.component.css']
})
export class TestLoginComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  Submit(){
    localStorage.setItem('loginDetails', JSON.stringify({}));
    this.router.navigate(['/dashboard']); 
  }

}
