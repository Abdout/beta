"use client";



import { FormError } from "@/component/auth/error";
// import { useCurrentRole } from "@/hook/use-current-role";
import { UserRole } from "@/lib/auth/role";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  // const role = useCurrentRole();

  // if (role !== allowedRole) {
  //   return (
  //     <FormError message="You do not have permission to view this content!" />
  //   )
  // }

  return (
    <>
      {children}
    </>
  );
};
