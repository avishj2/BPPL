import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-alignmentsheettest',
  templateUrl: './alignmentsheettest.component.html',
  styleUrls: ['./alignmentsheettest.component.css']
})
export class AlignmentsheettestComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);//data source for MatTable
  displayedColumns: string[] = ['DocumentId', 'FileName', 'Description', 'FromChainage', 'ToChainage'];//columns to be displayed
  // rowNumber: number = 0;//counter for row numbers in the table

  //reference to angular material paginator and sort components in the templete
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient) { }//constructor with HttpClient injection

  ngOnInit(): void {
    this.loadData();//when the component is initialized, load data
  }

  loadData() {
    const apiUrl = 'https://bppl.dgdatam.com/api/SurveyDocuments/GetAlignmentSheets';

    
    //Send an HTTP GET request to the specified API endpoint
    this.http.get(apiUrl).subscribe((data: any[]) => {
      //set the processed data as the MatTable's data source
      this.dataSource.data = data;

      //configure the mattable to use pagination and sorting
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
