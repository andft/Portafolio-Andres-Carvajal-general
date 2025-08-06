document.addEventListener("DOMContentLoaded", async()=>{
    const informacion = await axios.get("./src/lugares.json")
    console.log(informacion);
    const datos = informacion.data;

    const containerLugares = document.getElementById("containerLugares")

    datos.forEach((lugares) => {
        const divLugar = document.createElement("div")
        divLugar.className = "lugar"

        divLugar.style.setProperty('--colorPrimario', lugares.categoria.colorPrimario);
        divLugar.style.setProperty('--colorSecundario', lugares.categoria.colorSecundario);

        divLugar.innerHTML = `
        <a href="./infoLugar.html?id=${lugares.id}">
            <img src="${lugares.url_imagen}" alt="${lugares.nombre}">
            <div class="categoria"  style="background-color: ${lugares.categoria.colorPrimario}">
                ${lugares.categoria.nombre}
            </div>
            <div class="contenido">
                <h3>${lugares.nombre}</h3>
                <p>${lugares.ciudad}, ${lugares.pais}</p>
            </div>
        </a>`;

        containerLugares.appendChild(divLugar)
    });
});