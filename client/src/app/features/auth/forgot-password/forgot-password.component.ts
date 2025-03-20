import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      
      // Password reset request logic will be implemented later
      console.log('Reset password for email:', this.forgotPasswordForm.value.email);
      
      // Mock successful request
      setTimeout(() => {
        this.isLoading = false;
        this.message = 'If an account exists for this email, you will receive password reset instructions.';
        this.forgotPasswordForm.reset();
      }, 1500);
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
