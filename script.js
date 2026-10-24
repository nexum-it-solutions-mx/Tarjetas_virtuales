// ==================== 1. NAVEGACIÓN ENTRE SECCIONES DE LA DEMO ====================
function showDemo(type, evt) {
  // Ocultar todas las tarjetas demo
  const cards = document.querySelectorAll('.demo-card');
  cards.forEach(card => card.classList.remove('active'));

  // Desactivar todos los botones del selector
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Activar la demo seleccionada
  const targetCard = document.getElementById('demo-' + type);
  if (targetCard) {
    targetCard.classList.add('active');
  }

  // Marcar botón activo
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add('active');
  }
}

// ==================== 2. ACCIÓN: ABRIR WHATSAPP ====================
function abrirWhatsApp(telefono, mensaje) {
  // Limpiar caracteres extra del número por seguridad
  const numLimpio = telefono.replace(/[^0-9]/g, '');
  const mensajeEncoded = encodeURIComponent(mensaje);
  const url = `https://wa.me/${numLimpio}?text=${mensajeEncoded}`;
  
  // Abrir en pestaña nueva o app de WhatsApp
  window.open(url, '_blank');
}

// ==================== 3. ACCIÓN: GUARDAR EN AGENDA (VCARD) ====================
function guardarEnAgenda(nombre, telefono, especialidad, email, organizacion) {
  const vcardText = 
`BEGIN:VCARD
VERSION:3.0
FN:${nombre}
ORG:${organizacion}
TITLE:${especialidad}
TEL;TYPE=CELL,VOICE:${telefono}
EMAIL:${email}
NOTE:Contacto guardado desde Tarjeta Digital QR
END:VCARD`;

  // Detectar iOS / iPhone
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isiOS) {
    // En iPhone, Data URI fuerza la apertura directa de la app Contactos
    const encodedVCARD = encodeURIComponent(vcardText);
    window.location.href = "data:text/vcard;charset=utf-8," + encodedVCARD;
  } else {
    // En Android / Windows / Mac, creamos un archivo .vcf para descarga directa
    const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${nombre.replace(/\s+/g, '_')}.vcf`;
    
    document.body.appendChild(a);
    a.click();
    
    // Limpieza de memoria
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
}
