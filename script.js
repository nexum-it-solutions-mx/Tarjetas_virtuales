// ==================== 1. CAMBIO DE SECCIONES (TABS) ====================
function showDemo(type, element) {
  // Ocultar todas las tarjetas demo
  const cards = document.querySelectorAll('.demo-card');
  cards.forEach(card => card.classList.remove('active'));

  // Desactivar todos los botones del menú superior
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Activar la tarjeta seleccionada
  const targetCard = document.getElementById('demo-' + type);
  if (targetCard) {
    targetCard.classList.add('active');
  }

  // Activar el botón presionado
  if (element) {
    element.classList.add('active');
  }
}

// ==================== 2. ACCIÓN: ABRIR WHATSAPP ====================
function abrirWhatsApp(telefono, mensaje) {
  // Limpiar cualquier carácter no numérico excepto el símbolo +
  const numLimpio = telefono.replace(/[^0-9]/g, '');
  const mensajeEncoded = encodeURIComponent(mensaje);
  const url = `https://wa.me/${numLimpio}?text=${mensajeEncoded}`;
  
  // Abrir en nueva ventana/app
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

  // Crear archivo Blob en memoria
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Elemento temporal de descarga
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${nombre.replace(/\s+/g, '_')}.vcf`);
  document.body.appendChild(link);
  
  // Ejecutar clic
  link.click();
  
  // Limpieza
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);
}
