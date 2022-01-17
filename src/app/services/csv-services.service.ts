import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CSVServicesService {

  constructor() { }

 /* export.service.ts */
/**
 * Creates csv file from the Json data. Use this to customize the sheet by adding arbitrary rows and columns.
 *  Json data to create csv.
 * @param fileName filename to save as.
 */
  public CSVDownload(columnNames : any[], ArrayData: any[], filename : string): void
   {
      let header = columnNames.join(',');
      let csv = header;
      csv += '\r\n';
      ArrayData.map(c => {
        csv += c.join(','); //error here
        csv += '\r\n';
       })
     
      var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      var link = document.createElement("a");
        if (link.download !== undefined) 
        {
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
    }

/**
 * Creates csv file to pass the Json array object.
 * @param filename CSV File name 
 * @param rows JSON Object which shall be exported in CSV
 */
exportToCsvFile(filename: string, rows: object[]) 
  {
      if (!rows || !rows.length) 
      {
        return;
      }
      const separator = ',';
      const keys = Object.keys(rows[0]);
      const csvContent =
        keys.join(separator) +
        '\n' +
        rows.map(row => 
          {
            return keys.map(k => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell instanceof Date
                ? cell.toLocaleString()
                : cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            }).join(separator);
          }).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { 
          navigator.msSaveBlob(blob, filename);
        } else 
        {
          const link = document.createElement('a');
          if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      } 
  }
