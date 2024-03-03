import React from 'react';

import { useLazyQuery } from '@apollo/client';
import { DownloadIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spinner } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { gql } from '../../../../__generated__';

const GET_LAYER_TO_DOWNLOAD = gql(/* GraphQL */ `
  query DownloadLayerQuery($layerId: ID!) {
    layer(id: $layerId) {
      name
    }
  }
`);

interface DownloadLayerProps {
  layerId: string;
}

export const DownloadLayer: React.FC<DownloadLayerProps> = (props) => {
  const { layerId } = props;
  const [getLayer, { data, loading, error }] = useLazyQuery(
    GET_LAYER_TO_DOWNLOAD
  );

  if (data?.layer?.name) {
    const byteCharacters = atob(data.layer.name);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const zip = new JSZip();
    zip.file(layerId, byteArray);

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, layerId + '.zip');
    });
  }

  return (
    <Flex gap={2} justifyContent='center'>
      {loading ? (
        <Spinner size='xs' />
      ) : (
        <IconButton
          aria-label=''
          size='sm'
          variant='ghost'
          onClick={() => {
            getLayer({ variables: { layerId } });
          }}
        >
          <DownloadIcon />
        </IconButton>
      )}
    </Flex>
  );
};
