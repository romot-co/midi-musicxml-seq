(function(module){

module.exports = {
  "locale": "ja",
  "entries": {
    "about": ["このアプリについて"],
    "bpm": ["BPM"],
    "changeMidi": ["MIDI変更"],
    "close": ["閉じる"],
    "download": ["MusicXMLにする"],
    "english": ["英語"],
    "helpModal.about": ["概要"],
    "helpModal.about1": ["MIDIに歌詞入力してNEUTRINOで使えるMusicXMLにします"],
    "helpModal.about2": ["MIDIはどこにもアップロードされません(PC内で動きます)"],
    "helpModal.about3": ["自分で使うためにReact+Bootstrapで適当につくっています"],
    "helpModal.misc": ["謝辞など"],
    "helpModal.misc1": ({ link }) => ["連絡先: ",link,""],
    "helpModal.misc2": ({ link }) => ["スペシャルサンクス(MusicXML仕様): ",link,""],
    "helpModal.misc3": ({ link }) => ["NEUTRINOを使った自作曲: ",link,""],
    "helpModal.note": ["ノート"],
    "helpModal.note1": ["単音のみの対応です(ノートの重なりや和音は未考慮)"],
    "helpModal.note2": ["MIDIノートの追加・変更・削除はできません"],
    "helpModal.start": ["MIDIファイルをアップロードしてはじめる"],
    "japanese": ["日本語"],
    "lyrics": ["歌詞入力"],
    "message.failedToLoadFile": ["ファイルが読み込みませんでした"],
    "message.noTracks": ["トラックがありません"],
    "startHere": ["MIDIファイルと歌詞を編集しMusicXMLに変換"],
    "title": ["MIDIに歌詞入力してMusicXMLにするやつ - α版"],
    "track": ["トラック"],
    "transpose": ["キー"],
    "velocity": ["ベロシティ"],
  },
};

})(typeof module === 'object' && module.exports ? module : window.lisanLoaderListener);