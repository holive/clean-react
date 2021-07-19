export interface FieldValidation {
  field: string
  validate: (field: object) => Error
}
