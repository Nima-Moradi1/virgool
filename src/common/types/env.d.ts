// if we declare this here, the whole app will suggest and know what i want to have after
// i type process.env.${the_variables_i_declared_here}

declare namespace NodeJS {
    interface ProcessEnv {
        // application
        readonly PORT?: string;
        // database
        readonly DB_PORT?: string;
        readonly DB_NAME?: string;
        readonly DB_USERNAME?: string;
        readonly DB_PASSWORD?: string;
        readonly DB_HOST?: string;
    }
}