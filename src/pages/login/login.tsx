import React, { useContext, useEffect, useState } from 'react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  Center,
  Flex,
  FormControl,
  Text,
  Heading,
  Input,
  InputGroup,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/login';
import { useApi } from '../../hooks/useApi';
import { AuthDto } from '../../models/AuthTypes';
import { BrandLogo } from '../../components/brand-logo';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = React.useState(false);
  const { userData, setUserData } = useContext(LoginContext);
  const navigate = useNavigate();
  const { data, error, loading, fetch } = useApi(
    'api/auth/login',
    'post',
    {},
    {}
  );

  useEffect(() => {
    if (data) {
      const user = new AuthDto(data);
      user.isLoggedIn = true;
      window.sessionStorage.setItem('userSession', JSON.stringify(user));
      setUserData(user);
      navigate('/admin');
    }
    if (userData && userData.isLoggedIn) {
      navigate('/admin');
    }
  }, [data, userData]);

  // TODO make a component to render errors
  if (error?.code === AxiosError.ERR_NETWORK) {
    return <Heading as='h2'>Algo salió mal :C</Heading>;
  }

  return (
    <Flex
      width='100vw'
      height='65vh'
      justifyContent='center'
      alignItems='center'
    >
      <Center width='100vw'>
        <BrandLogo />
        <Card p='12px' gap={4} width='336px' variant='elevated'>
          <FormControl>
            <Input
              name='user'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder='Usuario o email'
              size='lg'
            />
          </FormControl>
          <FormControl>
            <InputGroup alignItems='center'>
              <Input
                name='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Contraseña'
                size='lg'
                type={show ? 'text' : 'password'}
              />
              <InputRightElement pt='6px'>
                <IconButton
                  aria-label='ver contraseña'
                  alignSelf='center'
                  size='sm'
                  onClick={() => setShow(!show)}
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </IconButton>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={error?.code === AxiosError.ERR_BAD_RESPONSE}>
            <Button
              width='100%'
              size='lg'
              isLoading={loading}
              onClick={() => fetch({ email: username, password })}
              mb={2}
            >
              Iniciar sesión
            </Button>
            <Center>
              <Link to='/signup'>¿No tienes cuenta? Registrate</Link>
            </Center>
            {error && error.message && (
              <Text color='red' pl='3px'>
                Contraseña o Correo equivocados
              </Text>
            )}
          </FormControl>
        </Card>
      </Center>
    </Flex>
  );
};
