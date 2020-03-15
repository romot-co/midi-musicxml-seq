import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import hasSmallLetter from 'jaco/fn/hasSmallLetter';

const LyricEdit = props => {
  const { lyric, setLyric, expand, setExpand, limit } = props;
  const [value, setValue] = useState('');
  const handleChangeLyric = (str) => {
    const trimed = str.replace(/\s/g, '').trim();
    let nextLyric = [];
    trimed.split('').forEach((current,i,origin) => {
      const next = origin[i+1] || false;
      if (hasSmallLetter(current)) { return; }
      if (next && hasSmallLetter(next)) {
        nextLyric.push(current + next);
      } else {
        nextLyric.push(current);
      }
    });
    setLyric(nextLyric.slice(0,limit));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleCompositionEnd = (e) => {
    handleChangeLyric(e.target.value);
  };

  const handleBlur = (e) => {
    handleChangeLyric(e.target.value);
  };

  useEffect(() => {
    setValue(lyric.join(''));
  }, [lyric]);

  return (
    <Input
      type="textarea"
      className={`lyric-text mr-3 ${expand ? 'lyric-text-expand' : ''}`}
      value={value}
      onClick={() => setExpand(true)}
      onChange={handleChange}
      onBlur={handleBlur}
      onCompositionEnd={handleCompositionEnd}
    />
  );
};

export default LyricEdit;
