import { SimpleItem } from './../../../../shared/generics/generic.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-tag-overview-page',
  templateUrl: './tag-overview-page.component.html',
  styleUrls: ['./tag-overview-page.component.scss']
})

export class TagOverviewPageComponent implements OnInit {
  public items: Array<{ id: string | number, name: string, questions?: string[] }> = [
    {
      id: 1,
      name: 'Appearance',
      questions: [
        "Did you check details what kind of raw materials the material is made of? And percentages of those materials. ",
        "Did you enclose a technical scheme?",
        "Did you check details what kind of raw materials the material is made of? And percentages of those materials. "
      ]
    },
    {
      id: 2,
      name: 'Materials',
      questions: [
        "Did you enclose a technical scheme?",
        "Did you check details what kind of raw materials the material is made of? And percentages of those materials. "
      ]
    },
    {
      id: 3,
      name: 'Packaging',
      questions: [
        "Did you check details what kind of raw materials the material is made of? And percentages of those materials. "
      ]
    },
    {
      id: 4,
      name: 'Technical measurements',
      questions: [
        "Did you enclose a technical?",
      ]
    },
    {
      id: 5,
      name: 'Technical preformance',
      questions: [
        "Did you enclose a scheme?",
      ]
    }
  ];
  constructor() { }

  ngOnInit() { }
}
