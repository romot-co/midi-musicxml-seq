import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'reactstrap';
import hasSmallLetter from 'jaco/fn/hasSmallLetter';
import isOnlyHiragana from 'jaco/fn/isOnlyHiragana';
import { toKana, toRomaji, isRomaji } from 'wanakana';
import { t } from "lisan";

const LyricEdit = props => {
  const { lyric, setLyric, expand, setExpand, limit, locale, disabled } = props;
  const [value, setValue] = useState('');
  const [composing, setComposing] = useState(false);

  const handleChangeLyric = (str) => {
    const trimed = str.replace(/\s/g, '').trim();
    let nextLyric = [];
    if (locale === 'ja') {
      trimed.split('').forEach((current,i,origin) => {
        const next = origin[i+1] || false;
        if (!isOnlyHiragana(current)) { return; }
        if (hasSmallLetter(current)) { return; }
        if (next && hasSmallLetter(next)) {
          nextLyric.push(current + next);
        } else {
          nextLyric.push(current);
        }
      });
    }
    if (locale === 'en') {
      // こちらは簡易化された実装であり、日本語の拗音・促音などに問題が出ることがあります
      let tempLyrics = [];
      let romanBuffer = '';
      for (let i = 0; i < trimed.length; i++) {
        const char = trimed[i];
        const isConsonant = isRomaji(char) && /[bcdfghjklmnpqrstvwxyz]/i.test(char);

        if (isConsonant) {
          romanBuffer += char;
        } else {
          if (romanBuffer.length > 0) {
            tempLyrics.push(romanBuffer + char);
            romanBuffer = '';
          } else {
            tempLyrics.push(char);
          }
        }
      }

      if (romanBuffer.length > 0) {
        tempLyrics.push(romanBuffer);
      }

      nextLyric = tempLyrics;

      /* 古い実装
        toKana(trimed).split('').forEach((current,i,origin) => {
        const next = origin[i+1] || false;
        if (!isOnlyHiragana(current)) { return; }
        if (hasSmallLetter(current)) { return; }
        if (next && hasSmallLetter(next)) {
          nextLyric.push(toRomaji(current + next));
        } else {
          nextLyric.push(toRomaji(current));
        }
      });
      */
    }
    setLyric(nextLyric.slice(0,limit));
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // IME入力中は処理しない
    if (!composing) {
      handleChangeLyric(newValue);
    }
  };

  const handleCompositionStart = () => {
    setComposing(true);
  };

  const handleCompositionEnd = (e) => {
    setComposing(false);
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
      className={`lyric-text me-3 ${expand ? 'lyric-text-expand' : ''}`}
      value={value}
      placeholder={t('inputLyrics')}
      onClick={() => setExpand(true)}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onBlur={handleBlur}
      id="lyricEditInput"
      disabled={disabled}
    />
  );
};

export default LyricEdit;
