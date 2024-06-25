'use client';

import ApplicationForm from "@/components/register-form/application-form";
import styles from "../page.module.css";

export default function Home() {
  return (
      <main className={styles.main}>
        <ApplicationForm />
      </main>
  );
}
