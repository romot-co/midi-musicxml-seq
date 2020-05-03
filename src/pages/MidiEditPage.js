import React, { useState, useRef, useEffect } from 'react';
//import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Col, Container, Input, Navbar, Row } from 'reactstrap';
import Sequence from 'components/Sequence';
import LyricEdit from 'components/LyricEdit';
import HelpModal from 'modals/HelpModal';
import { Midi } from '@tonejs/midi';
import { midiNumberToPitchMusicXML } from 'utils/convert';
// import { FiPlusCircle } from "react-icons/fi";
import xmljs from 'xml-js';

const MidiEditPage = (props) => {
  //const history = useHistory();
  //const location = useLocation();
  const fileInputRef = useRef(null);
  const [midi, setMidi] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [transpose, setTranspose] = useState(0);
  const [expandLyric, setExpandLyric] = useState(false);
  const [yScale, setYScale] = useState(24); // temporary
  const [xScale, setXScale] = useState(0.25);
  const [lyric, setLyric] = useState(['']);
  const [showHelp, setShowHelp] = useState(true);
  useEffect(
    () => {
      document.querySelector('#sequence-key-70').scrollIntoView();
    },
    [],
  );
  const handleClickUpload = () => {
    fileInputRef.current.click();
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const midiData = e.target.result;
      if (midiData) {
        if (midiData.tracks < 1) {
          window.alert('トラックがありません');
        } else {
          const midi = new Midi(midiData);
          const tempo = midi.header.tempos.length ? midi.header.tempos.slice(-1)[0].bpm : 120;
          setMidi(midi);
          setTrackIndex(0);
          setTempo(tempo);
          setLyric(midi.tracks[trackIndex].notes.map(() => 'ら'));
          setYScale(24); //temporary
          document.querySelector('#sequence-key-70').scrollIntoView();
        }
      }
    };
    reader.onerror = (e) => {
      window.alert('ファイル読み込みに失敗しました');
    };
  };
  const handleChangeTrack = (e) => {
    setTrackIndex(e.target.value);
  };
  const handleChangeTempo = (e) => {
    setTempo(e.target.value);
  };
  const handleChangeXScale = (e) => {
    setXScale(e.target.value);
  };
  const handleChangeTranspose = (e) => {
    setTranspose(e.target.value);
  };
  const handleGenerateMusicXML = () => {
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
            lyric: lyric[index] || '',
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
      direction: {
        _attributes: {
          placement: 'above',
        },
        sound: {
          _attributes: {
            tempo: tempo,
          }
        },
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
    const xml = xmljs.json2xml(json, {compact: true, spaces: 2});
    const blob = new Blob([xml], {
      type: 'text/plain;charset=utf-8',
    });
    const a = document.createElement('a');
    a.download = 'score.musicxml';
    a.href = URL.createObjectURL(blob);
    a.click();
  };
  return (
    <>
      <Helmet>
        <title>MIDI編集</title>
        <body />
      </Helmet>
      <Navbar color="light" light className="fixed-top">
        <div className="d-flex align-items-center mr-auto">
          <Button type="button" color="secondary" className="mr-3" onClick={handleClickUpload}>
            MIDI変更
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            id="midi-file-input"
            className="d-none"
            accept="audio/midi, audio/x-midi"
            onChange={handleChangeFile}
          />
          <span className="mr-2">トラック</span>
          <Input
            type="select"
            color="light"
            onChange={handleChangeTrack}
            style={{width: '120px'}}
            className="mr-3"
          >
            {midi && midi.toJSON().tracks.map((v,i) => <option key={i} value={i}>{i+1}: {v.name}</option>)}
          </Input>
          <span className="mr-2">BPM</span>
          <Input
            type="number"
            color="light"
            placeholder="テンポ"
            value={tempo}
            onChange={handleChangeTempo}
            style={{width: '70px'}}
            className="mr-3"
          />
          <span className="mr-2">キー</span>
          <Input
            type="number"
            min="-24"
            max="24"
            value={transpose}
            style={{width: '70px'}}
            onChange={handleChangeTranspose}
          />
        </div>
        <Button color="primary" onClick={handleGenerateMusicXML}>
          ダウンロード
        </Button>
      </Navbar>
      <Container fluid className="px-0" style={{marginTop: '56px'}}>
        <Row className="no-gutters" onClick={() => setExpandLyric(false)}>
          <Col>
            <Sequence
              midi={midi}
              trackIndex={trackIndex}
              transpose={transpose}
              lyric={lyric}
              setLyric={setLyric}
              xScale={xScale}
              yScale={yScale}
            />
          </Col>
        </Row>
        <Row>
          <div className="sequence-controls">
            <div className="d-flex align-items-start p-3">
              <LyricEdit
                lyric={lyric}
                setLyric={setLyric}
                expand={expandLyric}
                setExpand={setExpandLyric}
                limit={midi ? midi.tracks[trackIndex].notes.length : 0}
              />
              <Input
                type="range"
                className="sequence-scale-range"
                max="0.5"
                min="0.025"
                step="0.025"
                value={xScale}
                onChange={handleChangeXScale}
              />
            </div>
          </div>
        </Row>
      </Container>
      <HelpModal
        show={showHelp}
        handleStart={() => {
          setShowHelp(false);
          fileInputRef.current.click();
        }}
      />
    </>
  )
}

export default MidiEditPage;
