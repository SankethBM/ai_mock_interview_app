/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_NIZ4FT7lEyGe@ep-shiny-recipe-aerbhxvu-pooler.c-2.us-east-2.aws.neon.tech/PrepWise?sslmode=require&channel_binding=require'
    },
};