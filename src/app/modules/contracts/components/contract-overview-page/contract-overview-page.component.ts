import { appNotification } from './../../../../store/notification.action';
import { tap, delay, take, debounceTime } from 'rxjs/operators';
import { getAllContracts } from './../../store/contracts.selector';
import { AppState } from './../../../../store/app.reducer';
import { IContract } from './../../contract.model';
import { ContractAddDialogComponent } from 'src/app/modules/dialogs/components/contracts-add/contract-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'il-contract-overview-page',
  templateUrl: './contract-overview-page.component.html',
  styleUrls: ['./contract-overview-page.component.scss']
})

export class ContractOverviewPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public contracts: IContract[];

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contracts, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(public store: Store<AppState>, public dialog: MatDialog) {
    this.store.pipe(select(getAllContracts))
      .pipe(tap(contracts => this.contracts = contracts), debounceTime(1000))
      .subscribe();
  }

  ngOnInit() { }

  public get hasRecords(): boolean {
    return Object.keys(this.contracts).length > 0;
  }
  public dragStarted(event: any) {
    this.dragStart = event;
  }
  public addContract(): void {
    const dialogRef = this.dialog.open(ContractAddDialogComponent, {});
    dialogRef.afterClosed().pipe(take(1)).subscribe((res) => {
      if (res) {
        setTimeout(() => {
          this.store.dispatch(appNotification({ success: false }));
        }, 2000);
      }
    });
  }
}
