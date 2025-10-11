/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Ref } from 'vue'
import { deleteGenericEndPoint } from '@/api/api'

interface CrudOptions<T> {
  listRef: Ref<T[]>
  onEdit: (item: T) => void
  onCreate: () => void
}

export function useCrudOperations<T extends { id: string | number }>(
  entityName: string,
  options: CrudOptions<T>,
) {
  const { listRef, onEdit, onCreate } = options

  async function handleCrudOperation(data: Record<string, any>) {
    switch (data.event) {
      case 'delete':
        await deleteGenericEndPoint(entityName, data.item.id)
        listRef.value = listRef.value.filter((item: T) => item.id !== data.item.id)
        break
      case 'edit':
        onEdit(data.item)
        break
      case 'create':
        onCreate()
        break
    }
  }

  return {
    handleCrudOperation,
  }
}
