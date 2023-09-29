import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';


const routes: Routes = [
  { path: '', component: DashBoardComponent, children: [
    { 
      path: 'Project',
      loadChildren: () => import('../Pages/ProjectManagement/project-page/project.module').then(x => x.ProjectPageModule) 
    },
    //SURVEY Add/edit tab
    { 
      path: 'GazetteDetails',
      loadChildren: () => import('../Pages/Survey_Details/gazette-details/gazette.module').then(x => x.GazetteModule) 
    },
    { 
      path: 'CrossingDetails',
      loadChildren: () => import('../Pages/Survey_Details/crossing-details/crossing.module').then(x => x.CrossingModule) 
    },
    { 
      path: 'SurveyDetails',
      loadChildren: () => import('../Pages/Survey_Details/survey-details/survey-details.module').then(x => x.SurveyDetailsModule) 
    },
    { 
      path: 'CropRates',
      loadChildren: () => import('../Pages/Survey_Details/crop-rates/crop-rates.module').then(x => x.CropRatesModule) 
    },
    { 
      path: 'LandRates',
      loadChildren: () => import('../Pages/Survey_Details/land-rates/land-rates.module').then(x => x.LandRatesModule) 
    },
    { 
      path: 'SOMapping',
      loadChildren: () => import('../Pages/Survey_Details/somapping/somapping.module').then(x => x.SOMappingModule) 
    },
    { 
      path: 'Configuration',
      loadChildren: () => import('../Pages/Survey_Details/configuration/configuration.module').then(x => x.ConfigurationModule) 
    },
    { 
      path: 'View_Adhoc_Payment',
      loadChildren: () => import('../Pages/Survey_Details/adhoc-payment-details/adhoc-payment.module').then(x => x.AdhocPaymentModule) 
    },
    { 
      path: 'SurveyDocuments',
      loadChildren: () => import('../Pages/Survey_Details/survey-documents/survey-documents.module').then(x => x.SurveyDocumentsModule) 
    },
    { 
      path: 'SV_IPSDetails',
      loadChildren: () => import('../Pages/Survey_Details/svipsdetails/svipsdetails.module').then(x => x.SVIPSDetailsModule) 
    },
    { 
      path: 'VillageDetails',
      loadChildren: () => import('../Pages/Survey_Details/village-details/villagedetails.module').then(x => x.VillageDetailsModule) 
    },
    { 
      path: 'CAInfo',
      loadChildren: () => import('../Pages/ProjectManagement/cainfo/CAInfo.module').then(x => x.CAInfoModule) 
    },
    //View details tab
    { 
      path: 'ViewCrossingDetails',
      loadChildren: () => import('../Pages/View_Details/view-crossing-details/view-crossing.module').then(x => x.ViewCrossingDetailsModule) 
    },
    { 
      path: 'VeiwVillageDetails',
      loadChildren: () => import('../Pages/View_Details/view-village-details/view-village.module').then(x => x.ViewVillageModule) 
    },
    { 
      path: 'ViewSurveyTabs',
      loadChildren: () => import('../Pages/View_Details/view-survey-tabs/view-survey-tabs.module').then(x => x.ViewSurveyTabsModule) 
    },
    { 
      path: 'ViewProjectReports',
      loadChildren: () => import('../Pages/View_Details/view-project-reports/view-project-reports.module').then(x => x.ViewProjectReportsModule) 
    },
    { 
      path: 'ViewAlignmentReports',
      loadChildren: () => import('../Pages/View_Details/view-alignment-reports/view-alignment-reports.module').then(x => x.ViewAlignmentReportsModule) 
    },
    { 
      path: 'ViewAwardReports',
      loadChildren: () => import('../Pages/View_Details/view-award-reports/view-award-reports.module').then(x => x.ViewAwardReportsModule) 
    },
    // { 
    //   path: 'LegalDocuments',
    //   loadChildren: () => import('../Pages/View_Details/').then(x => x.SurveyDocumentsModule) 
    // },
    { 
      path: 'LAQPermanent',
      loadChildren: () => import('../Pages/View_Details/laqpermanent/laqpermanent.module').then(x => x.LAQPermanentModule) 
    },
    { 
      path: 'ViewGazette',
      loadChildren: () => import('../Pages/View_Details/view-gazette/view-gazette.module').then(x => x.ViewGazetteModule) 
    },
    { 
      path: 'ViewSVIPSDetails',
      loadChildren: () => import('../Pages/View_Details/view-svipsdetails/view-svipsdetails.module').then(x => x.ViewSVIPSModule) 
    },
    { 
      path: 'ViewMap',
      loadChildren: () => import('../Pages/View_Details/view-map/viewmap.module').then(x => x.ViewMapModule) 
    },
    { 
      path: 'ArcGISMap',
      loadChildren: () => import('../Pages/View_Details/arc-gismap/arc-gismap.module').then(x => x.ArcGISMapModule) 
    },
    { 
      path: 'OLGS',
      loadChildren: () => import('../Pages/View_Details/olgspage/olgspage.module').then(x => x.OLGSPageModule) 
    },
    //user management tab
    { 
      path: 'UserDetails',
      loadChildren: () => import('../Pages/UserManagement/user-details/user-details.module').then(x => x.UserDetailsModule) 
    },
    { 
      path: 'TestSheet',
      loadChildren: () => import('../alignmentsheettest/alignmentsheettest.module').then(x => x.AlignmentTestModule) 
    }
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }