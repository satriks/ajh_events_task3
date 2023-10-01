export default class FilterWidget {
  constructor (tasks) {
    this.form = document.querySelector('.task-form__head')
    this.input = document.querySelector('.task-form__search')

    this.filterTasks = tasks

    this.form.addEventListener('input', this.onInput)
  }

  onInput = (event) => {
    const allTask = [...this.filterTasks]
    const filter = allTask.filter(el => el.text.toLowerCase().startsWith(this.input.value.toLowerCase()))
    const filterEmpty = document.querySelector('.task-form__filter-empty')

    if (this.input.value.trim()) {
      if (filter.length) {
        filterEmpty.classList.add('hidden')
      } else {
        filterEmpty.classList.remove('hidden')
      }
      this.renderTask(filter)
    } else {
      filterEmpty.classList.add('hidden')
      this.renderTask(this.filterTasks)
    }
  }

  renderTask (tasks) {
    document.querySelector('.task-form__task-list').querySelectorAll('.task-form__item').forEach(el => el.remove())
    tasks.forEach(el => document.querySelector('.task-form__task-list').insertAdjacentElement('beforeend', el.container))
  }
}
