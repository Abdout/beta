"use client";
import Action from "@/component/project/layout/action";
import Breadcrumb from "@/component/project/report/layout/crumb";
import { ActionContext } from "@/provider/action"; // Import the context and props
import { usePathname } from 'next/navigation';

interface Params {
  id: string;
}

interface ButtonActions {
  handleApprove: () => void;
  handleEdit: () => void;
  handleSend: () => void;
  handleDownload: () => void;
}

interface LayoutProps {
  children: React.ReactNode;
  params: Params; // Add this line
  buttonActions: ButtonActions;
  action?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, params, action, buttonActions }) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    
      <div >
        {children}
      </div>
    
  );
};

export default Layout;