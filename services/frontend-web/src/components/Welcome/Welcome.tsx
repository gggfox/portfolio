import { Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { DotDisplay } from '../Dots/DotDisplay';
import { alphabet } from '../Dots/DotAlphabet';
import { useMediaQuery } from '@mantine/hooks';

export const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export function Welcome() {
  const isMobile = useMediaQuery('(min-width: 56.25em)');
  const text = `HELLO\nI AM\n${!isMobile ? '\n' : ''}GERARDO${!isMobile ? '\n' : ' '}GALAN\n${!isMobile ? '\n' : ''}SENIOR\nWEB${!isMobile ? '\n' : ' '}ENGINEER\n${!isMobile ? '\n' : ''}AT UMBRAGE\nFROM MTY${!isMobile ? '\n' : ' '}MEXICO`;
  const [displayedText, setDisplayedText] = useState(
    text
      .split('')
      .map(() => UPPERCASE_LETTERS[Math.floor(Math.random() * UPPERCASE_LETTERS.length)])
      .join('')
  );

  const delay = 50;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      // Ensure we are only updating if there are more letters to display
      if (index <= text.length) {
        const readable = text.split('').splice(0, index).join('');
        const random = text
          .split('')
          .splice(index, text.length)
          .map(() => UPPERCASE_LETTERS[Math.floor(Math.random() * UPPERCASE_LETTERS.length)])
          .join('');
        setDisplayedText(readable + random);
        index++;
      } else {
        console.log('end');
        clearInterval(interval); // Clear interval once the text is fully displayed
      }
    }, delay);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <>
      <Group>
        {displayedText.split('\n').map((array, index) => {
          return (
            <Group w="100%" key={index}>
              {array.split('').map((letter, index) => {
                if (alphabet.has(letter))
                  return <DotDisplay key={index} letter={alphabet.get(letter) ?? [[]]} />;
              })}
            </Group>
          );
        })}
      </Group>
    </>
  );
}
