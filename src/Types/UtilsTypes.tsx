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

export interface UpdateMofPropsInterface {
  cenoteId: string | undefined | null;
  theme: string | null;
  showModal: boolean;
  handleToggleModal?: () => void;
  refetch?: () => void
}

export interface CoordinatesPropsInterface {
  lat: string;
  lng: string;
  cenote: string;
}

export interface PhotoInterface {
  src: string;
  width: number;
  height: number;
}