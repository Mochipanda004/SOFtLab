import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.teacherDashboard9}>
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
          <div className={styles.primitiveButton}>
            <p className={styles.resumen}>Resumen</p>
          </div>
          <p className={styles.miHorario}>Mi Horario</p>
          <p className={styles.miHorario}>Asistencia</p>
          <p className={styles.miHorario}>Materiales</p>
          <p className={styles.miHorario}>Evaluaciones</p>
          <p className={styles.miHorario}>Calificaciones</p>
        </div>
        <div className={styles.tabPanel}>
          <div className={styles.teacherDashboard5}>
            <div className={styles.teacherDashboard}>
              <div className={styles.container2}>
                <p className={styles.cursosActivos}>Cursos activos</p>
                <p className={styles.a2}>2</p>
              </div>
              <div className={styles.container3}>
                <img src="../image/mip661fu-2y34lr4.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.teacherDashboard2}>
              <div className={styles.container2}>
                <p className={styles.cursosActivos}>Total estudiantes</p>
                <p className={styles.a2}>20</p>
              </div>
              <div className={styles.container4}>
                <img src="../image/mip661fu-qn8ym97.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.teacherDashboard3}>
              <div className={styles.container2}>
                <p className={styles.cursosActivos}>Clases esta semana</p>
                <p className={styles.a2}>6</p>
              </div>
              <div className={styles.container5}>
                <img src="../image/mip661fu-yxz5tm0.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.teacherDashboard4}>
              <div className={styles.container2}>
                <p className={styles.cursosActivos}>Evaluaciones pendientes</p>
                <p className={styles.a2}>5</p>
              </div>
              <div className={styles.container6}>
                <img src="../image/mip661fu-r5mhvqp.svg" className={styles.icon} />
              </div>
            </div>
          </div>
          <div className={styles.teacherDashboard8}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <p className={styles.prXimasClases}>Próximas Clases</p>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.teacherDashboard6}>
                  <div className={styles.container9}>
                    <div className={styles.container7}>
                      <img
                        src="../image/mip661fu-e28d2by.svg"
                        className={styles.icon2}
                      />
                    </div>
                    <div className={styles.container8}>
                      <div className={styles.paragraph2}>
                        <p className={styles.dashboardDelProfesor}>Piano Básico</p>
                      </div>
                      <div className={styles.paragraph3}>
                        <p className={styles.a12EstudiantesSala10}>
                          12 estudiantes • Sala 101
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.badge}>
                    <p className={styles.hoy1800}>Hoy 18:00</p>
                  </div>
                </div>
                <div className={styles.teacherDashboard7}>
                  <div className={styles.container11}>
                    <div className={styles.container7}>
                      <img
                        src="../image/mip661fu-e28d2by.svg"
                        className={styles.icon2}
                      />
                    </div>
                    <div className={styles.container10}>
                      <div className={styles.paragraph4}>
                        <p className={styles.dashboardDelProfesor}>
                          Piano Intermedio
                        </p>
                      </div>
                      <div className={styles.paragraph5}>
                        <p className={styles.a8EstudiantesSala102}>
                          8 estudiantes • Sala 102
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.badge2}>
                    <p className={styles.hoy1800}>Viernes 16:00</p>
                  </div>
                </div>
                <div className={styles.button}>
                  <p className={styles.verTodosLosHorarios}>
                    Ver todos los horarios
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.card2}>
              <div className={styles.cardTitle2}>
                <p className={styles.prXimasClases}>Acciones Rápidas</p>
              </div>
              <div className={styles.cardContent2}>
                <div className={styles.button2}>
                  <img
                    src="../image/mip661fu-jk9x8q5.svg"
                    className={styles.icon3}
                  />
                  <p className={styles.verTodosLosHorarios}>Tomar asistencia</p>
                </div>
                <div className={styles.button3}>
                  <img
                    src="../image/mip661fu-bhw7lqz.svg"
                    className={styles.icon3}
                  />
                  <p className={styles.verTodosLosHorarios}>Subir material</p>
                </div>
                <div className={styles.button4}>
                  <img
                    src="../image/mip661fu-ggabgde.svg"
                    className={styles.icon3}
                  />
                  <p className={styles.verTodosLosHorarios}>Crear evaluación</p>
                </div>
                <div className={styles.button5}>
                  <img
                    src="../image/mip661fu-xnd8jjp.svg"
                    className={styles.icon3}
                  />
                  <p className={styles.verTodosLosHorarios}>Ver calificaciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container14}>
        <div className={styles.container12}>
          <img src="../image/mip661fu-ek6ldp0.svg" className={styles.icon4} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container13}>
          <div className={styles.button6}>
            <img src="../image/mip661fu-onrkp91.svg" className={styles.icon5} />
            <p className={styles.profesorDemo}>Profesor Demo</p>
          </div>
          <div className={styles.button7}>
            <img src="../image/mip661fu-r729n30.svg" className={styles.icon5} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button8}>
          <img src="../image/mip661fu-mxo2hyx.svg" className={styles.icon5} />
        </div>
      </div>
    </div>
  );
}

export default Component;
