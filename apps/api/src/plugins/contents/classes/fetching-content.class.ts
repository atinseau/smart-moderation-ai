


export abstract class FetchingContent {
  constructor(
    protected readonly token: string
  ) { }
  abstract fetchContent(taskId: string, userId: string): void
}
