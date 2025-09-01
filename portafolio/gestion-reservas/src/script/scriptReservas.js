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
      if (!datosReserva.reservacion.estado) {
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

function editarReserva(index) {
  let reserva = mesasGuardadas[index]

  document.getElementById("nombreClienteEditar").value = reserva.reservacion.nombreClienteReserva;
  document.getElementById("numeroPersonasEditarReserva").value = reserva.reservacion.capacidadPersonas
  document.getElementById("ocasionEspecialEditar").value = reserva.reservacion.ocasionTexto;
  document.getElementById("fechaEditar").value = reserva.reservacion.fechaReservacion;
  document.getElementById("horaEditar").value = reserva.reservacion.horaReservacion;
  document.getElementById("notasAdicionalesEditar").value = reserva.reservacion.notaAdicionalReserva;
  document.getElementById("estadoEditar").value = reserva.reservacion.estadoTexto;

  window.editandoIndex = index;

  let modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modal-editarReserva"));
  modal.show();
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("mesas")) {
    mesasGuardadas = JSON.parse(localStorage.getItem("mesas"));
    mostrarReservacion();
  }

  let botonEditarReserva = document.getElementById("botonGuardarCambiosReserva");
  botonEditarReserva.addEventListener("click", () => {
  let index = window.editandoIndex;

  mesasGuardadas[index].reservacion.nombreClienteReserva = document.getElementById("nombreClienteEditar").value;
  mesasGuardadas[index].reservacion.capacidadPersonas = document.getElementById("numeroPersonasEditarReserva").value
  mesasGuardadas[index].reservacion.fechaReservacion = document.getElementById("fechaEditar").value
  mesasGuardadas[index].reservacion.horaReservacion = document.getElementById("horaEditar").value 
  mesasGuardadas[index].reservacion.ocasionTexto = document.getElementById("ocasionEspecialEditar").value
  mesasGuardadas[index].reservacion.notaAdicionalReserva = document.getElementById("notasAdicionalesEditar").value
  mesasGuardadas[index].reservacion.estadoTexto = document.getElementById("estadoEditar").value

  localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));
  mostrarReservacion(mesasGuardadas);

  let modal = bootstrap.Modal.getInstance(
    document.getElementById("modal-editarReserva")
  );
  modal.hide();

  let estadoReserva = mesasGuardadas[index].reservacion.estadoTexto
  if (estadoReserva === "Cancelada" || estadoReserva === "No Show") {
    mesasGuardadas[index].estado = "Disponible";
    mesasGuardadas[index].reservacion = {};
    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

    mostrarReservacion();
    Swal.fire("Reserva Eliminada!", "La reserva fue cancelada", "error");
  } else {
    Swal.fire({
    icon: "success",
    title: "Mesa editada",
    text: "Los cambios se guardaron correctamente",
  })
  }
});
})  