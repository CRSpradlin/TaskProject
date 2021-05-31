import { FormGroup } from '@angular/forms';
    
export function EqualityValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.equalityValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ equalityValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}