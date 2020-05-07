import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare let pendo: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isAuthorized = true;
  // just need any API URL so we can get a response...doesn't need to be anything specific
  private apiUrl = 'https://api.github.com/users/godfathr';

  constructor(private router: Router, private ngZone: NgZone, private httpClient: HttpClient) { }

  ngOnInit() {
    this.onAuthorizationResultComplete(this.isAuthorized);
  }

  private onAuthorizationResultComplete(authorizationResult: boolean) {

    if (!authorizationResult) {
        console.log('I am not authorized');
    } else {
      console.log('I am authorized');
      // After verifying that a user is authorized, we put the pendo.initialize inside whatever
      // method we need for our app. In this case, it's a redirect to a landing page.
      // They important thing here is to remember not to include the API key with the initialize method.
      this.httpClient.get(this.apiUrl, {}).subscribe(r => {
            pendo.initialize({
                visitor: {
                    id: 'VISITOR-UNIQUE-ID-test'
                },
                account: {
                    id: 'ACCOUNT-UNIQUE-ID-test'
                }
            });

            this.router.navigate(['/authorized']);
        });
    }
  }
}
