const Sequelize = require("sequelize");
const { MatriculasServices } = require("../services");
const matriculasServices = new MatriculasServices();

class MatriculaController {
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const response = await matriculasServices.pegaUmRegistro({ id: matriculaId, estudante_id: estudanteId });
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };

    try {
      const response = await matriculasServices.criaRegistro(novaMatricula);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;

    try {
      await matriculasServices.atualizaRegistros(novasInfos, {
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      });
      return res.status(200).json({ mensagem: `id ${matriculaId} atualizado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async apagaMatricula(req, res) {
    const { matriculaId } = req.params;

    try {
      await matriculasServices.apagaRegistro(Number(matriculaId));
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async restauraMatricula(req, res) {
    const { matriculaId } = req.params;

    try {
      await matriculasServices.restauraRegistro(Number(matriculaId));
      return res.status(200).json({ mensagem: `id ${matriculaId} restaurado` });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;

    try {
      const response = await matriculasServices.encontraEContaRegistros(
        { turma_id: Number(turmaId), status: "confirmado" },
        { limit: 20, order: [["estudante_id", "ASC"]] }
      );

      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 2;

    try {
      const response = await matriculasServices.encontraEContaRegistros(
        { status: "confirmado" },
        {
          attributes: ["turma_id"],
          group: ["turma_id"],
          having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
        }
      );
      return res.status(200).json(response.count);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = MatriculaController;
