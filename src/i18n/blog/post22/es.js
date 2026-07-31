import React from "react";

export const title = "10 Preguntas de Seguridad para Proveedores EdTech";
export const date = "2026-02-07";
export const slug = "edtech-vendor-security-questions-powerschool";
export const description = "Tras la brecha de PowerSchool que expuso millones de estudiantes, las escuelas deben evaluar proveedores EdTech. 10 preguntas de seguridad.";
export const keywords = "PowerSchool data breach, EdTech security, student data privacy, school vendor questionnaire, FERPA compliance, GDPR education, virtual lab security, EdTech vendor vetting";

export const content = (
  <>
    <figure className="blog-image">
      <img
        src="/images/seccenter.jpg"
        alt="Administrador escolar revisando documentación de seguridad de un proveedor EdTech"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        Las escuelas ahora son legalmente responsables de verificar las prácticas de seguridad de sus proveedores EdTech
      </figcaption>
    </figure>

    <p>
      En diciembre de 2024, PowerSchool sufrió una brecha de datos masiva que expuso la información personal de aproximadamente 62,4 millones de estudiantes y 9,5 millones de educadores en Norteamérica (<a href="https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/" target="_blank" rel="noopener noreferrer">BleepingComputer, 2025</a>). La brecha ocurrió debido a una sola credencial de empleado comprometida y la falta de autenticación multifactor en un portal de soporte crítico (<a href="https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened" target="_blank" rel="noopener noreferrer">TechTarget, 2025</a>). Los reguladores de privacidad han enfatizado desde entonces que las escuelas son responsables de verificar las prácticas de seguridad de sus proveedores.
    </p>
    <p>
      Esto cambia todo sobre cómo las escuelas deben evaluar a los proveedores EdTech. Ya sea que esté considerando un laboratorio de ciencias virtual, un sistema de gestión de aprendizaje o cualquier software que maneje datos de estudiantes, necesita hacer preguntas más difíciles. Aquí hay diez preguntas que toda escuela debe hacer antes de firmar un contrato.
    </p>

    <h2>1. ¿Dónde se almacenan nuestros datos?</h2>
    <p>
      No se trata solo de conocer el país. Necesita detalles específicos:
    </p>
    <ul>
      <li><strong>¿Qué proveedor de nube?</strong> (¿AWS, Google Cloud, Azure o autoalojado?)</li>
      <li><strong>¿Qué región?</strong> (Las escuelas de la UE pueden requerir servidores basados en la UE para el RGPD)</li>
      <li><strong>¿Se transfieren datos internacionalmente alguna vez?</strong></li>
      <li><strong>¿Se almacenan las copias de seguridad en una ubicación diferente?</strong></li>
    </ul>
    <p>
      Un proveedor que no puede responder estas preguntas con precisión probablemente no ha pensado cuidadosamente sobre su arquitectura de datos. La Oficina del Comisionado de Información del Reino Unido requiere específicamente que las organizaciones sepan dónde se procesan los datos personales (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>).
    </p>

    <h2>2. ¿Tienen certificación SOC 2 o ISO 27001?</h2>
    <p>
      SOC 2 (System and Organization Controls) es una auditoría de seguridad realizada por contadores independientes que demuestra que los controles de seguridad de un proveedor realmente funcionan, no solo que existen en papel (<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer">AICPA, 2024</a>). Hay dos tipos:
    </p>
    <ul>
      <li><strong>Tipo I:</strong> Confirma que los controles existen en un momento dado</li>
      <li><strong>Tipo II:</strong> Confirma que los controles funcionaron consistentemente durante 6-12 meses (más riguroso)</li>
    </ul>
    <p>
      ISO 27001 es un equivalente internacional reconocido en más de 160 países (<a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer">ISO, 2022</a>). Si un proveedor no tiene ninguno, pregunte qué validación de terceros tiene. "Nos tomamos la seguridad en serio" no es una certificación.
    </p>

    <h2>3. ¿Quién tiene acceso a los datos de estudiantes?</h2>
    <p>
      La brecha de PowerSchool ocurrió a través de un portal de soporte al cliente que carecía de controles de acceso adecuados. Pregunte a los proveedores:
    </p>
    <ul>
      <li>¿Cuántos empleados pueden acceder a los datos de estudiantes?</li>
      <li>¿Se registra el acceso y es auditable?</li>
      <li>¿El personal de soporte necesita su permiso antes de acceder a sus datos?</li>
      <li>¿Los contratistas y terceros están incluidos en los controles de acceso?</li>
    </ul>
    <p>
      El principio de mínimo privilegio, un requisito central en marcos como el NIST Cybersecurity Framework (<a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST, 2024</a>), significa que los empleados solo deben acceder a los datos mínimos necesarios para su trabajo. Si "todos en soporte" pueden ver registros de estudiantes, es una señal de alerta.
    </p>

    <h2>4. ¿Utilizan autenticación multifactor?</h2>
    <p>
      La brecha de PowerSchool podría haberse prevenido con MFA. Según Microsoft, MFA bloquea el 99,9% de los ataques automatizados (<a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer">Microsoft, 2019</a>). Pregunte específicamente:
    </p>
    <ul>
      <li>¿Es obligatorio el MFA para todas las cuentas de empleados?</li>
      <li>¿Es obligatorio el MFA para portales administrativos?</li>
      <li>¿Está disponible el MFA para cuentas de administradores escolares?</li>
      <li>¿Qué métodos de MFA se admiten? (Basado en aplicación es más fuerte que SMS)</li>
    </ul>
    <p>
      Si un proveedor no aplica MFA internamente, no está siguiendo prácticas básicas de higiene de seguridad en 2026.
    </p>

    <h2>5. ¿Qué servicios de terceros tocan nuestros datos?</h2>
    <p>
      Muchas plataformas EdTech utilizan servicios externos para análisis, seguimiento de errores, funciones de IA o alojamiento. Cada uno es un punto potencial de fuga. Bajo el RGPD, los proveedores deben divulgar todos los subprocesadores que manejan datos personales (<a href="https://www.edpb.europa.eu/" target="_blank" rel="noopener noreferrer">EDPB, 2024</a>). Solicite una lista completa y qué datos recibe cada uno.
    </p>
    <p>
      Tenga cuidado con:
    </p>
    <ul>
      <li><strong>Plataformas de análisis</strong> (Google Analytics, Mixpanel) que pueden rastrear el comportamiento de los estudiantes</li>
      <li><strong>Servicios de IA</strong> que procesan trabajos de estudiantes para calificación o retroalimentación</li>
      <li><strong>Herramientas de soporte al cliente</strong> que pueden almacenar registros de conversaciones</li>
      <li><strong>Seguimiento de errores</strong> que podría capturar datos sensibles en informes de fallos</li>
    </ul>
    <p>
      Un proveedor con "sin análisis de terceros en aplicaciones orientadas a estudiantes" está haciendo un compromiso significativo.
    </p>

    <h2>6. ¿Cuál es su política de datos de IA?</h2>
    <p>
      Con EdTech impulsado por IA cada vez más común, entender cómo los proveedores manejan la IA y los datos de estudiantes es crucial. La investigación del Future of Privacy Forum sobre gobernanza de IA proporciona marcos útiles para evaluar estas políticas (<a href="https://fpf.org/issue/ai-ml/" target="_blank" rel="noopener noreferrer">FPF, 2024</a>). Pregunte sobre:
    </p>
    <ul>
      <li><strong>¿Utilizan datos de estudiantes para entrenar modelos de IA?</strong> Si es así, ¿es opt-in u opt-out?</li>
      <li><strong>¿Pueden las escuelas elegir si participan?</strong></li>
      <li><strong>¿El procesamiento de IA se realiza en su infraestructura o se envía a terceros?</strong></li>
      <li><strong>¿Qué sucede con el trabajo de los estudiantes después de procesarlo?</strong></li>
    </ul>
    <p>
      La clave es la transparencia. Un proveedor debe explicar claramente su enfoque y dar a las escuelas un control significativo sobre cómo se utilizan los datos de estudiantes para propósitos de IA.
    </p>

    <h2>7. ¿Cuál es su política de retención de datos?</h2>
    <p>
      Los datos que no existen no pueden ser robados. El principio de minimización de datos del RGPD requiere que las organizaciones conserven datos personales solo el tiempo necesario (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>). Pregunte:
    </p>
    <ul>
      <li>¿Cuánto tiempo se conservan los datos de estudiantes después de que abandonan la plataforma?</li>
      <li>¿Pueden las escuelas solicitar la eliminación anticipada?</li>
      <li>¿Qué sucede con los datos si cancelamos nuestra suscripción?</li>
      <li>¿Se eliminan también las copias de seguridad o persisten?</li>
    </ul>
    <p>
      Un proveedor que mantiene datos de estudiantes indefinidamente "por si acaso" es un riesgo.
    </p>

    <h2>8. ¿Qué sucede si hay una brecha?</h2>
    <p>
      Todo proveedor debe tener un plan de respuesta a incidentes. El RGPD requiere notificación dentro de 72 horas (<a href="https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>). Pregunte:
    </p>
    <ul>
      <li>¿Con qué rapidez nos notificarán de una brecha?</li>
      <li>¿Qué información incluirá la notificación?</li>
      <li>¿Tienen seguro de ciberseguridad?</li>
      <li>¿Proporcionarán monitoreo de crédito para estudiantes afectados?</li>
    </ul>
    <p>
      PowerSchool tardó semanas en revelar completamente el alcance de su brecha, y algunas escuelas informaron que se enteraron por medios de comunicación en lugar de notificaciones oficiales. Los compromisos contractuales claros sobre los plazos de notificación son importantes.
    </p>

    <h2>9. ¿Podemos obtener un Acuerdo de Procesamiento de Datos?</h2>
    <p>
      Un Acuerdo de Procesamiento de Datos (DPA) es un contrato legal requerido bajo el Artículo 28 del RGPD que define cómo un proveedor maneja sus datos (<a href="https://gdpr.eu/what-is-data-processing-agreement/" target="_blank" rel="noopener noreferrer">GDPR.eu, 2024</a>). Debe especificar:
    </p>
    <ul>
      <li>Qué datos se recopilan y por qué</li>
      <li>Cómo se protegen los datos</li>
      <li>Listas de subprocesadores</li>
      <li>Procedimientos de notificación de brechas</li>
      <li>Eliminación de datos al terminar</li>
    </ul>
    <p>
      Si un proveedor no puede proporcionar un DPA, probablemente no está listo para trabajar con escuelas que toman el cumplimiento en serio.
    </p>

    <h2>10. ¿Cómo protegen los datos de nuestra escuela?</h2>
    <p>
      Entender cómo se protegen sus datos de otras escuelas en la misma plataforma es importante. El NIST Cybersecurity Framework recomienda enfoques de defensa en profundidad. Pregunte sobre:
    </p>
    <ul>
      <li><strong>Cifrado:</strong> ¿Los datos de su escuela están cifrados con claves específicas para su organización?</li>
      <li><strong>Controles de acceso:</strong> ¿Qué impide que usuarios de una escuela accedan a datos de otra escuela?</li>
      <li><strong>Registro de auditoría:</strong> ¿Se registran y monitorean todos los intentos de acceso a datos?</li>
      <li><strong>Pruebas de penetración:</strong> ¿Una firma de seguridad independiente ha probado la plataforma?</li>
    </ul>
    <p>
      Busque proveedores que puedan explicar específicamente cómo aíslan y protegen sus datos, ya sea mediante cifrado, controles de acceso o diseño arquitectónico.
    </p>

    <h2>La nueva realidad para las escuelas</h2>
    <p>
      La brecha de PowerSchool ha cambiado el panorama regulatorio. Los comisionados de privacidad han dejado claro que las escuelas no pueden simplemente confiar en los proveedores; deben verificar. Esto significa que estas diez preguntas no son solo buenas prácticas. Se están convirtiendo en un requisito legal.
    </p>
    <p>
      Documente las respuestas que reciba. Incluya requisitos de seguridad en sus contratos. Y no tenga miedo de alejarse de proveedores que no pueden proporcionar respuestas claras.
    </p>
    <p>
      En WhimsyLabs, creemos que la transparencia genera confianza. Estamos encantados de responder las diez preguntas para cualquier escuela que considere nuestros laboratorios de ciencias virtuales. <a href="/contact">Contáctenos</a> y le enviaremos nuestra documentación de seguridad completa.
    </p>

    <div className="references-section">
      <h3>Referencias</h3>
      <ul className="references-list">
        <li key="ref-1">
          AICPA. (2024). SOC 2 - SOC for Service Organizations: Trust Services Criteria.
          <em> American Institute of Certified Public Accountants</em>.
          <a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer"> https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2</a>
        </li>
        <li key="ref-2">
          BleepingComputer. (2025, January 22). PowerSchool hacker claims they stole data of 62 million students.
          <em> BleepingComputer</em>.
          <a href="https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/" target="_blank" rel="noopener noreferrer"> https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/</a>
        </li>
        <li key="ref-3">
          European Data Protection Board. (2024). Guidelines on the concepts of controller and processor.
          <em> EDPB</em>.
          <a href="https://www.edpb.europa.eu/" target="_blank" rel="noopener noreferrer"> https://www.edpb.europa.eu/</a>
        </li>
        <li key="ref-4">
          Future of Privacy Forum. (2024). Center for Artificial Intelligence.
          <em> FPF</em>.
          <a href="https://fpf.org/issue/ai-ml/" target="_blank" rel="noopener noreferrer"> https://fpf.org/issue/ai-ml/</a>
        </li>
        <li key="ref-5">
          GDPR.eu. (2024). What is a Data Processing Agreement?
          <em> GDPR.eu</em>.
          <a href="https://gdpr.eu/what-is-data-processing-agreement/" target="_blank" rel="noopener noreferrer"> https://gdpr.eu/what-is-data-processing-agreement/</a>
        </li>
        <li key="ref-6">
          Information Commissioner's Office. (2024). International transfers of personal data.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/</a>
        </li>
        <li key="ref-7">
          Information Commissioner's Office. (2024). Personal data breaches.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/</a>
        </li>
        <li key="ref-8">
          Information Commissioner's Office. (2024). Guide to the UK GDPR.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/</a>
        </li>
        <li key="ref-9">
          ISO. (2022). ISO/IEC 27001:2022 Information Security Management.
          <em> International Organization for Standardization</em>.
          <a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer"> https://www.iso.org/standard/27001</a>
        </li>
        <li key="ref-10">
          Microsoft. (2019). One simple action you can take to prevent 99.9% of attacks on your accounts.
          <em> Microsoft Security Blog</em>.
          <a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer"> https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/</a>
        </li>
        <li key="ref-11">
          NIST. (2024). Cybersecurity Framework 2.0.
          <em> National Institute of Standards and Technology</em>.
          <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer"> https://www.nist.gov/cyberframework</a>
        </li>
        <li key="ref-12">
          TechTarget. (2025). PowerSchool data breach: Explaining how it happened.
          <em> TechTarget</em>.
          <a href="https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened" target="_blank" rel="noopener noreferrer"> https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened</a>
        </li>
        <li key="ref-13">
          US Department of Education. (2024). Student Privacy Policy Office.
          <em> Protecting Student Privacy</em>.
          <a href="https://studentprivacy.ed.gov/" target="_blank" rel="noopener noreferrer"> https://studentprivacy.ed.gov/</a>
        </li>
        <li key="ref-14">
          Information Commissioner's Office. (2024). Children and the UK GDPR.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/</a>
        </li>
      </ul>
    </div>

    <h2>Lecturas adicionales</h2>
    <ul>
      <li><a href="/blog/royal-society-partnership-grants-vr-science-labs">Escuelas del Reino Unido: Obtenga £3,000 para laboratorios de ciencias VR</a></li>
      <li><a href="/es/blog/teachers-are-experts-custom-experiment-designer">Los profesores son los expertos. Nosotros solo construimos las herramientas.</a></li>
      <li><a href="/es/blog/ai-assessment-crisis-solution">La detección de IA no funciona. La evaluación basada en procesos sí.</a></li>
    </ul>
  </>
);

