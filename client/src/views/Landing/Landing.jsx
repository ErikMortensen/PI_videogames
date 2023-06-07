import {Link} from 'react-router-dom';
import styles from "./Landing.module.css";


export const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <Link to='/home' className={styles.landingButton}>Start</Link>
    </div>
  )
}
