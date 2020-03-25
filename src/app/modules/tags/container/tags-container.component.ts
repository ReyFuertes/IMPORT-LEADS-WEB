import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-tags-container',
  templateUrl: './tags-container.component.html',
  styleUrls: ['./tags-container.component.scss']
})

export class TagsContainerComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
