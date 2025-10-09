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

export async function getTasksEndPoint() {
  try {
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'GET',
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
  }
}

export async function getProjectsEndPoint() {
  try {
    const res = await fetch('http://localhost:3000/projects', {
      method: 'GET',
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
  }
}

export async function getCollaboratorsEndPoint() {
  try {
    const res = await fetch('http://localhost:3000/collaborators', {
      method: 'GET',
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao buscar colaboradores:', error)
  }
}

export async function getUsersEndPoint() {
  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'GET',
    })
    const response = await res.json()
    return response
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
  }
}
