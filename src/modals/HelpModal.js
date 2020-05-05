import React from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, ModalFooter, Row } from 'reactstrap';
import { t } from "lisan";

const HelpModal = props => {
  const {
    handleClose,
    show,
  } = props;
  return (
    <Modal isOpen={show} size="lg">
      <ModalHeader>{t('title')}</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg="10" className="mx-auto text-sm">
            <h2 className="h6 font-weight-bold">{t('helpModal.about')}</h2>
            <ul>
              <li>{t('helpModal.about1')}</li>
              <li>{t('helpModal.about2')}</li>
              <li>{t('helpModal.about3')}</li>
            </ul>
            <h2 className="h6 font-weight-bold">{t('helpModal.note')}</h2>
            <ul>
              <li>{t('helpModal.note1')}</li>
              <li>{t('helpModal.note2')}</li>
            </ul>
            <h2 className="h6 font-weight-bold">{t('helpModal.misc')}</h2>
            <ul>
              <li>
                {t('helpModal.misc1', {link: <a href="https://twitter.com/romotco" key="contact" target="_blank" rel="noopener noreferrer">@romotco</a>})}
              </li>
              <li>
                {t('helpModal.misc2', {link: <a href="https://twitter.com/tnantoka" key="specialThanks" target="_blank" rel="noopener noreferrer">@tnantoka</a>})}
                {' '}<a href="https://neutrino.tnantoka.com/" target="_blank" rel="noopener noreferrer">NEUTRINO BLOG</a>
              </li>
              <li>
                {t('helpModal.misc3', {link: <a href="https://www.nicovideo.jp/watch/sm36446234" key="mySong" target="_blank" rel="noopener noreferrer">AI Kiritan - Neu Breath (NEUTRINO Original)</a>})}
              </li>
            </ul>
            <h2 className="h6 font-weight-bold">MusicXML</h2>
            <ul>
              <li><a href="http://usermanuals.musicxml.com/MusicXML/MusicXML.htm#license.htm%3FTocPath%3D_____7" rel="noopener noreferrer">MusicXML3.0 Public License</a></li>
            </ul>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleClose}>{t('close')}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default HelpModal;
