let mesasGuardadas = []

window.onload = function () {
  if (localStorage.getItem("mesas")) {
    mesasGuardadas = JSON.parse(localStorage.getItem("mesas"));
    mostrarReservacion();
  }
};

export function guardarReserva(numeroMesa, nombreClienteReserva, capacidadPersonas, fechaReservacion, horaReservacion, ocasionTexto, notaAdicionalReserva) {
  mesasGuardadas = JSON.parse(localStorage.getItem("mesas"));
  const nuevaDatosDeLaMesa = mesasGuardadas.map((mesa) => {
    if(mesa.numeroMesa == numeroMesa){
      return {
        ...mesa,
        estado: "Ocupada",
        reservacion: {nombreClienteReserva, capacidadPersonas, fechaReservacion, horaReservacion, ocasionTexto, notaAdicionalReserva}
      }
    }
    return mesa
  })

  localStorage.setItem("mesas", JSON.stringify(nuevaDatosDeLaMesa));
}

function mostrarReservacion() {
  let mesasDisponibles = [];

  // Contenedor de reservas (tabla)
  let contenidoReservas = document.getElementById("contenidoReservas");
  contenidoReservas.innerHTML = "";

  mesasGuardadas.forEach((datosReserva, index) => {
    if (datosReserva.estado == "Ocupada") {
      // Crear fila de la tabla
      const tr = document.createElement("tr");

      const tdNumero = document.createElement("td");
      tdNumero.textContent = datosReserva.numeroMesa;
      tr.appendChild(tdNumero);

      const tdUbicacion = document.createElement("td");
      tdUbicacion.textContent = datosReserva.ubicacion;
      tr.appendChild(tdUbicacion);

      const tdCliente = document.createElement("td");
      tdCliente.textContent = datosReserva.reservacion.nombreClienteReserva;
      tr.appendChild(tdCliente);

      const tdNroPersonas = document.createElement("td");
      tdNroPersonas.textContent = datosReserva.reservacion.capacidadPersonas;
      tr.appendChild(tdNroPersonas);

      const tdOcasion = document.createElement("td");
      tdOcasion.textContent = datosReserva.reservacion.ocasionTexto;
      tr.appendChild(tdOcasion);

      const tdFecha = document.createElement("td");
      tdFecha.textContent = datosReserva.reservacion.fechaReservacion;
      tr.appendChild(tdFecha);

      const tdHora = document.createElement("td");
      tdHora.textContent = datosReserva.reservacion.horaReservacion;
      tr.appendChild(tdHora);

      const tdNota = document.createElement("td");
      tdNota.textContent = datosReserva.reservacion.notaAdicionalReserva;
      tr.appendChild(tdNota);

      const tdEstado = document.createElement("td");
      if (!datosReserva.reservacion.estadoTexto) {
        tdEstado.textContent = "Pendiente"
      } else {
        tdEstado.textContent = datosReserva.reservacion.estadoTexto;
      }
      tr.appendChild(tdEstado);

      // 👉 Evento: abrir modal al hacer click en la fila
      tr.addEventListener("click", () => {
        // Mostrar detalles en el modal
        document.getElementById("detalleReserva").innerHTML = `
          <strong>Mesa #${datosReserva.numeroMesa}</strong><br>
          Cliente: ${datosReserva.reservacion.nombreClienteReserva}<br>
          Fecha: ${datosReserva.reservacion.fechaReservacion} - ${datosReserva.reservacion.horaReservacion}<br>
          Nota: ${datosReserva.reservacion.notaAdicionalReserva || "Sin nota"}
        `;

        // Guardar índice actual (para usarlo en editar/eliminar/pagar)
        window.reservaSeleccionada = index;

        // Abrir modal con Bootstrap
        const modal = new bootstrap.Modal(document.getElementById("modalReserva"));
        modal.show();
      });

      contenidoReservas.appendChild(tr);
    } else if(datosReserva.estado == "Disponible"){
      mesasDisponibles.push(datosReserva);
    }
  });
  
  // Contenedor de mesas disponibles (cards)
  let cardMesasDisponibles = document.getElementById("mesasDisponibles");
  cardMesasDisponibles.innerHTML = "";

  mesasDisponibles.forEach((mesa) => {
    // Card principal
    const cardDiv = document.createElement("div");
    cardDiv.className = "card m-2";
    cardDiv.style.width = "18rem";

    // Cuerpo de la card
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Título
    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = `Mesa #${mesa.numeroMesa}`;
    cardBody.appendChild(h5);

    // Texto
    const p = document.createElement("p");
    p.className = "card-text";

    const ubicacion = document.createElement("span");
    ubicacion.innerHTML = `<strong>Ubicación:</strong> ${mesa.ubicacion} <br>`;
    p.appendChild(ubicacion);

    const capacidad = document.createElement("span");
    capacidad.innerHTML = `<strong>Capacidad:</strong> ${mesa.capacidad} personas <br>`;
    p.appendChild(capacidad);

    const estado = document.createElement("span");
    estado.innerHTML = `<strong>Estado:</strong> ${mesa.estado}`;
    p.appendChild(estado);

    cardBody.appendChild(p);

    // Añadir body a la card
    cardDiv.appendChild(cardBody);

    // Insertar la card al contenedor
    cardMesasDisponibles.appendChild(cardDiv);
  });

  document.getElementById("btnEditarReserva").onclick = () => {editarReserva(window.reservaSeleccionada)
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalReserva"));
  modal.hide();}
  document.getElementById("btnEliminarReserva").onclick = () => {eliminarReserva(window.reservaSeleccionada);
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalReserva"));
  modal.hide();}
  document.getElementById("btnPagarReserva").onclick = () => {pagar(window.reservaSeleccionada);
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalReserva"));
  modal.hide();}
}

function pagar(index) {
  let reserva = mesasGuardadas[index];
  
  Swal.fire({
    icon: "success",
    title: "✅ Pago Realizado",
    html: `
      <b>Mesa #${reserva.numeroMesa}</b><br>
      Cliente: ${reserva.reservacion.nombreClienteReserva}<br>
      Fecha: ${reserva.reservacion.fechaReservacion} - ${reserva.reservacion.horaReservacion}
    `,
    confirmButtonText: "Aceptar"
  }).then(() => {
    mesasGuardadas[index] = {
      ...mesasGuardadas[index],
      estado: "Disponible",
      reservacion: {
        ...mesasGuardadas[index].reservacion,
        estadoReserva: "Finalizada"
      }
    }
    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

    mostrarReservacion();
  })
}

function eliminarReserva(index) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      mesasGuardadas[index].estado = "Disponible";
      mesasGuardadas[index].reservacion = {};

      localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

      mostrarReservacion();

      const modal = bootstrap.Modal.getInstance(document.getElementById("modalReserva"));
      modal.hide();

      Swal.fire("Eliminada", "La reserva fue eliminada", "success");
    }
  });
}

function agregarReserva() {
  let selectMesa = document.getElementById("mesaDisponible");
  selectMesa.innerHTML = ""; // Limpiar las opciones antes de cargar

  // Filtrar mesas que estén disponibles
  let mesasDisponibles = mesasGuardadas.filter(m => m.estado === "Disponible");

  if (mesasDisponibles.length === 0) {
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "No hay mesas disponibles";
    selectMesa.appendChild(option);
  } else {
    mesasDisponibles.forEach(mesa => {
      let option = document.createElement("option");
      option.value = mesa.numeroMesa;
      option.textContent = `Mesa #${mesa.numeroMesa} (capacidad: ${mesa.capacidad})`;
      selectMesa.appendChild(option);
    });
  }

  // Abrir el modal
  let modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modal-agregar-reservar")
  );
  modal.show();
}

// 👉 Solo cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  let botonPageReservar = document.getElementById("btn-add-reserva");
  let botonGuardar = document.getElementById("botonGuardarReserva");

  if (botonPageReservar) {
    botonPageReservar.addEventListener("click", agregarReserva);
  }

  if (botonGuardar) {
    botonGuardar.addEventListener("click", () => {
      let numeroMesa = document.getElementById("mesaDisponible").value;
      let nombreClienteReserva = document.getElementById("nombreClienteReserva").value;
      let capacidadPersonas = document.getElementById("numeroPersonasReserva").value;
      let fechaReservacion = document.getElementById("fechaPageReserva").value;
      let horaReservacion = document.getElementById("horaPageReserva").value;
      let ocasionTexto = document.getElementById("ocasionEspecialReserva").value;
      let notaAdicionalReserva = document.getElementById("notasAdicionalesReserva").value;

      // Validaciones simples
      if (!numeroMesa || !nombreClienteReserva || !capacidadPersonas || !fechaReservacion || !horaReservacion) {
        Swal.fire("Error", "Por favor completa todos los campos obligatorios", "error");
        return;
      }

      let mesaIndex = mesasGuardadas.findIndex(m => m.numeroMesa == numeroMesa);

      // Crear la reserva
      mesasGuardadas[mesaIndex] = {
        ...mesasGuardadas[mesaIndex],
        estado: "Ocupada",
        reservacion: {
          nombreClienteReserva,
          capacidadPersonas,
          fechaReservacion,
          horaReservacion,
          ocasionTexto,
          notaAdicionalReserva,
          estadoTexto: "Pendiente"
        }
      };

      // Guardar en localStorage
      localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

      // Refrescar la vista
      mostrarReservacion();

      // Cerrar modal
      let modal = bootstrap.Modal.getInstance(document.getElementById("modal-agregar-reservar"));
      modal.hide();

      // Confirmación
      Swal.fire({
        icon: "success",
        title: "Reserva creada",
        text: `Mesa #${numeroMesa} reservada para ${nombreClienteReserva}`
      });
    });
  }
});

function editarReserva(index) {
  let reserva = mesasGuardadas[index].reservacion;

  // Cargar datos en el modal de edición
  document.getElementById("nombreClienteEditar").value = reserva.nombreClienteReserva;
  document.getElementById("numeroPersonasEditarReserva").value = reserva.capacidadPersonas;
  document.getElementById("fechaEditar").value = reserva.fechaReservacion;
  document.getElementById("horaEditar").value = reserva.horaReservacion;
  document.getElementById("ocasionEspecialEditar").value = reserva.ocasionTexto;
  document.getElementById("notasAdicionalesEditar").value = reserva.notaAdicionalReserva || "";
  document.getElementById("estadoEditar").value = reserva.estadoTexto || "Pendiente";

  // Mostrar modal de edición
  let modalEditar = new bootstrap.Modal(document.getElementById("modal-editarReserva"));
  modalEditar.show();

  // Guardar cambios cuando den click en el botón
  document.getElementById("botonGuardarCambiosReserva").onclick = () => {
    mesasGuardadas[index].reservacion = {
      nombreClienteReserva: document.getElementById("nombreClienteEditar").value,
      capacidadPersonas: document.getElementById("numeroPersonasEditarReserva").value,
      fechaReservacion: document.getElementById("fechaEditar").value,
      horaReservacion: document.getElementById("horaEditar").value,
      ocasionTexto: document.getElementById("ocasionEspecialEditar").value,
      notaAdicionalReserva: document.getElementById("notasAdicionalesEditar").value,
      estadoTexto: document.getElementById("estadoEditar").value
    };

    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));
    mostrarReservacion();

    // Cerrar modales
    bootstrap.Modal.getInstance(document.getElementById("modal-editarReserva")).hide();

    Swal.fire("Reserva actualizada", "Los cambios fueron guardados con éxito", "success");
  };
}