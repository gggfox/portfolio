import { Group, Stack } from '@mantine/core';
import { Dot } from './Dot';

const MARGIN_BOTTOM = 1;

interface DotDisplayProps {
  letter: number[][];
}
export function DotDisplay({ letter }: DotDisplayProps) {
  return (
    <Stack gap={2}>
      {letter.map((row: number[], idx) => {
        return (
          <Group key={idx} mb={MARGIN_BOTTOM} gap={0}>
            {row.map((dot: number, index) => {
              return <Dot key={index} value={dot} />;
            })}
          </Group>
        );
      })}
    </Stack>
  );
}
