import { guardarReserva } from "./scriptReservas.js";

let mesasGuardadas = [];

window.onload = function () {
  if (localStorage.getItem("mesas")) {
    mesasGuardadas = JSON.parse(localStorage.getItem("mesas"));
    mostrarMesa(mesasGuardadas);
  }
  console.log(mesasGuardadas);
};

let botonGuardarReserva = document.getElementById("botonGuardar")
botonGuardarReserva.addEventListener("click", () => {
  let numeroMesa = document.getElementById("numeroMesa").value.trim();
  let capacidad = document.getElementById("capacidad").value.trim();
  let ubicacion = document.getElementById("ubicacion").value.trim();
  let estado = document.getElementById("estado").value.trim();    

  if (!numeroMesa) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Digita el numero de la mesa!",
    });
    return;
  }
  if (capacidad <= 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La capacidad debe ser mayor a 0!",
    });
    return;
  }
  if (!ubicacion) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Digita la ubicación de la mesa!",
    });
    return;
  }
  if (!estado) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Selecciona el estado de la mesa!",
    });
    return;
  } else {
    document.getElementById("numeroMesa").value = "";
    document.getElementById("capacidad").value = "";
    document.getElementById("ubicacion").value = "";
    document.getElementById("estado").value = "";

    Swal.fire({
      title: "Estas seguro de guardar los datos?",
      text: "Podras volver a modificarla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then(() => {
      let modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modal-mesas")
      );
      modal.hide();

      const numeroMesaDuplicado = mesasGuardadas.find(
        (mesa) => mesa.numeroMesa === numeroMesa
      );

      if (numeroMesaDuplicado) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El numero de mesa ya existe.",
        });
        return;
      }

      mesasGuardadas.push({
        numeroMesa,
        capacidad,
        ubicacion,
        estado,
      });

      mostrarMesa(mesasGuardadas);
      localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

      Swal.fire({
        title: "Guardada!",
        text: "La mesa fue agregada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  }
})

function mostrarMesa(mesas = []) {
  let containerMesa = document.getElementById("mesas");
  containerMesa.innerHTML = ''; 

  mesas.forEach((mesa, index) => {

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card pt-3';
    cardDiv.style.width = '18rem';

    if (mesa.estado === "Disponible") {
      cardDiv.style.boxShadow = "0 0 12px 3px #28a745"; 
    } else if (mesa.estado === "Ocupada") {
      cardDiv.style.boxShadow = "0 0 12px 3px #007bff";
    } else if (mesa.estado === "Deshabilitada") {
      cardDiv.style.boxShadow = "0 0 12px 3px #000000";
      cardDiv.style.color = "white"; 
      cardDiv.style.backgroundColor = "#222"; 
    }

    const img = document.createElement('img');
    img.src = './src/img/mesaIMG.png';
    img.className = 'card-img-top w-50 m-auto';
    img.alt = '...';
    cardDiv.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = `Mesa #${mesa.numeroMesa}`;
    cardBody.appendChild(h5);

    const cardTextDiv = document.createElement('div');
    cardTextDiv.className = 'card-text';
    cardTextDiv.style.display = 'grid';

    const capacidadSpan = document.createElement('span');
    capacidadSpan.innerHTML = `<b>Capacidad:</b>  ${mesa.capacidad}`;
    cardTextDiv.appendChild(capacidadSpan);

    const ubicacionSpan = document.createElement('span');
    ubicacionSpan.innerHTML = `<b>Ubicación:</b>  ${mesa.ubicacion}`;
    cardTextDiv.appendChild(ubicacionSpan);

    const estadoSpan = document.createElement('span');
    estadoSpan.innerHTML = `<b>Estado:</b>  ${mesa.estado}`;
    cardTextDiv.appendChild(estadoSpan);

    cardBody.appendChild(cardTextDiv);

    const cardButtonDiv = document.createElement('div');
    cardButtonDiv.className = 'card-button mt-4 d-flex flex-row justify-content-evenly';

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger btn-sm';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarMesa(index));
    cardButtonDiv.appendChild(btnEliminar);

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn btn-primary btn-sm';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => editar(index));
    cardButtonDiv.appendChild(btnEditar);

    const btnReservar = document.createElement('button');
    btnReservar.className = 'btn btn-success btn-sm';
    btnReservar.textContent = 'Reservar';
    btnReservar.addEventListener('click', () => reservar(mesa.numeroMesa));
    cardButtonDiv.appendChild(btnReservar);

    cardBody.appendChild(cardButtonDiv);

    cardDiv.appendChild(cardBody);

    containerMesa.appendChild(cardDiv);
  });
}

function eliminarMesa(index) {
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
      mesasGuardadas.splice(index, 1);

      localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));
      mostrarMesa(mesasGuardadas);

      Swal.fire({
        title: "Eliminado!",
        text: "La mesa fue eliminada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

function editar(index) {
  let mesa = mesasGuardadas[index];

  document.getElementById("numeroMesaEditar").value = mesa.numeroMesa;
  document.getElementById("numeroMesaEditar").setAttribute("readonly", true);
  document.getElementById("capacidadEditar").value = mesa.capacidad;
  document.getElementById("ubicacionEditar").value = mesa.ubicacion;
  document.getElementById("estadoEditar").value = mesa.estado;

  window.editandoIndex = index;

  let modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modal-editar")
  );
  modal.show();
}

let botonEditarMesa = document.getElementById("botonGuardarCambios");

botonEditarMesa.addEventListener("click", () => {
  let index = window.editandoIndex;

  mesasGuardadas[index].numeroMesa =
    document.getElementById("numeroMesaEditar").value;
  mesasGuardadas[index].capacidad =
    document.getElementById("capacidadEditar").value;
  mesasGuardadas[index].ubicacion =
    document.getElementById("ubicacionEditar").value;
  mesasGuardadas[index].estado =
    document.getElementById("estadoEditar").value;

  localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));
  mostrarMesa(mesasGuardadas);

  let modal = bootstrap.Modal.getInstance(
    document.getElementById("modal-editar")
  );
  modal.hide();

  Swal.fire({
    icon: "success",
    title: "Mesa editada",
    text: "Los cambios se guardaron correctamente",
  });
});

function reservar(numeroMesa) {
  document.getElementById("mesaSeleccionada").value = numeroMesa;

  let fechaReservacion = document.getElementById("fechaReserva");
  fechaReservacion.setAttribute("min", new Date().toLocaleDateString("en-CA"));

  let modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("modal-reservar")
  );
  modal.show();
}

let botonReservar = document.getElementById("botonGuardarReserva");
botonReservar.addEventListener("click", () => {
  let nombreClienteReserva = document.getElementById("nombreCliente").value.trim();
  let idMesaSeleccionada = document.getElementById("mesaSeleccionada").value;
  let capacidadPersonas = parseInt(document.getElementById("numeroPersonas").value);
  let fechaReservacion = document.getElementById("fechaReserva").value;
  let horaReservacion = document.getElementById("horaReserva").value;
  let duracionReserva = parseInt(document.getElementById("duracionEvento").value) || 60;
  let ocasionReservacion = document.getElementById("ocasionEspecial");
  let notaAdicionalReserva = document.getElementById("notasAdicionales").value.trim();

  let datosMesa = mesasGuardadas.find(m => m.numeroMesa == idMesaSeleccionada);
  if (!datosMesa) return Swal.fire("Error", "Mesa no encontrada", "error");

  const { numeroMesa, capacidad, estado } = datosMesa;

  if (!nombreClienteReserva) return Swal.fire("Opps..!", "Ingrese el nombre del cliente.", "error");

  if (isNaN(capacidadPersonas) || capacidadPersonas < 1 || capacidadPersonas > capacidad) {
    return Swal.fire("Opps..!", `La capacidad debe estar entre 1 y ${capacidad}`, "error");
  }

  if (estado === "Ocupada" || estado === "Deshabilitada") {
    return Swal.fire("Opps..!", "La mesa ya se encuentra ocupada o deshabilitada.", "error");
  }

  if (!fechaReservacion || !horaReservacion) return Swal.fire("Opps..!", "Debes seleccionar fecha y hora", "error");

  let fechaReservacionSeleccionada = new Date(fechaReservacion + "T" + horaReservacion);
  if (isNaN(fechaReservacionSeleccionada.getTime())) {
    return Swal.fire("Opps..!", "Debes seleccionar una fecha válida.", "error");
  }

  if (horaReservacion < "08:00" || horaReservacion > "20:00") {
    return Swal.fire("Opps..!", "La hora debe ser entre las 08:00 AM y las 08:00 PM.", "error");
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

  let ocasionTexto = ocasionReservacion.options[ocasionReservacion.selectedIndex].text;

  let fechaHoraAntes = new Date(fechaReservacionSeleccionada.getTime() - 2 * 60 * 1000);
  let fechaHoraDespues = new Date(fechaReservacionSeleccionada.getTime() + duracionReserva * 60 * 1000);

  if (!Array.isArray(datosMesa.reservaciones)) datosMesa.reservaciones = [];
  datosMesa.reservaciones.push({
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

  datosMesa.estado = "Ocupada";

  localStorage.setItem("mesas", JSON.stringify(mesasGuardadas));

  let modal = bootstrap.Modal.getInstance(document.getElementById("modal-reservar"));
  modal.hide();

  Swal.fire({
    icon: "success",
    title: "Reserva Aceptada",
    text: "La reserva fue guardada correctamente",
  });

  mostrarMesa(mesasGuardadas);
});


 document.getElementById("horaReserva").addEventListener("change", function () {
  const horaReservacion = this.value;
  if (horaReservacion < "08:00" || horaReservacion > "20:00") {
    Swal.fire({
      title: "Opps..! ",
      text: "La hora debe ser entre las 08:00 AM y las 08:00 PM.",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
    this.value = ""; 
  }
});

function autoActualizarMesas() {
  setInterval(() => {
    mesasGuardadas = JSON.parse(localStorage.getItem("mesas")) || [];

    let ahora = new Date();

    mesasGuardadas.forEach(mesa => {
      if (Array.isArray(mesa.reservaciones) && mesa.reservaciones.length > 0) {
        let ocupada = mesa.reservaciones.some(reserva => {
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

    mostrarMesa(mesasGuardadas);

    console.log("✅ Mesas actualizadas automáticamente");
  }, 5000); 
}

window.addEventListener("DOMContentLoaded", () => {
  autoActualizarMesas();
});
