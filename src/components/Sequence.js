import React, { useState } from 'react';
import SequenceKeys from 'components/SequenceKeys';
import Note from 'components/Note';

const Sequence = props => {
  const { midi, trackIndex = 0, transpose = 0, lyric, setLyric, xScale, yScale, locale } = props;
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
  const header = data.header;
  const beats = (data && header.timeSignatures && header.timeSignatures.length > 0) ? header.timeSignatures[0].timeSignature : [4,4];
  const notes = data && data.tracks[trackIndex].notes;
  const totalTicks = notes ? (notes.slice(-1)[0].ticks + notes.slice(-1)[0].durationTicks) : 7680;
  const ppq = data ? header.ppq : 480;
  const measureTicks = ppq * beats[1] * (beats[0] / beats[1]);
  const measuresCount = Math.ceil(totalTicks / measureTicks);
  const maxTicks = measureTicks * measuresCount;
  const setPhoneme = (text, index) => {
    const nextLyric = lyric.map((v,i) => i === index ? text : v);
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
        <div className="sequence-grid-y" style={{width: `${maxTicks * xScale}px`}} onClick={() => setEdit(false)}>
          { pitches.map((v,i,o) => (
            <div className="sequence-grid-octave" key={i}>
              { v.map((p,x) => (
                <div key={x} className={`sequence-grid-pitch sequence-grid-pitch-${p.color}`} />
              ))}
            </div>
          ))}
        </div>
        <div className="sequence-grid-x">
          { [...Array(measuresCount).keys()].map((_,i) => (
            <div className="sequence-grid-measure" key={i} style={{left: `${measureTicks * xScale * (i + 1)}px`}} />
          )) }
        </div>
        { midi && data.tracks[trackIndex].notes.map((v,i) => (
          <Note
            note={v}
            xScale={xScale}
            yScale={yScale}
            transpose={transpose}
            key={i}
            phoneme={lyric[i]}
            edit={edit}
            setEdit={setEdit}
            index={i}
            lyric={lyric}
            locale={locale}
            onChange={setPhoneme}
          />
        ))}
      </div>
    </div>
  );
};

export default Sequence;
