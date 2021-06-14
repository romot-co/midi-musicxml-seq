import React, { useState, useRef, useEffect } from 'react';
//import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Button,
  Col,
  Container,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Row,
  TabContent,
  TabPane,
  Tooltip,
  UncontrolledTooltip,
} from 'reactstrap';
import Sequence from 'components/Sequence';
import LyricEdit from 'components/LyricEdit';
import HelpModal from 'modals/HelpModal';
import { Midi } from '@tonejs/midi';
import { parseMidiToMusicXML } from 'utils/musicxml';
import { parseMidiToUST } from 'utils/ust';
import { lisan, t } from "lisan";
import { toKana, toRomaji } from 'wanakana';

const MidiEditPage = (props) => {
  //const history = useHistory();
  //const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [locale, setLocale] = useState((window.navigator.language === "ja" || window.navigator.language === "ja-JP") ? 'ja' : 'en');
  const fileInputRef = useRef(null);
  const uploadRef = useRef(null);
  const [midi, setMidi] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [transpose, setTranspose] = useState(0);
  const [expandLyric, setExpandLyric] = useState(false);
  const [yScale, setYScale] = useState(24); // temporary
  const [xScale, setXScale] = useState(0.25);
  const [lyric, setLyric] = useState(['']);
  const [tab, setTab] = useState('lyrics');
  const [start, setStart] = useState(false);
  const [openTooltipUpload, setOpenTooltipUpload] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const updateLocale = (lang) => {
    lisan.setLocaleName(lang);
    import(`../../public/dictionaries/${lang}/main`).then((dict) => {
      lisan.add(dict);
      setLoaded(true);
      setLocale(lang);
      if (lang === 'ja') {
        setLyric(lyric.map(v => toKana(v)));
      } else {
        setLyric(lyric.map(v => toRomaji(v)));
      }
    });
  };
  useEffect(() => {
    if (locale) updateLocale(locale);
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (loaded) {
      const target = document.querySelector('#sequence-key-72');
      if (target !== null) {
        target.scrollIntoView();
      }
      if (!start) {
        setStart(true);
        setOpenTooltipUpload(true);
      }
    }
  }, [loaded, start]);
  const handleClickUpload = () => {
    setOpenTooltipUpload(false);
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
          window.alert(t('message.noTracks'));
        } else {
          const midi = new Midi(midiData);
          const tempo = midi.header.tempos.length ? midi.header.tempos.slice(-1)[0].bpm : 120;
          setTrackIndex(midi.tracks.findIndex(v => v.notes.length > 0));
          setTempo(tempo);
          setLyric(midi.tracks[trackIndex].notes.map(() => locale === 'ja' ? 'ら' : 'ra'));
          setYScale(24); //temporary
          setMidi(midi);
          document.querySelector('#sequence-key-72').scrollIntoView();
          setExpandLyric(true);
          document.querySelector('#lyricEditInput').focus();
        }
      }
    };
    reader.onerror = (e) => {
      window.alert(t('message.failedToLoadFile'));
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
    const xml = parseMidiToMusicXML(midi, lyric, locale, trackIndex, tempo, transpose);
    const blob = new Blob([xml], {
      type: 'text/plain;charset=utf-8',
    });
    const a = document.createElement('a');
    a.download = 'score.musicxml';
    a.href = URL.createObjectURL(blob);
    a.click();
  };
  const handleGenerateUST = () => {
    const text = parseMidiToUST(midi, lyric, locale, trackIndex, tempo, transpose);
    const blob = new Blob([text], {
      type: 'text/plain;charset=utf-8',
    });
    const a = document.createElement('a');
    a.download = 'score.ust';
    a.href = URL.createObjectURL(blob);
    a.click();
  };

  if (!loaded) {
    return ''
  } else {
    return (
      <>
        <Helmet>
          <title>{t('title')}</title>
          <body />
        </Helmet>
        <Navbar color="light" light className="fixed-top">
          <div className="d-flex align-items-center mr-auto">
            <Button
              type="button"
              color={!midi ? 'primary' : 'secondary'}
              className="btn-circle mr-3"
              onClick={handleClickUpload}
              id="upload"
              ref={uploadRef}
            >
              <i className="icon ri-folder-open-line" />
            </Button>
            { start &&
              <Tooltip
                target="upload"
                isOpen={openTooltipUpload}
                delay={4000}
                fade
              >
                {t('startHere')}
              </Tooltip>
            }
            <input
              ref={fileInputRef}
              type="file"
              id="midi-file-input"
              className="d-none"
              accept="audio/midi, audio/x-midi"
              onChange={handleChangeFile}
            />
            <span className="navbar-text mr-2">{t("track")}</span>
            <Input
              type="select"
              color="light"
              size="sm"
              onChange={handleChangeTrack}
              style={{width: '120px'}}
              className="mr-3"
              disabled={!midi}
            >
              {midi && midi.toJSON().tracks.map((v,i) => <option key={i} value={i}>{i+1}: {v.name}</option>)}
            </Input>
            <span className="navbar-text mr-2">{t("bpm")}</span>
            <Input
              type="number"
              color="light"
              size="sm"
              value={tempo}
              onChange={handleChangeTempo}
              style={{width: '70px'}}
              className="mr-3"
              disabled={!midi}
            />
            <span className="navbar-text mr-2">{t("transpose")}</span>
            <Input
              type="number"
              min="-24"
              max="24"
              size="sm"
              value={transpose}
              style={{width: '70px'}}
              onChange={handleChangeTranspose}
              disabled={!midi}
            />
          </div>
          <UncontrolledDropdown>
            <DropdownToggle
              color="primary"
            >
              {t("download")}
              <i className="ml-2 icon ri-download-2-line" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={handleGenerateMusicXML}>{t('musicXML')}</DropdownItem>
              <DropdownItem onClick={handleGenerateUST}>{t('ust')}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle color="light" className="btn btn-circle">
              <i className="icon ri-more-2-fill" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => updateLocale('en')}>{t('english')}</DropdownItem>
              <DropdownItem onClick={() => updateLocale('ja')}>{t('japanese')}</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => setShowHelp(true)}>{t('about')}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Navbar>
        <Container fluid className="px-0" style={{marginTop: '53px'}}>
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
                locale={locale}
              />
            </Col>
          </Row>
          <Row>
            <div className="sequence-controls">
              <div className="d-flex align-items-start">
                <div className="w-100 p-2">
                  <Nav pills className="mb-2">
                    <NavItem>
                      <NavLink
                        href="#"
                        onClick={() => { setTab('lyrics') }}
                        active={tab === 'lyrics'}
                      >
                        {t('lyrics')}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#"
                        onClick={() => { setTab('velocity') }}
                        active={tab === 'velocity'}
                        disabled
                      >
                        {t('velocity')}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        href="#"
                        onClick={() => { setTab('pitch') }}
                        active={tab === 'pitch'}
                        disabled
                      >
                        {t('pitch')}
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={tab}>
                    <TabPane tabId="lyrics">
                      <LyricEdit
                        lyric={lyric}
                        setLyric={setLyric}
                        expand={expandLyric}
                        setExpand={setExpandLyric}
                        limit={midi ? midi.tracks[trackIndex].notes.length : 0}
                        locale={locale}
                        disabled={!midi}
                      />
                      { start &&
                        <UncontrolledTooltip
                          target="lyricEditInput"
                          fade
                        >
                          {t('inputLyrics')}
                        </UncontrolledTooltip>
                      }
                    </TabPane>
                  </TabContent>
                </div>
                <div className="px-3">
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
            </div>
          </Row>
        </Container>
        <HelpModal
          show={showHelp}
          handleClose={() => {
            setShowHelp(false);
          }}
        />
      </>
    )
  }
}

export default MidiEditPage;
