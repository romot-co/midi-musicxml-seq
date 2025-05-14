import { XMLBuilder } from 'fast-xml-parser';
import { toKana } from 'wanakana';
import { midiNumberToPitchMusicXML } from 'utils/convert';

export const parseMidiToMusicXML = (midi, lyric, locale, trackIndex, tempo, transpose) => {
  const raw = midi.toJSON();
  const header = raw.header;
  const track = raw.tracks[trackIndex];

  const timeSignature = Array.isArray(header.timeSignatures) && header.timeSignatures.length > 0
    ? header.timeSignatures[0].timeSignature
    : [4, 4];
  const [beatsPerMeasure, beatUnit] = timeSignature;
  const measureTicks = header.ppq * beatsPerMeasure;
  const totalTicks = track.notes.slice(-1)[0]?.ticks + track.notes.slice(-1)[0]?.durationTicks || 0;
  const measuresCount = Math.ceil(totalTicks / measureTicks);

  const measures = Array.from({ length: measuresCount }, (_, measureIndex) => {
    const measureStart = measureIndex * measureTicks;
    const measureEnd = measureStart + measureTicks;

    const measureNotes = track.notes
      .map((note, i) => {
        if (
          note.ticks < measureEnd &&
          (note.ticks + note.durationTicks) > measureStart
        ) {
          return {
            ...note,
            lyric: locale === 'ja' ? lyric[i] || '' : toKana(lyric[i] || ''),
          };
        }
        return null;
      })
      .filter(Boolean);

    const notes = [];

    if (measureNotes.length === 0) {
      notes.push({
        rest: {},
        duration: { _text: measureTicks },
        voice: { _text: 1 },
        type: { _text: 'whole' },
      });
    } else {
      measureNotes.forEach((note, i) => {
        const prev = measureNotes[i - 1];
        const next = measureNotes[i + 1];
        const noteStart = Math.max(note.ticks, measureStart);
        const noteEnd = Math.min(note.ticks + note.durationTicks, measureEnd);
        const duration = noteEnd - noteStart;

        // Insert rest before note if there's a gap
        if (!prev && note.ticks > measureStart) {
          notes.push({
            rest: {},
            duration: { _text: note.ticks - measureStart },
            voice: { _text: 1 },
            type: { _text: 'quarter' },
          });
        } else if (prev) {
          const prevEnd = prev.ticks + prev.durationTicks;
          if (note.ticks > prevEnd) {
            notes.push({
              rest: {},
              duration: { _text: note.ticks - prevEnd },
              voice: { _text: 1 },
              type: { _text: 'eighth' },
            });
          }
        }

        const pitch = midiNumberToPitchMusicXML(note.midi, transpose);
        const isStartTie = note.ticks < measureStart && (note.ticks + note.durationTicks) > measureStart;
        const isEndTie = (note.ticks + note.durationTicks) > measureEnd;

        const noteEntry = {
          pitch,
          duration: { _text: duration },
          voice: { _text: 1 },
          type: { _text: 'eighth' },
          dynamics: {
            'f': {},
          },
          lyric: {
            syllabic: { _text: 'single' },
            text: { _text: note.lyric },
          },
        };

        if (isStartTie) {
          noteEntry.tie = { _attributes: { type: 'stop' } };
        } else if (isEndTie) {
          noteEntry.tie = { _attributes: { type: 'start' } };
        }

        notes.push(noteEntry);

        // Insert rest after last note
        if (!next && noteEnd < measureEnd) {
          notes.push({
            rest: {},
            duration: { _text: measureEnd - noteEnd },
            voice: { _text: 1 },
            type: { _text: 'quarter' },
          });
        }
      });
    }

    return {
      _attributes: {
        number: `${measureIndex + 2}`,
      },
      note: notes,
    };
  });

  // First measure with attributes and tempo
  measures.unshift({
    _attributes: { number: '1' },
    attributes: {
      divisions: { _text: header.ppq },
      key: { fifths: { _text: 0 } },
      time: {
        beats: { _text: beatsPerMeasure },
        'beat-type': { _text: beatUnit },
      },
      clef: {
        sign: { _text: 'G' },
        line: { _text: 2 },
      },
    },
    sound: {
      _attributes: {
        tempo: tempo,
      },
    },
  });

  const json = {
    'score-partwise': {
      _attributes: {
        version: '3.1',
      },
      'part-list': {
        'score-part': {
          _attributes: {
            id: `P${trackIndex}`,
          },
          'part-name': {
            _text: header.name || 'Piano',
          },
        },
      },
      part: {
        _attributes: {
          id: `P${trackIndex}`,
        },
        measure: measures,
      },
    },
  };

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '_attributes.',
    textNodeName: '_text',
    format: true,
    suppressEmptyNode: true,
  });

  const xmlContent = builder.build(json);

  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
${xmlContent}`;
};
