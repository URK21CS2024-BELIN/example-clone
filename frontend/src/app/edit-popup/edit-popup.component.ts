import { Component,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent {
  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data:any){}
  task = this.data.task;
  title = '';
  descrip = '';
  datetime_due = '';
  refPage(){
    const edited_task = {
      id: this.task.id,
      title: this.title,
      descrip: this.descrip,
      datetime_due: new Date(this.datetime_due).toISOString().slice(0, 19),
      stat: 'complete'
    };
    console.log(edited_task)
    this.http.post<any>(`http://localhost:3000/api/todo/`,edited_task).subscribe(data => {
      console.log(data)
    })
    window.location.reload();
  }
}
