document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const informacion = await axios.get("./src/lugares.json")
    const lugares = informacion.data
    const idLugar = lugares.find(index => index.id == id);
    document.body.style.background=`
    radial-gradient(${idLugar.categoria.colorPrimario}, ${idLugar.categoria.colorSecundario})`

    document.documentElement.style.setProperty('--colorPrimario',idLugar.categoria.colorPrimario);
    document.documentElement.style.setProperty('--colorSecundario',idLugar.categoria.colorSecundario);

    const contenedor = document.getElementById("detalleLugar");
    contenedor.innerHTML = `
          <img src="${idLugar.url_imagen}" alt="${idLugar.nombre}">
    <div class="tarjeta">
      <div class="categoria" style="background-color: ${idLugar.categoria.colorSecundario}; color: ${idLugar.categoria.colorPrimario}">
        ${idLugar.categoria.nombre}
      </div>
      <div class="containerInfo">
        <h2>${idLugar.nombre}</h2>
        <p><strong>${idLugar.ciudad}, ${idLugar.pais}</strong></p>
        <p>${idLugar.descripcion}</p>
        <h3>Datos Interesantes:</h3>
        <div class="datos">
          <ul>${idLugar.datosInteresantes.map(d => `<li>${d.titulo}: ${d.valor}</li>`).join("")}</ul>
        </div>
        <h3>Actividades Recomendadas:</h3>
        <div class="actividades">
          <ul>${idLugar.actividadesRecomendadas.map(a => `<li>${a}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
    <div class="container-botonvolver">
      <a href="index.html" class="boton-volver">⬅ Volver al inicio</a>
    </div>
  `;
});