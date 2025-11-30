import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.adminDashboard3}>
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
          <div className={styles.primitiveButton}>
            <p className={styles.cursos}>Cursos</p>
          </div>
          <p className={styles.resumen}>Profesores</p>
          <p className={styles.resumen}>Estudiantes</p>
          <p className={styles.resumen}>Recursos</p>
          <p className={styles.resumen}>Reportes</p>
          <div className={styles.primitiveButton2}>
            <p className={styles.cursos}>Configuración</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <p className={styles.gestiNDeCursos}>Gestión de Cursos</p>
            </div>
            <div className={styles.button}>
              <img src="../image/mikpwp0b-exc9we7.svg" className={styles.icon} />
              <p className={styles.nuevoCurso}>Nuevo Curso</p>
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.tableRow}>
                <p className={styles.nombre}>Nombre</p>
                <p className={styles.nivel}>Nivel</p>
                <p className={styles.profesor}>Profesor</p>
                <p className={styles.estudiantes}>Estudiantes</p>
                <p className={styles.estado}>Estado</p>
                <p className={styles.acciones}>Acciones</p>
              </div>
            </div>
            <div className={styles.tableBody}>
              <div className={styles.tableRow2}>
                <p className={styles.pianoBSico}>Piano Básico</p>
                <div className={styles.tableCell}>
                  <div className={styles.badge}>
                    <p className={styles.bSico}>Básico</p>
                  </div>
                </div>
                <p className={styles.marAGonzLez}>María González</p>
                <p className={styles.a1212}>12/12</p>
                <div className={styles.tableCell2}>
                  <div className={styles.badge2}>
                    <p className={styles.lleno}>Lleno</p>
                  </div>
                </div>
                <div className={styles.adminDashboard}>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-3wa42oi.svg"
                      className={styles.icon2}
                    />
                  </div>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-5b7837r.svg"
                      className={styles.icon2}
                    />
                  </div>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-6dwn0np.svg"
                      className={styles.icon2}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.tableRow3}>
                <p className={styles.pianoBSico}>Guitarra Intermedia</p>
                <div className={styles.tableCell3}>
                  <div className={styles.badge3}>
                    <p className={styles.intermedio}>Intermedio</p>
                  </div>
                </div>
                <p className={styles.marAGonzLez}>Carlos Ramírez</p>
                <p className={styles.a1212}>7/10</p>
                <div className={styles.tableCell4}>
                  <div className={styles.badge4}>
                    <p className={styles.lleno}>Activo</p>
                  </div>
                </div>
                <div className={styles.adminDashboard}>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-3wa42oi.svg"
                      className={styles.icon2}
                    />
                  </div>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-5b7837r.svg"
                      className={styles.icon2}
                    />
                  </div>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-6dwn0np.svg"
                      className={styles.icon2}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.tableRow4}>
                <p className={styles.pianoBSico}>Violín Avanzado</p>
                <div className={styles.tableCell5}>
                  <div className={styles.badge5}>
                    <p className={styles.bSico}>Avanzado</p>
                  </div>
                </div>
                <p className={styles.marAGonzLez}>Ana Martínez</p>
                <p className={styles.a1212}>0/8</p>
                <div className={styles.tableCell6}>
                  <div className={styles.badge6}>
                    <p className={styles.bSico}>Inactivo</p>
                  </div>
                </div>
                <div className={styles.adminDashboard}>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-3wa42oi.svg"
                      className={styles.icon2}
                    />
                  </div>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-5b7837r.svg"
                      className={styles.icon2}
                    />
                  </div>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-6dwn0np.svg"
                      className={styles.icon2}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.tableRow5}>
                <p className={styles.baterAbSico}>Batería Básico</p>
                <div className={styles.tableCell7}>
                  <div className={styles.badge}>
                    <p className={styles.bSico}>Básico</p>
                  </div>
                </div>
                <p className={styles.luisHernNdez}>Luis Hernández</p>
                <p className={styles.a810}>8/10</p>
                <div className={styles.tableCell8}>
                  <div className={styles.badge4}>
                    <p className={styles.lleno}>Activo</p>
                  </div>
                </div>
                <div className={styles.adminDashboard2}>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-3wa42oi.svg"
                      className={styles.icon2}
                    />
                  </div>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-5b7837r.svg"
                      className={styles.icon2}
                    />
                  </div>
                  <div className={styles.button2}>
                    <img
                      src="../image/mikpwp0b-6dwn0np.svg"
                      className={styles.icon2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container4}>
        <div className={styles.container2}>
          <img src="../image/mikpwp0b-uh5v4pm.svg" className={styles.icon3} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.button3}>
            <img src="../image/mikpwp0b-dn7yflz.svg" className={styles.icon} />
            <p className={styles.administradorDemo}>Administrador Demo</p>
          </div>
          <div className={styles.button4}>
            <img src="../image/mikpwp0b-bd7zl7m.svg" className={styles.icon2} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button5}>
          <img src="../image/mikpwp0b-ghxih2q.svg" className={styles.icon2} />
        </div>
      </div>
    </div>
  );
}

export default Component;
