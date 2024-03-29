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
  Coordinate: { input: any; output: any; }
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
  DeleteCenote = 'DELETE_CENOTE',
  NewCenote = 'NEW_CENOTE',
  NewReference = 'NEW_REFERENCE',
  NewVariable = 'NEW_VARIABLE',
  UpdatedCenote = 'UPDATED_CENOTE',
  UpdatedReference = 'UPDATED_REFERENCE',
  UpdatedVariable = 'UPDATED_VARIABLE'
}

export type Cenote = {
  __typename?: 'Cenote';
  alternativeNames?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  distances?: Maybe<Array<Maybe<CityDistances>>>;
  id: Scalars['ID']['output'];
  issues?: Maybe<Array<Maybe<CenoteIssue>>>;
  location: CenoteLocation;
  maps?: Maybe<Array<Scalars['URL']['output']>>;
  name: Scalars['String']['output'];
  photos?: Maybe<Array<Scalars['URL']['output']>>;
  reference_count: Scalars['Int']['output'];
  reviewed?: Maybe<Scalars['Boolean']['output']>;
  social?: Maybe<CenoteSocialData>;
  touristic: Scalars['Boolean']['output'];
  type: CenoteType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  variable_count: Scalars['Int']['output'];
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
  coordinates: Scalars['Coordinate']['output'];
  country: Scalars['String']['output'];
  county: Scalars['String']['output'];
  geojson: Scalars['JSON']['output'];
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

export type DeleteMofInput = {
  cenote: Scalars['ID']['input'];
  timestamp: Scalars['DateTime']['input'];
  variable: Scalars['ID']['input'];
};

export enum GbifNameType {
  Blacklisted = 'BLACKLISTED',
  Candidatus = 'CANDIDATUS',
  Cultivar = 'CULTIVAR',
  Doubtful = 'DOUBTFUL',
  Hybrid = 'HYBRID',
  Informal = 'INFORMAL',
  NoName = 'NO_NAME',
  Otu = 'OTU',
  Placeholder = 'PLACEHOLDER',
  Scientific = 'SCIENTIFIC',
  Virus = 'VIRUS'
}

export type GbifNameUsage = {
  __typename?: 'GBIFNameUsage';
  authorship?: Maybe<Scalars['String']['output']>;
  basionym?: Maybe<Scalars['String']['output']>;
  basionymKey?: Maybe<Scalars['Int']['output']>;
  canonicalName?: Maybe<Scalars['String']['output']>;
  class?: Maybe<Scalars['String']['output']>;
  classKey?: Maybe<Scalars['Int']['output']>;
  constituentKey?: Maybe<Scalars['String']['output']>;
  datasetKey?: Maybe<Scalars['String']['output']>;
  family?: Maybe<Scalars['String']['output']>;
  familyKey?: Maybe<Scalars['Int']['output']>;
  genus?: Maybe<Scalars['String']['output']>;
  genusKey?: Maybe<Scalars['Int']['output']>;
  issues?: Maybe<Array<Scalars['String']['output']>>;
  key?: Maybe<Scalars['Int']['output']>;
  kingdom?: Maybe<Scalars['String']['output']>;
  kingdomKey?: Maybe<Scalars['Int']['output']>;
  lastCrawled?: Maybe<Scalars['String']['output']>;
  lastInterpreted?: Maybe<Scalars['String']['output']>;
  nameKey?: Maybe<Scalars['Int']['output']>;
  nameType?: Maybe<GbifNameType>;
  nomenclaturalStatus?: Maybe<Array<Scalars['String']['output']>>;
  nubKey?: Maybe<Scalars['Int']['output']>;
  numDescendants?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  orderKey?: Maybe<Scalars['Int']['output']>;
  origin?: Maybe<GbifOrigin>;
  parent?: Maybe<Scalars['String']['output']>;
  parentKey?: Maybe<Scalars['Int']['output']>;
  phylum?: Maybe<Scalars['String']['output']>;
  phylumKey?: Maybe<Scalars['Int']['output']>;
  publishedIn?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<GbifTaxonomicRank>;
  remarks?: Maybe<Scalars['String']['output']>;
  scientificName?: Maybe<Scalars['String']['output']>;
  sourceTaxonKey?: Maybe<Scalars['Int']['output']>;
  species?: Maybe<Scalars['String']['output']>;
  speciesKey?: Maybe<Scalars['Int']['output']>;
  taxonID?: Maybe<Scalars['String']['output']>;
  taxonomicStatus?: Maybe<GbifTaxonomicStatus>;
  vernacularName?: Maybe<Scalars['String']['output']>;
};

export enum GbifOrigin {
  Autonym = 'AUTONYM',
  BasionymPlaceholder = 'BASIONYM_PLACEHOLDER',
  DenormedClassification = 'DENORMED_CLASSIFICATION',
  ExAuthorSynonym = 'EX_AUTHOR_SYNONYM',
  ImplicitName = 'IMPLICIT_NAME',
  MissingAccepted = 'MISSING_ACCEPTED',
  Other = 'OTHER',
  Proparte = 'PROPARTE',
  Source = 'SOURCE',
  VerbatimAccepted = 'VERBATIM_ACCEPTED',
  VerbatimBasionym = 'VERBATIM_BASIONYM',
  VerbatimParent = 'VERBATIM_PARENT'
}

export type GbifSuggestion = {
  __typename?: 'GBIFSuggestion';
  canonicalName?: Maybe<Scalars['String']['output']>;
  class?: Maybe<Scalars['String']['output']>;
  family?: Maybe<Scalars['String']['output']>;
  genus?: Maybe<Scalars['String']['output']>;
  key: Scalars['ID']['output'];
  kingdom?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  phylum?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<GbifTaxonomicRank>;
  species?: Maybe<Scalars['String']['output']>;
};

export enum GbifTaxonomicRank {
  Aberration = 'ABERRATION',
  Biovar = 'BIOVAR',
  Chemoform = 'CHEMOFORM',
  Chemovar = 'CHEMOVAR',
  Class = 'CLASS',
  Cohort = 'COHORT',
  Convariety = 'CONVARIETY',
  Cultivar = 'CULTIVAR',
  CultivarGroup = 'CULTIVAR_GROUP',
  Domain = 'DOMAIN',
  Family = 'FAMILY',
  Form = 'FORM',
  FormaSpecialis = 'FORMA_SPECIALIS',
  Genus = 'GENUS',
  Grandorder = 'GRANDORDER',
  Grex = 'GREX',
  Infraclass = 'INFRACLASS',
  Infracohort = 'INFRACOHORT',
  Infrafamily = 'INFRAFAMILY',
  InfragenericName = 'INFRAGENERIC_NAME',
  Infragenus = 'INFRAGENUS',
  Infrakingdom = 'INFRAKINGDOM',
  Infralegion = 'INFRALEGION',
  Infraorder = 'INFRAORDER',
  Infraphylum = 'INFRAPHYLUM',
  InfraspecificName = 'INFRASPECIFIC_NAME',
  InfrasubspecificName = 'INFRASUBSPECIFIC_NAME',
  Infratribe = 'INFRATRIBE',
  Kingdom = 'KINGDOM',
  Legion = 'LEGION',
  Magnorder = 'MAGNORDER',
  Morph = 'MORPH',
  Morphovar = 'MORPHOVAR',
  Natio = 'NATIO',
  Order = 'ORDER',
  Other = 'OTHER',
  Parvclass = 'PARVCLASS',
  Parvorder = 'PARVORDER',
  Pathovar = 'PATHOVAR',
  Phagovar = 'PHAGOVAR',
  Phylum = 'PHYLUM',
  Proles = 'PROLES',
  Race = 'RACE',
  Section = 'SECTION',
  Series = 'SERIES',
  Serovar = 'SEROVAR',
  Species = 'SPECIES',
  SpeciesAggregate = 'SPECIES_AGGREGATE',
  Strain = 'STRAIN',
  Subclass = 'SUBCLASS',
  Subcohort = 'SUBCOHORT',
  Subfamily = 'SUBFAMILY',
  Subform = 'SUBFORM',
  Subgenus = 'SUBGENUS',
  Subkingdom = 'SUBKINGDOM',
  Sublegion = 'SUBLEGION',
  Suborder = 'SUBORDER',
  Subphylum = 'SUBPHYLUM',
  Subsection = 'SUBSECTION',
  Subseries = 'SUBSERIES',
  Subspecies = 'SUBSPECIES',
  Subtribe = 'SUBTRIBE',
  Subvariety = 'SUBVARIETY',
  Superclass = 'SUPERCLASS',
  Supercohort = 'SUPERCOHORT',
  Superfamily = 'SUPERFAMILY',
  Superkingdom = 'SUPERKINGDOM',
  Superlegion = 'SUPERLEGION',
  Superorder = 'SUPERORDER',
  Superphylum = 'SUPERPHYLUM',
  Supertribe = 'SUPERTRIBE',
  SupragenericName = 'SUPRAGENERIC_NAME',
  Tribe = 'TRIBE',
  Unranked = 'UNRANKED',
  Variety = 'VARIETY'
}

export enum GbifTaxonomicStatus {
  Accepted = 'ACCEPTED',
  Doubtful = 'DOUBTFUL',
  HeterotypicSynonym = 'HETEROTYPIC_SYNONYM',
  HomotypicSynonym = 'HOMOTYPIC_SYNONYM',
  Misapplied = 'MISAPPLIED',
  ProparteSynonym = 'PROPARTE_SYNONYM',
  Synonym = 'SYNONYM'
}

export enum LayerCategory {
  Antropogenica = 'ANTROPOGENICA',
  Clima = 'CLIMA',
  GeoEstatistica = 'GEO_ESTATISTICA',
  Hidrologia = 'HIDROLOGIA',
  Intrinseca = 'INTRINSECA'
}

export type MapLayer = {
  __typename?: 'MapLayer';
  category?: Maybe<LayerCategory>;
  description?: Maybe<Scalars['String']['output']>;
  geojson?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
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
  deleteCenote?: Maybe<Scalars['Boolean']['output']>;
  deleteMof?: Maybe<Scalars['Boolean']['output']>;
  register?: Maybe<User>;
  updateCenote?: Maybe<Cenote>;
  updateEmail?: Maybe<User>;
  updateSpecies?: Maybe<Species>;
  updateVariable?: Maybe<Variable>;
  uploadMap?: Maybe<Scalars['Boolean']['output']>;
  uploadPhoto?: Maybe<Scalars['Boolean']['output']>;
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


export type MutationDeleteCenoteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMofArgs = {
  delete_mof_input: DeleteMofInput;
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


export type MutationUploadMapArgs = {
  mapInput: PhotoOrMapUploadInput;
};


export type MutationUploadPhotoArgs = {
  photoInput: PhotoOrMapUploadInput;
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
  gbifId?: InputMaybe<Scalars['ID']['input']>;
  iNaturalistId?: InputMaybe<Scalars['ID']['input']>;
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

export type PhotoOrMapUploadInput = {
  cenoteId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  extension: Scalars['String']['input'];
  filename: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  auditLogs?: Maybe<Array<Maybe<AuditLog>>>;
  cenoteById?: Maybe<Cenote>;
  cenoteDataByTheme?: Maybe<Array<VariableWithData>>;
  cenoteDataByVariable?: Maybe<VariableWithData>;
  cenotes: Array<Cenote>;
  cenotesBounds?: Maybe<CenoteBounds>;
  cenotesCsv?: Maybe<Scalars['String']['output']>;
  gbifSpeciesSuggestion?: Maybe<Array<GbifSuggestion>>;
  iNaturalistSearch: INaturalistSearchTaxonResponse;
  layer?: Maybe<MapLayer>;
  layers?: Maybe<Array<Maybe<MapLayer>>>;
  referenceById?: Maybe<Reference>;
  references?: Maybe<Array<Reference>>;
  species?: Maybe<Array<Maybe<Species>>>;
  speciesByGBIFId?: Maybe<Species>;
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


export type QueryGbifSpeciesSuggestionArgs = {
  q: Scalars['String']['input'];
  rank?: InputMaybe<GbifTaxonomicRank>;
};


export type QueryINaturalistSearchArgs = {
  perPage?: InputMaybe<Scalars['Int']['input']>;
  q: Scalars['String']['input'];
};


export type QueryLayerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReferenceByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySpeciesByGbifIdArgs = {
  gbifId: Scalars['ID']['input'];
};


export type QuerySpeciesByINaturalistIdArgs = {
  iNaturalistId: Scalars['ID']['input'];
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

export type Reference = {
  __typename?: 'Reference';
  authors: Array<Scalars['String']['output']>;
  book?: Maybe<Scalars['String']['output']>;
  cenoteando_id: Scalars['ID']['output'];
  cenotes_count: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date_primary?: Maybe<Scalars['Int']['output']>;
  date_secondary?: Maybe<Scalars['Int']['output']>;
  doi?: Maybe<Scalars['String']['output']>;
  firestore_id: Scalars['ID']['output'];
  has_pdf: Scalars['Boolean']['output'];
  institution?: Maybe<Scalars['String']['output']>;
  issue?: Maybe<Scalars['String']['output']>;
  journal_name?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  mendeley_ref: Scalars['Boolean']['output'];
  pages?: Maybe<Scalars['String']['output']>;
  pdf_name?: Maybe<Scalars['String']['output']>;
  short_name?: Maybe<Scalars['String']['output']>;
  species_count: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: ReferenceType;
  unique_code: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uploaded_dropbox: Scalars['Boolean']['output'];
  uploaded_gcp: Scalars['Boolean']['output'];
  uploaded_mendeley: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
  validated_mendeley: Scalars['Boolean']['output'];
};

export enum ReferenceType {
  Book = 'BOOK',
  BookChapter = 'BOOK_CHAPTER',
  Journal = 'JOURNAL',
  Other = 'OTHER',
  Report = 'REPORT',
  Thesis = 'THESIS',
  WebPage = 'WEB_PAGE'
}

export type RegisterInput = {
  email: Scalars['EmailAddress']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Species = {
  __typename?: 'Species';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gbifDetails?: Maybe<GbifNameUsage>;
  gbifId?: Maybe<Scalars['ID']['output']>;
  iNaturalistDetails?: Maybe<INaturalistTaxonRecord>;
  iNaturalistId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateSpeciesInput = {
  gbifId?: InputMaybe<Scalars['ID']['input']>;
  iNaturalistId?: InputMaybe<Scalars['ID']['input']>;
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

export type INaturalistFlagCounts = {
  __typename?: 'iNaturalistFlagCounts';
  resolved?: Maybe<Scalars['Int']['output']>;
  unresolved?: Maybe<Scalars['Int']['output']>;
};

export type INaturalistPhoto = {
  __typename?: 'iNaturalistPhoto';
  attribution?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['Int']['output']>;
  large_url?: Maybe<Scalars['String']['output']>;
  license_code?: Maybe<Scalars['String']['output']>;
  medium_url?: Maybe<Scalars['String']['output']>;
  original_dimensions?: Maybe<INaturalistPhotoDimensions>;
  original_url?: Maybe<Scalars['String']['output']>;
  small_url?: Maybe<Scalars['String']['output']>;
  square_url?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type INaturalistPhotoDimensions = {
  __typename?: 'iNaturalistPhotoDimensions';
  height?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type INaturalistSearchTaxonResponse = {
  __typename?: 'iNaturalistSearchTaxonResponse';
  page?: Maybe<Scalars['Int']['output']>;
  per_page?: Maybe<Scalars['Int']['output']>;
  results?: Maybe<Array<Maybe<INaturalistTaxonResult>>>;
  total_results?: Maybe<Scalars['Int']['output']>;
};

export type INaturalistTaxonPhoto = {
  __typename?: 'iNaturalistTaxonPhoto';
  photo?: Maybe<INaturalistPhoto>;
  taxon_id?: Maybe<Scalars['Int']['output']>;
};

export type INaturalistTaxonRecord = {
  __typename?: 'iNaturalistTaxonRecord';
  ancestor_ids?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  ancestry?: Maybe<Scalars['String']['output']>;
  atlas_id?: Maybe<Scalars['Int']['output']>;
  complete_species_count?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  current_synonymous_taxon_ids?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  default_photo?: Maybe<INaturalistPhoto>;
  extinct?: Maybe<Scalars['Boolean']['output']>;
  flag_counts?: Maybe<INaturalistFlagCounts>;
  iconic_taxon_id?: Maybe<Scalars['Int']['output']>;
  iconic_taxon_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  is_active?: Maybe<Scalars['Boolean']['output']>;
  matched_term?: Maybe<Scalars['String']['output']>;
  min_species_ancestry?: Maybe<Scalars['String']['output']>;
  min_species_taxon_id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  observations_count?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['Int']['output']>;
  photos_locked?: Maybe<Scalars['Boolean']['output']>;
  preferred_common_name?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['String']['output']>;
  rank_level?: Maybe<Scalars['Int']['output']>;
  taxon_changes_count?: Maybe<Scalars['Int']['output']>;
  taxon_photos?: Maybe<Array<Maybe<INaturalistTaxonPhoto>>>;
  taxon_schemes_count?: Maybe<Scalars['Int']['output']>;
  universal_search_rank?: Maybe<Scalars['Int']['output']>;
  wikipedia_url?: Maybe<Scalars['String']['output']>;
};

export type INaturalistTaxonResult = {
  __typename?: 'iNaturalistTaxonResult';
  matches?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  record?: Maybe<INaturalistTaxonRecord>;
  score?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LayerQueryVariables = Exact<{
  layerId: Scalars['ID']['input'];
}>;


export type LayerQuery = { __typename?: 'Query', layer?: { __typename?: 'MapLayer', geojson?: string | null } | null };

export type DownloadLayerQueryQueryVariables = Exact<{
  layerId: Scalars['ID']['input'];
}>;


export type DownloadLayerQueryQuery = { __typename?: 'Query', layer?: { __typename?: 'MapLayer', name: string } | null };

export type CreateCenoteMutationVariables = Exact<{
  newCenote: NewCenoteInput;
}>;


export type CreateCenoteMutation = { __typename?: 'Mutation', createCenote?: { __typename?: 'Cenote', id: string, location: { __typename?: 'CenoteLocation', coordinates: any } } | null };

export type CenoteByIdQueryVariables = Exact<{
  cenoteId: Scalars['ID']['input'];
}>;


export type CenoteByIdQuery = { __typename?: 'Query', cenoteById?: (
    { __typename?: 'Cenote' }
    & { ' $fragmentRefs'?: { 'UpdateCenoteFieldsFragment': UpdateCenoteFieldsFragment } }
  ) | null };

export type UpdateCenoteMutationVariables = Exact<{
  updatedCenote: UpdatedCenoteInput;
}>;


export type UpdateCenoteMutation = { __typename?: 'Mutation', updateCenote?: (
    { __typename?: 'Cenote' }
    & { ' $fragmentRefs'?: { 'UpdateCenoteFieldsFragment': UpdateCenoteFieldsFragment } }
  ) | null };

export type UpdateCenoteFieldsFragment = { __typename?: 'Cenote', id: string, name: string, type: CenoteType, touristic: boolean, issues?: Array<CenoteIssue | null> | null, alternativeNames?: Array<string> | null } & { ' $fragmentName'?: 'UpdateCenoteFieldsFragment' };

export type CenotesTableQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CenotesTableQueryQuery = { __typename?: 'Query', cenotes: Array<{ __typename?: 'Cenote', id: string, name: string, type: CenoteType, createdAt?: any | null, updatedAt?: any | null, touristic: boolean, issues?: Array<CenoteIssue | null> | null, variable_count: number, location: { __typename?: 'CenoteLocation', state: string, county: string } }> };

export type LayersTableQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type LayersTableQueryQuery = { __typename?: 'Query', layers?: Array<{ __typename?: 'MapLayer', description?: string | null, id: string, name: string, metadata?: string | null, thumbnail?: string | null } | null> | null };

export type ReferencesTableQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ReferencesTableQueryQuery = { __typename?: 'Query', references?: Array<{ __typename?: 'Reference', cenoteando_id: string, type: ReferenceType, unique_code: string, title: string, short_name?: string | null, date_primary?: number | null, authors: Array<string>, journal_name?: string | null, issue?: string | null, institution?: string | null, date_secondary?: number | null, book?: string | null, pages?: string | null, doi?: string | null, url?: string | null, keywords?: Array<string> | null, has_pdf: boolean, pdf_name?: string | null, mendeley_ref: boolean, uploaded_mendeley: boolean, validated_mendeley: boolean, uploaded_dropbox: boolean, uploaded_gcp: boolean, cenotes_count: number, species_count: number, createdAt?: any | null, updatedAt?: any | null }> | null };

export type CenoteInformationByIdQueryVariables = Exact<{
  cenoteByIdId: Scalars['ID']['input'];
}>;


export type CenoteInformationByIdQuery = { __typename?: 'Query', cenoteById?: { __typename?: 'Cenote', alternativeNames?: Array<string> | null, createdAt?: any | null, id: string, issues?: Array<CenoteIssue | null> | null, name: string, photos?: Array<any> | null, type: CenoteType, touristic: boolean, updatedAt?: any | null, creator?: { __typename?: 'User', name: string, email: any, role: UserRole } | null, distances?: Array<{ __typename?: 'CityDistances', time?: number | null, location: string, distance?: number | null } | null> | null, location: { __typename?: 'CenoteLocation', state: string, county: string, country: string, coordinates: any, geojson: any }, social?: { __typename?: 'CenoteSocialData', comments?: Array<{ __typename?: 'Comment', review?: number | null, commenter?: string | null, comment?: string | null } | null> | null } | null } | null };

export type LayersJsonQueryVariables = Exact<{ [key: string]: never; }>;


export type LayersJsonQuery = { __typename?: 'Query', layers?: Array<{ __typename?: 'MapLayer', id: string, name: string } | null> | null };

export type CenotesGeoJsonQueryVariables = Exact<{ [key: string]: never; }>;


export type CenotesGeoJsonQuery = { __typename?: 'Query', cenotes: Array<{ __typename?: 'Cenote', id: string, name: string, type: CenoteType, touristic: boolean, location: { __typename?: 'CenoteLocation', geojson: any } }> };

export const UpdateCenoteFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpdateCenoteFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cenote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"touristic"}},{"kind":"Field","name":{"kind":"Name","value":"issues"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeNames"}}]}}]} as unknown as DocumentNode<UpdateCenoteFieldsFragment, unknown>;
export const LayerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Layer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"layerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"layerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}}]}}]}}]} as unknown as DocumentNode<LayerQuery, LayerQueryVariables>;
export const DownloadLayerQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DownloadLayerQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"layerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"layerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DownloadLayerQueryQuery, DownloadLayerQueryQueryVariables>;
export const CreateCenoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCenote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newCenote"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewCenoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCenote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"new_cenote"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newCenote"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinates"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCenoteMutation, CreateCenoteMutationVariables>;
export const CenoteByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CenoteById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cenoteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cenoteById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cenoteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UpdateCenoteFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpdateCenoteFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cenote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"touristic"}},{"kind":"Field","name":{"kind":"Name","value":"issues"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeNames"}}]}}]} as unknown as DocumentNode<CenoteByIdQuery, CenoteByIdQueryVariables>;
export const UpdateCenoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCenote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatedCenote"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatedCenoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCenote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updated_cenote"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatedCenote"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UpdateCenoteFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpdateCenoteFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cenote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"touristic"}},{"kind":"Field","name":{"kind":"Name","value":"issues"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeNames"}}]}}]} as unknown as DocumentNode<UpdateCenoteMutation, UpdateCenoteMutationVariables>;
export const CenotesTableQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CenotesTableQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cenotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"county"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"touristic"}},{"kind":"Field","name":{"kind":"Name","value":"issues"}},{"kind":"Field","name":{"kind":"Name","value":"variable_count"}}]}}]}}]} as unknown as DocumentNode<CenotesTableQueryQuery, CenotesTableQueryQueryVariables>;
export const LayersTableQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LayersTableQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}}]}}]}}]} as unknown as DocumentNode<LayersTableQueryQuery, LayersTableQueryQueryVariables>;
export const ReferencesTableQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ReferencesTableQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cenoteando_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unique_code"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"short_name"}},{"kind":"Field","name":{"kind":"Name","value":"date_primary"}},{"kind":"Field","name":{"kind":"Name","value":"authors"}},{"kind":"Field","name":{"kind":"Name","value":"journal_name"}},{"kind":"Field","name":{"kind":"Name","value":"issue"}},{"kind":"Field","name":{"kind":"Name","value":"institution"}},{"kind":"Field","name":{"kind":"Name","value":"date_secondary"}},{"kind":"Field","name":{"kind":"Name","value":"book"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"doi"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"has_pdf"}},{"kind":"Field","name":{"kind":"Name","value":"pdf_name"}},{"kind":"Field","name":{"kind":"Name","value":"mendeley_ref"}},{"kind":"Field","name":{"kind":"Name","value":"uploaded_mendeley"}},{"kind":"Field","name":{"kind":"Name","value":"validated_mendeley"}},{"kind":"Field","name":{"kind":"Name","value":"uploaded_dropbox"}},{"kind":"Field","name":{"kind":"Name","value":"uploaded_gcp"}},{"kind":"Field","name":{"kind":"Name","value":"cenotes_count"}},{"kind":"Field","name":{"kind":"Name","value":"species_count"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ReferencesTableQueryQuery, ReferencesTableQueryQueryVariables>;
export const CenoteInformationByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CenoteInformationById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cenoteByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cenoteById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cenoteByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alternativeNames"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"distances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issues"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"county"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"}},{"kind":"Field","name":{"kind":"Name","value":"geojson"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"social"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"commenter"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"touristic"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CenoteInformationByIdQuery, CenoteInformationByIdQueryVariables>;
export const LayersJsonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LayersJson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"layers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LayersJsonQuery, LayersJsonQueryVariables>;
export const CenotesGeoJsonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CenotesGeoJson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cenotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"touristic"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}}]}}]}}]}}]} as unknown as DocumentNode<CenotesGeoJsonQuery, CenotesGeoJsonQueryVariables>;