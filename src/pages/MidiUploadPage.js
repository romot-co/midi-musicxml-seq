import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Col, Container, Row } from 'reactstrap';

const MidiUploadPage = () => {
  const fileInputRef = useRef(null);
  const history = useHistory();
  const handleClickUpload = () => {
    fileInputRef.current.click();
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      history.push('/edit', { midiData: e.target.result });
    };
    reader.onerror = (e) => {
      window.alert('ファイル読み込みに失敗しました');
    };
  };

  return (
    <>
      <Helmet>
        <title>MIDIアップロード</title>
        <body />
      </Helmet>
      <Container>
        <Row>
          <Col>
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <h1 className="mb-3">MMXSEQ</h1>
                <Button type="button" color="primary" onClick={handleClickUpload}>
                  MIDIファイルをアップロード
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="midi-file-input"
                  className="d-none"
                  accept="audio/midi, audio/x-midi"
                  onChange={handleChangeFile}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MidiUploadPage;
