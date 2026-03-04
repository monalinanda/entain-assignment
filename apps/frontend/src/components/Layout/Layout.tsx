import type { ReactNode } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sidebar?: ReactNode;
}

function Layout({ children, searchQuery, onSearchChange, sidebar }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Header searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <div className={styles.body}>
        <main className={styles.main}>{children}</main>
        {sidebar && <div className={styles.sidebar}>{sidebar}</div>}
      </div>
    </div>
  );
}

export default Layout;
