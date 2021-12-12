import { MarcaTipoVehiculoRepository } from './../repositories/marca-tipo-vehiculo.repository';
import { TipoVehiculoRepository } from './../repositories/tipo-vehiculo.repository';
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class VehiculosService {
  constructor(
    @repository(TipoVehiculoRepository)
    public tipoVehiculoRepository: TipoVehiculoRepository,
    @repository(MarcaTipoVehiculoRepository)
    public marcaTipoVehiculoRepository: MarcaTipoVehiculoRepository
    ) {}

    existeTipoVehiculoMarca(id:string){
      try {
        let p = this.marcaTipoVehiculoRepository.findOne({where: {tipoVehiculoId: id}});
        if (p) {
          return p;
        }
        else {
          return null;
        }
      }catch {
        return false;
      }

  }
}
