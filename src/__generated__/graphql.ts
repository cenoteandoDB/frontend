/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: { input: any; output: any; }
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: { input: any; output: any; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any; }
};

export enum AccessLevel {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Sensitive = 'SENSITIVE'
}

export type AuditLog = {
  __typename?: 'AuditLog';
  arguments: Scalars['JSON']['output'];
  objectId: Scalars['ID']['output'];
  timestamp: Scalars['DateTime']['output'];
  type: AuditLogType;
};

export enum AuditLogType {
  NewCenote = 'NEW_CENOTE',
  NewReference = 'NEW_REFERENCE',
  NewVariable = 'NEW_VARIABLE',
  UpdatedCenote = 'UPDATED_CENOTE',
  UpdatedReference = 'UPDATED_REFERENCE',
  UpdatedVariable = 'UPDATED_VARIABLE'
}

export type Cenote = {
  __typename?: 'Cenote';
  _id: Scalars['ID']['output'];
  _key: Scalars['ID']['output'];
  alternativeNames?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  distances?: Maybe<Array<Maybe<CityDistances>>>;
  geojson: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  issues?: Maybe<Array<Maybe<CenoteIssue>>>;
  location: CenoteLocation;
  maps?: Maybe<Array<Scalars['URL']['output']>>;
  name: Scalars['String']['output'];
  photos?: Maybe<Array<Scalars['URL']['output']>>;
  social?: Maybe<CenoteSocialData>;
  touristic: Scalars['Boolean']['output'];
  type: CenoteType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * This type is used to set the boundaries of interactive maps for visualizing cenotes.
 * It returns the bounding coordinates of the region of interest (where there is cenote data).
 */
export type CenoteBounds = {
  __typename?: 'CenoteBounds';
  bottom_right?: Maybe<Coordinates>;
  top_left?: Maybe<Coordinates>;
};

export enum CenoteIssue {
  GeotagNotVerified = 'GEOTAG_NOT_VERIFIED'
}

export type CenoteLocation = {
  __typename?: 'CenoteLocation';
  coordinates: Coordinates;
  country: Scalars['String']['output'];
  municipality: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type CenoteSocialData = {
  __typename?: 'CenoteSocialData';
  comments?: Maybe<Array<Maybe<Comment>>>;
};

export enum CenoteType {
  Cenote = 'CENOTE',
  DryCave = 'DRY_CAVE',
  NoType = 'NO_TYPE',
  Watery = 'WATERY',
  WaterWell = 'WATER_WELL'
}

export type CityDistances = {
  __typename?: 'CityDistances';
  distance?: Maybe<Scalars['Float']['output']>;
  location: Scalars['String']['output'];
  time?: Maybe<Scalars['Int']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  comment?: Maybe<Scalars['String']['output']>;
  commenter?: Maybe<Scalars['String']['output']>;
  review?: Maybe<Scalars['Float']['output']>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['Latitude']['output'];
  longitude: Scalars['Longitude']['output'];
};

export type CoordinatesInput = {
  latitude: Scalars['Latitude']['input'];
  longitude: Scalars['Longitude']['input'];
};

export type MapLayer = {
  __typename?: 'MapLayer';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  json?: Maybe<Scalars['String']['output']>;
  layer?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type MapLayerInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type MeasurementOrFact = {
  __typename?: 'MeasurementOrFact';
  timestamp: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create?: Maybe<MapLayer>;
  createCenote?: Maybe<Cenote>;
  createMof?: Maybe<VariableWithData>;
  createSpecies?: Maybe<Species>;
  createVariable?: Maybe<Variable>;
  register?: Maybe<User>;
  updateCenote?: Maybe<Cenote>;
  updateEmail?: Maybe<User>;
  updateSpecies?: Maybe<Species>;
  updateVariable?: Maybe<Variable>;
};


export type MutationCreateArgs = {
  input: MapLayerInput;
};


export type MutationCreateCenoteArgs = {
  new_cenote: NewCenoteInput;
};


export type MutationCreateMofArgs = {
  new_mof: NewMeasurementOrFactInput;
};


export type MutationCreateSpeciesArgs = {
  new_species: NewSpeciesInput;
};


export type MutationCreateVariableArgs = {
  new_variable: NewVariableInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateCenoteArgs = {
  updated_cenote: UpdatedCenoteInput;
};


export type MutationUpdateEmailArgs = {
  email: Scalars['EmailAddress']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateSpeciesArgs = {
  updated_species: UpdateSpeciesInput;
};


export type MutationUpdateVariableArgs = {
  updated_variable: UpdateVariableInput;
};

export type NewCenoteInput = {
  coordinates: CoordinatesInput;
};

export type NewMeasurementOrFactInput = {
  cenote: Scalars['ID']['input'];
  timestamp: Scalars['DateTime']['input'];
  value: Scalars['String']['input'];
  variable: Scalars['ID']['input'];
};

export type NewSpeciesInput = {
  aphiaId?: InputMaybe<Scalars['String']['input']>;
  iNaturalistId?: InputMaybe<Scalars['String']['input']>;
};

export type NewVariableInput = {
  accessLevel?: InputMaybe<AccessLevel>;
  description?: InputMaybe<Scalars['String']['input']>;
  enumValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  methodology?: InputMaybe<Scalars['String']['input']>;
  multiple?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<VariableOrigin>;
  theme?: InputMaybe<VariableTheme>;
  timeseries?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<VariableType>;
  units?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  auditLogs?: Maybe<Array<Maybe<AuditLog>>>;
  cenoteById?: Maybe<Cenote>;
  cenoteDataByTheme?: Maybe<Array<VariableWithData>>;
  cenoteDataByVariable?: Maybe<VariableWithData>;
  cenotes?: Maybe<Array<Maybe<Cenote>>>;
  cenotesBounds?: Maybe<CenoteBounds>;
  cenotesCsv?: Maybe<Scalars['String']['output']>;
  layer?: Maybe<MapLayer>;
  layers?: Maybe<Array<Maybe<MapLayer>>>;
  species?: Maybe<Array<Maybe<Species>>>;
  speciesByAphiaId?: Maybe<Species>;
  speciesByINaturalistId?: Maybe<Species>;
  speciesById?: Maybe<Species>;
  speciesCsv?: Maybe<Scalars['String']['output']>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  variableById?: Maybe<Variable>;
  variables?: Maybe<Array<Maybe<Variable>>>;
  variablesByTheme?: Maybe<Array<Maybe<Variable>>>;
};


export type QueryAuditLogsArgs = {
  id: Scalars['ID']['input'];
  type: AuditLogType;
};


export type QueryCenoteByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCenoteDataByThemeArgs = {
  cenote: Scalars['ID']['input'];
  theme: VariableTheme;
};


export type QueryCenoteDataByVariableArgs = {
  cenote: Scalars['ID']['input'];
  variable: Scalars['ID']['input'];
};


export type QueryLayerArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySpeciesByAphiaIdArgs = {
  aphiaId: Scalars['String']['input'];
};


export type QuerySpeciesByINaturalistIdArgs = {
  iNaturalist: Scalars['String']['input'];
};


export type QuerySpeciesByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVariableByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVariablesByThemeArgs = {
  theme: VariableTheme;
};

export type RegisterInput = {
  email: Scalars['EmailAddress']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Species = {
  __typename?: 'Species';
  _id: Scalars['ID']['output'];
  aphiaId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  iNaturalistId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateSpeciesInput = {
  aphiaId?: InputMaybe<Scalars['String']['input']>;
  iNaturalistId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateVariableInput = {
  accessLevel?: InputMaybe<AccessLevel>;
  description?: InputMaybe<Scalars['String']['input']>;
  enumValues?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id: Scalars['ID']['input'];
  methodology?: InputMaybe<Scalars['String']['input']>;
  multiple?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<VariableOrigin>;
  theme?: InputMaybe<VariableTheme>;
  timeseries?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<VariableType>;
  units?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatedCenoteInput = {
  alternativeNames?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  issues?: InputMaybe<Array<InputMaybe<CenoteIssue>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  touristic?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<CenoteType>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  Basic = 'BASIC',
  CenoteroAdvanced = 'CENOTERO_ADVANCED'
}

export type Variable = {
  __typename?: 'Variable';
  _id: Scalars['ID']['output'];
  accessLevel?: Maybe<AccessLevel>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enumValues?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  methodology?: Maybe<Scalars['String']['output']>;
  multiple?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<VariableOrigin>;
  theme?: Maybe<VariableTheme>;
  timeseries?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<VariableType>;
  units?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum VariableOrigin {
  Both = 'BOTH',
  Field = 'FIELD',
  Office = 'OFFICE'
}

export enum VariableTheme {
  Biodiversity = 'BIODIVERSITY',
  Cultural = 'CULTURAL',
  Disturbance = 'DISTURBANCE',
  Diving = 'DIVING',
  Geomorphology = 'GEOMORPHOLOGY',
  Georeference = 'GEOREFERENCE',
  Location = 'LOCATION',
  Organization = 'ORGANIZATION',
  Regulation = 'REGULATION',
  Tourism = 'TOURISM',
  Water = 'WATER'
}

export enum VariableType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Datetime = 'DATETIME',
  Enum = 'ENUM',
  Json = 'JSON',
  NumberWithUnits = 'NUMBER_WITH_UNITS',
  Text = 'TEXT',
  Time = 'TIME',
  UnitlessNumber = 'UNITLESS_NUMBER'
}

export type VariableWithData = {
  __typename?: 'VariableWithData';
  _from: Scalars['ID']['output'];
  _id: Scalars['ID']['output'];
  _to: Scalars['ID']['output'];
  firstTimestamp: Scalars['DateTime']['output'];
  lastTimestamp: Scalars['DateTime']['output'];
  measurements: Array<MeasurementOrFact>;
};

export type LayersQueryVariables = Exact<{ [key: string]: never; }>;


export type LayersQuery = { __typename?: 'Query', layers?: Array<{ __typename?: 'MapLayer', description?: string | null, id: string, name: string, metadata?: string | null } | null> | null };

export type LayersJsonQueryVariables = Exact<{ [key: string]: never; }>;


export type LayersJsonQuery = { __typename?: 'Query', layers?: Array<{ __typename?: 'MapLayer', name: string, json?: string | null } | null> | null };


export const LayersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Layers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}}]}}]} as unknown as DocumentNode<LayersQuery, LayersQueryVariables>;
export const LayersJsonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LayersJson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"json"}}]}}]}}]} as unknown as DocumentNode<LayersJsonQuery, LayersJsonQueryVariables>;