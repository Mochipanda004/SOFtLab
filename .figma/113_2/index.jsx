import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.adminDashboard8}>
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
          <div className={styles.primitiveButton}>
            <p className={styles.resumen}>Resumen</p>
          </div>
          <p className={styles.cursos}>Cursos</p>
          <p className={styles.cursos}>Profesores</p>
          <p className={styles.cursos}>Estudiantes</p>
          <p className={styles.cursos}>Recursos</p>
          <p className={styles.cursos}>Reportes</p>
          <div className={styles.primitiveButton2}>
            <p className={styles.resumen}>Configuración</p>
          </div>
        </div>
        <div className={styles.tabPanel}>
          <div className={styles.adminDashboard5}>
            <div className={styles.adminDashboard}>
              <div className={styles.container2}>
                <div className={styles.paragraph2}>
                  <p className={styles.totalEstudiantes}>Total Estudiantes</p>
                </div>
                <p className={styles.a127}>127</p>
                <p className={styles.a12EsteMes}>+12 este mes</p>
              </div>
              <div className={styles.container3}>
                <img src="../image/mikpwe1h-aci64j0.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.adminDashboard2}>
              <div className={styles.container4}>
                <div className={styles.paragraph2}>
                  <p className={styles.totalEstudiantes}>Cursos Activos</p>
                </div>
                <p className={styles.a18}>18</p>
                <p className={styles.a3Inactivos}>3 inactivos</p>
              </div>
              <div className={styles.container5}>
                <img src="../image/mikpwe1h-jtki243.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.adminDashboard3}>
              <div className={styles.container6}>
                <div className={styles.paragraph2}>
                  <p className={styles.totalEstudiantes}>Ingresos del Mes</p>
                </div>
                <p className={styles.a452M}>$45.2M</p>
                <p className={styles.a85}>+8.5%</p>
              </div>
              <div className={styles.container7}>
                <img src="../image/mikpwe1h-45i1ba6.svg" className={styles.icon} />
              </div>
            </div>
            <div className={styles.adminDashboard4}>
              <div className={styles.container8}>
                <div className={styles.paragraph2}>
                  <p className={styles.totalEstudiantes}>Tasa de Ocupación</p>
                </div>
                <p className={styles.a78}>78%</p>
                <p className={styles.deCapacidadTotal}>De capacidad total</p>
              </div>
              <div className={styles.container9}>
                <img src="../image/mikpwe1h-vp6c337.svg" className={styles.icon} />
              </div>
            </div>
          </div>
          <div className={styles.adminDashboard7}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                <p className={styles.cursosRecientes}>Cursos Recientes</p>
              </div>
              <div className={styles.adminDashboard6}>
                <div className={styles.container11}>
                  <div className={styles.container10}>
                    <div className={styles.paragraph3}>
                      <p className={styles.pianoBSico}>Piano Básico</p>
                    </div>
                    <div className={styles.paragraph4}>
                      <p className={styles.profMarAGonzLez1212E}>
                        Prof. María González • 12/12 estudiantes
                      </p>
                    </div>
                  </div>
                  <div className={styles.badge}>
                    <p className={styles.lleno}>Lleno</p>
                  </div>
                </div>
                <div className={styles.container13}>
                  <div className={styles.container12}>
                    <div className={styles.paragraph5}>
                      <p className={styles.pianoBSico}>Guitarra Intermedia</p>
                    </div>
                    <div className={styles.paragraph6}>
                      <p className={styles.profCarlosRamRez710E}>
                        Prof. Carlos Ramírez • 7/10 estudiantes
                      </p>
                    </div>
                  </div>
                  <div className={styles.badge2}>
                    <p className={styles.lleno}>Activo</p>
                  </div>
                </div>
                <div className={styles.container15}>
                  <div className={styles.container14}>
                    <div className={styles.paragraph7}>
                      <p className={styles.pianoBSico}>Violín Avanzado</p>
                    </div>
                    <div className={styles.paragraph8}>
                      <p className={styles.profAnaMartNez08Estu}>
                        Prof. Ana Martínez • 0/8 estudiantes
                      </p>
                    </div>
                  </div>
                  <div className={styles.badge3}>
                    <p className={styles.inactivo}>Inactivo</p>
                  </div>
                </div>
                <div className={styles.container17}>
                  <div className={styles.container16}>
                    <div className={styles.paragraph9}>
                      <p className={styles.pianoBSico}>Batería Básico</p>
                    </div>
                    <div className={styles.paragraph10}>
                      <p className={styles.profLuisHernNdez810E}>
                        Prof. Luis Hernández • 8/10 estudiantes
                      </p>
                    </div>
                  </div>
                  <div className={styles.badge2}>
                    <p className={styles.lleno}>Activo</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card2}>
              <div className={styles.cardTitle2}>
                <p className={styles.cursosRecientes}>Alertas del Sistema</p>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.alert}>
                  <img
                    src="../image/mikpwe1h-vn6ylb5.svg"
                    className={styles.icon2}
                  />
                  <p className={styles.a2CursosAlcanzaronSu}>
                    2 cursos alcanzaron su capacidad máxima
                  </p>
                </div>
                <div className={styles.alert2}>
                  <img
                    src="../image/mikpwe1h-rh1bhv0.svg"
                    className={styles.icon2}
                  />
                  <p className={styles.a5NuevasSolicitudesD}>
                    5 nuevas solicitudes de inscripción pendientes
                  </p>
                </div>
                <div className={styles.alert2}>
                  <img
                    src="../image/mikpwe1h-ad439fy.svg"
                    className={styles.icon2}
                  />
                  <p className={styles.a5NuevasSolicitudesD}>
                    Reporte financiero mensual disponible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container20}>
        <div className={styles.container18}>
          <img src="../image/mikpwe1h-7uwcs6h.svg" className={styles.icon3} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container19}>
          <div className={styles.button}>
            <img src="../image/mikpwe1h-f14zwf5.svg" className={styles.icon4} />
            <p className={styles.administradorDemo}>Administrador Demo</p>
          </div>
          <div className={styles.button2}>
            <img src="../image/mikpwe1i-9kt5pss.svg" className={styles.icon5} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button3}>
          <img src="../image/mikpwe1i-p6bgd7b.svg" className={styles.icon5} />
        </div>
      </div>
    </div>
  );
}

export default Component;
