import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

export interface BreadCrumb {
    label: string;
    url: string;
};

@Component({
  selector: 'app-breadcrumb',
  template:  `
  <span *ngFor="let breadcrumb of breadcrumbs$ | async">
    <a [routerLink]="[breadcrumb.url]">
       {{this.breadcrumb.label }}
    </a>/
  </span>`
   
})

export class BreadCrumbComponent {

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {}
    /**
     * navigationEnd$ is trigered once per completed routing event, in other words
     * once per loading a component that is in the end of the current route
     */

     breadcrumbs$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(event => this.buildBreadCrumb(this.activatedRoute.root)));
      //Build your breadcrumb starting with the root route of your current activated route
       breadcrumbsPrimeNG$ = this.breadcrumbs$.pipe(
        map(crumbs => {
          return crumbs.map(crumb => ({
            label: crumb.label,
            url: crumb.url,
            routerLink: crumb.url
          }));
        })
      );
  


  private buildBreadCrumb(
    route: ActivatedRoute, url: string = '', 
    breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> 
    {
      // console.log("BreadCrumb")
      //If no routeConfig is avalailable we are on the root path
      const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : '';
      const path = route.routeConfig ? route.routeConfig.path : '';
      //In the routeConfig the complete path is not available, 
      //so we rebuild it each time
      const nextUrl = `${url}${path}/`;
      const breadcrumb = {
          label: label,
          url: nextUrl
      };
      const newBreadcrumbs = [...breadcrumbs, breadcrumb];
      if (route.firstChild) {
          //If we are not on our current path yet, 
          //there will be more children to look after, to build our breadcumb
          return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
      }
      return newBreadcrumbs;
    }
}