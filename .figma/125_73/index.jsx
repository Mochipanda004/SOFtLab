import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.register7}>
      <div className={styles.container6}>
        <div className={styles.container2}>
          <div className={styles.container}>
            <img src="../image/mim218p7-egn3uyy.svg" className={styles.icon} />
          </div>
          <div className={styles.heading1}>
            <p className={styles.academiaDeMSica}>Academia de Música</p>
          </div>
          <div className={styles.heading2}>
            <p className={styles.melodyLabs}>Melody Labs</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.register}>
            <p className={styles.crearCuenta}>Crear Cuenta</p>
          </div>
          <div className={styles.button}>
            <img src="../image/mim218p7-9n6vowz.svg" className={styles.register2} />
            <div className={styles.register3}>
              <p className={styles.registrarseConGoogle}>Registrarse con Google</p>
            </div>
          </div>
          <div className={styles.register4}>
            <div className={styles.container3} />
            <div className={styles.text}>
              <p className={styles.oRegStrateConEmail}>O regístrate con email</p>
            </div>
          </div>
          <div className={styles.register5}>
            <div className={styles.container4}>
              <p className={styles.nombreCompleto}>Nombre Completo</p>
              <div className={styles.input}>
                <p className={styles.juanPRez}>Juan Pérez</p>
              </div>
            </div>
            <div className={styles.container4}>
              <p className={styles.nombreCompleto}>Correo Electrónico</p>
              <div className={styles.input}>
                <p className={styles.juanPRez}>tu@email.com</p>
              </div>
            </div>
            <div className={styles.container5}>
              <p className={styles.nombreCompleto}>Tipo de Usuario</p>
              <div className={styles.primitiveButton}>
                <div className={styles.primitiveSpan}>
                  <p className={styles.oRegStrateConEmail}>Selecciona tu rol</p>
                </div>
                <img
                  src="../image/mim218p7-14vn0af.svg"
                  className={styles.register2}
                />
              </div>
            </div>
            <div className={styles.container4}>
              <p className={styles.nombreCompleto}>Contraseña</p>
              <div className={styles.input}>
                <p className={styles.juanPRez}>Mínimo 6 caracteres</p>
              </div>
            </div>
            <div className={styles.container4}>
              <p className={styles.nombreCompleto}>Confirmar Contraseña</p>
              <div className={styles.input}>
                <p className={styles.juanPRez}>Repite tu contraseña</p>
              </div>
            </div>
            <div className={styles.button2}>
              <p className={styles.crearCuenta2}>Crear Cuenta</p>
            </div>
          </div>
          <div className={styles.register6}>
            <p className={styles.aYaTienesUnaCuenta}>¿Ya tienes una cuenta?</p>
            <div className={styles.button3}>
              <p className={styles.academiaDeMSica}>Inicia sesión aquí</p>
            </div>
          </div>
        </div>
        <div className={styles.paragraph}>
          <p className={styles.alRegistrarteAceptas}>
            Al registrarte, aceptas nuestros Términos de Servicio y Política de
            Privacidad
          </p>
        </div>
      </div>
      <div className={styles.button4}>
        <img src="../image/mim218p7-elgd6pt.svg" className={styles.icon2} />
      </div>
      <div className={styles.backButton}>
        <p className={styles.volver}>Volver</p>
      </div>
    </div>
  );
}

export default Component;
