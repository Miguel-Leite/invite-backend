import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  @ApiProperty({
    example: 'miguel@example.com',
    description: 'E-mail do frentista.',
  })
  email!: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @ApiProperty({
    example: 'Miguel Leite',
    description: 'Nome do usuário.',
  })
  name!: string;
}
