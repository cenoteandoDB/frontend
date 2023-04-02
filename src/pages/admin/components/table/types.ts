import { CenoteType, CenoteIssue, CenoteModel } from '../../../../models/CenotesTypes';
import ReferenceModel from '../../../../models/ReferencesTypes';
import { VariableModel } from '../../../../models/VariablesTypes';

export interface CenoteTableColumns {
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

export type TableColumns = CenoteTableColumns | VariableModel | object;

export type TableTypes = CenoteModel | VariableModel | ReferenceModel;