import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { read, utils, writeFile } from 'xlsx';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "kloud-excel-reader",
  templateUrl: "kloud-excel-reader.html",
  styleUrls: ["kloud-excel-reader.scss"]
})
export class KloudExcelReader implements OnInit{
  @Output() fileDropped = new EventEmitter<any>();
  @Output() emitExcelData = new EventEmitter<any>();

  receivedFile: boolean = false;
  receivedUrl: string = '';

  constructor(
    private readonly sanitizer: DomSanitizer
  ) {
  }

  handleFileDropped($event: any){
    if($event && $event.length){
      this.receivedFile = true
      this.handleReadExcel($event)
    }
  }

  onReceiveFileDropped($event: any){
    if($event?.target?.files?.length > 0){
      let listFile = []

      for (const item of $event.target.files) {
        const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(item));
        listFile.push({
          file: item,
          url
        })
      }

      this.receivedFile = true;
      this.handleReadExcel(listFile)
    }
  }

  handleReadExcel(files: any){
    let fileReader = new FileReader();

    for (const file of files) {
      this.receivedUrl = "file1.XLSX"
      fileReader.readAsBinaryString(file.file)

      fileReader.onload = (e: any) => {

        const binarystr: string = e.target.result;
        const wb = read(binarystr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = utils.sheet_to_json(ws);
        this.handleEmitExcelData(data)
      };
    }
  }

  handleEmitExcelData(data: any[]){
    this.emitExcelData.emit(data)
  }

  ngOnInit(): void {

  }

}