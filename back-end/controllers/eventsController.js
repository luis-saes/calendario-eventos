const Event = require("../model/eventsModel");

const create = (req, res) => {
  const { id, descricao, data_inicio, data_fim, horario_inicio, horario_fim } =
    request.body;

  console.log(
    id,
    descricao,
    data_inicio,
    data_fim,
    horario_inicio,
    horario_fim
  );
};

module.exports = { create };
