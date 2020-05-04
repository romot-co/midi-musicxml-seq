(function(module){

module.exports = {
  "locale": "ja",
  "entries": {
    "bpm": ["BPM"],
    "changeMidi": ["MIDI変更"],
    "download": ["ダウンロード"],
    "helpModal.about": ["概要"],
    "helpModal.about1": ["MIDIに歌詞入力してNEUTRINOで使えるMusicXMLにします"],
    "helpModal.about2": ["MIDIはどこにもアップロードされません(PC内で動きます)"],
    "helpModal.about3": ["自分で使うためにReact+Bootstrapで適当につくっています"],
    "helpModal.misc": ["Misc"],
    "helpModal.misc1": ({ link }) => ["連絡先: ",link,""],
    "helpModal.note": ["ノート"],
    "helpModal.note1": ["単音のみの対応です(ノートの重なりや和音は未考慮)"],
    "helpModal.note2": ["MIDIノートの追加・変更・削除はできません"],
    "helpModal.start": ["MIDIファイルをアップロードしてはじめる"],
    "message.failedToLoadFile": ["ファイルが読み込みませんでした"],
    "message.noTracks": ["トラックがありません"],
    "title": ["MIDIに歌詞入力してMusicXMLにするやつ - α版"],
    "track": ["トラック"],
    "transpose": ["キー"],
  },
};

})(typeof module === 'object' && module.exports ? module : window.lisanLoaderListener);
