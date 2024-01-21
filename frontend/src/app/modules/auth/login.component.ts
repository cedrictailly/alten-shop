import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";
import { MessageService } from 'primeng/api';
import { Router } from "@angular/router";

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  visible = false;
  error   = '';
  form    = new FormGroup({
    email: new FormControl('test@example.com'),
    password: new FormControl('admin123'),
  });

  constructor(
    public  authService   : AuthService,
    private messageService: MessageService,
    private router        : Router,
  ) { }

  ngOnInit(): void {
    this.authService.isLogged();
  }

  onOpen() {
    this.error   = '';
    this.visible = true;
  }

  onClose() {
    this.visible = false;
  }

  onLogin() {
    this.authService.login({
      email   : this.form.value.email!,
      password: this.form.value.password!,
    }).subscribe({
      next: () => {

        this.visible = false;

        this.messageService.add({
          severity:'success',
          summary:'Connecté',
          detail:'Vous pouvez maintenant éditer les produits',
        });
      },
      error: () => {
        this.error = "Email ou mot de passe inccorect"
      },
    });
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary : 'Déconnecté',
          detail  : 'Vous ne pouvez plus éditer les produits',
        });

        this.router.navigate(['/']);
      },
    });
  }
}
