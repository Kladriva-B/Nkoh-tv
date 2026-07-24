import bcrypt from 'bcryptjs';

let prisma: any;

try {
  const prismaModule = require('./prisma');
  prisma = prismaModule.default || prismaModule.prisma;
} catch (error) {
  console.warn('Prisma not available, using mock implementation');
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getUserByEmail(email: string) {
  if (!prisma) {
    // Mock user for demo purposes
    return null;
  }
  
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
          take: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function createUser(
  email: string,
  password: string,
  name?: string
) {
  if (!prisma) {
    throw new Error('Database not available');
  }

  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || email.split('@')[0],
      role: 'USER',
    },
  });
}
