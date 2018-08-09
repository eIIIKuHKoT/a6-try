import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Meta, Title} from "@angular/platform-browser";

import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {Message} from "../../shared/models/message.model";
import {PrefilledUser} from "../../shared/models/prefilled-user.model";
import {FirestoreService} from "../../shared/services/firestore.service";


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
              private meta: Meta,
              private db: FirestoreService) {
    title.setTitle('Регистрация');
    meta.addTags([
      {name: 'keywords', content: 'sign-up,регистрация'},
      {name: 'description', content: 'страница для регистрации'}
    ]);
  }

  ngOnInit() {

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {

    const col = this.db.col('users');

    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.db.add(col, {email, password, name})
      .then(result => {
        console.log(result);
      });
/*
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
    });*/
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getPrefilledUserByEmail(control.value)
        .then((prefUser: PrefilledUser) => {
          if (!prefUser) {
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
