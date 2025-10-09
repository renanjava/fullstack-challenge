export async function loginEndPoint(username: string, password: string) {
  try {
    const res = await fetch('http://localhost:3000/auth/login', {
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
    const res = await fetch(`http://localhost:3000/${entity}`, {
      method: 'GET',
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao buscar:', error)
  }
}