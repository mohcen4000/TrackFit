import Link from 'next/link';
import styles from './Welcome.module.css';

function Profile() {
  return (
    <div className={styles.general}>
      <section className={styles.sectionn}>
        <header className={styles.header}>
          <Link className={styles.headlogo} href={'/'}>
            BodyBudy
          </Link>
          <ul className={styles.headernav}>
            <li className={styles.navli}>
              <Link href={'/'} className={styles.headernavlia}>
                Login
              </Link>
            </li>
            <li className={styles.navli}>
              <Link href={'/'} className={styles.headernavlia}>
                Register
              </Link>
            </li>
            <li className={styles.navli}>
              <Link href={'/Welcome'} className={styles.headernavlia}>
                About Us
              </Link>
            </li>
          </ul>
        </header>
        <div className={styles.content}>
          <div className={styles.contentbx}>
            <h2 className={styles.contenth2}>
              Build Perfect Body
            </h2>
            <p className={styles.contentp}>
            Welcome to TrackFit, your ultimate destination for embracing a healthier lifestyle. Our platform is dedicated to guiding you towards your fitness goals by offering personalized exercise and nutrition programs tailored to your needs. With our intuitive tools, you can effortlessly track your workouts, monitor your dietary intake, and embark on a journey towards a fitter, happier you. Say hello to a life filled with vitality and well-being – welcome to BodyBudy, where your wellness journey begins.
            </p>
            <Link href={'/'} className={styles.contenta}>Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
