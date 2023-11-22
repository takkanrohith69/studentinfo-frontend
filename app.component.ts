import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = {
    name: '',
    file: ''
  };
  selectedFile: any;
  fileInput:any;
  fileService: any;
  filenames: any;
  
  constructor(private http:HttpClient){}
  
  
   
  //  onUpload() {
  //   const formData = new FormData();
  //   formData.append('name', this.data.name);
  //   formData.append('file', this.data.file);

  //   this.http.post('http://localhost:8080/api/upload', formData)
  //   .subscribe(response => {
  //       console.log('Upload successful', response);
  //     },
  //     error => {
  //       console.error('Upload failed', error);
  //     }
  //   );
  // }
  // onFileSelected(event:any) {
  //   const file = event.target.files[0];
  //   this.data.file = file;
  // }

  onSubmit(data: any) {
    if (data.name.trim() === '') {
      console.error('Name cannot be empty.');
      return;
    }
  
    this.http.post("http://localhost:8080/api/student", data)
      .subscribe((result) => {
        console.warn("result", result);
      }, (error) => {
        console.error("Error submitting data:", error);
      });
  }
  



 exportToExcel() {
  this.http
    .get('http://localhost:8080/api/export-to-excel', {
      responseType: 'blob',
    })
    .subscribe((response) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  
  }
  
 // Assuming you have a file input in your HTML and using (change) event to update this.selectedFile

onFileSelected(event: any) {
  
  this.selectedFile = event.target.files[0];
  
}

uploadFile() {
    
  const formData = new FormData();
formData.append("file", this.selectedFile);
  
    this.http.post('http://localhost:8080/api/upload', formData).subscribe(
      (result) => {
        console.warn('result', result);
      },
      (error) => {
        console.error('Error submitting data:', error);
      }
    );
}







}

