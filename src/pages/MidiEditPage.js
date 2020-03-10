import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Col, Container, Input, Navbar, Row } from 'reactstrap';
import Sequence from 'components/Sequence';
import { Midi } from '@tonejs/midi';
import { FiX } from "react-icons/fi";
import xmljs from 'xml-js';

const MidiEditPage = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [midi, setMidi] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [trackIndex, setTrackIndex] = useState(0);
  const [xScale, setXScale] = useState(0.25);
  const [lyric, setLyric] = useState('');
  useEffect(
    () => {
      const midiData = location.state && location.state.midiData;
      if (midiData) {
        if (midiData.tracks < 1) {
          window.alert('トラックがありません');
          history.push('/');
        } else {
          const midi = new Midi(midiData);
          setMidi(midi);
          setTempo(midi.header.tempos[0] && parseInt(midi.header.tempos[0].bpm) || 120);
          setLyric(midi.tracks[0].notes.map(() => { return 'ら' }).join(''));
        }
      }
    },
    [location.state], // eslint-disable-line react-hooks/exhaustive-deps
  );
  useEffect(
    () => {
      document.querySelector('#sequence-key-70').scrollIntoView();
    },
    [],
  );

  const handleClose = () => {
    if (window.confirm('データは保存されません')) {
      setMidi(false);
      history.push('/');
    }
  };
  const handleChangeTempo = (e) => {
    setTempo(e.target.value);
  };
  const handleChangeXScale = (e) => {
    setXScale(e.target.value);
  };
  const handleChangeLyricText = (e) => {
    const nextLyric = e.target.value.split('').map(v => v.trim()).join('');
    setLyric(nextLyric);
  };
  const handleGenerateMusicXML = () => {
    const getPitchElements = (name) => {
      const keyName = name.slice(0,-1);
      const octave = name.slice(-1);
      if (keyName.length === 2) {
        return {
          step: {
            _text: keyName.slice(0,-1),
          },
          alter: {
            _text: '+1'
          },
          octave: {
            _text: octave,
          },
        };
      } else {
        return {
          step: {
            _text: keyName,
          },
          octave: {
            _text: octave,
          },
        };
      }
    };
    const raw = midi.toJSON();
    const header = raw.header;
    const beats = Array.isArray(header.timeSignatures) && header.timeSignatures.length > 0 ? header.timeSignatures : [4,4];
    const track = raw.tracks[trackIndex];
    const totalTicks = track.notes.slice(-1)[0].durationTicks + track.notes.slice(-1)[0].ticks;
    const measureTicks = header.ppq * beats[1] * (beats[0] / beats[1]);
    const measuresCount = Math.ceil(totalTicks / measureTicks);
    const measures = [...Array(measuresCount).keys()].map((_,index) => {
      return {
        note: track.notes.map((note,li) => {
          const min = index * measureTicks;
          const max = min + measureTicks;
          if (min <= note.ticks && max > note.ticks) {
            return {
              _attributes: {
                dynamics: note.velocity * 100,
              },
              pitch: getPitchElements(note.name),
              duration: {
                _text: note.durationTicks,
              },
              lyric: {
                text: {
                  _text: lyric[li],
                }
              }
            };
          } else {
            return null;
          }
        }).filter(v => v !== null)
      };
    });
    const json = {
      _declaration: {
        _attributes: {
          version: '1.0',
          encoding:'utf-8'
        }
      },
      'score-partwise': {
        _attributes: {
          version: '3.1',
        },
        part: [
          {
            measure: {
              attributes: {
                divisions: {_text: header.ppq},
              },
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
              sound: {
                _attributes: {
                  tempo: tempo,
                }
              },
              note: {
                rest: {},
                duration: {
                  _text: header.ppq,
                }
              }
            }
          },
          {
            measure: measures,
          },
          {
            measure: {
              note: {
                rest: {},
                duration: {
                  _text: header.ppq,
                }
              }
            }
          },
        ],
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
          <Button className="rounded-circle mr-3 btn-icon" color="light" onClick={handleClose}>
            <FiX />
          </Button>
          <Input
            type="number"
            color="light"
            placeholder="テンポ"
            value={tempo}
            onChange={handleChangeTempo}
            style={{width: '70px'}}
            className="mr-2"
          />
          BPM
        </div>
        <Button color="primary" onClick={handleGenerateMusicXML}>
          ダウンロード
        </Button>
      </Navbar>
      <Container fluid className="px-0" style={{marginTop: '56px'}}>
        <Row className="no-gutters">
          <Col>
            <Sequence
              midi={midi}
              trackIndex={trackIndex}
              lyric={lyric}
              xScale={xScale}
              setLyric={setLyric}
            />
          </Col>
        </Row>
        <Row>
          <div className="sequence-controls">
            <div className="d-flex align-items-start p-3">
              <Input className="lyric-text" type="textarea" className="mr-3" value={lyric} onChange={handleChangeLyricText} />
              <Input type="range" className="sequence-scale-range" max="0.5" min="0.025" step="0.025" value={xScale} onChange={handleChangeXScale} />
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default MidiEditPage;
