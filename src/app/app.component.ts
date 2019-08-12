import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const gapi:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public regAlready: boolean = false;
  public target= 'none';

  constructor(
    private http: HttpClient,
  ){}

  public gID: number;
  public name: string;
  public imageURL: string;
  public email: string;
  private url: string = "http://api2.moodi.org/user";

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
