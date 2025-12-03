import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.teacherDashboard5}>
      <div className={styles.container}>
        <div className={styles.heading1}>
          <p className={styles.dashboardDelProfesor}>Dashboard del Profesor</p>
        </div>
        <div className={styles.paragraph}>
          <p className={styles.gestionaTusClasesEst}>
            Gestiona tus clases, estudiantes y evaluaciones.
          </p>
        </div>
      </div>
      <div className={styles.primitiveDiv}>
        <div className={styles.tabList}>
          <p className={styles.resumen}>Resumen</p>
          <p className={styles.resumen}>Mi Horario</p>
          <p className={styles.resumen}>Asistencia</p>
          <p className={styles.resumen}>Materiales</p>
          <p className={styles.resumen}>Evaluaciones</p>
          <div className={styles.primitiveButton}>
            <p className={styles.calificaciones}>Calificaciones</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <p className={styles.estudiantesPianoBSic}>
              Estudiantes - Piano Básico
            </p>
          </div>
          <div className={styles.teacherDashboard4}>
            <div className={styles.button}>
              <div className={styles.teacherDashboard}>
                <p className={styles.calificaciones}>Juan Estudiante</p>
              </div>
              <div className={styles.badge}>
                <p className={styles.a92Asistencia}>92% asistencia</p>
              </div>
            </div>
            <div className={styles.button2}>
              <div className={styles.teacherDashboard2}>
                <p className={styles.calificaciones}>María López</p>
              </div>
              <div className={styles.badge2}>
                <p className={styles.a92Asistencia}>100% asistencia</p>
              </div>
            </div>
            <div className={styles.button3}>
              <div className={styles.teacherDashboard3}>
                <p className={styles.calificaciones}>Carlos Ramírez</p>
              </div>
              <div className={styles.badge}>
                <p className={styles.a92Asistencia}>85% asistencia</p>
              </div>
            </div>
            <div className={styles.button4}>
              <p className={styles.anaMartNez}>Ana Martínez</p>
              <div className={styles.badge}>
                <p className={styles.a92Asistencia}>77% asistencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container4}>
        <div className={styles.container2}>
          <img src="../image/mip70ust-fo9o06k.svg" className={styles.icon} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.button5}>
            <img src="../image/mip70ust-76ydzld.svg" className={styles.icon2} />
            <p className={styles.profesorDemo}>Profesor Demo</p>
          </div>
          <div className={styles.button6}>
            <img src="../image/mip70ust-sem7wzq.svg" className={styles.icon2} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button7}>
          <img src="../image/mip70ust-s24m7dl.svg" className={styles.icon2} />
        </div>
      </div>
    </div>
  );
}

export default Component;
