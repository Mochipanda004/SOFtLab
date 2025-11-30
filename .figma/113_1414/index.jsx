import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.adminDashboard4}>
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
          <p className={styles.resumen}>Reportes</p>
          <div className={styles.primitiveButton}>
            <p className={styles.configuraciN}>Configuración</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <p className={styles.configuraciNDeReserv}>
              Configuración de Reserva de Cupos
            </p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.adminDashboard}>
              <p className={styles.duraciNDeReservaTemp}>
                Duración de reserva temporal (minutos)
              </p>
              <div className={styles.primitiveButton2}>
                <p className={styles.a10Minutos}>10 minutos</p>
                <img src="../image/mikpyeea-iehg2lj.svg" className={styles.icon} />
              </div>
              <p className={styles.tiempoQueSeReservaUn}>
                Tiempo que se reserva un cupo mientras el estudiante completa el
                pago
              </p>
            </div>
            <div className={styles.adminDashboard2}>
              <p className={styles.duraciNDeReservaTemp}>
                Mensaje de reserva expirada
              </p>
              <div className={styles.input}>
                <p className={styles.configuraciN}>
                  El tiempo de reserva ha expirado. Por favor, intenta nuevamente.
                </p>
              </div>
            </div>
            <div className={styles.adminDashboard3}>
              <p className={styles.duraciNDeReservaTemp}>
                Habilitar modo de mantenimiento
              </p>
              <p className={styles.desactivarInscripcio}>
                Desactivar inscripciones temporalmente
              </p>
            </div>
            <div className={styles.button}>
              <p className={styles.guardarConfiguraciN}>Guardar configuración</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container4}>
        <div className={styles.container2}>
          <img src="../image/mikpyeea-2jqb4sh.svg" className={styles.icon2} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.button2}>
            <img src="../image/mikpyeea-m899jj3.svg" className={styles.icon3} />
            <p className={styles.administradorDemo}>Administrador Demo</p>
          </div>
          <div className={styles.button3}>
            <img src="../image/mikpyeea-w0xxn09.svg" className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.guardarConfiguraciN}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button4}>
          <img src="../image/mikpyeea-vqc6242.svg" className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default Component;
