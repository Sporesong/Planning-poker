export class TaskManager {
  public tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task)
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}

export class Task {
  constructor(
    public title: string,
    public description: string = ''
  ) {}
}