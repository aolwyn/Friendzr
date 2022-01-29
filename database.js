import Knex from "knex";

const knex = Knex({
    client: "cockroachdb",
    connection: {
        user: "server",
        password: "9QofNsIOnOCnhMB",
        database: "friendzr-55.defaultdb",
        host: "free-tier11.gcp-us-east1.cockroachlabs.cloud",
        port: 26257,
        ssl: true,
        sslmode: "verify-full",
        sslrootcert: "./certs/root.crt"
    }
});

export default knex;