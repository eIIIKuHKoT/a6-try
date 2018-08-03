import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";

@Component({
  selector: 'ek-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.message = new Message('', 'danger');

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

    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            // logic
          } else {
            this.showMessage('Wrong password');
          }
        } else  {
          this.showMessage('User not found');
        }
      });
  }


  private showMessage(text: string, type: string = 'danger') {
     this.message = new Message(type, text);
     window.setTimeout(() => {
       this.message.text = '';
     }, 5000);
  }
}