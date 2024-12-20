// Clase Solicitud, se que por estandar las clases deben ir en su propio archivo y iniciar con CamelCase pero bueno, por dejar todo en un mismo archivo lo he metido aqui.
class Solicitud {
    constructor(id, nombre, apellidos, email, telefono, tipoEvento, especificarEvento, lugar, fecha) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
        this.tipoEvento = tipoEvento;
        this.especificarEvento = especificarEvento;
        this.lugar = lugar;
        this.fecha = fecha;
    }
}



// PARA CAMBIAR DE PUBLICO A PRIVADO

$(document).ready(function () {
    // Abrir el dialog al hacer clic en #privado
    $('#privado').on('click', function () {
        // Lo intente hacer utilizando jquery para el selector pero no funciona.
        // const dialog = $('#passwordDialog');
        const dialog = document.getElementById('passwordDialog');
        dialog.showModal();
    });

    // Validar la contraseña al hacer clic en "Acceder"
    $('#submitPassword').on('click', function () {
        const password = $('#passwordInput').val();
        if (password === 'enEsteRetoYoLoPeto') {
            // Si la contraseña es correcta redirige a gestionContrataciones
            window.location.href = '../privado/gestionContrataciones.html';
        } else {
            alert('Contraseña incorrecta. Inténtalo de nuevo.');
        }
    });

    // Cerrar el dialog al hacer clic en "Cancelar"
    $('#closeDialog').on('click', function () {
        // Lo intente hacer utilizando jquery para el selector pero no funciona.
        // const dialog = $('#passwordDialog');
        const dialog = document.getElementById('passwordDialog');
        dialog.close();
    });
});


// PARA CAMBIAR DE PRIVADO A PUBLICO

$(document).ready(function() {
    // Seleccionar el elemento con id "publico"
    $('#publico').on('click', function() {
            window.location.href = '../publico/index.html';
    });
});


// CAMBIAR IMAGENES DE LA GALERIA
// TENGO ESTO HECHO PARA DARLE ESTILOS A TRAVES DE JQUERY PERO HABIA UNOS SEGUNDOS EN LOS QUE SE CARGABA MAL LA IMAGEN, POR ESO HE DECIDIDO AÑADIR UNA HOJA DE ESTILOS PARA DARLE CSS CUANDO CARGUE LA PAGINA, SRY.
$(document).ready(function () {
    // Ajustar tamaño fijo de la imagen principal
    // $('#mainImage').css({
    //     width: '800px',
    //     height: '500px',
    //     objectFit: 'cover',
    //     transition: 'opacity 0.5s ease'
    // });

    // $('.row.overflow-auto').css({
    //     display: 'flex',
    //     overflowX: 'auto',
    //     whiteSpace: 'nowrap',
    //     gap: '10px'
    // });

    // // Ajustar tamaño fijo de las imagenes pequeñas
    // $('.imagen-peque').css({
    //     width: '150px',
    //     height: '100px',
    //     objectFit: 'cover',
    //     cursor: 'pointer',
    //     transition: 'transform 0.3s'
    // });

    // // Agregar efecto hover a las imagenes pequeñas
    // $('.imagen-peque').hover(
    //     function () {
    //         $(this).css('transform', 'scale(1.1)');
    //     },
    //     function () {
    //         $(this).css('transform', 'scale(1)');
    //     }
    // );

    // Cambiar la imagen principal con transición
    $('.imagen-peque').on('click', function () {
        //obtengo los atributos que quiero cambiar
        const textoAlt = $(this).attr('alt');
        const nuevoSource = $(this).attr('src');
        // Transicion de opacidad
        $('#mainImage').css('opacity', '0'); 
        setTimeout(function () {
            $('#mainImage').attr('src', nuevoSource).attr('alt', textoAlt); // Cambiar la imagen
            $('#mainImage').css('opacity', '1');
        }, 500);
    });
});


// CONTRATACIONES

$(document).ready(function () {
    // Validar el campo "Otro" cuando se selecciona
    $('#tipoEvento').on('change', function () {
        if ($(this).val() === 'otro') {
            $('#especificarOtro').removeClass('d-none');
            $('#otroEvento').prop('required', true);
        } else {
            $('#especificarOtro').addClass('d-none');
            $('#otroEvento').prop('required', false);
        }
    });

    // Validacion del formulario
    $('#eventForm').on('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Validar que el nombre no contenga numeros
        const nombre = $('#nombre').val();
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            $('#nombre').addClass('is-invalid');
            isValid = false;
        } else {
            $('#nombre').removeClass('is-invalid');
        }

        // Validar Apellidos que no tenga numeros y que al menos sean dos palabras
        const apellidos = $('#apellidos').val();
        if (!/^[a-zA-Z\s]+$/.test(apellidos) || apellidos.trim().split(' ').length < 2) {
            $('#apellidos').addClass('is-invalid');
            isValid = false;
        } else {
            $('#apellidos').removeClass('is-invalid');
        }

        // Validar email (raro, las validaciones de email son problematicas pero bueno, ahi puse una sacada de internet)
        const email = $('#email').val();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('#email').addClass('is-invalid');
            isValid = false;
        } else {
            $('#email').removeClass('is-invalid');
        }

        // Validar telefono que sean 9 digitos
        const telefono = $('#telefono').val();
        if (!/^\d{9}$/.test(telefono)) {
            $('#telefono').addClass('is-invalid');
            isValid = false;
        } else {
            $('#telefono').removeClass('is-invalid');
        }

        // Validar Lugar
        if (!$('#lugar').val().trim()) {
            $('#lugar').addClass('is-invalid');
            isValid = false;
        } else {
            $('#lugar').removeClass('is-invalid');
        }

        // Validar Fecha
        if (!$('#fecha').val()) {
            $('#fecha').addClass('is-invalid');
            isValid = false;
        } else {
            $('#fecha').removeClass('is-invalid');
        }

        //Si todo esta correcto se crea una instancia de Solicitud
        if (isValid) {
            const nuevaSolicitud = new Solicitud(
                generarIdUnico(), // Generar un ID único
                $('#nombre').val(),
                $('#apellidos').val(),
                $('#email').val(),
                $('#telefono').val(),
                $('#tipoEvento').val(),
                $('#tipoEvento').val() === 'otro' ? $('#otroEvento').val() : '', // Solo si se selecciona "otro"
                $('#lugar').val(),
                $('#fecha').val()
            );
    
            // Guardar la solicitud en LocalStorage
            guardarSolicitudEnLocalStorage(nuevaSolicitud);
    
            // Mostrar confirmacion al usuario
            alert('Solicitud enviada correctamente.');
            this.reset();
        }
    });

        // Generar un ID unico
        function generarIdUnico() {
            return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        }

         // Guardar una solicitud en LocalStorage
        function guardarSolicitudEnLocalStorage(solicitud) {
            const solicitudes = obtenerSolicitudesDeLocalStorage();
            solicitudes.push(solicitud);
            localStorage.setItem('solicitudesDeTrabajo', JSON.stringify(solicitudes));
        }

        // Obtener todas las solicitudes desde LocalStorage
        function obtenerSolicitudesDeLocalStorage() {
            return JSON.parse(localStorage.getItem('solicitudesDeTrabajo')) || [];
        }
});

// Gestion de Solicitudes

// Función para mostrar las solicitudes en la tabla
$(document).ready(function () {
    // Mostrar las solicitudes al cargar la página
    mostrarSolicitudes();

    // Función para obtener solicitudes desde LocalStorage
    function obtenerSolicitudesDeLocalStorage() {
        return JSON.parse(localStorage.getItem('solicitudesDeTrabajo')) || [];
    }

    // Función para guardar solicitudes en LocalStorage
    function guardarSolicitudesEnLocalStorage(solicitudes) {
        localStorage.setItem('solicitudesDeTrabajo', JSON.stringify(solicitudes));
    }

    // Función para obtener trabajos desde LocalStorage
    function obtenerTrabajosDeLocalStorage() {
        return JSON.parse(localStorage.getItem('trabajos')) || [];
    }

    // Función para guardar trabajos en LocalStorage
    function guardarTrabajosEnLocalStorage(trabajos) {
        localStorage.setItem('trabajos', JSON.stringify(trabajos));
    }

    // Función para mostrar las solicitudes en una tabla
    function mostrarSolicitudes() {
        const solicitudes = obtenerSolicitudesDeLocalStorage();

        if (solicitudes.length === 0) {
            $('#listaSolicitudes').html('<p class="text-center">No hay solicitudes de trabajo registradas.</p>');
            return;
        }

        const tabla = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Tipo de Evento</th>
                        <th>Lugar</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${solicitudes.map((solicitud, index) => `
                        <tr>
                            <td>${solicitud.id}</td>
                            <td>${solicitud.nombre}</td>
                            <td>${solicitud.apellidos}</td>
                            <td>${solicitud.email}</td>
                            <td>${solicitud.telefono}</td>
                            <td>${solicitud.tipoEvento}${solicitud.especificarEvento ? ` (${solicitud.especificarEvento})` : ''}</td>
                            <td>${solicitud.lugar}</td>
                            <td>${solicitud.fecha}</td>
                            <td>
                                <button class="btn btn-success btn-sm aceptar-solicitud" data-index="${index}">Aceptar</button>
                                <button class="btn btn-danger btn-sm rechazar-solicitud" data-index="${index}">Rechazar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        $('#listaSolicitudes').html(tabla);

        // Añadir eventos a los botones
        $('.aceptar-solicitud').on('click', function () {
            const index = $(this).data('index');
            aceptarSolicitud(index);
        });

        $('.rechazar-solicitud').on('click', function () {
            const index = $(this).data('index');
            rechazarSolicitud(index);
        });
    }

    // Función para aceptar una solicitud
    function aceptarSolicitud(index) {
        const solicitudes = obtenerSolicitudesDeLocalStorage();
        const solicitudAceptada = solicitudes.splice(index, 1)[0]; // Remover la solicitud del array

        const trabajos = obtenerTrabajosDeLocalStorage();
        trabajos.push(solicitudAceptada); // Guardar la solicitud aceptada en el array de trabajos
        guardarTrabajosEnLocalStorage(trabajos);

        guardarSolicitudesEnLocalStorage(solicitudes); // Actualizar LocalStorage
        mostrarSolicitudes(); // Refrescar la tabla
        alert('Solicitud aceptada y guardada como trabajo.');
    }

    // Función para rechazar una solicitud
    function rechazarSolicitud(index) {
        const solicitudes = obtenerSolicitudesDeLocalStorage();
        solicitudes.splice(index, 1); // Remover la solicitud del array

        guardarSolicitudesEnLocalStorage(solicitudes); // Actualizar LocalStorage
        mostrarSolicitudes(); // Refrescar la tabla
        alert('Solicitud rechazada y eliminada.');
    }
});

// GESTION TRABAJOS

$(document).ready(function () {
    mostrarTrabajos();

    // Función para obtener los trabajos desde LocalStorage
    function obtenerTrabajosDeLocalStorage() {
        return JSON.parse(localStorage.getItem('trabajos')) || [];
    }

    // Función para guardar los trabajos en LocalStorage
    function guardarTrabajosEnLocalStorage(trabajos) {
        localStorage.setItem('trabajos', JSON.stringify(trabajos));
    }

    // Mostrar los trabajos en las tablas
    function mostrarTrabajos() {
        const trabajos = obtenerTrabajosDeLocalStorage();

        const trabajosPendientes = trabajos.filter(trabajo => !trabajo.realizado);
        const trabajosRealizados = trabajos.filter(trabajo => trabajo.realizado);

        mostrarTrabajosPorRealizar(trabajosPendientes);
        mostrarTrabajosRealizados(trabajosRealizados);
    }

    // Mostrar trabajos por realizar
    function mostrarTrabajosPorRealizar(trabajosPendientes) {
        if (trabajosPendientes.length === 0) {
            $('#trabajosPorRealizar').html('<p class="text-center">No hay trabajos por realizar.</p>');
            return;
        }

        const tabla = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Lugar</th>
                        <th>Tipo de Evento</th>
                        <th>Fecha</th>
                        <th>Finalizado</th>
                    </tr>
                </thead>
                <tbody>
                    ${trabajosPendientes.map((trabajo, index) => `
                        <tr id="trabajo-${trabajo.id}">
                            <td>${trabajo.nombre}</td>
                            <td>${trabajo.apellidos}</td>
                            <td>${trabajo.lugar}</td>
                            <td>${trabajo.tipoEvento}${trabajo.especificarEvento ? ` (${trabajo.especificarEvento})` : ''}</td>
                            <td>${trabajo.fecha}</td>
                            <td>
                                <input type="checkbox" class="finalizar-trabajo" data-id="${trabajo.id}">
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        $('#trabajosPorRealizar').html(tabla);

        // Añadir eventos a los checkboxes
        $('.finalizar-trabajo').on('change', function () {
            const id = $(this).data('id');
            finalizarTrabajo(id);
        });
    }

    // Mostrar trabajos realizados
    function mostrarTrabajosRealizados(trabajosRealizados) {
        if (trabajosRealizados.length === 0) {
            $('#trabajosRealizados').html('<p class="text-center">No hay trabajos realizados.</p>');
            return;
        }

        const tabla = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Lugar</th>
                        <th>Fecha</th>
                        <th>Valoración</th>
                    </tr>
                </thead>
                <tbody>
                    ${trabajosRealizados.map(trabajo => `
                        <tr>
                            <td>${trabajo.nombre}</td>
                            <td>${trabajo.lugar}</td>
                            <td>${trabajo.fecha}</td>
                            <td>${trabajo.valoracion}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        $('#trabajosRealizados').html(tabla);
    }

    // Finalizar un trabajo
    function finalizarTrabajo(id) {
        const trabajos = obtenerTrabajosDeLocalStorage();
        const trabajoFinalizado = trabajos.find(trabajo => trabajo.id === id);

        // Mostrar diálogo para valoración
        const dialog = document.getElementById('valoracionDialog');
        dialog.showModal();

        // Al cerrar el diálogo, guardar la valoración
        $(dialog).on('close', function () {
            const valoracion = $('#valoracion').val();

            // Actualizar el estado del trabajo
            trabajoFinalizado.realizado = true;
            trabajoFinalizado.valoracion = valoracion;

            // Actualizar el array de trabajos en LocalStorage
            guardarTrabajosEnLocalStorage(trabajos);

            // Actualizar las tablas con efecto de desvanecimiento
            $(`#trabajo-${id}`).fadeOut(500, function () {
                mostrarTrabajos();
            });
        });
    }
});



