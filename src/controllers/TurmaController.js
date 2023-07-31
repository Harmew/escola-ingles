const { TurmasServices } = require("../services");
const { Op } = require("sequelize");

const turmasServices = new TurmasServices();

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const response = await turmasServices.pegaTodosOsRegistros(where);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params;

    try {
      const response = await turmasServices.pegaUmRegistro({ id });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaTurma(req, res) {
    const data = req.body;

    try {
      const response = await await turmasServices.criaRegistro(data);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await turmasServices.atualizaRegistro(data, id);
      return res.status(200).json({ mensagem: `id ${id} atualizado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params;
    try {
      await turmasServices.apagaRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params;
    try {
      await turmasServices.restauraRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = TurmaController;
