import { MeasurementsInterface, mofInterface } from "./CenotesTypes";

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

export interface UpdateCenotePropsInterface {
    id: string | null | undefined;
    showModal: boolean;
    handleToggleModal: () => void;
    refetch: () => void;
}

export interface UpdatePropsInterface {
  id: string | null | undefined;
  showModal: boolean;
  handleToggleModal?: () => void;
  refetch?: () => void;
  refetchCenoteById?: () => void;
}

export interface UpdateMofPropsInterface {
  cenoteId: string | undefined | null;
  theme: string | null;
  category: string | null;
  showModal: boolean;
  handleToggleModal?: () => void;
  refetch?: () => void
}

export interface AddMofPropsInterface {
  cenoteId: string | undefined | null;
  theme: string | null;
  category: string | null;
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
  id: string;
  isMain: boolean;
  url: string;
  src: string;
  width: number;
  height: number;
}

export interface changeMainPhotoInterface {
  cenote_id: string;
  photo_id: boolean;
}


export interface WaterTabInterface {
  category: string;
  mofs: mofInterface[];
  color: string; 
}

export interface MofModificationInterface {
      cenoteId: string;
      cenoteName: string;
      creator: string;
      creatorId: string;
      firestore_id: string;
      mof: MeasurementsInterface
      old_mof: MeasurementsInterface
      type: string;
      variableCategory: string;
      variableId: string;
}