/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Layer($layerId: ID!) {\n    layer(id: $layerId) {\n      json\n    }\n  }\n": types.LayerDocument,
    "\n  query DownloadLayerQuery($layerId: ID!) {\n    layer(id: $layerId) {\n      layer\n    }\n  }\n": types.DownloadLayerQueryDocument,
    "\n  query LayersTableQuery {\n    layers {\n      description\n      id\n      name\n      metadata\n    }\n  }\n": types.LayersTableQueryDocument,
    "\n  query LayersJson {\n    layers {\n      id\n      name\n    }\n  }\n": types.LayersJsonDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Layer($layerId: ID!) {\n    layer(id: $layerId) {\n      json\n    }\n  }\n"): (typeof documents)["\n  query Layer($layerId: ID!) {\n    layer(id: $layerId) {\n      json\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DownloadLayerQuery($layerId: ID!) {\n    layer(id: $layerId) {\n      layer\n    }\n  }\n"): (typeof documents)["\n  query DownloadLayerQuery($layerId: ID!) {\n    layer(id: $layerId) {\n      layer\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LayersTableQuery {\n    layers {\n      description\n      id\n      name\n      metadata\n    }\n  }\n"): (typeof documents)["\n  query LayersTableQuery {\n    layers {\n      description\n      id\n      name\n      metadata\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LayersJson {\n    layers {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query LayersJson {\n    layers {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;