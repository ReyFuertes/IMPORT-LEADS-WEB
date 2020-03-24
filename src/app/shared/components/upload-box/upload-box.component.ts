import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})

export class UploadBoxComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public label: string = 'Screenshot contract';
  constructor() { }

  ngOnInit() { }
}
