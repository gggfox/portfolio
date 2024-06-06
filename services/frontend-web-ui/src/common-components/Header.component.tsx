import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";

export function Header() {
    const [opened, { toggle }] = useDisclosure();

    return(
<AppShell.Header>
<Group>
<Burger
    opened={opened}
    onClick={toggle}
    hiddenFrom="sm"
    size="sm"
  />

  <Link to="/" className="[&.active]:font-bold">
  <div>Logo</div>
    </Link>
  <Link to="/chatroom/" className="[&.active]:font-bold">
  <div>Chat</div>
    </Link>
    <Link to="/about" className="[&.active]:font-bold">
  <div>About</div>
    </Link>
    <Link to="/chat" className="[&.active]:font-bold">
  <div>Chatroom</div>
    </Link>
</Group>


</AppShell.Header>
    )
}