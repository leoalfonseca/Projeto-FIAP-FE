import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { api } from 'services/api';
import { storageRemoveToken } from 'storage/storageToken';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthContext {
  signIn: (dataLogin: AuthProps) => void;
  signOut: () => void;
}

type AuthProps = {
  username: string;
  password: string;
};

const AuthContext = React.createContext({} as IAuthContext);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const router = useRouter();

  // Login normal, com usuário e senha criptografados

  const signIn = async (dataLogin: AuthProps) => {
    try {
      // const { username, password } = dataLogin;
      // const encryptedUsername = encrypt({ text: username });
      // const encryptedPassword = encrypt({ text: password });

      // const mode = process.env.MODE ? process.env.MODE.toLowerCase() : '';
      // const route = mode === 'dev' ? 'loginDev' : 'login';

      // Envia os dados criptografados para a API

      // const { data } = await api.post(route, {
      //   username: encryptedUsername,
      //   password: encryptedPassword,
      // });

      // Armazena o token no local storage

      // storageSetToken(data.token);

      // api.defaults.headers.Authorization = `Bearer ${data.token}`;

      toast.success('Usuário logado com sucesso!');

      // Envia para a dashboard
      router.push('/home');
    } catch (error: any) {
      toast.error('Usuário ou senha inválidos');
      throw error;
    }
  };


  // Deslogar usuário

  const signOut = async () => {
    try {
      router.push('/login');
      storageRemoveToken();
      api.defaults.headers.Authorization = '';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
