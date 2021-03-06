import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";
import {AuthService} from "../../shared/services/auth.service";
import {fadeStateTrigger} from "../../shared/animations/fade.animation";



@Component({
  selector: 'ek-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private userService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private meta: Meta) {
    title.setTitle('Вход в систему')
    meta.addTags([
      {name: 'keywords', content: 'login,вход,система'},
      {name: 'description', content: 'страница для входа в систему'}
    ]);
  }

  ngOnInit() {
    this.message = new Message('', 'danger');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage({text: 'Now you cant log-in', type: 'success'});
      } else if (params['accessDenied']) {
        this.showMessage({text: 'You need Log-in', type: 'warning'});
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6),

      ])
    });
  }

  onSubmit() {
    const formData = this.form.value;

    this.authService.signInRegular(formData.email, formData.password)
      .then((res) => {
        console.log(res.user.providerData);

        this.router.navigate(['/system', 'bill']);
      })
      .catch((err) => {
        this.showMessage({text: err.message, type: "danger"});
      });
  }

    /*this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({text: 'Wrong password', type: "danger"});
          }
        } else {
          this.showMessage({text: 'User not found', type: "danger"});
        }
      });
  }
*/

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }
}
