import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginBody {
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  @ApiProperty({
    example: 'miguel@example.com',
    description: 'Informar o email do usuário.',
  })
  email!: string;

  @IsNotEmpty({ message: 'O campo password é obrigatório.' })
  @ApiProperty({
    example: 'password',
    description: 'Informar a senha da conta do usuário.',
  })
  password!: string;
}
