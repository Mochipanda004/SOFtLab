import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.studentDashboard}>
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
          <p className={styles.resumen}>Evaluaciones</p>
          <div className={styles.primitiveButton}>
            <p className={styles.pagos}>Pagos</p>
          </div>
          <p className={styles.resumen}>Certificados</p>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <p className={styles.historialDePagos}>Historial de Pagos</p>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.tableRow}>
                <p className={styles.fecha}>Fecha</p>
                <p className={styles.curso}>Curso</p>
                <p className={styles.mTodo}>Método</p>
                <p className={styles.iDTransacciN}>ID Transacción</p>
                <p className={styles.monto}>Monto</p>
                <p className={styles.estado}>Estado</p>
                <p className={styles.acciones}>Acciones</p>
              </div>
            </div>
            <div className={styles.tableRow2}>
              <p className={styles.a30DeSeptDe2025}>30 de sept de 2025</p>
              <p className={styles.pianoBSico}>Piano Básico</p>
              <p className={styles.pSe}>PSE</p>
              <p className={styles.pSe2025Abc123Xyz}>PSE-2025-ABC123XYZ</p>
              <div className={styles.tableCell}>
                <p className={styles.a450000Cop}>$450.000 COP</p>
              </div>
              <div className={styles.tableCell2}>
                <div className={styles.badge}>
                  <p className={styles.confirmado}>Confirmado</p>
                </div>
              </div>
              <div className={styles.paymentTable}>
                <div className={styles.button}>
                  <img
                    src="../image/mip5ty7n-5tjdk5d.svg"
                    className={styles.icon}
                  />
                  <p className={styles.ver}>Ver</p>
                </div>
                <div className={styles.button2}>
                  <img
                    src="../image/mip5ty7o-op7lekr.svg"
                    className={styles.icon}
                  />
                  <p className={styles.ver}>Factura</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container4}>
        <div className={styles.container2}>
          <img src="../image/mip5ty7o-valdj8q.svg" className={styles.icon2} />
          <div className={styles.text}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.button3}>
            <img src="../image/mip5ty7o-wxhzc3l.svg" className={styles.icon3} />
          </div>
          <div className={styles.button4}>
            <img src="../image/mip5ty7o-141idkn.svg" className={styles.icon3} />
            <p className={styles.estudianteDemo}>Estudiante Demo</p>
          </div>
          <div className={styles.button3}>
            <img src="../image/mip5ty7o-ngs591m.svg" className={styles.icon3} />
          </div>
        </div>
      </div>
      <div className={styles.chatbotWidget}>
        <div className={styles.text2}>
          <p className={styles.aTienesDudas}>¿Tienes dudas?</p>
        </div>
        <div className={styles.button5}>
          <img src="../image/mip5ty7o-4b544n6.svg" className={styles.icon3} />
        </div>
      </div>
    </div>
  );
}

export default Component;
