'use client';

import Breadcrumb from '@/component/project/report/layout/crumb';
import { Action } from '@/provider/action';
import { usePathname } from 'next/navigation';

interface ButtonActions {
  handleApprove: () => void;
  handleEdit: () => void;
  handleSend: () => void;
  handleDownload: () => void;
}

interface LayoutProps {
  children: React.ReactNode;
  params: any; // Add this line
  buttonActions: ButtonActions; // Add this line
}

const Layout: React.FC<LayoutProps> = ({ children, params, buttonActions }) => { // Add params and buttonActions here
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = segments.map((segment, index) => ({
    label: segment,
    href: '/' + segments.slice(0, index + 1).join('/'),
  }));

  return (
    <div>
      <Breadcrumb params={{ id: segments[1] }} />
      <Action.Provider value={buttonActions}>{children}</Action.Provider> // Wrap children with Action.Provider
    </div>
  );
};

export default Layout;