import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";
const File_Extension = '.pdf';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  
  constructor(private http: HttpClient) { }

/**
 * Creates XLSX option from the Json data. Use this to customize the sheet by adding arbitrary rows and columns.
 * @param  data to create file.
 * @param fileName filename to save as.
 */
  /**SavePdfFile on local mechine */
    // public SavePdfFile(url: string, fileName: string): void 
    //   {
    //     // const blob : Blob = new Blob([url], {type:'application/pdf'});
    //     // FileSaver.saveAs(url, fileName + '_Exportfile_' + new  Date().toDateString() + '.pdf'); 
    //     FileSaver.saveAs(url, fileName + '_Exportfile_' + new  Date().toDateString()); 
    //   }


    public SavePdfFile(url : string, fileName: string) 
      {
        this.http.get(url, {headers: {"Accept": "application/pdf"}, responseType: "blob"
        }).subscribe(
          (x: any) => {
            console.log("x", x);
            var newBlob = new Blob([x], { type: "application/pdf" });
            if (window.navigator && window.navigator.msSaveOrOpenBlob) 
              {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
              }
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement("a");
            link.href = data;
            link.download = fileName + ".pdf";
            
            link.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
              })
            );
          setTimeout(function() 
            {
              window.URL.revokeObjectURL(data);
              link.remove();
            }, 100);
          },
          err => 
            {
              console.log("ERR", err);
            }
        );
      }
  


}