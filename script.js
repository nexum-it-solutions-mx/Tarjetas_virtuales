// Función para la navegación interactiva de las pestañas de la demo
function showDemo(type, evt) {
  const cards = document.querySelectorAll('.demo-card');
  cards.forEach(card => card.classList.remove('active'));

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById('demo-' + type).classList.add('active');
  
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add('active');
  }
}

// Función 1: Guardar directamente en la Agenda del Dispositivo
function guardarEnAgenda(nombre, telefono, especialidad, email, organizacion) {
  const vcardText = 
`BEGIN:VCARD
VERSION:3.0
FN:${nombre}
ORG:${organizacion}
TITLE:${especialidad}
TEL;TYPE=CELL,VOICE:${telefono}
EMAIL:${email}
NOTE:Contacto guardado desde la Tarjeta Digital QR
END:VCARD`;

  // Detectar si el dispositivo es iOS (Safari maneja mejor Data URIs directamente)
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isiOS) {
    // En iPhone/iOS, abrir el Data URI directamente lanza la app Contactos
    const encodedVCARD = encodeURIComponent(vcardText);
    window.location.href = "data:text/vcard;charset=utf-8," + encodedVCARD;
  } else {
    // En Android / PC, creamos un blob temporal que gatilla la adición/descarga limpia
    const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${nombre.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Función 2: Abrir WhatsApp con mensaje dinámico preconfigurado
function abrirWhatsApp(telefono, mensaje) {
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}