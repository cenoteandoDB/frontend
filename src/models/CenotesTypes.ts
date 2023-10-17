import { GeoJsonProperties } from 'geojson';
import moment from 'moment';
import 'moment/dist/locale/es-mx';

type CenoteSocialProperties = {
  totalComments: number;
  rating?: number;
};

export type geoJsonI = {
  id: number | string;
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
};

export enum CenoteType {
  NO_TYPE = 'Sin tipo',
  CENOTE = 'Cenote',
  DRY_CAVE = 'Cueva seca',
  WATER_WELL = 'Pozo',
  WATERY = 'Acuoso',
}

export enum CenoteIssue {
  GEOTAG_NOT_VERIFIED = 'Geo Tag no verificado',
}

export class CenoteModel {
  __typename!: string;
  id!: string;
  arangoId?: string;
  type!: CenoteType;
  name!: string;
  touristic!: boolean;
  issues!: Array<CenoteIssue>;
  alternativeNames!: Array<string>;
  geojson!: {
    type: 'Feature';
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    };
    properties: Record<string, unknown>;
  };
  gadm!: GeoJsonProperties;
  social!: CenoteSocialProperties;
  createdAt!: string;
  updatedAt!: string;

  constructor(jsonObj?: CenoteModel) {
    // console.log(jsonObj?.createdAt);
    
    moment().locale('es-mx');
    if (jsonObj) {
      this.id = jsonObj.id;
      this.type = jsonObj.type;
      this.name = jsonObj.name;
      this.touristic = jsonObj.touristic;
      this.issues = jsonObj.issues;
      this.alternativeNames = jsonObj.alternativeNames;
      this.geojson = jsonObj.geojson;
      this.gadm = jsonObj.gadm;
      this.social = jsonObj.social;
      this.createdAt = jsonObj.createdAt;
      this.updatedAt = jsonObj.updatedAt;
    } else {
      this.getDefaults();
    }
  }

  private getDefaults() {
    this.id = '';
    this.type = CenoteType.NO_TYPE;
    this.name = '';
    this.touristic = true;
    this.issues = [];
    this.alternativeNames = [];
    this.geojson = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: {},
    };
    this.gadm = {};
    this.social = {
      totalComments: 0,
      rating: 0,
    };
    this.createdAt = '';
    this.updatedAt = '';
  }

  formatCreatedAtDate() {
    return moment(this.createdAt).format('LL');
  }

  formatUpdatedAtDate() {
    return moment(this.updatedAt).format('LL');
  }

  getLatitude(): number | null {
    return this.geojson?.geometry.coordinates[1] || null;
  }

  getLongitude(): number | null {
    return this.geojson?.geometry.coordinates[0] || null;
  }

  getGeoJson(): geoJsonI {
    const geoJson = {
      id: this.id,
      ...this.geojson,
    };
    return geoJson;
  }

  setCoordinates(latitude: number, longitude: number): void {
    // TODO: Validate coordinates (Error handling)
    if (this.geojson?.geometry?.coordinates) {
      this.geojson.geometry.coordinates = [longitude, latitude];
    } else {
      this.geojson = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        properties: this.geojson?.properties || {},
      };
    }
  }
}
