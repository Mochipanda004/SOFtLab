import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.teacherDashboard8}>
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
          <div className={styles.primitiveButton}>
            <p className={styles.asistencia}>Asistencia</p>
          </div>
          <p className={styles.resumen}>Materiales</p>
          <p className={styles.resumen}>Evaluaciones</p>
          <p className={styles.resumen}>Calificaciones</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <p className={styles.tomarAsistenciaPiano}>
                Tomar Asistencia - Piano Básico
              </p>
            </div>
            <p className={styles.lunes18DeOctubre2025}>Lunes 18 de octubre, 2025</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.tableRow}>
                  <p className={styles.estudiante}>Estudiante</p>
                  <p className={styles.asistenciaTotal}>Asistencia Total</p>
                  <p className={styles.presente}>Presente</p>
                </div>
              </div>
              <div className={styles.tableBody}>
                <div className={styles.tableRow2}>
                  <div className={styles.teacherDashboard}>
                    <p className={styles.juanEstudiante}>Juan Estudiante</p>
                    <div className={styles.paragraph2}>
                      <p className={styles.a1213Clases}>12/13 clases</p>
                    </div>
                  </div>
                  <div className={styles.teacherDashboard2}>
                    <div className={styles.container3}>
                      <div className={styles.container2} />
                    </div>
                    <div className={styles.text}>
                      <p className={styles.a92}>92%</p>
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.primitiveSpan}>
                      <img
                        src="../image/mip66rcg-d6ysh7x.svg"
                        className={styles.icon}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.tableRow3}>
                  <div className={styles.teacherDashboard}>
                    <p className={styles.juanEstudiante}>María López</p>
                    <div className={styles.paragraph2}>
                      <p className={styles.a1213Clases}>13/13 clases</p>
                    </div>
                  </div>
                  <div className={styles.teacherDashboard3}>
                    <div className={styles.container4} />
                    <div className={styles.text2}>
                      <p className={styles.a100}>100%</p>
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.primitiveSpan}>
                      <img
                        src="../image/mip66rcg-d6ysh7x.svg"
                        className={styles.icon}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.tableRow4}>
                  <div className={styles.teacherDashboard}>
                    <p className={styles.juanEstudiante}>Carlos Ramírez</p>
                    <div className={styles.paragraph2}>
                      <p className={styles.a1213Clases}>11/13 clases</p>
                    </div>
                  </div>
                  <div className={styles.teacherDashboard4}>
                    <div className={styles.container5}>
                      <div className={styles.container2} />
                    </div>
                    <div className={styles.text}>
                      <p className={styles.a92}>85%</p>
                    </div>
                  </div>
                  <div className={styles.tableCell2}>
                    <div className={styles.primitiveButton2} />
                  </div>
                </div>
                <div className={styles.tableRow5}>
                  <div className={styles.teacherDashboard5}>
                    <p className={styles.juanEstudiante}>Ana Martínez</p>
                    <div className={styles.paragraph2}>
                      <p className={styles.a1213Clases}>10/13 clases</p>
                    </div>
                  </div>
                  <div className={styles.teacherDashboard6}>
                    <div className={styles.container6}>
                      <div className={styles.container2} />
                    </div>
                    <div className={styles.text}>
                      <p className={styles.a92}>77%</p>
                    </div>
                  </div>
                  <div className={styles.tableCell3}>
                    <div className={styles.primitiveSpan}>
                      <img
                        src="../image/mip66rcg-d6ysh7x.svg"
                        className={styles.icon}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.teacherDashboard7}>
              <div className={styles.button}>
                <p className={styles.guardarAsistencia}>Guardar asistencia</p>
              </div>
              <div className={styles.button2}>
                <p className={styles.asistencia}>Cancelar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container9}>
        <div className={styles.container7}>
          <img src="../image/mip66rcg-m1gguxw.svg" className={styles.icon2} />
          <div className={styles.text3}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container8}>
          <div className={styles.button3}>
            <img src="../image/mip66rcg-dqeq1b5.svg" className={styles.icon3} />
            <p className={styles.profesorDemo}>Profesor Demo</p>
          </div>
          <div className={styles.button4}>
            <img src="../image/mip66rcg-vp2e29v.svg" className={styles.icon3} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text4}>
          <p className={styles.guardarAsistencia}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button5}>
          <img src="../image/mip66rcg-usl66f5.svg" className={styles.icon3} />
        </div>
      </div>
    </div>
  );
}

export default Component;
