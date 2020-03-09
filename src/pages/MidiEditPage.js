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
          setTempo(midi.header.tempos[0] || 120);
          setLyric(midi.tracks[0].notes.map(() => { return 'あ' }).join(''));
        }
      }
    },
    [location.state], // eslint-disable-line react-hooks/exhaustive-deps
  );
  useEffect(
    () => {
      document.querySelector('#sequence-key-60').scrollIntoView();
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
    const notes = midi.tracks[trackIndex].notes.map((v,i) => {
      return {
        type: 'element',
        name: 'note',
        elements: [
          {
            type: 'element',
            name: 'pitch',
            elements: [
              {
                type: 'element',
                name: 'step',
                elements: [
                  {
                    type: 'text',
                    text: v.name.slice(0,-1),
                  }
                ]
              },
              {
                type: 'element',
                name: 'octave',
                elements: [
                  {
                    type: 'text',
                    text: v.name.slice(-1),
                  }
                ]
              },
            ]
          },
          {
            type: 'element',
            name: 'duration',
            elements: [
              {
                type: 'text',
                text: v.duration,
              }
            ]
          },
          {
            type: 'element',
            name: 'lyric',
            elements: [
              {
                type: 'element',
                name: 'text',
                elements: [
                  {
                    type: 'text',
                    text: lyric[i],
                  }
                ]
              }
            ]
          },
        ]
      };
    });
    const json = {
      declaration: {
        attributes: {
          version: '1.0',
          encoding:'utf-8'
        }
      },
      elements: [
        {
          type: 'element',
          name: 'score-partwise',
          attributes: {
            version: '3.1',
          },
          elements: [
            {
              type: 'element',
              name: 'part',
              elements: [
                {
                  type: 'element',
                  name: 'measure',
                  elements: notes,
                }
              ],
            }
          ]}
      ],
    };
    const xml = xmljs.json2xml(json);
    const blob = new Blob([xml], {
      type: "text/plain;charset=utf-8"
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
            style={{width: '80px'}}
            className="mr-2"
          />
          BPM
        </div>
        <Button color="primary" onClick={handleGenerateMusicXML}>
          MusicXML生成
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
              <Input type="range" className="sequence-scale-range" max="0.5" min="0.05" step="0.05" value={xScale} onChange={handleChangeXScale} />
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default MidiEditPage;
