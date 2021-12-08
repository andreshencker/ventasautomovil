import { CargoEmpleadoRepository } from './../repositories/cargo-empleado.repository';
import { CargoEmpleado } from './../models/cargo-empleado.model';
import {EmpleadoRepository} from './../repositories/empleado.repository';
import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Cliente, Empleado} from '../models';
import {ClienteRepository} from '../repositories';

const jwt = require("jsonwebtoken");
const generador = require("password-generator");
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
    @repository(CargoEmpleadoRepository)
    public cargoEmpleadoRepository: CargoEmpleadoRepository
  ) { }

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
  IdentificarEmpleado(usuario: string, clave: string) {

    try {
      let p = this.empleadoRepository.findOne({where: {correo: usuario, contrasena: clave}});
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

  GenerarTokenJWTEmpleado(empleado: Empleado) {
    let token = jwt.sign({
      data: {
        id: empleado.id,
        correo: empleado.correo,
        nombres: empleado.nombres + "" + empleado.apellidos,
        cargo:empleado.cargoEmpleadoId
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

  clienteExiste(documento: string, correo: string) {
    try{
      let p = this.clienteRepository.findOne({where: {correo: correo, documento: documento}});
      if (p) {
        return p;
      }
      else {
        return null;
      }
    }catch {
      return null;
    }

  }

  empleadoExiste(documento: string, correo: string) {
    try {
      let p = this.empleadoRepository.findOne({where: {correo: correo, documento: documento}});
      if (p) {
        return p;
      }
      else {
        return null;
      }
    }catch {
      return null;
    }
  }

  obtenerCargoEmpleado(id:string){
    try{
      let p =this.cargoEmpleadoRepository.findOne({where: {id: id}});
      if (p) {
        return p;
      }
      else {
        return null;
      }
    }catch{
      return null;
    }

  }
  validar() { }
}


