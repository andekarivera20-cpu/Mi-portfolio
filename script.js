document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       ELEMENTOS PRINCIPALES
    ====================================================== */

    const header =
        document.getElementById("header");

    const menuHamburguesa =
        document.getElementById("menu-hamburguesa");

    const nav =
        document.getElementById("nav");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const cursorLuz =
        document.getElementById("cursor-luz");

    const notificacion =
        document.getElementById("notificacion");

    const textoNotificacion =
        document.getElementById("texto-notificacion");


    /* ======================================================
       AÑO AUTOMÁTICO
    ====================================================== */

    const anio =
        document.getElementById("anio");

    if (anio) {
        anio.textContent =
            new Date().getFullYear();
    }


    /* ======================================================
       HEADER AL HACER SCROLL
    ====================================================== */

    function actualizarHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    }


    window.addEventListener(
        "scroll",
        actualizarHeader
    );

    actualizarHeader();


    /* ======================================================
       MENÚ MÓVIL
    ====================================================== */

    function abrirCerrarMenu() {

        const abierto =
            nav.classList.toggle("activo");


        menuHamburguesa
            .classList
            .toggle(
                "activo",
                abierto
            );


        menuHamburguesa
            .setAttribute(
                "aria-expanded",
                abierto
            );


        document.body
            .classList
            .toggle(
                "menu-abierto",
                abierto
            );
    }


    function cerrarMenu() {

        nav.classList.remove("activo");

        menuHamburguesa
            .classList
            .remove("activo");

        menuHamburguesa
            .setAttribute(
                "aria-expanded",
                "false"
            );

        document.body
            .classList
            .remove("menu-abierto");
    }


    menuHamburguesa.addEventListener(
        "click",
        abrirCerrarMenu
    );


    navLinks.forEach(enlace => {

        enlace.addEventListener(
            "click",
            cerrarMenu
        );

    });


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 820) {
                cerrarMenu();
            }

        }
    );


    /* ======================================================
       CERRAR MENÚ CON ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                nav.classList.contains("activo")
            ) {

                cerrarMenu();

            }

        }
    );


    /* ======================================================
       ANIMACIONES AL HACER SCROLL
    ====================================================== */

    const elementosRevelar =
        document.querySelectorAll(".revelar");


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entradas => {

                    entradas.forEach(
                        entrada => {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target
                                    .classList
                                    .add("visible");


                                observer.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        elementosRevelar.forEach(
            elemento => {

                observer.observe(elemento);

            }
        );

    } else {

        elementosRevelar.forEach(
            elemento => {

                elemento.classList.add(
                    "visible"
                );

            }
        );

    }


    /* ======================================================
       NAVEGACIÓN ACTIVA SEGÚN SCROLL
    ====================================================== */

    const secciones =
        document.querySelectorAll(
            "main section[id]"
        );


    function actualizarNavegacion() {

        let seccionActual = "inicio";


        secciones.forEach(
            seccion => {

                const inicio =
                    seccion.offsetTop - 220;


                const final =
                    inicio +
                    seccion.offsetHeight;


                if (
                    window.scrollY >= inicio &&
                    window.scrollY < final
                ) {

                    seccionActual =
                        seccion.id;

                }

            }
        );


        navLinks.forEach(
            enlace => {

                enlace.classList.remove(
                    "activo"
                );


                if (
                    enlace.getAttribute(
                        "href"
                    ) ===
                    `#${seccionActual}`
                ) {

                    enlace.classList.add(
                        "activo"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        actualizarNavegacion
    );


    actualizarNavegacion();


    /* ======================================================
       EFECTO DE LUZ CON EL RATÓN
    ====================================================== */

    let ratonX = 0;
    let ratonY = 0;

    let luzX = 0;
    let luzY = 0;


    if (
        cursorLuz &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                ratonX =
                    event.clientX;

                ratonY =
                    event.clientY;


                cursorLuz.style.opacity =
                    "1";

            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                cursorLuz.style.opacity =
                    "0";

            }
        );


        function animarLuz() {

            /*
                En vez de poner la luz
                directamente en el ratón,
                hacemos que lo siga suavemente.
            */

            luzX +=
                (ratonX - luzX) * 0.08;

            luzY +=
                (ratonY - luzY) * 0.08;


            cursorLuz.style.left =
                `${luzX}px`;

            cursorLuz.style.top =
                `${luzY}px`;


            requestAnimationFrame(
                animarLuz
            );

        }


        animarLuz();

    }


    /* ======================================================
       EFECTO PROYECTOS CON RATÓN
    ====================================================== */

    const proyectos =
        document.querySelectorAll(
            ".proyecto"
        );


    proyectos.forEach(
        proyecto => {

            const visual =
                proyecto.querySelector(
                    ".proyecto-visual"
                );


            const mockup =
                proyecto.querySelector(
                    ".mockup-navegador"
                );


            if (
                !visual ||
                !mockup
            ) {
                return;
            }


            visual.addEventListener(
                "mousemove",
                event => {

                    /*
                        Solo hacemos el efecto
                        en ordenadores.
                    */

                    if (
                        window.innerWidth <=
                        820
                    ) {
                        return;
                    }


                    const rect =
                        visual.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const centroX =
                        rect.width / 2;

                    const centroY =
                        rect.height / 2;


                    const rotacionY =
                        (
                            x -
                            centroX
                        ) /
                        centroX *
                        2;


                    const rotacionX =
                        -(
                            y -
                            centroY
                        ) /
                        centroY *
                        2;


                    mockup.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${rotacionX}deg)
                        rotateY(${rotacionY}deg)
                        scale(1.025)
                        `;

                }
            );


            visual.addEventListener(
                "mouseleave",
                () => {

                    mockup.style.transform =
                        "";

                }
            );

        }
    );


    /* ======================================================
       NOTIFICACIONES
    ====================================================== */

    let temporizadorNotificacion;


    function mostrarNotificacion(
        mensaje
    ) {

        if (
            !notificacion ||
            !textoNotificacion
        ) {
            return;
        }


        textoNotificacion.textContent =
            mensaje;


        notificacion
            .classList
            .add("visible");


        clearTimeout(
            temporizadorNotificacion
        );


        temporizadorNotificacion =
            setTimeout(
                () => {

                    notificacion
                        .classList
                        .remove("visible");

                },
                2500
            );

    }


    /* ======================================================
       ENLACES DE PROYECTOS SIN CONFIGURAR
    ====================================================== */

    const enlacesProyecto =
        document.querySelectorAll(
            ".enlace-proyecto"
        );


    enlacesProyecto.forEach(
        enlace => {

            enlace.addEventListener(
                "click",
                event => {

                    const href =
                        enlace.getAttribute(
                            "href"
                        );


                    /*
                        Si todavía pone #,
                        evitamos que abra
                        una página vacía.
                    */

                    if (
                        !href ||
                        href === "#"
                    ) {

                        event.preventDefault();


                        mostrarNotificacion(
                            "Falta añadir la URL de este proyecto"
                        );

                    }

                }
            );

        }
    );


    /* ======================================================
       EFECTO DE APARICIÓN ESCALONADA
       EN HABILIDADES
    ====================================================== */

    const habilidades =
        document.querySelectorAll(
            ".habilidad-bloque"
        );


    habilidades.forEach(
        (habilidad, indice) => {

            habilidad.style
                .transitionDelay =
                `${indice * 100}ms`;

        }
    );


    /* ======================================================
       EFECTO ESCALONADO EN LOS PASOS
    ====================================================== */

    const pasos =
        document.querySelectorAll(
            ".paso"
        );


    pasos.forEach(
        (paso, indice) => {

            paso.style
                .transitionDelay =
                `${indice * 90}ms`;

        }
    );


    /* ======================================================
       EFECTO ESCALONADO EN DATOS PERSONALES
    ====================================================== */

    const datos =
        document.querySelectorAll(
            ".dato"
        );


    datos.forEach(
        (dato, indice) => {

            dato.style
                .transitionDelay =
                `${indice * 80}ms`;

        }
    );


    /* ======================================================
       SCROLL SUAVE PARA ENLACES INTERNOS
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            enlace => {

                enlace.addEventListener(
                    "click",
                    event => {

                        const destino =
                            enlace.getAttribute(
                                "href"
                            );


                        if (
                            destino === "#" ||
                            destino.length <= 1
                        ) {
                            return;
                        }


                        const elemento =
                            document.querySelector(
                                destino
                            );


                        if (!elemento) {
                            return;
                        }


                        event.preventDefault();


                        elemento.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );


    /* ======================================================
       PEQUEÑO EFECTO EN TECNOLOGÍAS
    ====================================================== */

    const tecnologias =
        document.querySelectorAll(
            ".hero-tecnologias span"
        );


    tecnologias.forEach(
        tecnologia => {

            tecnologia.addEventListener(
                "mouseenter",
                () => {

                    tecnologia.style
                        .borderColor =
                        "rgba(124, 255, 178, 0.6)";


                    tecnologia.style.color =
                        "#7cffb2";

                }
            );


            tecnologia.addEventListener(
                "mouseleave",
                () => {

                    tecnologia.style
                        .borderColor =
                        "";


                    tecnologia.style.color =
                        "";

                }
            );

        }
    );


    /* ======================================================
       INICIALIZACIÓN
    ====================================================== */

    actualizarHeader();

    actualizarNavegacion();

});