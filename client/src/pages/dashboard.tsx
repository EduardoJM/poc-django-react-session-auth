import { Navigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth-hooks";
import api from "../lib/axios";

const DashboardPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout/');
      queryClient.invalidateQueries({ queryKey: ['authenticated-user'] });
    },
  });

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      Auth email: {user.email}
      <div>
        <button
          type="button"
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          {logoutMutation.isPending ? 'Loading...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}
  
export default DashboardPage;
