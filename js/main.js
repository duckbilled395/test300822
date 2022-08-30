import {validateNames} from "./validateName";

const onUploadHandler = () => {
    const fileSelector = document.querySelector('#file-input');
    fileSelector.addEventListener('change', (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
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
        const formData = new FormData(form)
        const name = formData.get('name')
        console.log(validateNames(name))
        const message = formData.get('message')
        console.log(name, message)
    })
}
handleOnSubmit()