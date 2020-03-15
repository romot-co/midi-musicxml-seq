import React, { useRef } from 'react';
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
            <div className="d-flex align-items-center justify-content-center" style={{height: '60vh'}}>
              <div className="text-center">
                <div className="mb-5">
                  <h1 className="h3">MIDIから歌詞を入力してMusicXMLにするやつ</h1>
                  <div className="text-muted small">AIきりたん(NEUTRINO)に歌詞入力をしやすくする目的で<span className="text-warning font-weight-bold">開発実験中</span></div>
                </div>
                <Button type="button" color="primary" size="lg" className="font-weight-bold" onClick={handleClickUpload}>
                  MIDIファイルから歌詞入力をはじめる
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
            <div className="text-center mb-4">
              <img src="./temp-scr.png" alt="temp-scr" style={{height: '30vh'}} />
            </div>
            <div className="text-muted text-center small">
              <div>概要と注意点を読んで自己責任でご利用ください</div>
              <div>ご連絡は <a href="https://twitter.com/romotco" target="_blank" rel="noopener noreferrer">Twitter @romotco</a> まで</div>
            </div>
          </Col>
        </Row>
        <hr className="mb-5" />
        <Row>
          <Col>
            <div className="d-flex my-2">
              <div className="mx-auto">
                <h2 className="h6 font-weight-bold">概要</h2>
                <ul>
                  <li>MIDIファイルに歌詞をまとめて/個別に入力してNEUTRINOで使えるMusicXMLにします</li>
                  <li>MIDIファイルはどこにもアップロードされません(PC内で動きます)</li>
                  <li>Reactで適当につくっています</li>
                </ul>
                <h2 className="h6 font-weight-bold">使い方</h2>
                <ul>
                  <li>上の青いボタンからMIDIファイルを指定</li>
                  <li>ノートをクリックし<span className="font-weight-bold">ひらがな</span>で歌詞入力＆EnterあるいはTabキーで次へ移動</li>
                  <li>あるいは画面下部の歌詞入力で<span className="font-weight-bold">ひらがな</span>でまとめて歌詞入力</li>
                  <li>ダウンロードボタンでMusicXMLファイルをダウンロード</li>
                </ul>
                <h2 className="h6 font-weight-bold">注意点</h2>
                <ul>
                  <li>NEUTRINOでしか鳴りません</li>
                  <li>NEUTRINOでもおかしいかもしれません</li>
                  <li>いまのところひらがなのみです</li>
                  <li>いまのところMIDIトラックは1番目固定です</li>
                  <li>いまのところ単音のみの対応です(ノートの重なりや和音は死にます)</li>
                  <li>MIDIノートの追加・変更・削除はできません</li>
                </ul>
                <h2 className="h6 font-weight-bold">変更予定</h2>
                <ul>
                  <li>日本語においてひらがな入力以外の拒否あるいは変換</li>
                  <li>ローマ字(英字)による入力</li>
                  <li>MusicXMLの仕様準拠(MuseScoreとの互換)</li>
                  <li>重なったノートの修正や和音への対応</li>
                  <li>MIDIトラックの選択</li>
                  <li>デザインをよくする</li>
                </ul>
                <h2 className="h6 font-weight-bold">夢</h2>
                <ul>
                  <li>MIDIシーケンサ化</li>
                  <li>VSQ対応</li>
                  <li>ReactNativeとかで直接NEUTRINOから出力できないかなあ</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <hr className="mb-5" />
        <Row>
          <Col>
            <div className="d-flex my-2 mb-5">
              <div className="mx-auto">
                <h2 className="h6 font-weight-bold">謝辞</h2>
                <ul>
                  <li>
                    <a href="https://twitter.com/tnantoka" target="_blank" rel="noopener noreferrer">@tnantoka</a>さまの<a href="https://neutrino.tnantoka.com/">NEUTRINOのブログ</a>を大きく参考にさせていただいております。<br />ありがとうございます。
                  </li>
                </ul>
                <h2 className="h6 font-weight-bold">MusicXML</h2>
                <ul>
                  <li><a href="http://usermanuals.musicxml.com/MusicXML/MusicXML.htm#license.htm%3FTocPath%3D_____7">MusicXML3.0 Public License</a></li>
                </ul>
                <h2 className="h6 font-weight-bold">宣伝</h2>
                AIきりたん(NEUTRINO)で<a href="https://www.nicovideo.jp/watch/sm36446234" target="_blank" rel="noopener noreferrer">オリジナル曲</a>つくっているのでよければどうぞ。
                <script type="application/javascript" src="https://embed.nicovideo.jp/watch/sm36446234/script?w=640&h=360&from=74"></script><noscript><a href="https://www.nicovideo.jp/watch/sm36446234?from=74">AIきりたん - Neu Breath 【NEUTRINOオリジナル】</a></noscript>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MidiUploadPage;
