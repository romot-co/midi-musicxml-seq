import { toKana } from 'wanakana';

export const parseMidiToUST = (midi, lyric, locale, trackIndex, tempo, transpose) => {
  const raw = midi.toJSON();
  const header = raw.header;
  const beats = Array.isArray(header.timeSignatures) && header.timeSignatures.length > 0 ? header.timeSignatures[0].timeSignature : [4,4];
  const track = raw.tracks[trackIndex];
  let t = `[#VERSION]
UST Version2.0
Charset=UTF-8
[#SETTING]
TimeSignatures=(${beats[0]}/${beats[1]}/0),
Tempo=${tempo}
ProjectName=(no title)
OutFile=
VoiceDir=${"${DEFAULT}/"}
Flags=
Mode2=True`;

  track.notes.forEach((note,index,origin) => {
    t = t +
  `
[#${('0000' + index).slice(-4)}]
Delta=${index === 0 ? note.ticks : note.ticks - origin[index - 1].ticks}
Duration=${note.durationTicks}
Length=${origin[index + 1] && origin[index + 1].ticks - note.ticks || note.durationTicks}
Lyric=${locale === 'ja' ? lyric[index] : toKana(lyric[index]) || ''}
NoteNum=${note.midi + Number(transpose)}
Velocity=${Math.floor(note.velocity) * 10000 / 100}
StartPoint=0.00
Intensity=100
Modulation=0
PBS=-40.0,0.0
PBW=80.0
Envelope=5.0,1.0,0.0,100.0,100.0,100.0,100.0,7.0,80.0,1.0,100.0,0.0,1.0,100.0,1.0,100.0
VBR=0,0,0,0,0,0,0,0,0,0`;
  });
  t = t + `
[#TRACKEND]
`;

  return t;
}
