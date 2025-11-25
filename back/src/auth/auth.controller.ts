import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterClienteDto } from './dto/register-cliente.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { Administrador } from 'src/entities/administrador.entity';
import { Cliente } from 'src/entities/cliente.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.correo, dto.password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    if ((user as any).id_admin !== undefined) {
      return this.authService.loginAsAdmin(user as Administrador);
    }

    return this.authService.loginAsCliente(user as any);
  }
  @Post('admin/login')
  async adminLogin(@Body() dto: LoginDto) {
    const admin = await this.authService.validateUser(dto.correo, dto.password);
    if (!admin) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.loginAsAdmin(admin as Administrador);
  }

  @Post('cliente/login')
  async clienteLogin(@Body() dto: LoginDto) {
    const cliente = await this.authService.validateUser(dto.correo, dto.password);
    if (!cliente) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.loginAsCliente(cliente as Cliente);
  }

  @Post('cliente/register')
  async registerCliente(@Body() dto: RegisterClienteDto) {
    const created = await this.authService.registerCliente(dto);
    return { access_token: (created as any).token, cliente: (created as any).cliente };
  }

  @Post('admin/register')
  async registerAdmin(@Body() dto: RegisterAdminDto) {
    const created = await this.authService.registerAdministrador(dto);
    return { access_token: (created as any).token, administrador: (created as any).administrador };
  }
}
