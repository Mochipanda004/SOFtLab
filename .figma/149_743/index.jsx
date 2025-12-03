import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.studentDashboard2}>
      <div className={styles.container}>
        <div className={styles.heading1}>
          <p className={styles.miDashboard}>Mi Dashboard</p>
        </div>
        <div className={styles.paragraph}>
          <p className={styles.bienvenidoDeVueltaEs}>
            Bienvenido de vuelta, Estudiante Demo. Aquí está tu resumen de
            actividades.
          </p>
        </div>
      </div>
      <div className={styles.primitiveDiv}>
        <div className={styles.tabList}>
          <p className={styles.resumen}>Resumen</p>
          <p className={styles.resumen}>Horario</p>
          <p className={styles.resumen}>Materiales</p>
          <p className={styles.resumen}>Evaluaciones</p>
          <p className={styles.resumen}>Pagos</p>
          <div className={styles.primitiveButton}>
            <p className={styles.certificados}>Certificados</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <p className={styles.misCertificados}>Mis Certificados</p>
          </div>
          <div className={styles.studentDashboard}>
            <img src="../image/mip5vtsg-5kxu4hb.svg" className={styles.icon} />
            <div className={styles.heading3}>
              <p className={styles.miDashboard}>Aún no tienes certificados</p>
            </div>
            <div className={styles.paragraph2}>
              <p className={styles.completaTusCursosPar}>
                Completa tus cursos para obtener certificados oficiales
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container4}>
        <div className={styles.container2}>
          <img src="../image/mip5vtsg-qc75ppt.svg" className={styles.icon2} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.button}>
            <img src="../image/mip5vtsg-1b96cl8.svg" className={styles.icon3} />
          </div>
          <div className={styles.button2}>
            <img src="../image/mip5vtsg-kr3dxml.svg" className={styles.icon3} />
            <p className={styles.estudianteDemo}>Estudiante Demo</p>
          </div>
          <div className={styles.button}>
            <img src="../image/mip5vtsg-sy9cmzf.svg" className={styles.icon3} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button3}>
          <img src="../image/mip5vtsg-qqub2yn.svg" className={styles.icon3} />
        </div>
      </div>
    </div>
  );
}

export default Component;
