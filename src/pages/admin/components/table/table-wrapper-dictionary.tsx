import { CenotesTableWrapper } from './wrappers/cenotes-table-wrapper';
import { LayersTableWrapper } from './wrappers/layers-table-wrapper';
import { ReferencesTableWrapper } from './wrappers/references-table-wrapper';

const TABLE_DICTIONARY: Record<string, () => JSX.Element | null> = {
  cenotes: CenotesTableWrapper,
  layers: LayersTableWrapper,
  references: ReferencesTableWrapper
};


export const getTableComponent = (table: string) => TABLE_DICTIONARY[`${table}`];