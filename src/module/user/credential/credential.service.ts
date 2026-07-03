import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';

@Injectable()
export class CredentialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCredentialDto: CreateCredentialDto) {
    return this.prisma.credential.create({
      data: createCredentialDto,
    });
  }

  async findAll() {
    return this.prisma.credential.findMany();
  }

  async findOne(id: number) {
    return this.prisma.credential.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return this.prisma.credential.update({
      where: { id },
      data: updateCredentialDto,
    });
  }

  async remove(id: number) {
    return this.prisma.credential.delete({
      where: { id },
    });
  }
}