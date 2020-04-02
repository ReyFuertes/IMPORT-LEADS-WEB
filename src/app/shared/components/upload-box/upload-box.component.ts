import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
@Component({
  selector: 'il-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})

export class UploadBoxComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public label: string = 'Drop Image Here..';
  @Output()
  public imageEmitter = new EventEmitter<File>();
  constructor() { }

  ngOnInit() { }

  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.imageEmitter.emit(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  public fileOver(event) {
    //console.log(event);
  }
  public fileLeave(event) {
    //console.log(event);
  }
}
