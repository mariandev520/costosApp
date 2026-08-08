import styles from './SectionHeader.module.css';

export default function SectionHeader({ id, title, count, hasBorder = true, visuallyHidden = false }) {
  if (visuallyHidden) {
    return <h2 id={id} className="sr-only">{title}</h2>;
  }

  return (
    <div className={`${styles.header} ${!hasBorder ? styles.noBorder : ''} reveal`}>
      <h2 id={id} className={styles.title}>{title}</h2>
      {count && <span className={styles.count}>{count}</span>}
    </div>
  );
}
