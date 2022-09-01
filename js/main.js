const nameError = document.querySelector('.name_error')
const surnameError = document.querySelector('.surname_error')
const emailError = document.querySelector('.email_error')
const phoneError = document.querySelector('.phone_error')
const mesError = document.querySelector('.message_error')

const isEmailReg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
const isNumbersReg = (/^[0-9]+$/)
const lettersOnlyReg = (/^[A-Za-z]+$/)

let filePhoto
// Upload and preview photo
const onUploadHandler = () => {
    const fileSelector = document.querySelector('#file-input');
    fileSelector.addEventListener('change', (e) => {
        filePhoto = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(filePhoto);
        const previewPic = document.querySelector('.preview')
        reader.addEventListener('load', (event) => {
            previewPic.src = event.target.result;
        });
    })
}
onUploadHandler()

const handleOnSubmit = () => {
    const form = document.querySelector('#form-container')
    form.addEventListener('submit', e => {
        e.preventDefault();
        // Adding main information
        const formData = new FormData(form)

        const name = formData.get('name')
        validateName(name)

        const surname = formData.get('surname')
        validateSurname(surname)

        const email = formData.get('email')
        validateEmail(email)

        const phone = formData.get('phone')
        validatePhone(phone)

        const message = formData.get('message')
        validateMessage(message)
        let dataArr = [{name: 'First name: ' + name.trim()},
            {surname: 'LastName: ' + surname.trim()},
            {email: 'Email: ' + email.trim()},
            {phone: 'Phone: ' + phone},
            {message: 'Message: ' + message}]

        // Adding additional information
        const newMessages = document.querySelectorAll('.mesGeneral')
        for (let i = 0; i < newMessages.length; i++) {
            dataArr.push({nameOfNewMes: 'Additional information: ' + newMessages[i].value})
        }
        // Creating modal with resume
        const modal = document.querySelector('.modal')
        if (mesError.innerHTML === '' && phoneError.innerHTML === '' && emailError.innerHTML === '' && surnameError.innerHTML === '' && nameError.innerHTML === '') {
            modal.classList.add('modal_active')
            // Adding photo
            if (filePhoto) {
                const reader = new FileReader();
                reader.readAsDataURL(filePhoto);
                const previewPic = document.querySelector('.resumePicture')
                reader.addEventListener('load', (event) => {
                    previewPic.src = event.target.result;
                });
            }
            // Creating resume blocks
            dataArr.map(el => {
                const div = document.createElement('div')
                console.log(Object.values(el))
                div.innerHTML = Object.values(el)[0]
                div.classList.add('modal_part')
                modal.appendChild(div)
            })
            document.querySelector('.preview').classList.add('displayNone')
        }

    })
}
handleOnSubmit()

// Add new textarea for additional information
const handleOnClickAddMoreInfoBtn = () => {
    const addMoreInfoBtn = document.querySelector('.addNewSection')
    const newInfoBox = document.querySelector('.newInfoBox')
    let count = 0
    addMoreInfoBtn.addEventListener('click', (e) => {
        count++
        const newTextarea = document.createElement('textarea')
        newTextarea.setAttribute('class', 'mesGeneral')
        newTextarea.setAttribute('id', 'mes' + count)
        newTextarea.setAttribute('name', 'mes' + count)
        newInfoBox.appendChild(newTextarea)
    })
}
handleOnClickAddMoreInfoBtn()

// First name and surname validation schema
const validateName = (newName) => {
    if (!newName) return nameError.innerHTML = 'Required'
    const names = newName.trim()

    if (!lettersOnlyReg.test(names.replaceAll(' ', ''))) {
        return nameError.innerHTML = 'Name should consist of only letters'
    }

    const firstName = names.split(' ')[0]
    if (firstName.length < 3 || firstName.length > 30) return nameError.innerHTML = 'First name is out of range'

    return nameError.innerHTML = ''
}

// Surname validation schema
const validateSurname = (newSurname) => {
    if (!newSurname) return surnameError.innerHTML = 'Required'
    const names = newSurname.trim()

    if (!lettersOnlyReg.test(names.replaceAll(' ', ''))) {
        return surnameError.innerHTML = 'Name should consist of only letters'
    }

    const firstName = names.split(' ')[0]
    if (firstName.length < 3 || firstName.length > 30) return surnameError.innerHTML = 'First name is out of range'

    return surnameError.innerHTML = ''
}

// Email validation schema
const validateEmail = (newEmail) => {
    const email = newEmail.trim()

    if (!email) return emailError.innerHTML = 'Email is required'
    if (!isEmailReg.test(email)) return emailError.innerHTML = 'Email is invalid'

    return emailError.innerHTML = ''
}

// Phone validation schema
const validatePhone = (newPhone) => {
    if (!newPhone) return phoneError.innerHTML = 'Phone is required'
    const phone = newPhone.trim()
    if (!isNumbersReg.test(phone)) return phoneError.innerHTML = 'Error: Phone should consist of only numbers'

    if (phone.length < 2 || phone.length > 13) return phoneError.innerHTML = 'Error: Phone is out of range'

    return phoneError.innerHTML = ''
}

// Message validation
const validateMessage = (newMessage) => {
    const message = newMessage.trim()

    if (message.length < 10 || message.length > 100) return mesError.innerHTML = 'Message is out of range'

    return mesError.innerHTML = ''
}


