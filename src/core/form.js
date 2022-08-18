export class Form {
    constructor(formContainer, controls) {
        this.formContainer = formContainer
        this.controls = controls
    }

    value() {
        const value = {}
        Object.keys(this.controls).forEach(control => {
            value[control] = this.formContainer[control].value
            //console.log(this.formContainer[control])
        })
        return value
    }

    clear() {
        Object.keys(this.controls).forEach(control => {
            this.formContainer[control].value = ''
        })
    }

    isValid() {
        let isFormValid = true
        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control]
            let isValid = true

            validators.forEach(validator => {
                isValid = validator(this.formContainer[control].value) && isValid
            })

            isValid ? clearError(this.formContainer[control]) : setError(this.formContainer[control])
            isFormValid = isFormValid && isValid
        })

        return isFormValid
    }
}

function setError($control) {
    clearError($control)
    const error = `<p class="validation-error">Введите корректное значение</p>`
    $control.classList.add('invalid')
    $control.insertAdjacentHTML('afterend', error)

    //console.log($control.nextSibling)
}

function clearError($control) {
    $control.classList.remove('invalid')
    if ($control.nextSibling) {
        $control.closest('.form-control').removeChild($control.nextSibling)
    }
    //console.log($control.nextSibling)
}