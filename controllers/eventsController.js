const Events = require("../model/eventsModel");
const ObjectId = require("mongodb").ObjectId;

const validateInputs = (descricao, data_inicio, data_fim) => {
  let errorDescription;
  if (!descricao || !data_inicio || !data_fim) {
    errorDescription = "Campos descricao, data_inicio e data_fim necessários";
  }
  if (typeof descricao !== "string") {
    errorDescription = "Campo descricao precisa ser do tipo string";
  }
  if (!Date.parse(data_inicio) || !Date.parse(data_fim)) {
    errorDescription =
      "Campos data_inicio e data_fim precisam ser formatos válidos de data";
  }
  return errorDescription;
};

const read = async (req, res) => {
  const eventsList = await Events.find();
  return res.json(eventsList);
};

const create = async (req, res) => {
  const { descricao, data_inicio, data_fim } = req.body;

  const errorDescription = validateInputs(descricao, data_inicio, data_fim);
  if (errorDescription) {
    return res.status(400).json({
      error: errorDescription,
    });
  }

  const event = await Events.create({ descricao, data_inicio, data_fim });
  return res.json(event);
};

const update = async (req, res) => {
  const { descricao, data_inicio, data_fim } = req.body;

  const errorDescription = validateInputs(descricao, data_inicio, data_fim);
  if (errorDescription) {
    return res.status(400).json({
      error: errorDescription,
    });
  }
  const event = await Events.updateOne(
    { _id: req.params.id },
    {
      descricao,
      data_inicio,
      data_fim,
    }
  );
  return res.json(event);
};

const remove = async (req, res) => {
  const event = await Events.deleteOne({ _id: req.params.id });
  return res.json(event);
};

module.exports = { read, create, update, remove };
