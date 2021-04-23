export class UnexpectedError extends Error {
  constructor() {
    super('Something wrong happened. Try again later?')
    this.name = 'UnexpectedError'
  }
}
