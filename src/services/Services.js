const database = require("../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async pegaTodosOsRegistros(where = {}) {
    return database[this.nomeDoModelo].findAll({ where: { ...where } });
  }

  async pegaUmRegistro(where = {}) {
    return database[this.nomeDoModelo].findOne({ where: { ...where } });
  }

  async criaRegistro(dados) {
    return database[this.nomeDoModelo].create(dados);
  }

  async atualizaRegistro(dadosAtualizados, id, transaction = {}) {
    return database[this.nomeDoModelo].update(dadosAtualizados, { where: { id: Number(id) } }, transaction);
  }

  async atualizaRegistros(dadosAtualizados, where, transaction = {}) {
    return database[this.nomeDoModelo].update(dadosAtualizados, { where: { ...where } }, transaction);
  }

  async apagaRegistro(id) {
    return database[this.nomeDoModelo].destroy({ where: { id: Number(id) } });
  }

  async restauraRegistro(id) {
    return database[this.nomeDoModelo].restore({ where: { id: Number(id) } });
  }

  async consultaRegistroApagado(id) {
    return database[this.nomeDoModelo].findOne({ paranoid: false, where: { id: Number(id) } });
  }

  async encontraEContaRegistros(where = {}, agregadores) {
    return database[this.nomeDoModelo].findAndCountAll({ where: { ...where }, ...agregadores });
  }
}

module.exports = Services;
