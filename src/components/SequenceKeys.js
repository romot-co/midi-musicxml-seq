import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

const SequenceKeys = props => {
  const { keys, octave } = props;
  const mapPitch = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'D#',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'G#',
    9: 'A',
    10: 'A#',
    11: 'B',
  };

  return (
    <div className="sequence-keys">
      { keys.map((v,i) => (
        <React.Fragment key={i}>
          <div className={`sequence-key sequence-key-${v.midi} sequence-key-${v.color} sequence-key-${v.pitch}`} id={`sequence-key-${v.midi}`}>
            <span className="sequence-key-base">{mapPitch[v.pitch]}{octave + 1}</span>
          </div>
          <UncontrolledTooltip
            target={`sequence-key-${v.midi}`} placement="right"
          >
            {mapPitch[v.pitch]}{octave}
          </UncontrolledTooltip>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SequenceKeys;
