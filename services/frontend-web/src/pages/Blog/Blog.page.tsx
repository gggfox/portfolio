import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { Fullstack_Journey_Part1 } from './posts/one';

export function BlogPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const isParentBlogPage = location.pathname !== '/blog';
  if (isParentBlogPage) {
    return <></>;
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="">
        <Fullstack_Journey_Part1 />
      </Modal>
      <Button onClick={open}>Post one</Button>
      <Button onClick={() => navigate('/blog/2')}>route</Button>
    </>
  );
}
