import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.studentDashboard}>
      <div className={styles.container3}>
        <div className={styles.container}>
          <img src="../image/mip58jr1-g1qwu3z.svg" className={styles.icon} />
        </div>
        <div className={styles.container2}>
          <div className={styles.heading3}>
            <p className={styles.exploraNuestrosCurso}>Explora nuestros cursos</p>
          </div>
          <p className={styles.descubreTodosLosCurs}>
            Descubre todos los cursos disponibles y sus precios
          </p>
        </div>
      </div>
      <div className={styles.button}>
        <p className={styles.verCatLogo}>Ver catálogo</p>
      </div>
    </div>
  );
}

export default Component;
