import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Modo demonstração - credenciais válidas para apresentação
    const validUsers = {
      'admin@clinica.com': { password: '123456', username: 'Dr. Erick Martins', role: 'Administrador' },
      'medico@clinica.com': { password: '123456', username: 'Dr. Carlos Mendes', role: 'Médico' },
      'recepcionista@clinica.com': { password: '123456', username: 'Ana Souza', role: 'Recepcionista' },
    };

    // Simula um pequeno delay para parecer autenticação real
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = validUsers[username];
    if (user && user.password === password) {
      const token = 'demo_token_' + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username: user.username, role: user.role }));
      navigate('/');
    } else {
      setError('Credenciais inválidas. Verifique seu usuário e senha.');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>SGAM</h1>
          <p>Sistema de Gestão de Atendimento Médico</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
