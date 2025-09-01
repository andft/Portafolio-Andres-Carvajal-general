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
  // Limpiar el contenido existente antes de añadir las nuevas mesas
  containerMesa.innerHTML = ''; 

  mesas.forEach((mesa, index) => {
    // Crear el elemento principal de la tarjeta
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card pt-3';
    cardDiv.style.width = '18rem';

    // Añadir la imagen
    const img = document.createElement('img');
    img.src = './src/img/mesaIMG.png';
    img.className = 'card-img-top w-50 m-auto';
    img.alt = '...';
    cardDiv.appendChild(img);

    // Crear el cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Añadir el título
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = `Mesa #${mesa.numeroMesa}`;
    cardBody.appendChild(h5);

    // Añadir el texto de la tarjeta (capacidad, ubicación, estado)
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

    // Crear el contenedor de botones
    const cardButtonDiv = document.createElement('div');
    cardButtonDiv.className = 'card-button mt-4 d-flex flex-row justify-content-evenly';

    // Botón Eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger btn-sm';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarMesa(index));
    cardButtonDiv.appendChild(btnEliminar);

    // Botón Editar
    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn btn-primary btn-sm';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => editar(index));
    cardButtonDiv.appendChild(btnEditar);

    // Botón Reservar
    const btnReservar = document.createElement('button');
    btnReservar.className = 'btn btn-success btn-sm';
    btnReservar.textContent = 'Reservar';
    btnReservar.addEventListener('click', () => reservar(mesa.numeroMesa));
    cardButtonDiv.appendChild(btnReservar);

    cardBody.appendChild(cardButtonDiv);

    cardDiv.appendChild(cardBody);

    // Añadir la tarjeta al contenedor principal
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
  console.log(numeroMesa);
}

let botonReservar = document.getElementById("botonGuardarReserva");
botonReservar.addEventListener("click", () => {
  let nombreClienteReserva = document.getElementById("nombreCliente").value
  let idMesaSeleccionada = document.getElementById("mesaSeleccionada").value;
  let capacidadPersonas = parseInt(
    document.getElementById("numeroPersonas").value
  );
  let fechaReservacion = document.getElementById("fechaReserva");
  let fechaActual = Date.now();
  let fechaReservacionSegundos = new Date(fechaReservacion.value);
  let horaReservacion = document.getElementById("horaReserva");
  let ocasionReservacion = document.getElementById("ocasionEspecial");
  let notaAdicionalReserva = document.getElementById("notasAdicionales")
  let datosMesas = mesasGuardadas.find(
    (idMesa) => idMesa.numeroMesa == idMesaSeleccionada
  );
  const { numeroMesa, capacidad, ubicacion, estado } = datosMesas;

  if (!nombreClienteReserva) {
    Swal.fire({
      title: "Opps..!",
      text: "Ingrese el nombre.",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
    return;
  }
  if (capacidadPersonas > capacidad || capacidadPersonas < 1) {
    Swal.fire({
      title: "Opps..!",
      text: "La capacidad no puede ser mayor a la de la mesa.",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
    return;
  }
  if (estado == "Ocupada" || estado == "Desabilitada") {
    Swal.fire({
      title: "Opps..!",
      text: "La mesa ya se encuentra reservada o esta desabilitada.",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
    return;
  }

  const resultadoFechaReservacion = fechaReservacionSegundos - fechaActual;
  if (resultadoFechaReservacion < 0) {
    Swal.fire({
      title: "Opps..!",
      text: "La fecha de reservacion debe ser posterior a la actual.",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
    return;
  }

  let ocasionTexto = ocasionReservacion.options[ocasionReservacion.selectedIndex].text

  guardarReserva(numeroMesa, nombreClienteReserva, capacidadPersonas, fechaReservacion.value, horaReservacion.value, ocasionTexto, notaAdicionalReserva.value)

  
  let modal = bootstrap.Modal.getInstance(
    document.getElementById("modal-reservar")
  );
  modal.hide();

  Swal.fire({
    icon: "success",
    title: "Reserva Aceptada",
    text: "La reserva fue guardada correctamente",
  });

  let refrescarCardMesas = mesasGuardadas = JSON.parse(localStorage.getItem("mesas"));
  mostrarMesa(refrescarCardMesas)
});

document.getElementById("horaReserva").addEventListener("change", function () {
    
      const horaReservacion = this.value;

      if (horaReservacion < "08:00" || horaReservacion > "20:00") {
        Swal.fire({
          title: "Opps..!",
          text: "La hora debe ser entre las 8:00 AM y las 8:00 PM.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return
      }
    });
