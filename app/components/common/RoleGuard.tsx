import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAuth} from "@/app/contexts/AuthContext";
import Loader from "./Loader";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const RoleGuard = ({allowedRoles, children}: RoleGuardProps) => {
  const router = useRouter();
  const {user, role, loading} = useAuth();

  useEffect(() => {
    if (!loading && (!user || !role?.[0] || !allowedRoles.includes(role?.[0]))) {
      router.push("/auth/login");
    }
  }, [user, loading, allowedRoles, router]);

  if (loading) return <Loader/>;

  return user && role?.[0] && allowedRoles.includes(role?.[0]) ? <>{children}</> : null;
};

export default RoleGuard;