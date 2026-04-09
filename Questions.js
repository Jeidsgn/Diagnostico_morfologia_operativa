const questionsData = [
    {
        "id": 1, "axis": "x", "label": "Forma", "text": "Las últimas tareas…", "options": [
            { "value": 4, "text": "Son muy similares" },
            { "value": 3, "text": "Tienen una base común con variaciones" },
            { "value": 2, "text": "Son diferentes con algunos patrones" },
            { "value": 1, "text": "Son totalmente diferentes" }
        ]
    },
    {
        "id": 2, "axis": "y", "label": "Referencia", "text": "Cuando alguien no sabe cómo proceder…", "options": [
            { "value": 4, "text": "Busca en la documentación o procesos existentes" },
            { "value": 3, "text": "Pregunta a alguien con experiencia" },
            { "value": 2, "text": "Decide según su criterio y se ajusta si es necesario" },
            { "value": 1, "text": "Se escala a una decisión central antes de avanzar" }
        ]
    },
    {
        "id": 3, "axis": "x", "label": "Estructura", "text": "El trabajo que realiza el equipo se puede describir como…", "options": [
            { "value": 4, "text": "Secuencias repetibles" },
            { "value": 3, "text": "Procesos conocidos con ajustes" },
            { "value": 2, "text": "Mezcla de tareas repetibles y encargos únicos" },
            { "value": 1, "text": "Situaciones nuevas cada vez" }
        ]
    },
    {
        "id": 4, "axis": "y", "label": "Criterio", "text": "Las decisiones sobre cómo hacer el trabajo suelen…", "options": [
            { "value": 4, "text": "Seguir procesos establecidos" },
            { "value": 3, "text": "Basarse en la experiencia individual" },
            { "value": 2, "text": "Requerir aprobación central" },
            { "value": 1, "text": "Definirse caso por caso" }
        ]
    },
    {
        "id": 5, "axis": "x", "label": "Previsibilidad", "text": "El tipo de trabajo del próximo mes…", "options": [
            { "value": 4, "text": "Es predecible" },
            { "value": 3, "text": "Se puede estimar con variaciones" },
            { "value": 2, "text": "Es difícil de predecir, pero se puede aproximar" },
            { "value": 1, "text": "Depende de lo que llegue" }
        ]
    },
    {
        "id": 6, "axis": "y", "label": "Delegación", "text": "Una tarea CRÍTICA hoy…", "options": [
            { "value": 4, "text": "Se ejecuta con el protocolo existente" },
            { "value": 3, "text": "Requiere acompañamiento inicial y luego fluye" },
            { "value": 2, "text": "Depende de a quién se le asigne" },
            { "value": 1, "text": "Necesita supervisión constante o intervención directa" }
        ]
    }
];

const welcomeQuestionsData = {
    title: "INFORMACIÓN INICIAL",
    text: "Para personalizar tu experiencia, necesitamos conocer un par de detalles informativos antes de empezar.",
    questions: [
        {
            id: "user-org-size",
            label: "TAMAÑO DE LA ORGANIZACIÓN",
            options: [
                { value: "Micro (1-10)", text: "Micro (1-10 empleados)" },
                { value: "Pequeña (11-50)", text: "Pequeña (11-50 empleados)" },
                { value: "Mediana (51-250)", text: "Mediana (51-250 empleados)" },
                { value: "Grande (251-1000)", text: "Grande (251-1000 empleados)" },
                { value: "Corporativo (+1000)", text: "Corporativo (+1000 empleados)" },
                { value: "Prefiero no responder", text: "Prefiero no responder" }
            ]
        },
        {
            id: "user-industry",
            label: "INDUSTRIA",
            options: [
                { value: "Tecnología / Software", text: "Tecnología / Software" },
                { value: "Comercio / Retail", text: "Comercio / Retail" },
                { value: "Manufactura / Industria", text: "Manufactura / Industria" },
                { value: "Servicios Profesionales", text: "Servicios Profesionales / Agencia" },
                { value: "Salud / Médico", text: "Salud / Médico" },
                { value: "Educación", text: "Educación" },
                { value: "Finanzas / Seguros", text: "Finanzas / Seguros" },
                { value: "Entretenimiento / Medios", text: "Entretenimiento / Medios" },
                { value: "Otra", text: "Otra" },
                { value: "Prefiero no responder", text: "Prefiero no responder" }
            ]
        }
    ]
};
