'use client'
import styles from './page.module.scss';
import Header from "@/components/Header";

export default function LandingLayout({
  children,
}) {
  return <div className={styles.main}>
      <Header type="landing"/>
      {children}
    </div>
}
