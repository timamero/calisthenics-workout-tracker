import { Menu, ActionIcon } from '@mantine/core';
import { IoAddOutline } from 'react-icons/io5';

export default function AddMenu() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          size="xxl"
          w="min-content"
          // data-disabled
          onClick={(event) => event.preventDefault()}
        >
          <IoAddOutline size={60} />
        </ActionIcon>
        {/* <Button>
          <IoAddOutline size={32} />
        </Button> */}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Add Exercise</Menu.Label>
        {/* <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item> */}

        {/* <Menu.Divider /> */}

        <Menu.Label>Add Section</Menu.Label>
        <Menu.Label>Add Superset</Menu.Label>
        {/* <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}
