export interface CenotePermissionInputInterface {
  cenotes: CenotePermissionInterface[];
  userId: string;
}

export interface CenotePermissionInterface {
    canDelete: boolean;
    canEdit: boolean;
    canView: boolean;
    cenoteId: string;
}

export interface SelectedCenotesPermissionInterface {
  canDelete: boolean;
  canEdit: boolean;
  canView: boolean;
  cenoteId: string | undefined;
  name: string | undefined;
}

///PARA ENVIAR A LA MUTACION
export interface VariablesPermissionInputInterface {
  cenotes: VariablesPermissionInterface[] | null | undefined;
  userId: string;
  cenoteId: string;
}

export interface VariablesPermissionInterface {
  canDelete: boolean;
  canEdit: boolean;
  canView: boolean;
  variableId: string;
}

///TRATAMIENTO DE LA DATA ANTES DE ENVIAR 
export interface variablesPermissionTmpList{
  variableList: CheckVariableTmpInterface[];
}

export interface CheckVariableTmpInterface {
  cenoteId: string | undefined;
  variables: SelectedVariableTmpInterface[];
  isSaved: boolean;
}

export interface SelectedVariableTmpInterface {
  canDelete: boolean | undefined;
  canEdit: boolean | undefined;
  canView: boolean;
  variableId: string | undefined;
  name: string | undefined;
  theme: string | undefined;
  description: string | undefined;
}


export interface ThemeCheckboxInterface {
  canDelete: boolean | undefined;
  canEdit: boolean | undefined;
  theme: string | undefined;
}