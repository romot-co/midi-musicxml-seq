import React, { useState } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import Note from 'components/Note';

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
    <div className="sequence-scale">
      { keys.map((v,i) => (
        <React.Fragment key={i}>
          <div className={`sequence-key sequence-key-${v.midi} sequence-key-${v.color} sequence-key-${v.pitch}`} id={`sequence-key-${v.midi}`}>
            <span className="sequence-key-base">{mapPitch[v.pitch]}{octave + 1}</span>
          </div>
          {/*
          <UncontrolledTooltip
            target={`sequence-key-${v.midi}`} placement="right"
          >
            {mapPitch[v.pitch]}{octave}
          </UncontrolledTooltip>
          */}
        </React.Fragment>
      ))}
    </div>
  );
};

const Sequence = props => {
  const { midi, trackIndex = 0, lyric, setLyric, xScale } = props;
  const pitches = [...Array(128).keys()]
    .reduce((a, c, i) => i % 12 === 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]], [])
    .map((v,oc) => v.map((n,i) => {
      return {
        midi: n,
        pitch: i,
        octave: 9 - oc,
        color: [0,2,4,5,7,9,11].indexOf(i) > -1 ? 'white' : 'black',
      }
    }).reverse()).reverse();
  const data = midi && midi.toJSON();
  const notes = data && data.tracks[trackIndex].notes;
  const totalDuration = notes ? (notes[notes.length - 1].ticks + notes[notes.length - 1].durationTicks) * xScale : 1000;
  const setPhoneme = (text, index) => {
    const nextLyric = lyric.split('').map((v,i) => i === index ? text : v).join('');
    setLyric(nextLyric);
  };
  const [edit, setEdit] = useState(false);
  return (
    <div className="sequence">
      <div className="sequence-scales">
        {
          pitches.map((v,i,o) => (
            <SequenceKeys keys={v} octave={9 - i} key={i} />
          ))
        }
      </div>
      <div className="sequence-body">
        <div className="sequence-grid" style={{width: `${totalDuration / xScale}px`}} onClick={() => setEdit(false)}>
          { pitches.map((v,i,o) => (
            <div className="sequence-grid-octave" key={i}>
              { v.map((p,x) => (
                <div key={x} className={`sequence-grid-pitch sequence-grid-pitch-${p.color}`} />
              ))}
            </div>
          ))}
        </div>
        { midi && data.tracks[trackIndex].notes.map((v,i) => (
          <Note
            note={v}
            xScale={xScale}
            key={i}
            phoneme={lyric[i]}
            edit={edit}
            setEdit={setEdit}
            index={i}
            lyric={lyric}
            onChange={setPhoneme}
          />
        ))}
      </div>
    </div>
  );
};

export default Sequence;
