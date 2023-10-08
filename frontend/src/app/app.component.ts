import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupComponent } from './popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  descrip = '';
  datetime_due = '';
  tasks: any;
  completeds:any;

  constructor(private httpClient: HttpClient, private dialogRef: MatDialog) {} // Inject the HttpClient service

  ngOnInit(): void {
    this.httpClient.get<any>('http://localhost:3000/api/todo/pending').subscribe(data => {
            this.tasks = data;
            console.log(this.tasks)
        })
    this.httpClient.get<any>('http://localhost:3000/api/todo/completed').subscribe(data => {
          this.completeds = data;
          console.log(this.completeds)
      })
    
  }
  
  onAdd() {

    const newTask = {
      title: this.title,
      descrip: this.descrip,
      datetime_due: this.datetime_due,
      stat: "pending"
    };

    console.log(newTask);
    // Define the API URL you want to call
    const apiUrl = 'http://localhost:3000/api/todo/'; // Replace with your actual API URL

    // Make an HTTP GET request to the API
    this.httpClient.post(apiUrl,newTask).subscribe((data: any) => {
      this.dialogRef.open(PopupComponent,{data:{result:data.message}})
      console.log('API Response:', data.message);
    });
  }
}