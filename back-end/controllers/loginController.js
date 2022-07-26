const Login = require("../model/loginModel");

const read = async (req, res) => {
  const login = req.query.email;
  const senha = req.query.password;
  const user = await Login.findOne({ login: login, senha: senha });
  if (!user) {
    return res.status(404).json({
      error: "Usuário ou senha errados",
    });
  } else {
    return res.status(200).json({
      success: "Sucesso!",
    });
  }
};

const create = async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({
      error: "Login e/ou senha devem ser preenchidos",
    });
  } else if (senha.length < 8) {
    return res.status(400).json({
      error: "Senha deve ter pelo menos 8 caracteres",
    });
  }

  const user = await Login.create({ login, senha });
  return res.json(user);
};

module.exports = { read, create };
