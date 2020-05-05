import React, { useState, useEffect, useRef } from 'react';
import hasSmallLetter from 'jaco/fn/hasSmallLetter';
import { isRomaji } from 'wanakana';
import { UncontrolledTooltip } from 'reactstrap';

const Note = props => {
  const { note, xScale, yScale, transpose, phoneme, lyric, index, edit, setEdit, locale, onChange } = props;
  const inputEl = useRef(null);
  const [value, setValue] = useState('');
  const styles = {
    left: `${note.ticks * xScale}px`,
    bottom: `${(note.midi - 12) * yScale + (transpose * yScale)}px`,
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
    if (key === 'enter' || (key === 'tab' && lyric.length < index)) {
      setEdit(index + 1);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (locale === 'ja') {
      if (!e.target.value) {
        onChange(' ', index);
      } else if (e.target.value.length === 1) {
        onChange(e.target.value[0], index);
      } else if (hasSmallLetter(e.target.value)) {
        onChange(e.target.value, index);
      };
    }
    if (locale === 'en') {
      if (!e.target.value) {
        onChange(' ', index);
      } else if (e.target.value.length === 1) {
        onChange(e.target.value[0], index);
      } else if (isRomaji(e.target.value)) {
        onChange(e.target.value, index);
      };
    }
  };

  useEffect(() => {
    setValue(phoneme);
  }, [phoneme]);

  useEffect(() => {
    if (edit === index) {
      inputEl.current.select();
    }
  }, [edit]); // eslint-disable-line react-hooks/exhaustive-deps

  const isEdit = edit === index;

  return (
    <div className="note" onClick={handleClick} style={styles}>
      <input
        type="text"
        value={value || ''}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        className="note-input"
        maxLength={locale === 'ja' ? 2 : 3}
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
