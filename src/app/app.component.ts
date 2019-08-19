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

  mqueries = `<b>What about the eliminations of other competitions?</b><br>
  <p>Eliminations to all other competitions will be conducted online or during Mood Indigo. Follow our Facebook page facebook.com/iitb.moodindigo/ and Instagram page https://www.instagram.com/iitbombay.moodi/ for regular updates.</p>

  <b>There is no Multicity in my city. How can I participate?</b><br>
  <p>Eliminations will either be conducted online or during Mood Indigo. Follow our Facebook page facebook.com/iitb.moodindigo/ and Instagram page https://www.instagram.com/iitbombay.moodi/ for regular updates.</p>

  <b>Who can participate in these competitions?</b><br>
  <p>Any college student can take part in these competitions. There is no registration fee for participations.</p>

  <b>What is Muliticity Championship?</b><br>
  <p>1 college team from every city shall be crowned 'Multicity Champion' based on level of their performances.</p>

  <b>Are on-spot registrations allowed?</b><br>
  <p>It is advised that you register in advance to confirm your slot as there are limited slots available</p>
  
  <b>Can I participate in these competitions directly during Mood Indigo?</b><br>
  <p>If there is a Multicity happening in your city, it is advised that you participate in the Multicity eliminations itelf. Getting a slot on-ground for these cities will be very difficult.</p>`;

  hqueries = `<b>What about the eliminations of other competitions?</b><br>
  <p>Eliminations to all other competitions will be conducted online or during Mood Indigo. Follow our Facebook page facebook.com/iitb.moodindigo/ and Instagram page https://www.instagram.com/iitbombay.moodi/ for regular updates.</p>

  <b>There is no Multicity in my city. How can I participate?</b><br>
  <p>Eliminations will either be conducted online or during Mood Indigo. Follow our Facebook page facebook.com/iitb.moodindigo/ and Instagram page https://www.instagram.com/iitbombay.moodi/ for regular updates.</p>
  
  <b>Who can participate in Hysteria?</b><br>
  <p>Anyone can take part in Hysteria. There is no registration fee for participations.</p>
  
  <b>Are on-spot registrations allowed?</b><br>
  <p>No.</p>
  
  <b>Can I participate in these competitions directly during Mood Indigo?</b><br>
  <p>If there is a Multicity happening in your city, it is advised that you participate in the Multicity eliminations itelf. Getting a slot on-ground for these cities will be very difficult.</p>`;
}
