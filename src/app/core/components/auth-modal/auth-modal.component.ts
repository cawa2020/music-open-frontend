import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Error, Token } from '../../../shared/interfaces/auth.interface';
import { CookieService } from '../../services/cookie.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css',
})
export class AuthModalComponent implements OnInit {
  @Input({ required: true }) type!: "login" | "registration"
  @Output() onCloseModal = new EventEmitter()
  public form!: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private cookieService: CookieService, private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    if (this.type === 'registration') {
      this.form.addControl('username', new FormControl())
    }
  }

  submit() {
    const value = this.form.value
    if (this.type === 'login') {
      this.auth.login(value).subscribe((res) => this.handleRes(res))
    } else {
      this.auth.registration(value).subscribe((res) => this.handleRes(res))
    }
  }

  closeModal() {
    this.onCloseModal.next(null)
  }

  private handleRes(res: any) {
    if (res?.statusCode) {
      console.log('error')
      return
    }

    const token = res.access_token
    this.cookieService.set('access_token', token)
    this.userService.fetchUserData(token).subscribe(user => {
      this.userService.setUser(user)
      location.reload()
    })
  }
}
