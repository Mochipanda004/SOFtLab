import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.login6}>
      <div className={styles.container6}>
        <div className={styles.container2}>
          <div className={styles.container}>
            <img src="../image/mim1lh1j-djbafgs.svg" className={styles.icon} />
          </div>
          <div className={styles.heading1}>
            <p className={styles.academiaDeMSica}>Academia de Música</p>
          </div>
          <div className={styles.heading2}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.login}>
            <p className={styles.iniciarSesiN}>Iniciar Sesión</p>
          </div>
          <div className={styles.login2}>
            <div className={styles.container3}>
              <p className={styles.correoElectrNico}>Correo Electrónico</p>
              <div className={styles.input}>
                <p className={styles.tuEmailCom}>tu@email.com</p>
              </div>
            </div>
            <div className={styles.container4}>
              <p className={styles.correoElectrNico}>Contraseña</p>
              <div className={styles.input}>
                <p className={styles.tuEmailCom}>••••••••</p>
              </div>
            </div>
            <div className={styles.button}>
              <p className={styles.aOlvidasteTuContrase}>
                ¿Olvidaste tu contraseña?
              </p>
            </div>
            <div className={styles.button2}>
              <p className={styles.iniciarSesiN2}>Iniciar Sesión</p>
            </div>
          </div>
          <div className={styles.login3}>
            <div className={styles.container5} />
            <div className={styles.text}>
              <p className={styles.oContinACon}>O continúa con</p>
            </div>
          </div>
          <div className={styles.button3}>
            <img src="../image/mim1lh1j-rhrkwlg.svg" className={styles.login4} />
            <p className={styles.continuarConGoogle}>Continuar con Google</p>
          </div>
          <div className={styles.login5}>
            <p className={styles.aNoTienesUnaCuenta}>¿No tienes una cuenta?</p>
            <div className={styles.button4}>
              <p className={styles.regStrateAqu}>Regístrate aquí</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button5}>
        <img src="../image/mim1lh1j-1jqgcjy.svg" className={styles.icon2} />
      </div>
      <div className={styles.backButton}>
        <p className={styles.volver}>Volver</p>
      </div>
    </div>
  );
}

export default Component;
