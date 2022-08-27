import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiltersComponent } from '../Pages/filters/filters.component';
import { DashBoardComponent } from './dash-board.component';


const routes: Routes = [
  // { path: '', component: FiltersComponent},
  { path: '', component: DashBoardComponent, children: [
    { 
      path: 'CAInfo',
      loadChildren: () => import('../Pages/ProjectManagement/cainfo/CAInfo.module').then(x => x.CAInfoModule) 
    },
    { 
      path: 'Project',
      loadChildren: () => import('../Pages/ProjectManagement/project-page/project.module').then(x => x.ProjectPageModule) 
    },
    { 
      path: 'GazetteDetails',
      loadChildren: () => import('../Pages/Survey_Details/gazette-details/gazette.module').then(x => x.GazetteModule) 
    },
    { 
      path: 'CrossingDetails',
      loadChildren: () => import('../Pages/Survey_Details/crossing-details/crossing.module').then(x => x.CrossingModule) 
    },
    // { 
    //   path: 'CropRates',
    //   loadChildren: () => import('../Pages/Survey_Details/crop-rates/crop-rates.module').then(x => x.CrossingModule) 
    // },
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }