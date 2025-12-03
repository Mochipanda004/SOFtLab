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
          <div className={styles.primitiveButton}>
            <p className={styles.materiales}>Materiales</p>
          </div>
          <p className={styles.resumen}>Evaluaciones</p>
          <p className={styles.resumen}>Pagos</p>
          <p className={styles.resumen}>Certificados</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <p className={styles.materialesDelCurso}>Materiales del Curso</p>
          </div>
          <div className={styles.studentDashboard}>
            <div className={styles.container4}>
              <div className={styles.container3}>
                <img src="../image/mip5pv26-g32tm20.svg" className={styles.icon} />
                <div className={styles.container2}>
                  <div className={styles.paragraph2}>
                    <p className={styles.miDashboard}>
                      Escalas Mayores - Ejercicios
                    </p>
                  </div>
                  <div className={styles.paragraph3}>
                    <p className={styles.pDf24Mb14102025}>
                      PDF • 2.4 MB • 14/10/2025
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.button}>
                <img src="../image/mip5pv26-b5snw6d.svg" className={styles.icon2} />
                <p className={styles.descargar}>Descargar</p>
              </div>
            </div>
            <div className={styles.container7}>
              <div className={styles.container6}>
                <img src="../image/mip5pv26-fzmi654.svg" className={styles.icon} />
                <div className={styles.container5}>
                  <div className={styles.paragraph4}>
                    <p className={styles.miDashboard}>
                      Técnica de Dedos - Video Tutorial
                    </p>
                  </div>
                  <div className={styles.paragraph5}>
                    <p className={styles.pDf24Mb14102025}>
                      Video • 45 MB • 9/10/2025
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.button}>
                <img src="../image/mip5pv26-b5snw6d.svg" className={styles.icon2} />
                <p className={styles.descargar}>Descargar</p>
              </div>
            </div>
            <div className={styles.container10}>
              <div className={styles.container9}>
                <img src="../image/mip5pv26-g32tm20.svg" className={styles.icon} />
                <div className={styles.container8}>
                  <div className={styles.paragraph6}>
                    <p className={styles.miDashboard}>Partituras Nivel 1</p>
                  </div>
                  <div className={styles.paragraph7}>
                    <p className={styles.pDf51Mb4102025}>
                      PDF • 5.1 MB • 4/10/2025
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.button}>
                <img src="../image/mip5pv26-b5snw6d.svg" className={styles.icon2} />
                <p className={styles.descargar}>Descargar</p>
              </div>
            </div>
            <div className={styles.container13}>
              <div className={styles.container12}>
                <img src="../image/mip5pv26-g32tm20.svg" className={styles.icon} />
                <div className={styles.container11}>
                  <div className={styles.paragraph8}>
                    <p className={styles.miDashboard}>Teoría Musical Básica</p>
                  </div>
                  <div className={styles.paragraph7}>
                    <p className={styles.pDf51Mb4102025}>
                      PDF • 3.2 MB • 30/9/2025
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.button}>
                <img src="../image/mip5pv26-b5snw6d.svg" className={styles.icon2} />
                <p className={styles.descargar}>Descargar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container16}>
        <div className={styles.container14}>
          <img src="../image/mip5pv26-lf5vrcu.svg" className={styles.icon} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container15}>
          <div className={styles.button2}>
            <img src="../image/mip5pv26-bi5xx78.svg" className={styles.icon3} />
          </div>
          <div className={styles.button3}>
            <img src="../image/mip5pv26-0q48koc.svg" className={styles.icon3} />
            <p className={styles.estudianteDemo}>Estudiante Demo</p>
          </div>
          <div className={styles.button2}>
            <img src="../image/mip5pv26-do26zvn.svg" className={styles.icon3} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button4}>
          <img src="../image/mip5pv26-2yk1gjv.svg" className={styles.icon3} />
        </div>
      </div>
    </div>
  );
}

export default Component;
