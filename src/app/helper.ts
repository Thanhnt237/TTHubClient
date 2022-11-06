import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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