import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations,  TipoTransaccion, DetalleVehiculo,  FotoVehiculo, Ciudad, CatalogoVehiculo} from '../models';

import {TipoTransaccionRepository} from './tipo-transaccion.repository';
import {DetalleVehiculoRepository} from './detalle-vehiculo.repository';

import {FotoVehiculoRepository} from './foto-vehiculo.repository';
import {CiudadRepository} from './ciudad.repository';
import {CatalogoVehiculoRepository} from './catalogo-vehiculo.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {



  public readonly tipoTransaccion: BelongsToAccessor<TipoTransaccion, typeof Vehiculo.prototype.id>;

  public readonly detalleVehiculos: HasManyRepositoryFactory<DetalleVehiculo, typeof Vehiculo.prototype.id>;



  public readonly fotoVehiculos: HasManyRepositoryFactory<FotoVehiculo, typeof Vehiculo.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Vehiculo.prototype.id>;

  public readonly catalogoVehiculo: BelongsToAccessor<CatalogoVehiculo, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,  @repository.getter('TipoTransaccionRepository') protected tipoTransaccionRepositoryGetter: Getter<TipoTransaccionRepository>, @repository.getter('DetalleVehiculoRepository') protected detalleVehiculoRepositoryGetter: Getter<DetalleVehiculoRepository>,  @repository.getter('FotoVehiculoRepository') protected fotoVehiculoRepositoryGetter: Getter<FotoVehiculoRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('CatalogoVehiculoRepository') protected catalogoVehiculoRepositoryGetter: Getter<CatalogoVehiculoRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.catalogoVehiculo = this.createBelongsToAccessorFor('catalogoVehiculo', catalogoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('catalogoVehiculo', this.catalogoVehiculo.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.fotoVehiculos = this.createHasManyRepositoryFactoryFor('fotoVehiculos', fotoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('fotoVehiculos', this.fotoVehiculos.inclusionResolver);
    this.detalleVehiculos = this.createHasManyRepositoryFactoryFor('detalleVehiculos', detalleVehiculoRepositoryGetter,);
    this.registerInclusionResolver('detalleVehiculos', this.detalleVehiculos.inclusionResolver);
    this.tipoTransaccion = this.createBelongsToAccessorFor('tipoTransaccion', tipoTransaccionRepositoryGetter,);
    this.registerInclusionResolver('tipoTransaccion', this.tipoTransaccion.inclusionResolver);

  }
}
