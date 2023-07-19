import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCustomerBody {
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  @ApiProperty({
    example: 'miguelleite@example.com',
    description: 'E-mail do frentista.',
  })
  email!: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @ApiProperty({
    example: 'Miguel Leite',
    description: 'Nome do usuário.',
  })
  name!: string;

  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  @ApiProperty({
    example: 'password',
    description: 'Palavra passe.',
  })
  password!: string;
}
