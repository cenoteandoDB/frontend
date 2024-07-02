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
  refetch?: () => void;
}

export interface UpdatePropsInterface {
  id: string | null;
  showModal: boolean;
  handleToggleModal?: () => void;
  refetch?: () => void
}