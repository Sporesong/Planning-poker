export class TaskManager {
  public tasks: Task[] = [];
  public index = 0;

  addTask(task: Task) {
    this.tasks.push(task)
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
  updateIndex() {
    this.index++;
  }
}

export class Task {
  constructor(
    public title: string,
    public description: string = ''
  ) {}
}