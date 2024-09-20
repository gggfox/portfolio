import { Box, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const MARGIN_RIGHT = 0;

interface DotProps {
  value: number;
}
export function Dot({ value }: DotProps) {
  const { colorScheme } = useMantineColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const color = value > 0 ? backgroundColor : '#00000000';
  const isMobile = useMediaQuery('(min-width: 56.25em)');

  return (
    <Box
      w={isMobile ? '8px' : '3px'}
      h={isMobile ? '8px' : '3px'}
      bg={color}
      mr={MARGIN_RIGHT}
      style={{
        borderRadius: '100px',
        backgroundColor: color,
      }}
    />
  );
}
