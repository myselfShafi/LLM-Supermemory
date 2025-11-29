import type { Secret, SignOptions } from "jsonwebtoken";

type TokenConfig = {
    token: Secret;
    expiry: SignOptions['expiresIn']
};

const port = process.env.PORT;
const db_url = process.env.DB_URL;
const direct_url = process.env.DIRECT_URL;

const env = {
    dev: process.env.NODE_ENV === 'dev',
    staging: process.env.NODE_ENV === 'staging',
    prod: process.env.NODE_ENV === 'prod'
};

const salt_round = Number(process.env.SALT);

const access_secret = {
    token: process.env.JWT_ACCESS_TOKEN || '',
    expiry: process.env.JWT_ACCESS_TOKEN_EXP || ''
};

const refresh_secret = {
    token: process.env.JWT_REFRESH_TOKEN || '',
    expiry: process.env.JWT_REFRESH_TOKEN_EXP || ''
};

export {
    access_secret, db_url, direct_url, env, port, refresh_secret, salt_round
};

