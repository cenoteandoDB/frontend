import {
  CenoteType,
  CenoteIssue,
  CenoteModel,
} from '../../../../models/CenotesTypes';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { VariableModel } from '../../../../models/VariablesTypes';

interface EditTableContent {
  edit: JSX.Element;
}

export interface CenoteTableColumns extends EditTableContent {
  id: string;
  name: string;
  state: string;
  municipality: string;
  type: CenoteType;
  issues: CenoteIssue[];
  createdAt: string;
  updatedAt: string;
  touristic: boolean;
}

export interface VariablesTableColumns extends EditTableContent {
  id: string;
  name: string;
  description: string;
  theme: string;
  timeSeries: boolean;
  multiple: boolean;
  unit: string | null;
  methodology: string | null;
}

export interface ReferenceTableColumns extends EditTableContent {
  id: string;
  authors: string;
  shortName: string;
  type: string;
  year: string;
}

export type TableColumns = CenoteTableColumns | VariableModel | object;

export type TableTypes = CenoteModel | VariableModel | ReferenceModel;
