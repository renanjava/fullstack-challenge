import { API_URL } from '@/constants/constants'

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function loginEndPoint(username: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
  }
}

export async function getGenericEndPoint(entity: string) {
  try {
    const res = await fetch(`${API_URL}/${entity}`, {
      method: 'GET',
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao buscar:', error)
  }
}

export async function postGenericEndPoint(entity: string, data: Record<string, any>) {
  try {
    const res = await fetch(`${API_URL}/${entity}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao criar:', error)
  }
}

export async function patchGenericEndPoint(
  entity: string,
  entityId: string,
  data: Record<string, any>,
) {
  try {
    const res = await fetch(`${API_URL}/${entity}/${entityId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao atualizar:', error)
  }
}

export async function deleteGenericEndPoint(entity: string, entityId: string) {
  try {
    const res = await fetch(`${API_URL}/${entity}/${entityId}`, {
      method: 'DELETE',
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao deletar:', error)
  }
}
