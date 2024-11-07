// Lista de grupos y preguntas
const grupos = [
    ["Miguel C", "Jelovale Emiliano", "Sofia Navarro", "Tatiana Cordova", "Gabriela Cori", "Rocio Herrera"],
    
    ["Miguel Garcia", "Noelia Zurita", "Robert Marcano", "Ivan Ramoneda", "Jazmin villca Bustos", "Rosaura Ferreira"],
    ["Lucas S.", "Martin Nicolini", "Barbara B.", "Richard Blanco", "Rosa Gonzalez", "Karen Medina"],
    ["Stefania C.", "Sonia Alarcon", "Tamara brignole", "Irene Nuñez", "Martin licari", "Karen Calla"],
    ["Miguel Carbajal", "Mario Antonio", "Avril Bedon", "Jonathan Medina", "Milagros C.", "Carlos Sanchez"],
    ["Emiliano Martinez", "Adrian Pastorini", "Leandro Marcoida", "Bruno Antezana", "Kevin Checo", "Leandro Ortega"]
  ];
  /*LOS INFORMATICOS
  UNIDADES
  tech dogs
  tipo alpha
  la doce
  los buguea2
  dota optimist
   */
  
  const preguntas = [
    // Preguntas de HTML
    "¿Qué es una etiqueta HTML?",
    "¿Para qué se utiliza la etiqueta `<meta>` en HTML?",
    "¿Cuál es la diferencia entre `<div>` y `<span>`?",
    "¿Cómo se inserta una imagen en HTML?",
    "¿Qué atributo se usa para establecer un enlace en una etiqueta `<a>`?",
    "¿Para qué sirve la etiqueta `<section>`?",
    "¿Qué es el DOCTYPE en un documento HTML?",
    "¿Cómo defines una lista ordenada y una lista desordenada en HTML?",
    "¿Qué atributo se usa en el formulario para enviar datos a una URL específica?",
    "¿Qué es la etiqueta `<header>` y para qué se usa?",
  
    // Preguntas de CSS
    "¿Qué significa CSS y para qué se utiliza?",
    "¿Cómo aplicas un color de fondo en CSS?",
    "¿Qué es un selector de clase en CSS?",
    "¿Cómo se centra un elemento en CSS?",
    "¿Cuál es la diferencia entre `padding` y `margin`?",
    "¿Qué es el modelo de caja (box model) en CSS?",
    "¿Cómo se aplica una fuente personalizada en CSS?",
    "¿Qué propiedad en CSS cambia la visibilidad de un elemento?",
    "¿Qué es una pseudoclase en CSS? Da un ejemplo.",
    "¿Cuál es la función de `display: none` y en qué se diferencia de `visibility: hidden`?",
  
    // Preguntas de Flexbox
    "¿Qué es Flexbox y para qué se utiliza?",
    "¿Cómo se define un contenedor flex en CSS?",
    "¿Qué propiedad se utiliza para alinear los elementos de un contenedor flex en el eje principal?",
    "¿Cuál es la función de `justify-content` en Flexbox?",
    "¿Qué hace la propiedad `align-items` en Flexbox?",
    "¿Qué diferencia hay entre `justify-content` y `align-items`?",
    "¿Para qué sirve la propiedad `flex-direction`?",
    "¿Qué valor de `flex-direction` se usa para alinear elementos en columna?",
    "¿Cómo se utiliza `flex-wrap` en Flexbox y para qué sirve?",
    "¿Cuál es la diferencia entre `align-content` y `align-items` en Flexbox?",
  
    // Preguntas de Git (comandos básicos)
    "¿Qué es Git y para qué se utiliza?",
    "¿Cuál es el comando para inicializar un repositorio en Git?",
    "¿Cómo se clona un repositorio remoto en Git?",
    "¿Qué hace el comando `git status`?",
    "¿Cómo se agrega un archivo al área de preparación (staging area) en Git?",
    "¿Para qué sirve el comando `git commit`?",
    "¿Qué comando se usa para ver el historial de commits en Git?",
    "¿Cómo se crea una nueva rama en Git?",
    "¿Qué hace el comando `git merge`?",
    "¿Cómo se deshacen cambios en el área de preparación usando Git?",
    "¿Qué comando en Git se usa para actualizar un repositorio local desde uno remoto?",
    "¿Cuál es la diferencia entre `git pull` y `git fetch`?"
  ];
  
  
  // Rastro de preguntas usadas por cada grupo
  let preguntasPorGrupo = Array.from({ length: grupos.length }, () => []);
  let grupoActual = 0;
  let personaIndex = 0;
  let timer; // Referencia al temporizador
  let timeLeft = 20; // Tiempo inicial de 20 segundos
  
  // Sonidos
  const tickSound = document.getElementById("tick-sound");
  const endSound = document.getElementById("end-sound");
  
  // Función para iniciar el temporizador
  function startTimer() {
    timeLeft = 20; // Reinicia el tiempo
    const timerDisplay = document.getElementById("timer");
  
    // Actualiza el temporizador cada segundo
    timer = setInterval(() => {
      timeLeft--;
  
      // Sonido de conteo en cada segundo
      tickSound.play();
  
      // Cambia el color a rojo cuando quedan 5 segundos o menos
      timerDisplay.style.color = timeLeft <= 5 ? "red" : "green";
      timerDisplay.textContent = timeLeft;
  
      // Si el tiempo se acaba, pasa a la siguiente pregunta automáticamente
      if (timeLeft <= 0) {
        clearInterval(timer); // Detiene el temporizador
        endSound.play(); // Reproduce el sonido de fin del tiempo
        generateQuestion(); // Pasa a la siguiente pregunta
      }
    }, 1000);
  }
  
  // Función para detener el temporizador
  function stopTimer() {
    clearInterval(timer);
  }
  
  // Función para generar una nueva pregunta
  function generateQuestion() {
    clearInterval(timer); // Detiene el temporizador actual si ya hay uno en ejecución
    startTimer(); // Inicia un nuevo temporizador para la siguiente pregunta
  
    // Verifica si hemos completado todos los grupos
    if (grupoActual >= grupos.length) {
      document.getElementById("question-container").innerHTML = "<p>¡El quiz ha terminado!</p>";
      document.getElementById("next-button").disabled = true;
      document.getElementById("timer").style.display = "none"; // Oculta el temporizador
      return;
    }
  
    // Selecciona la persona actual en el grupo
    const persona = grupos[grupoActual][personaIndex];
  
    // Selecciona una pregunta que no haya sido usada en este grupo
    let pregunta;
    do {
      pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
    } while (preguntasPorGrupo[grupoActual].includes(pregunta));
  
    // Marca la pregunta como usada para este grupo
    preguntasPorGrupo[grupoActual].push(pregunta);
  
    // Muestra la persona y la pregunta
    document.getElementById("group-person-name").innerHTML = /*Grupo ${grupoActual + 1},*/` <h1 class="nombre">${persona}</h1>`;
    document.getElementById("question-text").textContent = pregunta;
  
    // Avanza a la siguiente persona o grupo cuando se termine el actual
    personaIndex++;
    if (personaIndex >= grupos[grupoActual].length) {
      personaIndex = 0;
      grupoActual++;
    }
  }
  
  // Inicializa la primera pregunta y el temporizador
  generateQuestion();
  