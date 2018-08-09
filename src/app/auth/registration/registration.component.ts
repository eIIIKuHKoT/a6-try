import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Meta, Title} from "@angular/platform-browser";

import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {Message} from "../../shared/models/message.model";


@Component({
  selector: 'ek-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private usersService: UsersService,
              private router: Router,
              private title: Title,
              private authService: AuthService,
              private meta: Meta) {
    title.setTitle('Регистрация');
    meta.addTags([
      {name: 'keywords', content: 'sign-up,регистрация'},
      {name: 'description', content: 'страница для регистрации'}
    ]);
  }

  ngOnInit() {

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.authService.signUpRegular(email, password)
      .then((response) => {
        return response.user.updateProfile({
          displayName: name,
          photoURL: ''
        });
      }).then(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        });
    }).catch(err => {
      this.showMessage({text: err.message, type: "danger"});
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({'forbiddenEmail': true});
          } else {
            resolve(null);
          }
        });
    });

  }
  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

}
