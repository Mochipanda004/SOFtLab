import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.studentDashboard12}>
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
      <div className={styles.primitiveDiv5}>
        <div className={styles.tabList}>
          <div className={styles.primitiveButton}>
            <p className={styles.resumen}>Resumen</p>
          </div>
          <p className={styles.horario}>Horario</p>
          <p className={styles.horario}>Materiales</p>
          <p className={styles.horario}>Evaluaciones</p>
          <p className={styles.horario}>Pagos</p>
          <p className={styles.horario}>Certificados</p>
        </div>
        <div className={styles.tabPanel}>
          <div className={styles.studentDashboard5}>
            <div className={styles.studentDashboard}>
              <div className={styles.container2}>
                <p className={styles.cursosActivos}>Cursos activos</p>
                <p className={styles.a1}>1</p>
              </div>
              <div className={styles.container3}>
                <img src="../image/mip56jdw-19ygj16.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.studentDashboard2}>
              <div className={styles.container2}>
                <p className={styles.cursosActivos}>Asistencia</p>
                <p className={styles.a1}>92%</p>
              </div>
              <div className={styles.container4}>
                <img src="../image/mip56jdw-01pxysf.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.studentDashboard3}>
              <div className={styles.container2}>
                <p className={styles.cursosActivos}>Eval. pendientes</p>
                <p className={styles.a1}>2</p>
              </div>
              <div className={styles.container5}>
                <img src="../image/mip56jdw-1blsrh7.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.studentDashboard4}>
              <div className={styles.container2}>
                <p className={styles.cursosActivos}>Progreso general</p>
                <p className={styles.a1}>45%</p>
              </div>
              <div className={styles.container6}>
                <img src="../image/mip56jdx-jj5v0fr.svg" className={styles.icon} />
              </div>
            </div>
          </div>
          <div className={styles.studentDashboard6}>
            <div className={styles.container9}>
              <div className={styles.container7}>
                <img src="../image/mip56jdx-m28lbi6.svg" className={styles.icon2} />
              </div>
              <div className={styles.container8}>
                <div className={styles.heading3}>
                  <p className={styles.miDashboard}>Explora nuestros cursos</p>
                </div>
                <p className={styles.descubreTodosLosCurs}>
                  Descubre todos los cursos disponibles y sus precios
                </p>
              </div>
            </div>
            <div className={styles.button}>
              <p className={styles.verCatLogo}>Ver catálogo</p>
            </div>
          </div>
          <div className={styles.studentDashboard11}>
            <div className={styles.container15}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>
                  <p className={styles.prXimasClases}>Próximas Clases</p>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.studentDashboard7}>
                    <div className={styles.container12}>
                      <div className={styles.container10}>
                        <img
                          src="../image/mip56jdx-93xl2gn.svg"
                          className={styles.icon3}
                        />
                      </div>
                      <div className={styles.container11}>
                        <div className={styles.paragraph2}>
                          <p className={styles.miDashboard}>Piano Básico</p>
                        </div>
                        <div className={styles.paragraph3}>
                          <p className={styles.profMarAGonzLezSala1}>
                            Prof. María González • Sala 101
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.badge}>
                      <p className={styles.lunes1800}>Lunes 18:00</p>
                    </div>
                  </div>
                  <div className={styles.studentDashboard8}>
                    <div className={styles.container14}>
                      <div className={styles.container10}>
                        <img
                          src="../image/mip56jdx-93xl2gn.svg"
                          className={styles.icon3}
                        />
                      </div>
                      <div className={styles.container13}>
                        <div className={styles.paragraph4}>
                          <p className={styles.miDashboard}>Piano Básico</p>
                        </div>
                        <div className={styles.paragraph5}>
                          <p className={styles.profMarAGonzLezSala1}>
                            Prof. María González • Sala 101
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.badge2}>
                      <p className={styles.lunes1800}>Miércoles 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.card2}>
                <div className={styles.cardTitle2}>
                  <p className={styles.prXimasClases}>Notificaciones</p>
                </div>
                <div className={styles.cardContent2}>
                  <div className={styles.alert}>
                    <img
                      src="../image/mip56jdx-z6y2v70.svg"
                      className={styles.icon4}
                    />
                    <div className={styles.alertDescription}>
                      <p className={styles.nuevaEvaluaciNDispon}>
                        Nueva evaluación disponible:
                      </p>
                      <div className={styles.studentDashboard9}>
                        <p className={styles.quizTeorAMusical1}>
                          Quiz - Teoría Musical 1
                        </p>
                      </div>
                      <p className={styles.aFechaLMite25DeOctub}>
                        . Fecha límite: 25 de octubre.
                      </p>
                    </div>
                  </div>
                  <div className={styles.alert2}>
                    <img
                      src="../image/mip56jdx-uhl2zu7.svg"
                      className={styles.icon4}
                    />
                    <div className={styles.alertDescription2}>
                      <p className={styles.nuevaEvaluaciNDispon}>
                        Nuevos materiales disponibles:
                      </p>
                      <div className={styles.studentDashboard10}>
                        <p className={styles.quizTeorAMusical1}>
                          Escalas Mayores - Ejercicios
                        </p>
                      </div>
                      <p className={styles.aFechaLMite25DeOctub}>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card3}>
              <div className={styles.cardTitle3}>
                <p className={styles.prXimasClases}>Mi Progreso</p>
              </div>
              <div className={styles.cardContent3}>
                <div className={styles.radialProgress}>
                  <div className={styles.container16}>
                    <div className={styles.icon5}>
                      <div className={styles.vector} />
                      <div className={styles.vector} />
                    </div>
                    <div className={styles.text}>
                      <p className={styles.a45}>45%</p>
                    </div>
                  </div>
                  <div className={styles.paragraph6}>
                    <p className={styles.progresoGeneral}>Progreso General</p>
                  </div>
                </div>
                <div className={styles.progressWidget}>
                  <div className={styles.progressItem}>
                    <div className={styles.container17}>
                      <p className={styles.asistencia}>Asistencia</p>
                      <div className={styles.text2}>
                        <p className={styles.a92}>92%</p>
                      </div>
                    </div>
                    <div className={styles.primitiveDiv}>
                      <div className={styles.container18} />
                    </div>
                  </div>
                  <div className={styles.progressItem2}>
                    <div className={styles.container19}>
                      <p className={styles.evaluaciones}>Evaluaciones</p>
                      <div className={styles.text2}>
                        <p className={styles.a92}>75%</p>
                      </div>
                    </div>
                    <div className={styles.primitiveDiv2}>
                      <div className={styles.container18} />
                    </div>
                  </div>
                  <div className={styles.progressItem3}>
                    <div className={styles.container20}>
                      <p className={styles.materialesCompletado}>
                        Materiales completados
                      </p>
                      <div className={styles.text2}>
                        <p className={styles.a92}>60%</p>
                      </div>
                    </div>
                    <div className={styles.primitiveDiv3}>
                      <div className={styles.container18} />
                    </div>
                  </div>
                  <div className={styles.progressItem4}>
                    <div className={styles.container21}>
                      <p className={styles.prCticasEntregadas}>
                        Prácticas entregadas
                      </p>
                      <div className={styles.text2}>
                        <p className={styles.a92}>55%</p>
                      </div>
                    </div>
                    <div className={styles.primitiveDiv4}>
                      <div className={styles.container18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container24}>
        <div className={styles.container22}>
          <img src="../image/mip56jdy-gxil6im.svg" className={styles.icon6} />
          <div className={styles.text3}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container23}>
          <div className={styles.button2}>
            <img src="../image/mip56jdx-z6y2v70.svg" className={styles.icon7} />
          </div>
          <div className={styles.button3}>
            <img src="../image/mip56jdy-gsiym06.svg" className={styles.icon7} />
            <p className={styles.estudianteDemo}>Estudiante Demo</p>
          </div>
          <div className={styles.button2}>
            <img src="../image/mip56jdy-fli58o9.svg" className={styles.icon7} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text4}>
          <p className={styles.verCatLogo}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button4}>
          <img src="../image/mip56jdy-tvw5fuj.svg" className={styles.icon7} />
        </div>
      </div>
    </div>
  );
}

export default Component;
