export class TaskManager {
  public tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task)
  }
}

export class Task {
  constructor(
    public title: string,
    public description: string = ''
  ) {}
}