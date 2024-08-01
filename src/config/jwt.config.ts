import { configDotenv } from 'dotenv';

export const getJwtConfig = () => {
  configDotenv();
  const jwtConfig = {
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '6h' },
  };
  return jwtConfig;
};
