import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from './UploadAdapter';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  public Editor = ClassicEditor;
  ckeditorContent = "";
  imageSrc: any = '';
  mainImage;
  mainDesc;
  mainTitle;
  postData;

  @ViewChild('preView') dataContainer: ElementRef;

  constructor(private http: ServicesService) { }

  ngOnInit(): void {
  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }

  readURL(event: Event): void {
    if ((<HTMLInputElement>event.target).files && (<HTMLInputElement>event.target).files[0]) {
        const file = (<HTMLInputElement>event.target).files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;
        }
        reader.readAsDataURL(file);
    }
  }

  loadData() {
    // this.dataContainer.nativeElement.innerHTML = this.ckeditorContent;
    this.postData = {
      title: this.mainTitle,
      description: this.mainDesc,
      image: this.mainImage,
      content: this.ckeditorContent
    }
  }

  send(){
    this.http.postPosts(this.postData).subscribe((data) => {
      console.log(data);
    });
  }

}
