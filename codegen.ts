
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./dist/schema.graphql",
  generates: {
    "src/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  },
  config: {
    useIndexSignature: true,
    contextType: "./app#MyContext"
  }
};

export default config;
