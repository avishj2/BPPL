import { Injectable } from '@angular/core';
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";

@Injectable({
    providedIn: 'root'
  })


export class DocxTemplateService {
    constructor()
    {}


    loadFile(url, callback) 
        {
            PizZipUtils.getBinaryContent(url, callback);
        }


    /**
     * @param docURL  URL for the document
     * @param argData data for doc file
     * @param Filename output doc file name 
     */
    GenerateDocument(docURL , argData, Filename : string)
        {
            {
                let data = argData;
                this.loadFile(docURL, function(error,content)
                {
                    if (error) 
                    {
                        throw error;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });        
                    doc.setData(data)                           
                    try 
                    {            
                      doc.render();
                    } 
                    catch (error) 
                    {
                      function replaceErrors(key, value) 
                      {
                        if (value instanceof Error) {
                          return Object.getOwnPropertyNames(value).reduce(function(
                            error,
                            key
                          ){
                            error[key] = value[key];
                            return error;
                          },
                          {});
                        }
                        return value;
                      }
                      console.log(JSON.stringify({ error: error }, replaceErrors));              
                      if (error.properties && error.properties.errors instanceof Array) 
                        {
                            const errorMessages = error.properties.errors
                            .map(function(error) {
                                return error.properties.explanation;
                            })
                            .join("\n");
                            console.log("errorMessages", errorMessages);
                        }
                      throw error;
                    }
                  const output = doc.getZip().generate({
                    type: "blob",
                    mimeType:
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  });
                  // Output the document using Data-URI
                  saveAs(output, Filename +".docx");
                });
            }
        
        }
}
