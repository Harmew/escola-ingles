const { PessoasServices } = require("../services");
const pessoasServices = new PessoasServices();

class PessoaController {
  static async pegaPessoasAtivas(req, res) {
    try {
      const response = await pessoasServices.pegaRegistrosAtivos();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaTodasAsPessoas(req, res) {
    try {
      const response = await pessoasServices.pegaTodosOsRegistros();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaPessoa(req, res) {
    const { id } = req.params;

    try {
      const response = await pessoasServices.pegaUmRegistro({ id: Number(id) });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaPessoa(req, res) {
    const data = req.body;

    try {
      const response = await pessoasServices.criaRegistro(data);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      await pessoasServices.atualizaRegistro(data, Number(id));
      return res.status(200).json({ message: `id ${id} atualizado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async apagaPessoa(req, res) {
    const { id } = req.params;

    try {
      await pessoasServices.apagaRegistro(Number(id));
      return res.status(200).json({ message: `id ${id} deletado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params;

    try {
      const response = await pessoasServices.restauraRegistro(Number(id));
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params;

    try {
      const response = await pessoasServices.pegaMatriculasPorEstudante({ id: Number(estudanteId) });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));
      return res.status(200).json({ message: `matriculas ref. estudante ${estudanteId} canceladas` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = PessoaController;
