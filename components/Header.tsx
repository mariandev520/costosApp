import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="header">
      <span className="mark">{siteConfig.name}</span>
      <div className="header-actions">
        <ThemeToggle />
        <a className="cta-btn" href="#demo">
          Quiero ver una demo
        </a>
      </div>
    </header>
  );
}
