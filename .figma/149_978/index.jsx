import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.teacherDashboard}>
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
          <div className={styles.primitiveButton}>
            <p className={styles.miHorario}>Mi Horario</p>
          </div>
          <p className={styles.resumen}>Asistencia</p>
          <p className={styles.resumen}>Materiales</p>
          <p className={styles.resumen}>Evaluaciones</p>
          <p className={styles.resumen}>Calificaciones</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <p className={styles.agendaSemanal}>Agenda Semanal</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.weeklySchedule}>
              <div className={styles.autoWrapper}>
                <div className={styles.paragraph2}>
                  <p className={styles.lunes}>Lunes</p>
                </div>
                <div className={styles.paragraph3}>
                  <p className={styles.lunes}>Martes</p>
                </div>
                <div className={styles.paragraph4}>
                  <p className={styles.lunes}>Miércoles</p>
                </div>
                <div className={styles.paragraph5}>
                  <p className={styles.lunes}>Jueves</p>
                </div>
                <div className={styles.paragraph6}>
                  <p className={styles.lunes}>Viernes</p>
                </div>
                <div className={styles.paragraph7}>
                  <p className={styles.lunes}>Sábado</p>
                </div>
              </div>
              <div className={styles.autoWrapper2}>
                <p className={styles.a0800}>08:00</p>
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
              </div>
              <div className={styles.autoWrapper2}>
                <p className={styles.a0800}>09:00</p>
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
              </div>
              <div className={styles.autoWrapper2}>
                <p className={styles.a0800}>10:00</p>
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
              </div>
              <div className={styles.autoWrapper2}>
                <p className={styles.a0800}>11:00</p>
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
              </div>
              <div className={styles.autoWrapper2}>
                <p className={styles.a0800}>12:00</p>
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
              </div>
              <div className={styles.autoWrapper2}>
                <p className={styles.a0800}>14:00</p>
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
              </div>
              <div className={styles.autoWrapper2}>
                <p className={styles.a0800}>15:00</p>
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
              </div>
              <div className={styles.autoWrapper3}>
                <p className={styles.a1600}>16:00</p>
                <div className={styles.container3} />
                <div className={styles.container3} />
                <div className={styles.container3} />
                <div className={styles.container3} />
                <div className={styles.container4}>
                  <p className={styles.pianoIntermedio}>Piano Intermedio</p>
                  <div className={styles.badge}>
                    <p className={styles.sala102}>Sala 102</p>
                  </div>
                  <div className={styles.paragraph8}>
                    <p className={styles.a8Estudiantes}>8 estudiantes</p>
                  </div>
                </div>
                <div className={styles.container3} />
              </div>
              <div className={styles.autoWrapper2}>
                <p className={styles.a0800}>17:00</p>
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
                <div className={styles.container2} />
              </div>
              <div className={styles.autoWrapper4}>
                <p className={styles.a1600}>18:00</p>
                <div className={styles.container5}>
                  <p className={styles.pianoIntermedio}>Piano Básico</p>
                  <div className={styles.badge2}>
                    <p className={styles.sala102}>Sala 101</p>
                  </div>
                  <div className={styles.paragraph9}>
                    <p className={styles.a12Estudiantes}>12 estudiantes</p>
                  </div>
                </div>
                <div className={styles.container3} />
                <div className={styles.container5}>
                  <p className={styles.pianoIntermedio}>Piano Básico</p>
                  <div className={styles.badge2}>
                    <p className={styles.sala102}>Sala 101</p>
                  </div>
                  <div className={styles.paragraph9}>
                    <p className={styles.a12Estudiantes}>12 estudiantes</p>
                  </div>
                </div>
                <div className={styles.container3} />
                <div className={styles.container3} />
                <div className={styles.container3} />
              </div>
            </div>
            <div className={styles.weeklySchedule2}>
              <div className={styles.container7}>
                <div className={styles.container6} />
                <div className={styles.text}>
                  <p className={styles.miHorario}>Clase programada</p>
                </div>
              </div>
              <div className={styles.container9}>
                <div className={styles.container8} />
                <div className={styles.text}>
                  <p className={styles.miHorario}>Disponible</p>
                </div>
              </div>
              <div className={styles.container11}>
                <div className={styles.container10} />
                <div className={styles.text}>
                  <p className={styles.miHorario}>Bloqueado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container14}>
        <div className={styles.container12}>
          <img src="../image/mip66cz2-qeuof4p.svg" className={styles.icon} />
          <div className={styles.text2}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container13}>
          <div className={styles.button}>
            <img src="../image/mip66cz2-9tjvdu4.svg" className={styles.icon2} />
            <p className={styles.profesorDemo}>Profesor Demo</p>
          </div>
          <div className={styles.button2}>
            <img src="../image/mip66cz2-6oq9sjh.svg" className={styles.icon2} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text3}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button3}>
          <img src="../image/mip66cz2-w027u7l.svg" className={styles.icon2} />
        </div>
      </div>
    </div>
  );
}

export default Component;
