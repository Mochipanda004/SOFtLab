import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.adminDashboard}>
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
          <div className={styles.primitiveButton}>
            <p className={styles.recursos}>Recursos</p>
          </div>
          <p className={styles.resumen}>Reportes</p>
          <div className={styles.primitiveButton2}>
            <p className={styles.recursos}>Configuración</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <p className={styles.gestiNDeRecursos}>Gestión de Recursos</p>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.tableRow}>
                <p className={styles.tipo}>Tipo</p>
                <p className={styles.nombre}>Nombre</p>
                <p className={styles.estado}>Estado</p>
                <p className={styles.ocupadoPor}>Ocupado por</p>
                <p className={styles.acciones}>Acciones</p>
              </div>
            </div>
            <div className={styles.tableBody}>
              <div className={styles.tableRow2}>
                <div className={styles.tableCell}>
                  <div className={styles.badge}>
                    <p className={styles.sala}>Sala</p>
                  </div>
                </div>
                <p className={styles.sala101}>Sala 101</p>
                <div className={styles.tableCell2}>
                  <div className={styles.badge2}>
                    <p className={styles.ocupado}>Ocupado</p>
                  </div>
                </div>
                <p className={styles.pianoBSico}>Piano Básico</p>
                <div className={styles.button}>
                  <img
                    src="../image/mikpy4uc-kik9skd.svg"
                    className={styles.icon}
                  />
                </div>
              </div>
              <div className={styles.tableRow3}>
                <div className={styles.tableCell}>
                  <div className={styles.badge}>
                    <p className={styles.sala}>Sala</p>
                  </div>
                </div>
                <p className={styles.sala101}>Sala 102</p>
                <div className={styles.tableCell3}>
                  <div className={styles.badge3}>
                    <p className={styles.ocupado}>Disponible</p>
                  </div>
                </div>
                <p className={styles.pianoBSico}>-</p>
                <div className={styles.button}>
                  <img
                    src="../image/mikpy4uc-kik9skd.svg"
                    className={styles.icon}
                  />
                </div>
              </div>
              <div className={styles.tableRow2}>
                <div className={styles.tableCell}>
                  <div className={styles.badge}>
                    <p className={styles.sala}>Sala</p>
                  </div>
                </div>
                <p className={styles.sala101}>Sala 103</p>
                <div className={styles.tableCell2}>
                  <div className={styles.badge2}>
                    <p className={styles.ocupado}>Ocupado</p>
                  </div>
                </div>
                <p className={styles.pianoBSico}>Guitarra Intermedia</p>
                <div className={styles.button}>
                  <img
                    src="../image/mikpy4uc-kik9skd.svg"
                    className={styles.icon}
                  />
                </div>
              </div>
              <div className={styles.tableRow4}>
                <div className={styles.tableCell4}>
                  <div className={styles.badge4}>
                    <p className={styles.sala}>Instrumento</p>
                  </div>
                </div>
                <p className={styles.pianoDeColaYamaha}>Piano de Cola Yamaha</p>
                <div className={styles.tableCell5}>
                  <div className={styles.badge3}>
                    <p className={styles.ocupado}>Disponible</p>
                  </div>
                </div>
                <p className={styles.a}>-</p>
                <div className={styles.button2}>
                  <img
                    src="../image/mikpy4uc-kik9skd.svg"
                    className={styles.icon}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container4}>
        <div className={styles.container2}>
          <img src="../image/mikpy4uc-xhvag3v.svg" className={styles.icon2} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.button3}>
            <img src="../image/mikpy4uc-fwhne0y.svg" className={styles.icon3} />
            <p className={styles.administradorDemo}>Administrador Demo</p>
          </div>
          <div className={styles.button4}>
            <img src="../image/mikpy4ud-bxuv9jg.svg" className={styles.icon4} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button5}>
          <img src="../image/mikpy4ud-6oygpt7.svg" className={styles.icon4} />
        </div>
      </div>
    </div>
  );
}

export default Component;
