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
  EmpleadoDocumento(documento: string) {
    try {
      let p = this.empleadoRepository.findOne({
        where: {documento: documento}
      });
      if (p) {
        return p;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
}



