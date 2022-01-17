import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs/internal/Observable';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelServicesService {
  
  constructor() { }

  /* export.service.ts */
/**
 * Creates XLSX option from the Json data. Use this to customize the sheet by adding arbitrary rows and columns.
 *
 * @param json Json data to create xlsx.
 * @param fileName filename to save as.
 */

  public exportAsExcelFile(json: any[], excelFileName: string ): void 
  {
    //const worksheet = XLSX.utils.aoa_to_sheet(json); header:string,
   // const header = ["AttendnaceRectificationID", "ProjectName1","PunchIn","PunchOut"]  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  /**save excel file on local mechine */
  public saveAsExcelFile(buffer: any, fileName: string): void 
  {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_Exportfile_' + new  Date().toDateString() + EXCEL_EXTENSION); 
     //new  Date().getTime() //toLocaleDateString()= 1_4_2021
  }

  
  /**
   * read uploaded excel rows value method 1
   * @param argEvent 
   * @param argExcelData array object
   */
 ReadUploadedExcel(argEvent : any , argExcelData :any[]):void 
  {
    const target : DataTransfer =  <DataTransfer>(argEvent.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => 
      {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname : string = wb.SheetNames[0];//[0]firstsheet name -wsname
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /**save excel data */
        argExcelData = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        console.log(argExcelData);
        /**remove header name from excelsheet data  */
        //let l_ExcelData = argData.slice(1);
        
      };
    reader.readAsBinaryString(target.files[0]);
    //return argExcelData;
  }
}