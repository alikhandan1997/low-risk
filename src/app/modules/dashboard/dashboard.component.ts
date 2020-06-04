import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('content_box') content_box: ElementRef;

  // form = new FormData();
  // public imagePath;
  // imgURL: any;
  // public message: string;

  constructor( private renderer: Renderer2) { }


userForm = new FormGroup({
  name: new FormControl(),
  age: new FormControl('20')
});

  ngOnInit(): void {
  }

  addImage() {
    this.content_box.nativeElement.innerHTML = `
    Age: <input formControlName="age"  placeholder="Enter Age">
    `;
    // const input: HTMLInputElement = this.renderer.createElement('input');
    // input.setAttribute('formControlName', 'age');
    // this.renderer.appendChild(this.content_box.nativeElement, input);
    // const inputContainer: HTMLDivElement = this.renderer.createElement('div');
    // const imageContainer: HTMLDivElement = this.renderer.createElement('div');
    // const input: HTMLInputElement = this.renderer.createElement('input');
    // const image: HTMLImageElement = this.renderer.createElement('img');

    // inputContainer.className = "col-lg-12";
    // imageContainer.className = "col-lg-12";

    // input.type = 'file';
    // input.addEventListener("change", function loadFile(event) {
    //   // console.log((<HTMLInputElement>event.target).files)
    //   this.form.append('photo', `${(<HTMLInputElement>event.target).files}`)
    //   image.src = URL.createObjectURL((<HTMLInputElement>event.target).files[0]);
    //   image.onload = function() {
    //     URL.revokeObjectURL(image.src) // free memory
    //   }
    //   imageContainer.appendChild(image);
    // })

    // this.renderer.appendChild(this.content_box.nativeElement, inputContainer);
    // inputContainer.appendChild(input);
    // this.renderer.appendChild(this.content_box.nativeElement, imageContainer);
  }

  addText() {
    // const textContainer: HTMLDivElement = this.renderer.createElement('div');
    // const textarea: HTMLTextAreaElement = this.renderer.createElement('textarea');

    // textContainer.className = "col-lg-12";
    // textarea.addEventListener("change", function loadFile(event) {
    //   // console.log((<HTMLInputElement>event.target).value)

    // })

    // this.renderer.appendChild(this.content_box.nativeElement, textContainer);
    // textContainer.appendChild(textarea);
  }

  onFormSubmit(): void {
    console.log('Name:' + this.userForm.get('name').value);
}

}
