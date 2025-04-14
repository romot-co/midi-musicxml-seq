import { XMLBuilder } from 'fast-xml-parser';
import { toKana } from 'wanakana';
import { midiNumberToPitchMusicXML } from 'utils/convert';

export const parseMidiToMusicXML = (midi, lyric, locale, trackIndex, tempo, transpose) => {
  const raw = midi.toJSON();
  const header = raw.header;
  const beats = Array.isArray(header.timeSignatures) && header.timeSignatures.length > 0 ? header.timeSignatures[0].timeSignature : [4,4];
  const track = raw.tracks[trackIndex];
  const totalTicks = track.notes.slice(-1)[0].durationTicks + track.notes.slice(-1)[0].ticks;
  const measureTicks = header.ppq * beats[1] * (beats[0] / beats[1]);
  const measuresCount = Math.ceil(totalTicks / measureTicks);
  let measures = [...Array(measuresCount).keys()].map((_,measureIndex) => {
    const min = measureIndex * measureTicks;
    const max = min + measureTicks;
    const measureNotes = track.notes.map((note, index) => {
      if (max > note.ticks && (min <= note.ticks || min < (note.ticks + note.durationTicks))) {
        return {
          ...note,
          lyric: locale === 'ja' ? lyric[index] || '' : toKana(lyric[index]) || '',
        };
      } else {
        return null;
      }
    }).filter(v => v !== null);
    let notes = [];
    // full rest
    if (measureNotes.length === 0) {
      notes.push({
        rest: {},
        duration: {
          _text: measureTicks
        },
      });
    } else {
      measureNotes.forEach((current, index, origin) => {
        const before = origin[index - 1] || false;
        const next = origin[index + 1] || false;
        const currentLast = current.ticks + current.durationTicks;
        const beforeLast = before ? before.ticks + before.durationTicks : false;

        // First note = rest
        if (!before && current.ticks > min) {
          notes.push({
            rest: {},
            duration: {
              _text: current.ticks - min,
            }
          });
        // First note = tied stop
        } else if (!before && current.ticks < min) {
          notes.push({
            _attributes: {
              dynamics: current.velocity * 100,
            },
            pitch: midiNumberToPitchMusicXML(current.midi, transpose),
            duration: {
              _text: currentLast - min,
            },
            tie: {
              _attributes: {
                type: 'stop',
              },
            }
          });
        // Rest note between before to current
        } else if (before && beforeLast < current.ticks) {
          notes.push({
            rest: {},
            duration: {
              _text: current.ticks - beforeLast,
            }
          });
        }
        // Last note = tied start
        if (currentLast > max) {
          notes.push({
            _attributes: {
              dynamics: current.velocity * 100,
            },
            pitch: midiNumberToPitchMusicXML(current.midi, transpose),
            duration: {
              _text: max - current.ticks,
            },
            lyric: {
              text: {_text: current.lyric,}
            },
            tie: {
              _attributes: {
                type: 'start',
              },
            }
          });
        } else if (current.ticks >= min) {
          // current note
          //const currentDurationTicks = next && next.ticks >= currentLast ? current.durationTicks - (next.ticks - currentLast) : current.durationTicks;
          notes.push({
            _attributes: {
              dynamics: current.velocity * 100,
            },
            pitch: midiNumberToPitchMusicXML(current.midi, transpose),
            duration: {
              _text: current.durationTicks,
            },
            lyric: {
              text: {_text: current.lyric,}
            },
          });
        };
        // last note = rest
        if (!next && max > (currentLast)) {
          notes.push({
            rest: {},
            duration: {
              _text: max - currentLast,
            }
          });
        };
      });
    }
    return {
      _attributes: {
        number: measureIndex + 2,
      },
      note: notes,
    };
  });

  measures.unshift({
    _attributes: {
      number: '1',
    },
    attributes: {
      divisions: {_text: header.ppq},
      key: {
        fifths: {_text: '0'},
      },
      time: {
        beats: {
          _text: beats[0],
        },
        'beat-type': {
          _text: beats[1],
        },
      },
      clef: {
        sign: {_text: 'G'},
        line: {_text: '2'},
      },
    },
    sound: {
      _attributes: {
        tempo: tempo,
      }
    },
    note: {
      rest: {},
      duration: {
        _text: measureTicks,
      }
    },
  });
  const json = {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding:'utf-8'
      }
    },
    _doctype: 'score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd"',
    'score-partwise': {
      _attributes: {
        version: '3.1',
      },
      'part-list': {
        'score-part': {
          _attributes: {
            id: `p${trackIndex}`,
          },
          'part-name': {
            _text: header.name || '',
          },
        },
      },
      part: {
        _attributes: {
          id: `p${trackIndex}`,
        },
        measure: measures,
      },
    },
  };

  console.log(measures);

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    attributeNamePrefix: '_attributes.',
    textNodeName: '_text'
  });
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
${builder.build(json['score-partwise'])}`;
  return xml;
};
