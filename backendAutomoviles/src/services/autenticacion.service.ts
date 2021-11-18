import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Cliente } from '../models';
import { ClienteRepository } from '../repositories';

const jwt = require("jsonwebtoken");
const generador = require("password-generator");
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave() {

    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarCliente(usuario: string, clave: string) {

    try {
      let p = this.clienteRepository.findOne({where: {correo: usuario, contrasena: clave}});
      if (p) {
        return p;
      }
      else {
        false;
      }

    }
    catch {
      return false;
    }
  }

  GenerarTokenJWT(cliente: Cliente) {
    let token = jwt.sign({
      data: {
        id: cliente.id,
        correo: cliente.correo,
        nombres: cliente.nombres + "" + cliente.apellidos
      }
    },
      Llaves.claveJWT);

    return token;
  }

  ValidarTokenJWT(token: string) {

    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    }
    catch {
      return false;
    }
  }
}


