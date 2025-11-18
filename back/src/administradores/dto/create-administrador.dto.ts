export class CreateAdministradorDto {
  nombre: string;
  apellido?: string;
  correo: string;
  password: string;
  direccion?: string;
  telefono?: string;
  rol?: 'superadmin' | 'vendedor';
}
