import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from "fs";
import * as mongoose from "mongoose";
import resolvers from "./resolvers/index.js";
import {doAuth} from "./utils/doAuth.js";
import 'dotenv/config';

export interface MyContext {
    isAuth?: Boolean,
    userId?: String,
    userEmail?: String,
}
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // includeStacktraceInErrorResponses: false
});

main().catch(err => console.log('Server start error: ', err));

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hktnw6v.mongodb.net/blog`);
    const {url} = await startStandaloneServer(server, {
        context: async ({ req }) => ({
            ... await doAuth(req.headers.authorization),
        }),
        listen: {port:  parseInt(process.env.PORT ?? '5000', 10)},
    });
    console.log(`🚀  Server ready at: ${url}`);
}
