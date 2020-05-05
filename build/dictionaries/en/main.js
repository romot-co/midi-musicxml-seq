(function(module){

module.exports = {
  "locale": "en",
  "entries": {
    "about": ["About"],
    "bpm": ["BPM"],
    "changeMidi": ["Import MIDI"],
    "close": ["Close"],
    "download": ["Convert to MusicXML"],
    "english": ["English Roman (Experimental)"],
    "helpModal.about": ["About"],
    "helpModal.about1": ["Upload your MIDI, input lyrics, convert to MusicXML for NEUTRINO"],
    "helpModal.about2": ["your MIDI file is not upload anywhere (it works on your PC)"],
    "helpModal.about3": ["Make for my own use with React+Bootstrap"],
    "helpModal.misc": ["Misc"],
    "helpModal.misc1": ({ link }) => ["Contact: ",link,""],
    "helpModal.misc2": ({ link }) => ["Special thanks to: ",link,""],
    "helpModal.misc3": ({ link }) => ["My song with NEUTRINO: ",link,""],
    "helpModal.note": ["Note"],
    "helpModal.note1": ["Currently, only single notes supported (unsupported note overlaps and chords)"],
    "helpModal.note2": ["Currently, can not add / change / delete MIDI notes"],
    "japanese": ["Japanese Hiragana"],
    "lyrics": ["Lyrics"],
    "message.failedToLoadFile": ["Failed to load file"],
    "message.noTracks": ["No tracks"],
    "pitch": ["Pitch"],
    "startHere": ["Upload your MIDI file to edit lyrics, convert to MusicXML"],
    "title": ["Convert MusixXML from MIDI and Lyrics - α"],
    "track": ["Track"],
    "transpose": ["Transpose"],
    "velocity": ["Velocity"],
  },
};

})(typeof module === 'object' && module.exports ? module : window.lisanLoaderListener);
