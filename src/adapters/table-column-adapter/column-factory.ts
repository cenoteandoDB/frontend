import { CenoteModel } from '../../models/CenotesTypes';
import ReferenceModel from '../../models/ReferencesTypes';
import { VariableModel } from '../../models/VariablesTypes';
import { GraphqlTableTypes, TableTypes } from '../../pages/admin/components/table/types';
import { LayersTableQueryQuery } from '../../__generated__/graphql';
import { CenotesColumnCreator } from './cenotes-column-creator';
import { LayersColumnCreator } from './layers-column-creator';
import { ReferenceColumnCreator } from './reference-column-creator';
import { VariablesColumnCreator } from './variables-column-creator';

export const columnFactory = (tableType: TableTypes[] | GraphqlTableTypes) => {
  if (!tableType || tableType?.length === 0 || !tableType[0]) return null;

  switch (true) {
  case tableType[0]?.__typename === 'Cenote':
    return new CenotesColumnCreator(tableType as CenoteModel[]);

  case tableType[0] instanceof VariableModel:
    return new VariablesColumnCreator(tableType as VariableModel[]);

  case tableType[0]?.__typename === 'Reference':
    return new ReferenceColumnCreator(tableType as ReferenceModel[]);

  case tableType[0]?.__typename === 'MapLayer': 
    return new LayersColumnCreator(tableType as LayersTableQueryQuery['layers']);

  default:
    //TODO implement logic to log the actual table type 
    console.error('No class build', tableType);
    break;
  }
};
