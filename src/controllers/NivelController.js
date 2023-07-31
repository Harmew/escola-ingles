const { NiveisServices } = require("../services");
const niveisServices = new NiveisServices();

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const response = await niveisServices.pegaTodosOsRegistros();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaUmNivel(req, res) {
    const { id } = req.params;

    try {
      const response = await niveisServices.pegaUmRegistro({ id });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaNivel(req, res) {
    const data = req.body;

    try {
      const response = await niveisServices.criaRegistro(data);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaNivel(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await niveisServices.atualizaRegistro(data, id);
      return res.status(200).json({ mensagem: `id ${id} atualizado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async apagaNivel(req, res) {
    const { id } = req.params;

    try {
      await niveisServices.apagaRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraNivel(req, res) {
    const { id } = req.params;

    try {
      await niveisServices.restauraRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = NivelController;
