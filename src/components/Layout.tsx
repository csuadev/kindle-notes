import { ReactNode } from 'react';
import Footer from './Footer';

type LayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

const Layout = ({ sidebar, children }: LayoutProps): JSX.Element => (
  <div className='bg-[#f7f2ea] dark:bg-[#0f1115] text-slate-900 dark:text-slate-100 transition-colors min-h-screen overflow-x-hidden'>
    <div className='mx-auto flex min-h-screen w-full flex-col md:flex-row'>
      <aside className='w-full md:w-[280px] md:border-r md:border-slate-200/70 md:dark:border-slate-800/60 bg-[#f5efe6] dark:bg-[#13161c] md:min-h-screen min-w-0'>
        {sidebar}
      </aside>
      <main className='flex-1 min-w-0 px-6 pb-10 pt-8 md:px-10 md:pt-10 bg-[radial-gradient(100%_100%_at_0%_0%,rgba(255,255,255,0.9)_0%,rgba(247,242,234,0.6)_45%,rgba(247,242,234,0.2)_70%)] dark:bg-[radial-gradient(120%_120%_at_0%_0%,rgba(30,36,48,0.8)_0%,rgba(16,20,27,0.9)_50%,rgba(15,17,21,1)_80%)]'>
        {children}
        <Footer />
      </main>
    </div>
  </div>
);

export default Layout
