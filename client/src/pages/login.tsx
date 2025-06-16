import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import { useAuth } from "../auth-hooks";

const LoginPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await api.post('/auth/login/', data);
      queryClient.invalidateQueries({ queryKey: ['authenticated-user'] });
    },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({ email: username, password });
  }

  if (user) {
    return <Navigate to="/" />
  }
  
  return (
    <div>
      Login Page

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
