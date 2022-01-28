import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
  }


  /**top right side clicks on logout button and logout website  */
  logoutBtn()
  {
    this.router.navigate(['/login']); 
    localStorage.removeItem('loginDetails'); //remove username and password from localstroage after click logout
  }
}
