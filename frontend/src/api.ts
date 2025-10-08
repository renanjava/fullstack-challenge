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
    console.error('Erro ao buscar usuários:', error)
  }
}
