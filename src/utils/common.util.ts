import bcrypt from 'bcrypt';
import jwt, { type JwtPayload, type Secret, type SignOptions } from 'jsonwebtoken';
import * as config from '../config/env.config.js';

type processPwdType = {
    mode: 'hash' | 'compare';
    original: string;
    encrypted?: string;
}

type processTokenType = {
    mode: 'verify' | 'sign';
    type: 'access_secret' | 'refresh_secret';
    payload?: object;
    token?: string;
}

const processPassword = ({mode, original, encrypted = ''}: processPwdType) : Promise<boolean | string> => {
    if (mode === 'compare') return bcrypt.compare(original, encrypted);
    return bcrypt.hash(original, config.salt_round);
};

// const processToken = ({ mode, type, payload = {}, token = '' }: processTokenType) : JwtPayload | string => {
//     if (!type || !mode) throw new Error('Missing arguments');
//     if (mode === 'verify') return jwt.verify(token, config[type]?.token);
//     return jwt.sign(payload, config[type]?.token, { expiresIn: config[type]?.expiry });
// };

const processToken = ({ mode, type, payload = {}, token = '' }: processTokenType): JwtPayload | string => {
    if (!type || !mode) throw new Error('Missing arguments');
    const secret = config[type]?.token as Secret;
    if (!secret) throw new Error('Missing JWT secret in config');

    if (mode === 'verify') return jwt.verify(token, secret) as JwtPayload;

    const expiresIn = config[type]?.expiry as SignOptions['expiresIn'];
    if (!expiresIn) throw new Error('Invalid expiry');
    const options: SignOptions = { expiresIn };

    return jwt.sign(payload, secret, options);
};

export { processPassword, processToken };

