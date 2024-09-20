import { MantineStyleProps, useMantineColorScheme } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { IconSunFilled, IconMoon } from '@tabler/icons-react';

export function ColorSchemeToggle(props: any) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
      }}
      bg={colorScheme === 'dark' ? '#202020' : '#f1f3f5'}
      {...props}
    >
      {colorScheme === 'dark' ? (
        <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
      ) : (
        <IconSunFilled
          style={{
            width: '70%',
            height: '70%',
            color: 'black',
            borderColor: 'black',
          }}
          stroke={1.5}
        />
      )}
    </ActionIcon>
  );
}
