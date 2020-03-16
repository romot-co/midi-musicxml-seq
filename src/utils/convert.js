export const midiNumberToPitchMusicXML = (midiNumber, transpose = 0) => {
  const mapStep = [
    'C','C','D','D','E','F','F','G','G','A','A','B',
  ];
  const mapAlter = [
    0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,
  ];
  const octave = Math.floor(midiNumber / 12) - 1;
  const step = mapStep[midiNumber % 12];
  const alter = mapAlter[midiNumber % 12] + transpose;
  return {
    step: {
      _text: step,
    },
    alter: {
      _text: alter > 0 ? `+${alter.toString()}` : alter.toString()
    },
    octave: {
      _text: octave.toString(),
    },
  };
};
