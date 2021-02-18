import Tone from 'tone';
import { unstable_createResource } from 'react-cache';
// import { unstable_createResource } from '../../../vendor/react-cache/index';

export const bufferResource = unstable_createResource(
  url =>
    new Promise(resolve => {
      const buffer = new Tone.Player(url, () => {
        resolve(buffer);
      }).toMaster();
    })
);
