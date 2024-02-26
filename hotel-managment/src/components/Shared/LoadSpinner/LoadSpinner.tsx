import styles from './LoadSpinner.module.scss'; // Import CSS for styling the spinner

const Spinner = () => {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner"]}></div>
    </div>
  );
};

export default Spinner;