import { Component, ChangeDetectorRef } from '@angular/core';
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
    private cdRef:ChangeDetectorRef,
  ){}

 
  queries = `What about the eliminations of other competitions?<br>
  Eliminations to all other competitions will be conducted online or during Mood Indigo. Follow our Facebook page facebook.com/iitb.moodindigo/ and Instagram page https://www.instagram.com/iitbombay.moodi/ for regular updates.
  
  There is no Multicity in my city. How can I participate?
  Eliminations will either be conducted online or during Mood Indigo. Follow our Facebook page facebook.com/iitb.moodindigo/ and Instagram page https://www.instagram.com/iitbombay.moodi/  for regular updates.
  
  Who can participate in these competitions?
  Any college student can take part in these competitions. There is no registration fee for participation.
  
  What is Multicity Championship?
  1 college team from every city shall be crowned ‘Multicity Champion’ based on level of their performances.
  
  Are on-spot registrations allowed?
  It is advised that you register in advance to confirm your slot as there are minimum slots available.
  
  Can I participate in these competitions directly during Mood Indigo?
  If there is a Multicity happening in your city, it is advised that you participate in the Multicity eliminations itself. Getting a slot on-ground for these cities will be very difficult.`;
 
  public my_team_names:any;
  public elementid:any='ISB';

  public leader_names:any;
  public is_leader_names:any;
  public status: boolean=false;
  public gID: string;
  public name: string;
  public imageURL: string;
  public email: string;
  private url: string = "http://api2.moodi.org/user";
  component = this;
  gender =['male','female']

  regForm= new FormGroup({
    name: new FormControl(''),
    mobile_number: new FormControl(''),
    year_of_study: new FormControl('First'),
    gender:new FormControl(''),
    zip_code:new FormControl(''),
    google_id:new FormControl("243434"),
    email:new FormControl("dfsf@gmail.com"),
    present_city:new FormControl(''),
    present_college:new FormControl(''),
    postal_address:new FormControl(''),
    dob:new FormControl('111'),
    cr_referral_code:new FormControl('')
    

  })

  onSubmit(){
    this.regForm.patchValue({
      email: this.email,
      google_id: this.gID
    })
    
    this.http.post('http://api2.moodi.org/user/create',this.regForm.value,httpOptions)
    .subscribe(result =>
      {
        document.getElementById("hidePopup").click();
        this.status=true;
        this.cdRef.detectChanges();
      },
      data => {
        console.log(data["error"])
      alert(JSON.stringify(data["error"]))
      },
      () => {
      }
      );
    
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

    document.getElementById(this.elementid).click();
        let profile=googleUser.getBasicProfile();
        this.gID=profile.getId();
        this.name= profile.getName();
        this.imageURL=profile.getImageUrl();
        this.email=profile.getEmail();
        console.log(this.gID)


    this.my_team_names= null
    this.is_leader_names=null;
    this.leader_names=null;
    this.status =false;

        this.onClick();
        this.cdRef.detectChanges();
      });
  }

  onClick(){
    this.http.get(this.url+'/'+this.gID)
    .subscribe(
      data => {
        document.getElementById("openProfileButton").click()
        this.status=true;
        this.cdRef.detectChanges();
        },
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
  <p>Any college student can take part in these competitions. There is no registration fee for participation.</p>

  <b>What is Multicity Championship?</b><br>
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
  <p>Anyone can take part in Hysteria. There is no registration fee for participation.</p>
  
  <b>Are on-spot registrations allowed?</b><br>
  <p>No.</p>
  
  <b>Can I participate in these competitions directly during Mood Indigo?</b><br>
  <p>If there is a Multicity happening in your city, it is advised that you participate in the Multicity eliminations itelf. Getting a slot on-ground for these cities will be very difficult.</p>`;
  // ***********************************************************************************************

  public create_team(eventid) {
    
    console.log("ok")
    this.http.post('http://api2.moodi.org/team/create_team/'+this.gID, {
      mobile_number :"323232323",
      multicity:"2323232",
      event_id: eventid,
     })
      .subscribe(result =>
      {
      this.my_team(eventid)
      },
      error => {
      alert(error["error"]["detail"])
      },
      () => {
      }
    );
  }

  public add_member(number, eventid){
    console.log(number)
    this.http.post('http://api2.moodi.org/team/add_member/'+this.gID, {
      event_id: eventid,
      member_number: number
     })
      .subscribe(result =>{
      this.my_team(eventid)},
      data => {
        console.log(data)
        alert(data["error"]["detail"])
        },
        () => {
        }
      ); 
  }

  public exit_team(number, eventid){
    console.log(number)
    this.http.post('http://api2.moodi.org/team/exit_team/'+this.gID, {
      event_id: eventid,
      number: number
     })
      .subscribe(result =>{
      this.my_team(eventid)
      },
      error => {
        console.log(error)
        alert(error)
        },
        () => {
        }
      );
    }

  public my_team(eventid){
    this.http.get('http://api2.moodi.org/team/is_leader/'+this.gID+"?event="+eventid)
    .subscribe(
      data => {
        this.is_leader_names=data['members']
        this.leader_names=data
        this.cdRef.detectChanges();
        },
        error => {console.log(this.is_leader_names)
    this.my_team_names= null
    this.is_leader_names=null;
    this.leader_names=null;
        }
    )

    this.http.get('http://api2.moodi.org/team/my_team/'+this.gID+"?event="+eventid)
    .subscribe(
      data1 => {
        this.my_team_names=data1['members']
        this.leader_names=data1
        this.cdRef.detectChanges();
        },
        error => console.log(this.is_leader_names)
    )

  }
  public go_home(id : string){
    this.elementid=id;

    document.getElementById(this.elementid).click();
    document.getElementById("googleBtn").click();

  }

}
