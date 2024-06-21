export interface ConfirmActionPropsInterface {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface SingleModalPropsInterface {
  showModal: boolean;
  handleToggleModal?: () => void;
}

export interface UpdateUserPropsInterface {
  id: string | null;
  showModal: boolean;
  handleToggleModal?: () => void;
  refetchUsers?: () => void
}