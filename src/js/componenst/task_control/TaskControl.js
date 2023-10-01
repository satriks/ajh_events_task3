import Task from './Task'
import FilterWidget from '../filter/FilterWidget'

class TaskControl {
  constructor () {
    this.mainForm = document.querySelector('.task-form')
    this.inputConteiner = document.querySelector('.task-form__head')
    this.pinList = document.querySelector('.task-form__pinned')
    this.taskList = document.querySelector('.task-form__task-list')

    this.tasks = [new Task('Задача 1'), new Task('Новая задача'), new Task('Задача 3', true)]
    this.pinnedTasks = []
    this.othersTasks = []
    this.filter = new FilterWidget(this.othersTasks)

    this._sortTask()
    this._renderTask()

    this.inputConteiner.addEventListener('submit', this.onEnter)
    this.mainForm.addEventListener('change', this.onChange)
  }

  _renderTask () {
    document.querySelectorAll('.task-form__item').forEach(el => el.remove())
    const pinEmpty = document.querySelector('.task-form__pinned-empty')
    if (this.pinnedTasks.length) {
      pinEmpty.classList.add('hidden')
      this.pinnedTasks.forEach(el => this.pinList.insertAdjacentElement('beforeend', el.container))
    } else { pinEmpty.classList.remove('hidden') }
    if (document.querySelector('.task-form__search').value.trim()) {
      this.filter.onInput()
    } else {
      document.querySelector('.task-form__filter-empty').classList.add('hidden')
      this.othersTasks.forEach(el => this.taskList.insertAdjacentElement('beforeend', el.container))
    }
  }

  _sortTask () {
    this.pinnedTasks = this.tasks.filter(el => el.checked)
    this.othersTasks = this.tasks.filter(el => !el.checked)
    this.filter.filterTasks = this.othersTasks
  }

  onEnter = (event) => {
    event.preventDefault()
    const text = event.target.querySelector('.task-form__search').value.trim()
    if (!text) {
      const message = document.querySelector('.no-text')
      message.classList.remove('hidden')

      setTimeout(this._hide, 1500)

      return
    }
    const task = new Task(text)
    this.tasks = [...this.tasks, task]
    document.querySelector('.task-form__search').value = ''
    this._sortTask()
    this._renderTask()
  }

  onChange = (event) => {
    if (event.target.classList.contains('task-form__pinned-checkbox')) {
      const taskConteiner = event.target.closest('.task-form__item')
      const taskText = taskConteiner.querySelector('p').innerText

      taskConteiner.remove()
      if (event.target.checked) {
        this.tasks.filter(el => el.text === taskText)[0].checked = true
      } else {
        this.tasks.filter(el => el.text === taskText)[0].checked = false
      }
      this._sortTask()
      this._renderTask()
    }
  }

  _hide () {
    document.querySelector('.no-text').classList.add('hidden')
  }
}

export const control = new TaskControl()
