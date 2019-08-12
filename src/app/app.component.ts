import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

declare const gapi:any;

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'my-auth-token',

  })
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private http: HttpClient,
  ){}

  public gID: number;
  public name: string;
  public imageURL: string;
  public email: string;
  private url: string = "http://192.168.0.8:8000/user";

  regForm= new FormGroup({
    name: new FormControl(''),
    mobile_number: new FormControl(''),
    year_of_study: new FormControl('First'),
    gender:new FormControl('Male'),
    permanent_address:new FormControl('Mumbai'),
    zip_code:new FormControl(142453),
    google_id:new FormControl("243434"),
    email:new FormControl("dfsf@gmail.com"),
    present_city:new FormControl('Mumbai'),
    present_college:new FormControl('Mumbai'),
    postal_address:new FormControl('Bombay'),
    dob:new FormControl('111'),
    cr_referral_code:new FormControl('')


  })

  onSubmit(){
    this.regForm.patchValue({
      email: this.email,
      google_id: this.gID
    })
    console.log(this.regForm.value);
    this.http.post('http://192.168.0.8:8000/user/create',this.regForm.value,httpOptions)
      .subscribe(data =>
      console.log(data));
    document.getElementById("hidePopup").click();
  }

  public regAlready: boolean = false;
  public target= 'none';

  

 
 

  title = 'multicity2k19';
  public auth2:any;
  public googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '511498944970-b2g59f8sj5h2c20vhkim5tkrpcn9sckc.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile',
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element){
    this.auth2.attachClickHandler(element, {},
      (googleUser)=> {
        let profile=googleUser.getBasicProfile();
        this.gID=profile.getId();
        this.name= profile.getName();
        this.imageURL=profile.getImageUrl();
        this.email=profile.getEmail();
        this.onClick();
      });
  }

  onClick(){
    this.http.get(this.url+'/'+this.gID)
    .subscribe(
      data => document.getElementById("openProfileButton").click(),
        error => document.getElementById("openFormButton").click()
    
    )
  }


  ngAfterViewInit(){
    this.googleInit();
  }
}
