import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-tinymce-editor',
  templateUrl: './tinymce-editor.component.html',
  styleUrls: ['./tinymce-editor.component.scss']
})
export class TinymceEditorComponent implements OnInit {
  @Input()
  public value: string;
  constructor() { }

  ngOnInit() {
  }

}
