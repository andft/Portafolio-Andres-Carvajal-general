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
  ocasionTexto,
  notaAdicionalReserva
) {
  mesasGuardadas = JSON.parse(localStorage.getItem("mesas"));
  const nuevaDatosDeLaMesa = mesasGuardadas.map((mesa) => {
    if (mesa.numeroMesa == numeroMesa) {
      return {
        ...mesa,
        estado: "Ocupada",
        reservacion: {
          nombreClienteReserva,
          capacidadPersonas,
          fechaReservacion,
          horaReservacion,
          ocasionTexto,
          notaAdicionalReserva,
        },
      };
    }
    return mesa;
  });

  localStorage.setItem("mesas", JSON.stringify(nuevaDatosDeLaMesa));
}

function mostrarReservacion() {
  let mesasDisponibles = [];

  const fecha = document.getElementById("filtroFecha")?.value || "";
  const estado = document.getElementById("filtroEstado")?.value || "";

  let contenidoReservas = document.getElementById("contenidoReservas");
  contenidoReservas.innerHTML = "";

  let reservas = mesasGuardadas.filter((m) => m.estado === "Ocupada");

  if (fecha) {
    reservas = reservas.filter((r) => r.reservacion.fechaReservacion === fecha);
  }

  if (estado) {
    reservas = reservas.filter((r) => r.reservacion.estadoTexto === estado);
  }

  reservas.forEach((datosReserva) => {
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
        datosReserva.reservacion.estadoTexto = "Pendiente";
        tdEstado.textContent = "Pendiente";
      } else {
        tdEstado.textContent = datosReserva.reservacion.estadoTexto;
      }
      tr.appendChild(tdEstado);

      // 👉 Evento: abrir modal al hacer click en la fila
      tr.addEventListener("click", () => {
        let imagenOcasion = "";
        let ocasion = datosReserva.reservacion.ocasionTexto;

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
          case "Dia-Padre":
            imagenOcasion =
              "<img src='./src/script/img/diaPadre.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Dia-Madre":
            imagenOcasion =
              "<img src='./src/script/img/diaMadre.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Reunion-Negocios":
            imagenOcasion =
              "<img src='./src/script/img/reunion.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Reunion-Familiar":
            imagenOcasion =
              "<img src='./src/script/img/reunionFamiliar.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
          case "Graduacion":
            imagenOcasion =
              "<img src='./src/script/img/graduacion.png' width='160' style='margin-left:15px; border-radius:8px;' />";
            break;
        }

        // Mostrar detalles en el modal
        document.getElementById("detalleReserva").innerHTML = `
  <div style="display:flex; align-items:center; justify-content: space-evenly ">
    <div>
      <strong>Mesa #${datosReserva.numeroMesa}</strong><br>
      Cliente: ${datosReserva.reservacion.nombreClienteReserva}<br>
      Fecha: ${datosReserva.reservacion.fechaReservacion} - ${
          datosReserva.reservacion.horaReservacion
        }<br>
      Nota: ${datosReserva.reservacion.notaAdicionalReserva || "Sin nota"}
    </div>
    <div>
      ${imagenOcasion}
    </div>  
  </div>
`;

        let indexReal = mesasGuardadas.findIndex(
          (m) => m.numeroMesa === datosReserva.numeroMesa
        );
        window.reservaSeleccionada = indexReal;

        // Abrir modal con Bootstrap
        const modal = new bootstrap.Modal(
          document.getElementById("modalReserva")
        );
        modal.show();
      });

      contenidoReservas.appendChild(tr);
    } else if (datosReserva.estado == "Disponible") {
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

  document.getElementById("btnEditarReserva").onclick = () => {
    editarReserva(window.reservaSeleccionada);
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalReserva")
    );
    modal.hide();
  };
  document.getElementById("btnEliminarReserva").onclick = () => {
    eliminarReserva(window.reservaSeleccionada);
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalReserva")
    );
    modal.hide();
  };
  document.getElementById("btnPagarReserva").onclick = () => {
    pagar(window.reservaSeleccionada);
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalReserva")
    );
    modal.hide();
  };
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
    confirmButtonText: "Aceptar",
  }).then(() => {
    mesasGuardadas[index] = {
      ...mesasGuardadas[index],
      estado: "Disponible",
      reservacion: {
        ...mesasGuardadas[index].reservacion,
        estadoReserva: "Finalizada",
      },
    };
    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

    mostrarReservacion();
  });
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

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalReserva")
      );
      modal.hide();

      Swal.fire("Eliminada", "La reserva fue eliminada", "success");
    }
  });
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

  let botonGuardar = document.getElementById("botonGuardarReserva");
  botonGuardar.onclick = () => {
    let nombreClienteReserva = document.getElementById(
      "nombreClienteReserva"
    ).value;
    let idMesaSeleccionada = document.getElementById("mesaDisponible").value;
    let capacidadPersonas = parseInt(
      document.getElementById("numeroPersonasReserva").value
    );
    let fechaReservacion = document.getElementById("fechaPageReserva");
    let fechaActual = Date.now();
    let fechaReservacionSegundos = new Date(fechaReservacion.value);
    let horaReservacion = document.getElementById("horaPageReserva").value;
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
        "La mesa ya se encuentra reservada o está deshabilitada.",
        "error"
      );
      return;
    }

    const resultadoFechaReservacion = fechaReservacionSegundos - fechaActual;
    if (!fechaReservacion.value || resultadoFechaReservacion < 0) {
      Swal.fire(
        "Opps..!",
        "La fecha de reservación debe ser posterior a la actual.",
        "error"
      );
      return;
    }
        
    if (horaReservacion < "08:00" || horaReservacion > "20:00") {
      Swal.fire(
        "Opps..!",
        "La hora debe ser entre las 8:00 AM y las 8:00 PM.",
        "error"
      );
      return;
    }

    let ocasionTexto =
      ocasionReservacion.options[ocasionReservacion.selectedIndex].text;

    guardarReserva(
      numeroMesa,
      nombreClienteReserva,
      capacidadPersonas,
      fechaReservacion.value,
      horaReservacion,
      ocasionTexto,
      notaAdicionalReserva
    );

    modal.hide();

    Swal.fire(
      "Reserva Aceptada",
      "La reserva fue guardada correctamente",
      "success"
    );

    mesasGuardadas = JSON.parse(localStorage.getItem("mesas"));
    mostrarReservacion();
  };
}

function autoActualizarReservas() {
  setInterval(() => {
    mesasGuardadas = JSON.parse(localStorage.getItem("mesas")) || [];
    mostrarReservacion();
    console.log("✅ Reservas actualizadas automáticamente");
  }, 5 * 60 * 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  let botonPageReservar = document.getElementById("btn-add-reserva");
  if (botonPageReservar) {
    botonPageReservar.addEventListener("click", agregarReserva);
  }

  document
    .getElementById("filtroFecha")
    .addEventListener("change", mostrarReservacion);
  document
    .getElementById("filtroEstado")
    .addEventListener("change", mostrarReservacion);
  document.getElementById("btnLimpiarFiltros").addEventListener("click", () => {
    document.getElementById("filtroFecha").value = "";
    document.getElementById("filtroEstado").value = "";
    mostrarReservacion();
  });

  autoActualizarReservas();
});

function editarReserva(index) {
  let reserva = mesasGuardadas[index].reservacion;

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
  modalEditar.show();

  document.getElementById("botonGuardarCambiosReserva").onclick = () => {
    let nuevoEstado = document.getElementById("estadoEditar").value;

    if (nuevoEstado === "Cancelada" || nuevoEstado === "No Show") {
      mesasGuardadas[index].estado = "Disponible";
      mesasGuardadas[index].reservacion = {};

      Swal.fire(
        "Reserva eliminada",
        `La reserva fue marcada como "${nuevoEstado}" y eliminada`,
        "info"
      );
    } else {
      mesasGuardadas[index].reservacion = {
        nombreClienteReserva: document.getElementById("nombreClienteEditar")
          .value,
        capacidadPersonas: document.getElementById(
          "numeroPersonasEditarReserva"
        ).value,
        fechaReservacion: document.getElementById("fechaEditar").value,
        horaReservacion: document.getElementById("horaEditar").value,
        ocasionTexto: document.getElementById("ocasionEspecialEditar").value,
        notaAdicionalReserva: document.getElementById("notasAdicionalesEditar")
          .value,
        estadoTexto: nuevoEstado,
      };

      Swal.fire(
        "Reserva actualizada",
        "Los cambios fueron guardados con éxito",
        "success"
      );
    }

    localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

    mostrarReservacion();

    bootstrap.Modal.getInstance(
      document.getElementById("modal-editarReserva")
    ).hide();
  };
}
