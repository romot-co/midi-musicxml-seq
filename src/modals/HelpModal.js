import React from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, ModalFooter, Row } from 'reactstrap';

const HelpModal = props => {
  const {
    handleStart,
    show,
  } = props;
  return (
    <Modal isOpen={show} size="lg">
      <ModalHeader>MIDIに歌詞入力してMusicXMLにするやつ</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg="10" className="mx-auto text-sm">
            <h2 className="h6 font-weight-bold">概要</h2>
            <ul>
              <li>MIDIに歌詞入力してNEUTRINOで使えるMusicXMLにします</li>
              <li>MIDIはどこにもアップロードされません(PC内で動きます)</li>
              <li>React+Bootstrapで自分用に適当につくっています</li>
            </ul>
            <h2 className="h6 font-weight-bold">注意点</h2>
            <ul>
              <li>単音のみの対応です(ノートの重なりや和音は未考慮)</li>
              <li>MIDIノートの追加・変更・削除はできません</li>
            </ul>
            <h2 className="h6 font-weight-bold">謝辞など</h2>
            <ul>
              <li>
                連絡先:
                <a href="https://twitter.com/romotco" target="_blank" rel="noopener noreferrer">@romotco</a>
              </li>
              <li>
                <a href="https://twitter.com/tnantoka" target="_blank" rel="noopener noreferrer">@tnantoka</a>さまの<a href="https://neutrino.tnantoka.com/">NEUTRINOのブログ</a>を大きく参考にさせていただいております。<br />ありがとうございます。
              </li>
              <li>
                AIきりたん(NEUTRINO)で<a href="https://www.nicovideo.jp/watch/sm36446234" target="_blank" rel="noopener noreferrer">オリジナル曲</a>つくっているのでよければどうぞ。
                <script type="application/javascript" src="https://embed.nicovideo.jp/watch/sm36446234/script?w=640&h=360&from=74"></script><noscript><a href="https://www.nicovideo.jp/watch/sm36446234?from=74">AIきりたん - Neu Breath 【NEUTRINOオリジナル】</a></noscript>
              </li>
            </ul>
            <h2 className="h6 font-weight-bold">MusicXML</h2>
            <ul>
              <li><a href="http://usermanuals.musicxml.com/MusicXML/MusicXML.htm#license.htm%3FTocPath%3D_____7">MusicXML3.0 Public License</a></li>
            </ul>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleStart}>MIDIをアップロードしてはじめる</Button>
      </ModalFooter>
    </Modal>
  )
}

export default HelpModal;
