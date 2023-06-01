import React, { useContext, useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  Center,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/brand-logo';
import { LoginContext } from '../../context/login';
import { useApi } from '../../hooks/useApi';
import { AuthDto } from '../../models/AuthTypes';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { userData, setUserData } = useContext(LoginContext);
  const navigate = useNavigate();

  const { data, error, loading, fetch } = useApi(
    'api/auth/register',
    'post',
    {},
    {}
  );

  const handleSubmit = () => {
    if (name && username && password) {
      fetch({
        email: username,
        password,
        name,
      });
      return;
    }

    setErrorMessage('Por favor rellena los campos faltantes');
  };

  useEffect(() => {
    if (data) {
      const user = new AuthDto(data);
      user.isLoggedIn = true;
      window.localStorage.setItem('userSession', JSON.stringify(user));
      setUserData(user);
      navigate('/admin');
    }
    if (userData && userData.isLoggedIn) {
      navigate('/admin');
    }
  }, [data, userData]);

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
              name='name'
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder='Nombre'
              size='lg'
            />
          </FormControl>
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
              onClick={handleSubmit}
              mb={2}
            >
              Registrarse
            </Button>
          </FormControl>
          {errorMessage && (
            <Center>
              <Text color='red'>{errorMessage}</Text>
            </Center>
          )}
        </Card>
      </Center>
    </Flex>
  );
};
