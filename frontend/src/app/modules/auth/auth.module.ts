import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [ LoginComponent ],
  exports     : [ LoginComponent ],
  bootstrap   : [ LoginComponent ],
  providers   : [ AuthService ],
  imports: [
    AvatarGroupModule,
    AvatarModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    ReactiveFormsModule,
    ToastModule,
  ]
})
export class AuthModule { }
