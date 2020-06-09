export class UploadAdapter {
  private loader;
  constructor( loader ) {
     this.loader = loader;
  }

  upload() {
     return this.loader.file
           .then( file => new Promise( ( resolve, reject ) => {
                 var myReader= new FileReader();
                 myReader.onloadend = (e) => {
                  let image = myReader.result;
                  resolve({ default: image });
                 }
                 myReader.readAsDataURL(file);
           } ) );
  };
}
