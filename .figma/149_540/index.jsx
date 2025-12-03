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
          <div className={styles.primitiveButton}>
            <p className={styles.evaluaciones}>Evaluaciones</p>
          </div>
          <p className={styles.resumen}>Pagos</p>
          <p className={styles.resumen}>Certificados</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <p className={styles.evaluaciones2}>Evaluaciones</p>
          </div>
          <div className={styles.studentDashboard}>
            <div className={styles.container5}>
              <div className={styles.container4}>
                <div className={styles.container3}>
                  <div className={styles.heading3}>
                    <p className={styles.miDashboard}>Quiz - Teoría Musical 1</p>
                  </div>
                  <div className={styles.container2}>
                    <div className={styles.badge}>
                      <p className={styles.teRica}>Teórica</p>
                    </div>
                    <div className={styles.text}>
                      <p className={styles.fechaLMite24102025}>
                        Fecha límite: 24/10/2025
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.badge2}>
                  <p className={styles.pendiente}>Pendiente</p>
                </div>
              </div>
              <div className={styles.button}>
                <p className={styles.realizarEvaluaciN}>Realizar evaluación</p>
              </div>
            </div>
            <div className={styles.container9}>
              <div className={styles.container8}>
                <div className={styles.container7}>
                  <div className={styles.heading32}>
                    <p className={styles.miDashboard}>
                      Evaluación Práctica - Escalas
                    </p>
                  </div>
                  <div className={styles.container6}>
                    <div className={styles.badge3}>
                      <p className={styles.teRica}>Práctica</p>
                    </div>
                    <div className={styles.text}>
                      <p className={styles.fechaLMite24102025}>
                        Fecha límite: 31/10/2025
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.badge2}>
                  <p className={styles.pendiente}>Pendiente</p>
                </div>
              </div>
              <div className={styles.button}>
                <p className={styles.realizarEvaluaciN}>Realizar evaluación</p>
              </div>
            </div>
            <div className={styles.container13}>
              <div className={styles.container12}>
                <div className={styles.container11}>
                  <div className={styles.heading33}>
                    <p className={styles.miDashboard}>
                      Quiz - Lectura de Partituras
                    </p>
                  </div>
                  <div className={styles.container10}>
                    <div className={styles.badge}>
                      <p className={styles.teRica}>Teórica</p>
                    </div>
                    <div className={styles.text}>
                      <p className={styles.fechaLMite24102025}>
                        Fecha límite: 17/10/2025
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.badge4}>
                  <p className={styles.pendiente}>Completada • 85%</p>
                </div>
              </div>
              <div className={styles.button2}>
                <p className={styles.verResultados}>Ver resultados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container16}>
        <div className={styles.container14}>
          <img src="../image/mip5sa40-6bon1do.svg" className={styles.icon} />
          <div className={styles.text2}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container15}>
          <div className={styles.button3}>
            <img src="../image/mip5sa40-vk45k47.svg" className={styles.icon2} />
          </div>
          <div className={styles.button4}>
            <img src="../image/mip5sa40-8hw60xj.svg" className={styles.icon2} />
            <p className={styles.estudianteDemo}>Estudiante Demo</p>
          </div>
          <div className={styles.button3}>
            <img src="../image/mip5sa40-tabbi0a.svg" className={styles.icon2} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text3}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button5}>
          <img src="../image/mip5sa40-zsb5wgq.svg" className={styles.icon2} />
        </div>
      </div>
    </div>
  );
}

export default Component;
