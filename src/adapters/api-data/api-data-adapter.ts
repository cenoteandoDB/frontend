import { CenoteModel } from '../../models/CenotesTypes';
import ReferenceModel from '../../models/ReferencesTypes';
import { VariableModel } from '../../models/VariablesTypes';

const classMap = {
  cenotes: (data: CenoteModel) => new CenoteModel(data),
  variables: (data: VariableModel) => new VariableModel(data),
  references: (data: ReferenceModel) => new ReferenceModel(data),
};

export const dataAdapter = (classType: string, data: any) => {
  const clazz = classMap[classType as keyof typeof classMap];
  return data.content.map(
    (cenote: CenoteModel & VariableModel & ReferenceModel) =>
      clazz(cenote)
  );
};