import { ChatUserDialogComponent } from './../../../dialogs/components/chat-user/chat-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { ChatUser } from '../../chat.models';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'il-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {
  public svgPath: string = environment.imgPath;
  @Input()
  public chatUsers: ChatUser;
  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }

  public onEdit(): void {
    const dialogRef = this.dialog.open(ChatUserDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }

}
