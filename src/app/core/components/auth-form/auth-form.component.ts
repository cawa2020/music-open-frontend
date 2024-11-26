import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from '../../services/cookie.service';
import { UserApiService } from '../../services/user-api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  @Input({ required: true }) type!: "login" | "registration"
  public form!: FormGroup

  constructor(
    private userApiService: UserApiService,
    private fb: FormBuilder, private auth: AuthService, private cookieService: CookieService, private userService: UserService) { }

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

  private handleRes(res: any) {
    if (res?.statusCode) {
      console.log('error')
      return
    }

    const token = res.access_token
    this.cookieService.set('access_token', token)
    this.userApiService.fetchUserDataByToken(token).subscribe(user => {
      if (!user) return
      this.userService.setUser(user)
      location.reload()
    })
  }
}
