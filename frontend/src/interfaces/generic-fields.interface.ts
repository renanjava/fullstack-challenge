export interface IFields {
  name: string
  label: string
  type: string
  required: boolean
  options?: Array<Record<string, any>>
  editValue?: string
}
