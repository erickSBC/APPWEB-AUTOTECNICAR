import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrador } from '../entities/administrador.entity';
import { Cliente } from '../entities/cliente.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Administrador)
    private readonly adminRepo: Repository<Administrador>,
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
    private readonly jwtService: JwtService,
  ) { }

  // async validateAdministrador(correo: string, password: string) {
  //   const admin = await this.adminRepo.findOneBy({ correo } as any);
  //   if (!admin) return null;
  //   const match = await bcrypt.compare(password, admin.password);
  //   //const match = admin.password === password ;
  //   if (!match) return null;
  //   return admin;
  // }

  // async validateCliente(correo: string, password: string) {
  //   const cliente = await this.clienteRepo.findOneBy({ correo } as any);
  //   if (!cliente) return null;
  //   const match = await bcrypt.compare(password, cliente.password);
  //   if (!match) return null;
  //   return cliente;
  // }
  async validateUser(correo: string, password: string) {
    const cliente = await this.clienteRepo.findOneBy({ correo } as any);
    const admin = await this.adminRepo.findOneBy({ correo } as any);

    if (!cliente && !admin) return null;
    const real: Cliente | Administrador = cliente ?? admin ?? {} as Administrador;
    const match = await bcrypt.compare(password, real.password);
    if (!match) return null;
    return real;
  }

  signPayload(payload: any) {
    return this.jwtService.sign(payload);
  }

  loginAsAdmin(admin: Administrador) {
    const id = (admin as any).id_admin ?? (admin as any).id_admin ?? admin['id'];
    const payload = { sub: id, correo: admin.correo, nombre:admin.nombre, rol: 'admin' };
    return { access_token: this.signPayload(payload) };
    
  }

  loginAsCliente(cliente: Cliente) {
    const id = (cliente as any).id_cliente ?? cliente['id'];
    const payload = { sub: id, correo: cliente.correo,nombre: cliente.nombre, rol: 'cliente' };
    return { access_token: this.signPayload(payload) };
  }

  async registerCliente(data: Partial<Cliente>) {
    if (!data.password) throw new Error('Password requerido');
    const exists = await this.clienteRepo.findOneBy({ correo: data.correo } as any);
    if (exists) throw new Error('Cliente ya existe');
    const hashed = await bcrypt.hash(String(data.password), 10);
    const nuevo = this.clienteRepo.create({ ...data, password: hashed } as any);
    const rawSaved = await this.clienteRepo.save(nuevo);
    const savedEntity: Cliente = Array.isArray(rawSaved) ? (rawSaved[0] as Cliente) : (rawSaved as Cliente);
    // Return token as well
    return { cliente: savedEntity, token: this.loginAsCliente(savedEntity as Cliente).access_token };
  }

  async registerAdministrador(data: Partial<Administrador>) {
    if (!data.password) throw new Error('Password requerido');
    const exists = await this.adminRepo.findOneBy({ correo: data.correo } as any);
    if (exists) throw new Error('Administrador ya existe');
    const hashed = await bcrypt.hash(String(data.password), 10);
    const nuevo = this.adminRepo.create({ ...data, password: hashed } as any);
    const rawSavedAdmin = await this.adminRepo.save(nuevo);
    const savedAdmin: Administrador = Array.isArray(rawSavedAdmin) ? (rawSavedAdmin[0] as Administrador) : (rawSavedAdmin as Administrador);
    return { administrador: savedAdmin, token: this.loginAsAdmin(savedAdmin as Administrador).access_token };
  }
}
