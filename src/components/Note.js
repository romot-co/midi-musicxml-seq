import React, { useState, useEffect, useRef } from 'react';
import { Input, UncontrolledTooltip } from 'reactstrap';

const Note = props => {
  const { note, xScale, phoneme, lyric, index, edit, setEdit, onChange } = props;
  const inputEl = useRef(null);
  const [value, setValue] = useState('');
  const styles = {
    left: `${note.ticks * xScale}px`,
    bottom: `${(note.midi - 12) * 24}px`,
    width: `${note.durationTicks * xScale}px`,
  };
  const handleClick = (e) => {
    e.stopPropagation();
    if (!edit) {
      setEdit(index);
      inputEl && inputEl.current.select();
    }
  };
  const handleKeyPress = (e) => {
    const key = e.key.toLowerCase();
    if (key === 'enter' || key === 'tab' && lyric.length < index) {
      setEdit(index + 1);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value[0]);
    if (e.target.value) {
      onChange(e.target.value[0], index);
    }
  };

  useEffect(() => {
    setValue(phoneme);
  }, [phoneme]);

  useEffect(() => {
    if (edit === index) {
      inputEl.current.select();
    }
  }, [edit]);

  const isEdit = edit === index;

  return (
    <div className="note" onClick={handleClick} style={styles}>
      <input
        type="text"
        value={value || ''}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        className="note-input"
        maxLength="1"
        ref={inputEl}
        id={`note-${index}`}
      />
      {!isEdit &&
        <UncontrolledTooltip
          target={`note-${index}`}
          placement="bottom"
          delay={{
            show: 200,
          }}
        >{value}{' '}<span className="text-muted">{note.name}</span></UncontrolledTooltip>
      }
    </div>
  );
};

export default Note;
