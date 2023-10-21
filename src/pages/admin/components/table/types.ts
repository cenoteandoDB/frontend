import {
  CenoteModel
} from '../../../../models/CenotesTypes';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { VariableModel } from '../../../../models/VariablesTypes';
import { CenotesTableQueryQuery, CenoteType, CenoteIssue } from '../../../../__generated__/graphql';

interface EditTableContent {
  editar?: JSX.Element;
}

export interface CenoteTableColumns extends EditTableContent {
  id: string;
  nombre: string;
  estado: string;
  municipalidad: string;
  tipo?: CenoteType;
  problemas?: (CenoteIssue | null)[] | null;
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
  tipo_dato: string
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
