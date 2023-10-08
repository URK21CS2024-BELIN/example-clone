import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component'

@Component({
  selector: 'app-each-task',
  templateUrl: './each-task.component.html',
  providers: [DatePipe],
  styleUrls: ['./each-task.component.css']
})
export class EachTaskComponent {
  text:any;
  toggle = false
  @Input() task: any
  constructor(private http: HttpClient, private dialogRef: MatDialog) { }
  onComplete(task: any) {
    // Check if task.datetime_due is a Date object
    task.datetime_due=new Date(task.datetime_due)
    if (task.datetime_due instanceof Date) {
      const edited_task = {
        id: task.id,
        title: task.title,
        descrip: task.descrip,
        datetime_due: task.datetime_due.toISOString().slice(0, 19),
        stat: 'complete'
      };
      console.log(edited_task)

      this.http.post<any>('http://localhost:3000/api/todo/', edited_task).subscribe(data => {
        // Assuming you have imported MatDialog and PopupComponent correctly
        this.dialogRef.open(PopupComponent, { data: { result: "Task Deleted Successfully" } });
        console.log(data);
      });
    } else {
      console.error('task.datetime_due is not a Date object');
    }
  }
  onDelete(id: any) {
    this.http.delete<any>(`http://localhost:3000/api/todo/${id}`).subscribe(data => {
      this.dialogRef.open(PopupComponent,{data:{result:"Task Deleted Successfully"}})
      console.log(data)
    })
  }
  onUpdate(task:any) {
    this.dialogRef.open(EditPopupComponent,{data:{task:task}})
  }
  handleToggle(){
    this.toggle = !this.toggle
  }
}
