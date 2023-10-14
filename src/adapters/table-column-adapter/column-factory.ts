import { CenoteModel } from '../../models/CenotesTypes';
import ReferenceModel from '../../models/ReferencesTypes';
import { VariableModel } from '../../models/VariablesTypes';
import { TableTypes } from '../../pages/admin/components/table/types';
import { LayersTableQueryQuery } from '../../__generated__/graphql';
import { CenotesColumnCreator } from './cenotes-column-creator';
import { LayersColumnCreator } from './layers-column-creator';
import { ReferenceColumnCreator } from './reference-column-creator';
import { VariablesColumnCreator } from './variables-column-creator';

export const columnFactory = (tableType: TableTypes[] | LayersTableQueryQuery['layers'] | null) => {
  if (!tableType || tableType?.length === 0 || !tableType[0]) return null;

  switch (true) {
  case tableType[0] instanceof CenoteModel:
    return new CenotesColumnCreator(tableType as CenoteModel[]);

  case tableType[0] instanceof VariableModel:
    return new VariablesColumnCreator(tableType as VariableModel[]);

  case tableType[0] instanceof ReferenceModel:
    return new ReferenceColumnCreator(tableType as ReferenceModel[]);

  case tableType[0]?.__typename === 'MapLayer': 
    return new LayersColumnCreator(tableType as LayersTableQueryQuery['layers']);

  default:
    console.log('No class build');
    break;
  }
};
