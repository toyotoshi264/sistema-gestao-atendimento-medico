const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sgam_secret_key_2025';

// Middleware de autenticação - verifica token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
    req.user = user;
    next();
  });
};

// Middleware RBAC - controle de acesso por perfil
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Acesso negado. Permissão insuficiente para esta operação.' 
      });
    }
    next();
  };
};

module.exports = { authenticateToken, authorize, JWT_SECRET };
