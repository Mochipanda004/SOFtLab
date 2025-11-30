import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.adminDashboard2}>
      <div className={styles.container}>
        <div className={styles.heading1}>
          <p className={styles.panelDeAdministraciN}>Panel de Administración</p>
        </div>
        <div className={styles.paragraph}>
          <p className={styles.gestionaCursosProfes}>
            Gestiona cursos, profesores, estudiantes y recursos de la academia.
          </p>
        </div>
      </div>
      <div className={styles.primitiveDiv}>
        <div className={styles.tabList}>
          <p className={styles.resumen}>Resumen</p>
          <p className={styles.resumen}>Cursos</p>
          <p className={styles.resumen}>Profesores</p>
          <p className={styles.resumen}>Estudiantes</p>
          <p className={styles.resumen}>Recursos</p>
          <div className={styles.primitiveButton}>
            <p className={styles.reportes}>Reportes</p>
          </div>
          <div className={styles.primitiveButton2}>
            <p className={styles.reportes}>Configuración</p>
          </div>
        </div>
        <div className={styles.adminDashboard}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <p className={styles.reportesAcadMicos}>Reportes Académicos</p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.button}>
                <img src="../image/mikpy9g3-53e362l.svg" className={styles.icon} />
                <p className={styles.reporteDeInscripcion}>
                  Reporte de inscripciones
                </p>
              </div>
              <div className={styles.button2}>
                <img src="../image/mikpy9g3-53e362l.svg" className={styles.icon} />
                <p className={styles.reporteDeInscripcion}>Reporte de asistencia</p>
              </div>
              <div className={styles.button3}>
                <img src="../image/mikpy9g3-53e362l.svg" className={styles.icon} />
                <p className={styles.reporteDeInscripcion}>
                  Reporte de calificaciones
                </p>
              </div>
              <div className={styles.button4}>
                <img src="../image/mikpy9g3-53e362l.svg" className={styles.icon} />
                <p className={styles.reporteDeInscripcion}>
                  Reporte de certificaciones
                </p>
              </div>
            </div>
          </div>
          <div className={styles.card2}>
            <div className={styles.cardTitle2}>
              <p className={styles.reportesAcadMicos}>Reportes Financieros</p>
            </div>
            <div className={styles.cardContent2}>
              <div className={styles.button5}>
                <img src="../image/mikpy9g4-t7prfjz.svg" className={styles.icon} />
                <p className={styles.reporteDeInscripcion}>Ingresos mensuales</p>
              </div>
              <div className={styles.button6}>
                <img src="../image/mikpy9g4-t7prfjz.svg" className={styles.icon} />
                <p className={styles.reporteDeInscripcion}>Pagos pendientes</p>
              </div>
              <div className={styles.button7}>
                <img src="../image/mikpy9g4-t7prfjz.svg" className={styles.icon} />
                <p className={styles.reporteDeInscripcion}>
                  Proyección de ingresos
                </p>
              </div>
              <div className={styles.button8}>
                <img src="../image/mikpy9g4-t7prfjz.svg" className={styles.icon} />
                <p className={styles.reporteDeInscripcion}>
                  Reporte de facturación
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container4}>
        <div className={styles.container2}>
          <img src="../image/mikpy9g4-j2y140c.svg" className={styles.icon2} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.button9}>
            <img src="../image/mikpy9g4-nso64fi.svg" className={styles.icon} />
            <p className={styles.reporteDeInscripcion}>Administrador Demo</p>
          </div>
          <div className={styles.button10}>
            <img src="../image/mikpy9g4-2xm36x6.svg" className={styles.icon3} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button11}>
          <img src="../image/mikpy9g4-9781vru.svg" className={styles.icon3} />
        </div>
      </div>
    </div>
  );
}

export default Component;
