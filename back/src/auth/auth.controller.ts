import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterClienteDto } from './dto/register-cliente.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  async adminLogin(@Body() dto: LoginDto) {
    const admin = await this.authService.validateAdministrador(dto.correo, dto.password);
    if (!admin) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.loginAsAdmin(admin);
  }

  @Post('cliente/login')
  async clienteLogin(@Body() dto: LoginDto) {
    const cliente = await this.authService.validateCliente(dto.correo, dto.password);
    if (!cliente) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.loginAsCliente(cliente);
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
