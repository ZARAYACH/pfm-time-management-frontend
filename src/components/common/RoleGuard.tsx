import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "./Loader";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !allowedRoles.includes(user.role))) {
      router.push("/auth/login");
    }
  }, [user, loading, allowedRoles, router]);

  if (loading) return <Loader />;

  return user && allowedRoles.includes(user.role) ? <>{children}</> : null;
};

export default RoleGuard;