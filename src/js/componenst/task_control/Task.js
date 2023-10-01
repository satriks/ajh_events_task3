export default class Task {
  constructor (text, checked = false) {
    this.text = text
    this.checked = checked
  }

  get container () {
    const item = document.createElement('div')
    item.classList.add('task-form__item')
    const itemText = document.createElement('p')
    itemText.innerText = this.text
    const itemCheckbox = document.createElement('input')
    itemCheckbox.type = 'checkbox'
    itemCheckbox.classList.add('task-form__pinned-checkbox')
    itemCheckbox.checked = this.checked

    item.appendChild(itemText)
    item.appendChild(itemCheckbox)

    return item
  }
}
