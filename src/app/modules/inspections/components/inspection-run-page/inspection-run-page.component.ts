import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-inspection-run-page',
  templateUrl: './inspection-run-page.component.html',
  styleUrls: ['./inspection-run-page.component.scss']
})

export class InspectionRunPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      items: ['']
    });
  }

  ngOnInit() { }

  public onBack(): void {
    this.router.navigateByUrl('/dashboard/inspections');
  }
}
