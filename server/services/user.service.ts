// /server/services/user.service.ts

import { prisma } from '../db';
import { Prisma } from '../../lib/generated/prisma/client';
import bcrypt from 'bcrypt';
import { type SignUpInput } from '@/server/validations/user.schema';

export const userService = {
  async create(data: SignUpInput) {
    try {
      const passwordHash: string = await bcrypt.hash(data.password, 12);
      const insertionData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash,
      };
      return prisma.user.create({
        data: insertionData,
      });
    } catch (error: unknown) {
      // Error if email already exists in db
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('A user with this email already exists!');
      }
      throw error;
    }
  },
  async getAll() {
    return prisma.user.findMany();
  },

  async getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        passwordHash: true,
      },
    });
  },

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  },
};
