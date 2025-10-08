let mesasGuardadas = [];

window.onload = function () {
  if (localStorage.getItem("mesas")) {
    mesasGuardadas = JSON.parse(localStorage.getItem("mesas"));
    mostrarReservacion();
  }
};

export function guardarReserva(
  numeroMesa,
  nombreClienteReserva,
  capacidadPersonas,
  fechaReservacion,
  horaReservacion,
  duracionReserva,
  fechaHoraAntes,
  fechaHoraDespues,
  ocasionTexto,
  notaAdicionalReserva
) {
  console.log(numeroMesa);
  mesasGuardadas = JSON.parse(localStorage.getItem("mesas")) || [];

  const mesaEncontrada = mesasGuardadas.find(
    (mesa) => mesa.numeroMesa == numeroMesa
  );

  console.log(mesaEncontrada);

  if (mesaEncontrada) {
    if (!mesaEncontrada.reservaciones) {
      mesaEncontrada.reservaciones = [];
    }

    console.log(mesaEncontrada);

    mesaEncontrada.estado = "Ocupada";
    mesaEncontrada.estadoMesa = "Ocupada";

    mesaEncontrada.reservaciones.push({
      idReserva: crypto.randomUUID(),
      nombreClienteReserva,
      capacidadPersonas,
      fechaReservacion,
      horaReservacion,
      duracionReserva,
      fechaHoraAntes,
      fechaHoraDespues,
      ocasionTexto,
      notaAdicionalReserva,
    });

    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));
  } else {
    console.log("No se encontró la mesa con número:", numeroMesa);
  }
}

function mostrarReservacion() {
  let mesasDisponibles = [];

  const fecha = document.getElementById("filtroFecha")?.value || "";
  const estado = document.getElementById("filtroEstado")?.value || "";

  let contenidoReservas = document.getElementById("contenidoReservas");
  if (!contenidoReservas) return;

  contenidoReservas.innerHTML = "";

  let reservas = mesasGuardadas.filter((m) => m.estadoMesa === "Ocupada");

  if (fecha) {
    reservas = reservas.filter((r) => r.reservacion.fechaReservacion === fecha);
  }

  if (estado) {
    reservas = reservas.filter((r) => r.reservacion.estadoTexto === estado);
  }
  reservas.forEach((datosMesa) => {
    datosMesa.reservaciones.forEach((datosReserva) => {
      // Crear fila de la tabla
      const tr = document.createElement("tr");

      const tdNumero = document.createElement("td");
      tdNumero.textContent = datosMesa.numeroMesa;
      tr.appendChild(tdNumero);

      const tdUbicacion = document.createElement("td");
      tdUbicacion.textContent = datosMesa.ubicacion;
      tr.appendChild(tdUbicacion);

      const tdCliente = document.createElement("td");
      tdCliente.textContent = datosReserva.nombreClienteReserva;
      tr.appendChild(tdCliente);

      const tdNroPersonas = document.createElement("td");
      tdNroPersonas.textContent = datosReserva.capacidadPersonas;
      tr.appendChild(tdNroPersonas);

      const tdOcasion = document.createElement("td");
      tdOcasion.textContent = datosReserva.ocasionTexto;
      tr.appendChild(tdOcasion);

      const tdFecha = document.createElement("td");
      tdFecha.textContent = datosReserva.fechaReservacion;
      tr.appendChild(tdFecha);

      const tdHora = document.createElement("td");
      tdHora.textContent = datosReserva.horaReservacion;
      tr.appendChild(tdHora);

      const tdNota = document.createElement("td");
      tdNota.textContent = datosReserva.notaAdicionalReserva;
      tr.appendChild(tdNota);

      const tdEstado = document.createElement("td");
      if (!datosReserva.estadoTexto) {
        datosReserva.estadoTexto = "Pendiente";
        tdEstado.textContent = "Pendiente";
      } else {
        tdEstado.textContent = datosReserva.estadoTexto;
      }
      tr.appendChild(tdEstado);

      // 👉 Evento: abrir modal al hacer click en la fila
      tr.addEventListener("click", () => {
        let imagenOcasion = "";
        let ocasion = datosReserva.ocasionTexto;

        switch (ocasion) {
          case "Cumpleaños":
            imagenOcasion =
              "<img src='./src/script/img/cumpleaños.png' width='160' style='border-radius:8px;' />";
            break;
          case "Matrimonio":
            imagenOcasion =
              "<img src='./src/script/img/matrimonio.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Aniversario":
            imagenOcasion =
              "<img src='./src/script/img/aniversario.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Reunion Familiar":
            imagenOcasion =
              "<img src='./src/script/img/reunionFamiliar.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Dia del Padre":
            imagenOcasion =
              "<img src='./src/script/img/diaPadre.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Dia de la Madre":
            imagenOcasion =
              "<img src='./src/script/img/diaMadre.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Reunion de Negocios":
            imagenOcasion =
              "<img src='./src/script/img/reunion.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Graduacion":
            imagenOcasion =
              "<img src='./src/script/img/graduacion.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          default:
            imagenOcasion =
              "<img src='./src/script/img/otros.png' width='160' style='margin-left:15px; border-radius:8px;' />";
        }

        // Mostrar detalles en el modal
        document.getElementById("detalleReserva").innerHTML = `
    <div style="display:flex; align-items:center; justify-content: space-evenly ">
    <div>
      <strong>Mesa #${datosMesa.numeroMesa}</strong><br>
      Cliente: ${datosReserva.nombreClienteReserva}<br>
      Fecha: ${datosReserva.fechaReservacion}<br>
      Hora: ${datosReserva.horaReservacion}<br>
      Nota: ${datosReserva.notaAdicionalReserva || "Sin nota"}
    </div>
    <div>
      ${imagenOcasion}
    </div>  
    </div>
    `;

        let indexReal = mesasGuardadas.findIndex(
          (m) => m.numeroMesa === datosMesa.numeroMesa
        );

        window.reservaSeleccionada = {
          mesaIndex: indexReal,
          idReserva: datosReserva.idReserva,
        };

        // Abrir modal con Bootstrap
        const modal = new bootstrap.Modal(
          document.getElementById("modalReserva")
        );
        modal.show();
      });

      contenidoReservas.appendChild(tr);
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

      cardDiv.appendChild(cardBody);

      cardMesasDisponibles.appendChild(cardDiv);
    });

    document.getElementById("btnEditarReserva").onclick = () => {
      const { mesaIndex, idReserva } = window.reservaSeleccionada;
      editarReserva(mesaIndex, idReserva);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalReserva")
      );
      modal.hide();
    };
    document.getElementById("btnEliminarReserva").onclick = () => {
      const { mesaIndex, idReserva } = window.reservaSeleccionada;
      eliminarReserva(mesaIndex, idReserva);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalReserva")
      );
      modal.hide();
    };
    document.getElementById("btnPagarReserva").onclick = () => {
      const { mesaIndex, idReserva } = window.reservaSeleccionada;
      pagar(mesaIndex, idReserva);
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalReserva")
      );
      modal.hide();
    };
  });
}

function pagar(mesaIndex, idReserva) {
  const mesa = mesasGuardadas[mesaIndex];

  if (!mesa) {
    return Swal.fire("Error", "No se encontró la mesa", "error");
  }

  const reservaIndex = mesa.reservaciones.findIndex(
    (r) => r.idReserva === idReserva
  );

  if (reservaIndex === -1) {
    return Swal.fire("Error", "No se encontró la reserva", "error");
  }

  const reserva = mesa.reservaciones[reservaIndex];

  Swal.fire({
    icon: "success",
    title: "✅ Pago Realizado",
    html: `
      <b>Mesa #${mesa.numeroMesa}</b><br>
      Cliente: ${reserva.nombreClienteReserva}<br>
      Fecha: ${reserva.fechaReservacion} - ${reserva.horaReservacion}
    `,
    confirmButtonText: "Aceptar",
  }).then(() => {
    mesa.reservaciones[reservaIndex] = {
      ...reserva,
      estadoReserva: "Finalizada",
    };

    //al pagar la reserva también se elimine
    // mesa.reservaciones.splice(reservaIndex, 1);

    if (mesa.reservaciones.length === 0) {
      mesa.estado = "Disponible";
    }

    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));
    mostrarReservacion();
  });
}

function eliminarReserva(mesaIndex, idReserva) {
  const mesa = mesasGuardadas[mesaIndex];

  if (!mesa) {
    return Swal.fire("Error", "No se encontró la mesa", "error");
  }

  const reservaIndex = mesa.reservaciones.findIndex(
    (r) => r.idReserva === idReserva
  );

  if (reservaIndex === -1) {
    return Swal.fire("Error", "No se encontró la reserva", "error");
  }

  mesa.reservaciones.splice(reservaIndex, 1);

  if (mesa.reservaciones.length === 0) {
    mesa.estado = "Disponible";
  }

  localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));
  mostrarReservacion();

  Swal.fire("Eliminada", "La reserva fue eliminada", "success");
}

function agregarReserva() {
  let selectMesa = document.getElementById("mesaDisponible");
  selectMesa.innerHTML = "";

  let mesasDisponibles = mesasGuardadas.filter(
    (m) => m.estado === "Disponible"
  );

  if (mesasDisponibles.length === 0) {
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "No hay mesas disponibles";
    selectMesa.appendChild(option);
  } else {
    mesasDisponibles.forEach((mesa) => {
      let option = document.createElement("option");
      option.value = mesa.numeroMesa;
      option.textContent = `Mesa #${mesa.numeroMesa} (capacidad: ${mesa.capacidad})`;
      selectMesa.appendChild(option);
    });
  }

  let modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modal-agregar-reservar")
  );
  modal.show();

  let fechaReservacion = document.getElementById("fechaPageReserva");
  fechaReservacion.setAttribute("min", new Date().toLocaleDateString("en-CA"));

  let botonGuardar = document.getElementById("botonGuardarReserva");
  botonGuardar.onclick = () => {
    let nombreClienteReserva = document.getElementById(
      "nombreClienteReserva"
    ).value;
    let idMesaSeleccionada = document.getElementById("mesaDisponible").value;
    let capacidadPersonas = parseInt(
      document.getElementById("numeroPersonasReserva").value
    );
    let fechaReservacion = document.getElementById("fechaPageReserva").value;
    let horaReservacion = document.getElementById("horaPageReserva").value;
    let duracionReserva = document.getElementById("duracionEvento").value;
    let ocasionReservacion = document.getElementById("ocasionEspecialReserva");
    let notaAdicionalReserva = document.getElementById(
      "notasAdicionalesReserva"
    ).value;

    let datosMesas = mesasGuardadas.find(
      (m) => m.numeroMesa == idMesaSeleccionada
    );

    if (!datosMesas) {
      Swal.fire("Error", "Mesa no encontrada", "error");
      return;
    }

    const { numeroMesa, capacidad, estado } = datosMesas;

    if (!nombreClienteReserva) {
      Swal.fire("Opps..!", "Ingrese el nombre.", "error");
      return;
    }

    if (
      isNaN(capacidadPersonas) ||
      capacidadPersonas > capacidad ||
      capacidadPersonas < 1
    ) {
      Swal.fire(
        "Opps..!",
        "La capacidad no puede ser mayor a la de la mesa ni menor a 1.",
        "error"
      );
      return;
    }

    if (estado == "Ocupada" || estado == "Deshabilitada") {
      Swal.fire(
        "Opps..!",
        "La mesa en este momento ya se encuentra reservada",
        "error"
      );
      return;
    }

    if (!fechaReservacion) {
      Swal.fire("Opps..!", "Debes seleccionar una fecha.", "error");
      return;
    }

    if (!horaReservacion) {
      Swal.fire("Opps..!", "Debes seleccionar una hora.", "error");
      return;
    }

    let fechaReservacionSeleccionada = new Date(
      fechaReservacion + "T" + horaReservacion
    );
    let fechaActual = new Date();

    if (isNaN(fechaReservacionSeleccionada.getTime())) {
      Swal.fire("Opps..!", "Debes seleccionar una fecha valida.", "error");
      return;
    }

    if (
      horaReservacion < "08:00" ||
      horaReservacion > "20:00" ||
      !horaReservacion
    ) {
      Swal.fire(
        "Opps..!",
        "La hora debe ser entre las 8:00 AM y las 8:00 PM.",
        "error"
      );
      return;
    }

    if (fechaReservacionSeleccionada <= fechaActual) {
      Swal.fire({
        title: "Opps..!",
        text: "La fecha de reservación debe ser desde la hora actual en adelante.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    let ocasionTexto =
      ocasionReservacion.options[ocasionReservacion.selectedIndex].text;

    let fechaHoraAntes = new Date(
      fechaReservacionSeleccionada.getTime() - 2 * 60 * 60 * 1000
    );

    let fechaHoraDespues = new Date(
      fechaReservacionSeleccionada.getTime() + duracionReserva * 60 * 60 * 1000
    );

    let mesaIndex = mesasGuardadas.findIndex(
      (m) => m.numeroMesa == idMesaSeleccionada
    );

    if (!Array.isArray(mesasGuardadas[mesaIndex].reservaciones)) {
      mesasGuardadas[mesaIndex].reservaciones = [];
    }

    mesasGuardadas[mesaIndex].estadoMesa = "Ocupada";

    mesasGuardadas[mesaIndex].reservaciones.push({
      idReserva: crypto.randomUUID(),
      nombreClienteReserva,
      capacidadPersonas,
      fechaReservacion,
      horaReservacion,
      duracionReserva,
      fechaHoraAntes,
      fechaHoraDespues,
      ocasionTexto,
      notaAdicionalReserva,
    });

    modal.hide();

    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

    Swal.fire(
      "Reserva Aceptada",
      "La reserva fue guardada correctamente",
      "success"
    );

    mostrarReservacion();
  };
}

function autoActualizarReservas() {
  setInterval(() => {
    mesasGuardadas = JSON.parse(localStorage.getItem("mesas")) || [];

    mostrarReservacion();

    let ahora = new Date();

    mesasGuardadas.forEach((mesa) => {
      if (Array.isArray(mesa.reservaciones) && mesa.reservaciones.length > 0) {
        let ocupada = mesa.reservaciones.some((reserva) => {
          let inicio = new Date(reserva.fechaHoraAntes);
          let fin = new Date(reserva.fechaHoraDespues);
          return ahora >= inicio && ahora <= fin;
        });
        mesa.estado = ocupada ? "Ocupada" : "Disponible";
      } else {
        mesa.estado = "Disponible";
      }
    });

    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

    console.log("✅ Reservas y estados actualizados automáticamente");
  }, 10000);
}

document.addEventListener("DOMContentLoaded", () => {
  let botonPageReservar = document.getElementById("btn-add-reserva");
  if (botonPageReservar) {
    botonPageReservar.addEventListener("click", agregarReserva);
  }
  let botonPageReservarEditar = document.getElementById(
    "botonGuardarCambiosReserva"
  );
  if (botonPageReservarEditar) {
    botonPageReservarEditar.addEventListener("click", editarReserva);
  }

  autoActualizarReservas();
});

function editarReserva(mesaIndex, idReserva) {
  const mesa = mesasGuardadas[mesaIndex];
  if (!mesa) return Swal.fire("Error", "No se encontró la mesa", "error");

  const reservaIndex = mesa.reservaciones.findIndex(
    (r) => r.idReserva === idReserva
  );
  if (reservaIndex === -1)
    return Swal.fire("Error", "No se encontró la reserva", "error");

  let reserva = mesa.reservaciones[reservaIndex];

  document.getElementById("nombreClienteEditar").value =
    reserva.nombreClienteReserva;
  document.getElementById("numeroPersonasEditarReserva").value =
    reserva.capacidadPersonas;
  document.getElementById("fechaEditar").value = reserva.fechaReservacion;
  document.getElementById("horaEditar").value = reserva.horaReservacion;
  document.getElementById("ocasionEspecialEditar").value = reserva.ocasionTexto;
  document.getElementById("notasAdicionalesEditar").value =
    reserva.notaAdicionalReserva || "";
  document.getElementById("estadoEditar").value =
    reserva.estadoTexto || "Pendiente";

  let modalEditar = new bootstrap.Modal(
    document.getElementById("modal-editarReserva")
  );
  let fechaReservacionInput = document.getElementById("fechaEditar");
  fechaReservacionInput.setAttribute(
    "min",
    new Date().toLocaleDateString("en-CA")
  );
  fechaReservacionInput.value = reserva.fechaReservacion;

  modalEditar.show();

  document.getElementById("botonGuardarCambiosReserva").onclick = () => {
    let nombreClienteReserva = document
      .getElementById("nombreClienteEditar")
      .value.trim();
    let capacidadPersonas = parseInt(
      document.getElementById("numeroPersonasEditarReserva").value
    );
    let fechaReservacion = document.getElementById("fechaEditar").value;
    let horaReservacion = document.getElementById("horaEditar").value;
    let duracionReserva =
      parseInt(document.getElementById("duracionEvento").value) || 60;
    let ocasionReservacion = document.getElementById("ocasionEspecialEditar");
    let notaAdicionalReserva = document.getElementById(
      "notasAdicionalesEditar"
    ).value;
    let nuevoEstado = document.getElementById("estadoEditar").value;

    if (!nombreClienteReserva)
      return Swal.fire("Opps..!", "Ingrese el nombre del cliente.", "error");

    if (
      isNaN(capacidadPersonas) ||
      capacidadPersonas < 1 ||
      capacidadPersonas > mesa.capacidad
    ) {
      return Swal.fire(
        "Opps..!",
        `La capacidad debe estar entre 1 y ${mesa.capacidad}`,
        "error"
      );
    }

    if (!fechaReservacion || !horaReservacion) {
      return Swal.fire("Opps..!", "Debes seleccionar fecha y hora", "error");
    }

    let fechaReservacionSeleccionada = new Date(
      fechaReservacion + "T" + horaReservacion
    );
    if (isNaN(fechaReservacionSeleccionada.getTime())) {
      return Swal.fire(
        "Opps..!",
        "Debes seleccionar una fecha válida.",
        "error"
      );
    }

    if (fechaReservacionSeleccionada <= new Date()) {
      return Swal.fire({
        title: "Opps..! ",
        text: "La fecha de reservación debe ser desde la hora actual en adelante.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }

    let ocasionTexto =
      ocasionReservacion.options[ocasionReservacion.selectedIndex].text;

    let fechaHoraAntes = new Date(
      fechaReservacionSeleccionada.getTime() - 2 * 60 * 1000
    );
    let fechaHoraDespues = new Date(
      fechaReservacionSeleccionada.getTime() + duracionReserva * 60 * 1000
    );

    if (nuevoEstado === "Cancelada" || nuevoEstado === "No Show") {
      mesa.reservaciones.splice(reservaIndex, 1);
      mesa.estado = mesa.reservaciones.length > 0 ? "Ocupada" : "Disponible";

      Swal.fire(
        "Reserva eliminada",
        `La reserva fue marcada como "${nuevoEstado}" y eliminada`,
        "info"
      );
    } else {
      mesasGuardadas[mesaIndex].reservaciones[reservaIndex] = {
        ...mesasGuardadas[mesaIndex].reservaciones[reservaIndex],
        nombreClienteReserva,
        capacidadPersonas,
        fechaReservacion,
        horaReservacion,
        duracionReserva,
        fechaHoraAntes,
        fechaHoraDespues,
        ocasionTexto,
        notaAdicionalReserva,
        estadoTexto: nuevoEstado,
      };

      mesa.estado = "Ocupada";

      Swal.fire(
        "Reserva actualizada",
        "Los cambios fueron guardados con éxito",
        "success"
      );
    }

    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));
    mostrarReservacion();
    modalEditar.hide();
  };
}
