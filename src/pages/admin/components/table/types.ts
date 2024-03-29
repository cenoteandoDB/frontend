import { CenoteModel } from '../../../../models/CenotesTypes';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { VariableModel } from '../../../../models/VariablesTypes';
import { CenoteIssue, CenotesTableQueryQuery, CenoteType, LayersTableQueryQuery, ReferencesTableQueryQuery } from '../../../../__generated__/graphql';

export const adaptCenoteType: Record<CenoteType, string> = {
  [CenoteType.Cenote]: 'Cenote',
  [CenoteType.DryCave]: 'Cueva Seca',
  [CenoteType.NoType]: 'Sin Tipo',
  [CenoteType.Watery]: 'Acuático',
  [CenoteType.WaterWell]: 'Pozo de Agua',
};

export const adaptCenoteIssue: Record<CenoteIssue, string> = {
  [CenoteIssue.GeotagNotVerified]: 'Geo tag no verificada',
};

interface EditTableContent {
  editar?: JSX.Element;
}

export interface CenoteTableColumns extends EditTableContent {
  id: string;
  nombre: string;
  estado: string;
  municipalidad: string;
  tipo?: string;
  problemas?: string[];
  creado: string;
  actualizado: string;
  turistico: boolean;
}

export interface VariablesTableColumns extends EditTableContent {
  id: string;
  nombre: string;
  descripcion: string;
  tema: string;
  nivel_de_acceso: string;
  tipo_dato: string;
  origen: string;
  series: boolean;
  multiplos: boolean;
  enumValues: string[];
  unidad: string | null;
  metodologia: string | null;
}

export interface ReferenceTableColumns extends EditTableContent {
  id: string;
  autores: string;
  nombre_corto: string;
  referencia: string;
  tipo: string;
  año: string;
}

export type TableColumns = CenoteTableColumns | VariableModel | object;

export type TableTypes = CenoteModel | VariableModel | ReferenceModel;

export type GraphqlTableTypes = CenotesTableQueryQuery['cenotes'] | LayersTableQueryQuery['layers'] | ReferencesTableQueryQuery['references']
