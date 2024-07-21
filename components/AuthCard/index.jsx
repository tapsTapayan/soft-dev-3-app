import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { login, setRememberUser } from '@/firebase/auth';
import { useUsernameContext } from '@/providers/UsernamesProvider';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Collapse,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from '@chakra-ui/react';

function AuthCard() {
  const toast = useToast();
  const router = useRouter();
  const { usernames } = useUsernameContext();

  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const initialFocusRef = React.useRef(null);

  const handleClick = () => setShow(!show);
  const renderPasswordIcon = show ? (
    <ViewOffIcon color={'#E6E6E6'} cursor={'pointer'} onClick={handleClick} />
  ) : (
    <ViewIcon color={'#E6E6E6'} cursor={'pointer'} onClick={handleClick} />
  );

  const validateUsername = (e) => {
    const regex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i;
    const username = e.target.value;
    setStatus(username ? regex.test(username) : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const target = e.currentTarget;
    const usernameInput = target.elements.namedItem('username');
    const passwordInput = target.elements.namedItem('password');
    const persistenceInput = target.elements.namedItem('persistence');
    const username = usernameInput.value;
    const password = passwordInput.value;
    const persistence = persistenceInput.checked;

    setRememberUser(persistence);

    if (status) {
      handleAuth(username, password).then(() => setLoading(false));
    }
  };

  async function handleAuth(username, password) {
    const doc = usernames?.filter((doc) => doc.username == username);
    if (doc) {
      try {
        const user = await login(doc?.at(0)?.email, password);

        if (user) {
          toast({
            title: 'Welcome Developer!',
            description: 'Please wait till the page reloads',
            status: 'success',
            position: 'top',
            duration: 3000,
          });
        }
      } catch (e) {
        toast({
          title: 'Invalid User Credentials!',
          description: 'Please check your input fields',
          status: 'error',
          position: 'top',
          duration: 3000,
        });
      }
    }
  }

  return (
    <Card bg="#fffffe" width={400} paddingX={25} paddingY={15}>
      <CardHeader textAlign="center">
        <Heading size="lg">¡Hola! Developer! 🧑🏻‍💻</Heading>
        <p>Please sign in to continue.</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <Stack spacing={5} alignItems={'center'}>
              <FormControl isInvalid={!status}>
                <Input
                  ref={initialFocusRef}
                  placeholder="Username"
                  size="md"
                  id="username"
                  name="username"
                  onKeyUp={validateUsername}
                  required
                />
                <Collapse in={!status} unmountOnExit>
                  <FormErrorMessage>Enter Valid Username</FormErrorMessage>
                </Collapse>
              </FormControl>

              <InputGroup size="md">
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  required
                />
                <InputRightElement>{renderPasswordIcon}</InputRightElement>
              </InputGroup>
              <Button
                isLoading={loading}
                loadingText="Logging-in"
                width={200}
                size="sm"
                background="#229CD0"
                color="white"
                colorScheme="blue"
                type="submit"
              >
                LOG IN
              </Button>
              <Checkbox
                id="persistence"
                name="persistence"
                isRequired={false}
                size="sm"
              >
                Keep me logged-in
              </Checkbox>
              <Button
                background="transparent"
                size="xs"
                textDecor="underline"
                color="#0582CA"
                onClick={() => router.push('/register')}
              >
                Don&apos;t have an account yet?
              </Button>
            </Stack>
          </FormControl>
        </form>
      </CardBody>
    </Card>
  );
}

export default AuthCard;
