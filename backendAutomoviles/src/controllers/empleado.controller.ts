import {CargoEmpleado} from './../models/cargo-empleado.model';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Empleado, Credenciales} from '../models';
import {EmpleadoRepository} from '../repositories';
import {AutenticacionService} from '../services';

const fetch = require('node-fetch');

export class EmpleadoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  @post('/identificarEmpleado', {
    responses: {
      '200': {
        description: 'identificación de usuarios',
      },
    },
  })
  async identificarEmpleado(@requestBody() credenciales: Credenciales) {
    let p = await this.servicioAutenticacion.IdentificarEmpleado(
      credenciales.usuario,
      credenciales.clave,
    );
    if (p) {
      let token = this.servicioAutenticacion.GenerarTokenJWTEmpleado(p);
      //let c = this.servicioAutenticacion.obtenerCargoEmpleado(p.cargoEmpleadoId);
      return {
        datos: {
          nombre: p.nombres + ' ' + p.apellidos,
          correo: p.correo,
          cargo: p.cargoEmpleadoId,
          id: p.id,
        },
        tk: token,
      };
    } else {
      throw new HttpErrors[401]('los datos suministrados no son invalidos');
    }
  }

  @put('/empleados/recuperarcontrasena/{id}')
  @response(204, {
    description: 'Empleado PUT success',
  })
  async replaceContrasenaEmpleado(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    empleado.contrasena = claveCifrada;
    await this.empleadoRepository.replaceById(id, empleado);

    //notificaciones
    let destino = empleado.correo;
    let asunto = 'recuperación de clave de acceso';
    const contenido = `hola ${empleado.nombres},su nombre de usuario como empleado es: ${empleado.correo} y su contraseña es: ${clave}`;

    fetch(
      `${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`,
    ).then((data: any) => {
      console.log(data);
    });


  }

  @post('/empleados')
  @response(200, {
    description: 'Empleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleado',
            exclude: ['id'],
            includeRelations: true,
          }),
        },
      },
    })
    empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    let existe = await this.servicioAutenticacion.empleadoExiste(
      empleado.documento,
      empleado.correo,
    );
    if (existe == null) {
      let clave = this.servicioAutenticacion.GenerarClave();
      let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
      empleado.contrasena = claveCifrada;
      let p = await this.empleadoRepository.create(empleado);

      //notificaciones
      let destino = empleado.correo;
      let asunto = 'registro en la plataforma';
      let contenido = `hola ${empleado.nombres},su nombre de usuario es: ${empleado.correo} y su contraseña es: ${clave}`;

      fetch(
        `${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`,
      ).then((data: any) => {
        console.log(data);
      });
      return p;
    } else {
      throw new HttpErrors[401]('el correo o el documento ya existe');
    }
  }

  @get('/empleados/count')
  @response(200, {
    description: 'Empleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Empleado) where?: Where<Empleado>): Promise<Count> {
    return this.empleadoRepository.count(where);
  }

  @get('/empleados')
  @response(200, {
    description: 'Array of Empleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empleado) filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empleadoRepository.find(filter);
  }

  @patch('/empleados')
  @response(200, {
    description: 'Empleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.updateAll(empleado, where);
  }

  @get('/empleados/{id}')
  @response(200, {
    description: 'Empleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleado, {exclude: 'where'})
    filter?: FilterExcludingWhere<Empleado>,
  ): Promise<Empleado> {
    return this.empleadoRepository.findById(id, filter);
  }

  @patch('/empleados/{id}')
  @response(204, {
    description: 'Empleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.updateById(id, empleado);
  }

  @put('/empleados/{id}')
  @response(204, {
    description: 'Empleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.replaceById(id, empleado);
  }

  @del('/empleados/{id}')
  @response(204, {
    description: 'Empleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoRepository.deleteById(id);
  }
}
