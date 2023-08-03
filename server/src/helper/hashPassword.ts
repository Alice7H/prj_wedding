import bcrypt from "bcrypt";

const saltRounds = 10;

export async function verifyPassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash);
}

export async function generateHash(password: string) {
  try {
    return await bcrypt.hash(password, saltRounds);
  }catch(error) {
    throw error;
  }
}