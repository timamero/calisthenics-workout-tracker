import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

export const Route = createFileRoute('/_auth/app/user')({
  component: UserView,
});

function UserView() {
  return (
    <div>
      <Title>User Profile Page</Title>
      <p>This page will display user information.</p>
    </div>
  );
}
