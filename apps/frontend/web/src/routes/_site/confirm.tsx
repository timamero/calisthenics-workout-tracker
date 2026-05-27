import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Text, Container, Stack } from '@mantine/core';

import { useAuthStore } from '@cwt/state/stores';
// import { useConfirmUser } from '@cwt/hooks';

// import { supabase } from '../../services/supabaseClient';
import { useDefaultSize } from '../../hooks';

// import DefaultLoader from '../../components/common/DefaultLoader';

export const Route = createFileRoute('/_site/confirm')({
  // beforeLoad: () => {
  //   const user = useAuthStore.getState().user;
  //   if (!user) {
  //     throw redirect({
  //       to: '/',
  //     });
  //   }
  // },
  component: ConfirmationView,
});

function ConfirmationView() {
  // const navigate = useNavigate();

  // const [token, setToken] = useState(null);
  // const [email, setEmail] = useState(null);
  const user = useAuthStore((state) => state.user);
  const defaultSize = useDefaultSize();
  // const { status, handleConfirmUser } = useConfirmUser(supabase);

  // console.log('confirm || user', user);
  // console.log('confirm || status', status);

  useEffect(() => {
    // Get the query string from the current URL
    const queryString = window.location.search;

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Extract the token
    const token = urlParams.get('token_hash');
    const email = urlParams.get('email');

    if (token && email) {
      console.log('confirm || Token found:', token);
      console.log('confirm || Email found:', email);
      console.log('confirming user');
      // setToken(tokenParam)
      // setEmail()
      // handleConfirmUser(email, token);
      // Store it in localStorage, sessionStorage, or state
    } else {
      console.log('confirmation || No token in URL');
    }
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     navigate({
  //       to: '/',
  //     });
  //   }
  // }, [user, navigate]);

  // if (status === 'pending') {
  //   return <DefaultLoader />;
  // }

  if (user && !user.user_metadata.email_verified) {
    return (
      <Container py="xl">
        <Stack align="center" w="100%" gap={0}>
          <Title
            order={1}
            mb="md"
            fz={{ base: 'h3', md: 'h2' }}
            lh="xxs"
            ta="center"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.tight,
            })}
          >
            Check your inbox
          </Title>
          <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
            We've sent a confirmation link to {user.email}. Click the link in
            that email to verify your account and get started.
          </Text>
        </Stack>
      </Container>
    );
  }

  // if (status === 'confirmed') {
  //   return (
  //     <Container py="xl">
  //       <Stack align="center" w="100%" gap={0}>
  //         <Title
  //           order={1}
  //           mb="md"
  //           fz={{ base: 'h3', md: 'h2' }}
  //           lh="xxs"
  //           ta="center"
  //           style={(theme) => ({
  //             letterSpacing: theme.other.letterSpacing.tight,
  //           })}
  //         >
  //           Email confirmed
  //         </Title>
  //         <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
  //           Your account is now active. Log in below to access your account.
  //         </Text>
  //       </Stack>
  //     </Container>
  //   );
  // }

  return (
    <Container py="xl">
      <Stack align="center" w="100%" gap={0}>
        <Title
          order={1}
          mb="md"
          fz={{ base: 'h3', md: 'h2' }}
          lh="xxs"
          ta="center"
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.tight,
          })}
        >
          The message has expired
        </Title>
      </Stack>
    </Container>
  );
}
