import { siteConfig } from "@/lib/site-config";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} {siteConfig.name}
    </footer>
  );
}
