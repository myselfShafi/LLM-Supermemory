const port = process.env.PORT;
const db_url = process.env.DB_URL;
const direct_url = process.env.DIRECT_URL;

const env = {
    dev: process.env.NODE_ENV === 'dev',
    staging: process.env.NODE_ENV === 'staging',
    prod: process.env.NODE_ENV === 'prod'
}

export {
    db_url, direct_url, env, port
};

