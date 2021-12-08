import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {EmpleadoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class EmpleadoserviceService {
  constructor(@repository(EmpleadoRepository)
  public empleadoRepository: EmpleadoRepository) { }

  /*
   * Add service methods here
   */
  empleadoExiste(documento:string,correo:string){
    let p = this.empleadoRepository.findOne({where: {correo: correo, documento: documento}});
    return p;
  }
}



