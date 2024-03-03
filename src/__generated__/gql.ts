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
    "\n  query Layer($layerId: ID!) {\n    layer(id: $layerId) {\n      geojson\n    }\n  }\n": types.LayerDocument,
    "\n  query DownloadLayerQuery($layerId: ID!) {\n    layer(id: $layerId) {\n      name\n    }\n  }\n": types.DownloadLayerQueryDocument,
    "\n  mutation CreateCenote($newCenote: NewCenoteInput!) {\n    createCenote(new_cenote: $newCenote) {\n      id\n      location {\n        coordinates\n      }\n    }\n  }\n": types.CreateCenoteDocument,
    "\n  \n  query CenoteById($cenoteId: ID!) {\n    cenoteById(id: $cenoteId) {\n      ...UpdateCenoteFields\n    }\n  }\n": types.CenoteByIdDocument,
    "\n  \n  mutation UpdateCenote($updatedCenote: UpdatedCenoteInput!) {\n    updateCenote(updated_cenote: $updatedCenote) {\n      ...UpdateCenoteFields\n    }\n  }\n": types.UpdateCenoteDocument,
    "\n  fragment UpdateCenoteFields on Cenote {\n    id\n    name\n    type\n    touristic\n    issues\n    alternativeNames\n  }\n": types.UpdateCenoteFieldsFragmentDoc,
    "\n  query CenotesTableQuery {\n    cenotes {\n      id\n      name\n      location {\n        state\n        county\n      }\n      type\n      createdAt\n      updatedAt\n      touristic\n      issues\n      variable_count\n    }\n  }\n": types.CenotesTableQueryDocument,
    "\n  query LayersTableQuery {\n    layers {\n      description\n      id\n      name\n      metadata\n    }\n  }\n": types.LayersTableQueryDocument,
    "\n  query CenoteInformationById($cenoteByIdId: ID!) {\n    cenoteById(id: $cenoteByIdId) {\n      alternativeNames\n      createdAt\n      creator {\n        name\n        email\n        role\n      }\n      distances {\n        time\n        location\n        distance\n      }\n      id\n      issues\n      location {\n        state\n        county\n        country\n        coordinates\n        geojson\n      }\n      name\n      photos\n      social {\n        comments {\n          review\n          commenter\n          comment\n        }\n      }\n      type\n      touristic\n      updatedAt\n    }\n  }\n": types.CenoteInformationByIdDocument,
    "\n  query LayersJson {\n    layers {\n      id\n      name\n    }\n  }\n": types.LayersJsonDocument,
    "\n  query CenotesGeoJson {\n    cenotes {\n      id\n      name\n      type\n      touristic\n      location {\n        geojson\n      }\n    }\n  }\n": types.CenotesGeoJsonDocument,
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
export function gql(source: "\n  query Layer($layerId: ID!) {\n    layer(id: $layerId) {\n      geojson\n    }\n  }\n"): (typeof documents)["\n  query Layer($layerId: ID!) {\n    layer(id: $layerId) {\n      geojson\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DownloadLayerQuery($layerId: ID!) {\n    layer(id: $layerId) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query DownloadLayerQuery($layerId: ID!) {\n    layer(id: $layerId) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCenote($newCenote: NewCenoteInput!) {\n    createCenote(new_cenote: $newCenote) {\n      id\n      location {\n        coordinates\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCenote($newCenote: NewCenoteInput!) {\n    createCenote(new_cenote: $newCenote) {\n      id\n      location {\n        coordinates\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query CenoteById($cenoteId: ID!) {\n    cenoteById(id: $cenoteId) {\n      ...UpdateCenoteFields\n    }\n  }\n"): (typeof documents)["\n  \n  query CenoteById($cenoteId: ID!) {\n    cenoteById(id: $cenoteId) {\n      ...UpdateCenoteFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation UpdateCenote($updatedCenote: UpdatedCenoteInput!) {\n    updateCenote(updated_cenote: $updatedCenote) {\n      ...UpdateCenoteFields\n    }\n  }\n"): (typeof documents)["\n  \n  mutation UpdateCenote($updatedCenote: UpdatedCenoteInput!) {\n    updateCenote(updated_cenote: $updatedCenote) {\n      ...UpdateCenoteFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UpdateCenoteFields on Cenote {\n    id\n    name\n    type\n    touristic\n    issues\n    alternativeNames\n  }\n"): (typeof documents)["\n  fragment UpdateCenoteFields on Cenote {\n    id\n    name\n    type\n    touristic\n    issues\n    alternativeNames\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CenotesTableQuery {\n    cenotes {\n      id\n      name\n      location {\n        state\n        county\n      }\n      type\n      createdAt\n      updatedAt\n      touristic\n      issues\n      variable_count\n    }\n  }\n"): (typeof documents)["\n  query CenotesTableQuery {\n    cenotes {\n      id\n      name\n      location {\n        state\n        county\n      }\n      type\n      createdAt\n      updatedAt\n      touristic\n      issues\n      variable_count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LayersTableQuery {\n    layers {\n      description\n      id\n      name\n      metadata\n    }\n  }\n"): (typeof documents)["\n  query LayersTableQuery {\n    layers {\n      description\n      id\n      name\n      metadata\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CenoteInformationById($cenoteByIdId: ID!) {\n    cenoteById(id: $cenoteByIdId) {\n      alternativeNames\n      createdAt\n      creator {\n        name\n        email\n        role\n      }\n      distances {\n        time\n        location\n        distance\n      }\n      id\n      issues\n      location {\n        state\n        county\n        country\n        coordinates\n        geojson\n      }\n      name\n      photos\n      social {\n        comments {\n          review\n          commenter\n          comment\n        }\n      }\n      type\n      touristic\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query CenoteInformationById($cenoteByIdId: ID!) {\n    cenoteById(id: $cenoteByIdId) {\n      alternativeNames\n      createdAt\n      creator {\n        name\n        email\n        role\n      }\n      distances {\n        time\n        location\n        distance\n      }\n      id\n      issues\n      location {\n        state\n        county\n        country\n        coordinates\n        geojson\n      }\n      name\n      photos\n      social {\n        comments {\n          review\n          commenter\n          comment\n        }\n      }\n      type\n      touristic\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LayersJson {\n    layers {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query LayersJson {\n    layers {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CenotesGeoJson {\n    cenotes {\n      id\n      name\n      type\n      touristic\n      location {\n        geojson\n      }\n    }\n  }\n"): (typeof documents)["\n  query CenotesGeoJson {\n    cenotes {\n      id\n      name\n      type\n      touristic\n      location {\n        geojson\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;