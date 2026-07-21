import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByEmail } from '@/lib/auth';
import { errorResponse, createdResponse } from '@/lib/api-response';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return errorResponse('User with this email already exists', 400);
    }

    const user = await createUser(email, password, name);

    return createdResponse(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      'User registered successfully'
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(error.errors[0].message, 400);
    }
    return errorResponse('Failed to register user', 500);
  }
}
