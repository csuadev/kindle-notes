import { ReactNode } from 'react';
import Menu from './Menu';
import Footer from './Footer';

type LayoutProps = {
  title?: string;
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className='bg-white dark:bg-zinc-900 text-slate-900 dark:text-white transition-colors flex justify-between min-h-screen'>
    <div className='w-10/12 mx-auto flex flex-col'>
      <Menu />
        {children}
      <Footer />
    </div>
  </div>
)

export default Layout