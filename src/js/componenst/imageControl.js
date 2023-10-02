import FormImage from './Images/Image'

export default class ImageControl {
  constructor () {
    this.form = document.querySelector('.image-form')
    this.inputName = document.querySelector('.image-form__name input')
    this.inputUrl = document.querySelector('.image-form__url input')
    this.imagePlase = document.querySelector('.images')

    this.form.addEventListener('submit', this.onSubmit)
    this.imagePlase.addEventListener('click', this.onClose)
  }

  onSubmit = (event) => {
    event.preventDefault()

    const image = new FormImage(this.inputUrl.value)
    image.img.addEventListener('error', this.errorImage)

    this.imagePlase.insertAdjacentElement('beforeend', image.url)
    this.form.reset()
  }

  errorImage = (event) => {
    document.querySelector('.error-url').classList.remove('hidden')
    setTimeout(() => {
      document.querySelector('.error-url').classList.add('hidden')
    }, 2000)
    event.target.closest('.image-wrapper').remove()
  }

  onClose = (event) => {
    if (event.target.classList.contains('close')) {
      event.target.closest('.image-wrapper').remove()
    }
  }
}
