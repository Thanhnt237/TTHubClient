import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Printd } from 'printd'
import {pick} from 'lodash'

export function createQueryUrl(url: any, query?: any){
  if(query && JSON.stringify(query) !== "{}") {
    url = url + "?"
    for (const [key, value] of Object.entries(query)) {
      url = url + `${key}=${value}&`
    }
    url = url.substring(0, url.length - 1);
  }
  return url
}

export function exportExcel(jsonData: any[], fileName: string){
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
  const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveExcelFile(excelBuffer, fileName);
}

function saveExcelFile(buffer: any, fileName: string): void {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const data: Blob = new Blob([buffer], {type: fileType});
  FileSaver.saveAs(data, fileName + fileExtension);
}

export function ngxPrint(){
  const base = document.createElement('base')
  base.setAttribute('href', 'https://your-cdn.dev')
  base.setAttribute('meta', 'utf8')
// define options to use
  const options = {
    headElements: [ base ]
  }

  const d = new Printd(options)

  // d.print()
}

/**
 * @description normalize excel data to standard data
 * @param {any[]} data
 * @param {Object} normalizeColumn column to normalize format: {"dataColumn": "normalizeColumn"}
 */
export function normalizeExcelData(data: any[], normalizeColumn: any): any[]{
  if(!data[0]) return []
  if(!normalizeColumn) return []

  let returnData = JSON.parse(JSON.stringify(data))
  const convertedCols = Object.values(normalizeColumn)

  for (let i = 0; i < data.length; i++) {
    for (const [keys, values] of Object.entries(returnData[i])) {
      if(values && typeof values === 'string' && values.trim()){
        returnData[i][keys] = values.trim()
      }
    }

    for (const [keys, values] of Object.entries(normalizeColumn)) {
      returnData[i][`${values}`] = returnData[i][keys]
    }

    // @ts-ignore
    returnData[i] = pick(returnData[i], convertedCols)
  }

  return returnData
}