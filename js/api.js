// Todas as chamadas ao back-end passam por essa função.
// Se a porta ou o endereço do back-end mudar, só precisa trocar aqui.

const API_BASE = 'http://localhost:8080/api';

/**
 * Faz uma requisição para a API.
 * @param {string} path - ex: '/users/login'
 * @param {string} method - 'GET' | 'POST' | 'PUT' | 'DELETE'
 * @param {object|null} body - objeto que vai ser enviado como JSON
 */
async function apiRequest(path, method = 'GET', body = null) {
  const options = { method, headers: {} };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, options);
  } catch (networkError) {
    // Isso acontece quando o back-end não está rodando
    return {
      ok: false,
      status: 0,
      data: { success: false, message: 'Não foi possível conectar ao servidor. Ele está rodando?' }
    };
  }

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  return { ok: response.ok, status: response.status, data };
}
