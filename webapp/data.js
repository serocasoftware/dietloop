// ============================================
// DietLoop - Datos del Plan
// ============================================

// Datos del usuario
const userData = {
    name: "Usuario",
    age: 41,
    height: 174,
    initialWeight: 85,
    targetWeight: 72,
    startDate: "2026-02-09" // Primer lunes después de hoy
};

// Registro de pesos (se actualiza con el tiempo)
let weightLog = JSON.parse(localStorage.getItem('dietloop_weights')) || [
    { date: "2026-02-09", weight: 85, month: 1, week: 1 }
];

// Objetivos mensuales
const monthlyGoals = {
    1: { startWeight: 85, targetWeight: 82.5, minTarget: 82, maxTarget: 83 },
    2: { startWeight: 82.5, targetWeight: 80, minTarget: 79.5, maxTarget: 80.5 },
    3: { startWeight: 80, targetWeight: 77.5, minTarget: 77, maxTarget: 78 },
    4: { startWeight: 77.5, targetWeight: 75, minTarget: 74.5, maxTarget: 75.5 },
    5: { startWeight: 75, targetWeight: 72.5, minTarget: 72, maxTarget: 73 },
    6: { startWeight: 72.5, targetWeight: 72, minTarget: 71.5, maxTarget: 72.5 }
};

// Datos del Mes 1
const monthData = {
    1: {
        title: "Mes 1 - Adaptación",
        calories: "1.800-1.900 kcal",
        protein: "100-110g",
        carbs: "180-200g",
        fat: "55-65g",
        water: "2-2.5 L",
        exerciseHours: 3,
        exerciseSessions: 4,
        exerciseLevel: "Principiante",
        fcmTarget: "90-107 ppm",
        
        // Plan de ejercicio por semana
        exercise: {
            1: {
                monday: {
                    title: "Caminata + Movilidad",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Caminar muy suave", "Movimientos articulares"] },
                        { name: "Principal", duration: "30 min", exercises: ["Caminata a ritmo cómodo (puedes mantener conversación)"] },
                        { name: "Vuelta a la calma", duration: "5 min", exercises: ["Caminar muy despacio"] },
                        { name: "Estiramientos", duration: "5 min", exercises: ["Cuádriceps", "Isquiotibiales", "Gemelos", "Espalda"] }
                    ]
                },
                wednesday: {
                    title: "Fuerza Básica",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Marcha en el sitio", "Rotaciones de brazos y cadera"] },
                        { name: "Circuito (2 rondas)", duration: "35 min", exercises: [
                            "Sentadillas asistidas (con silla): 10 reps",
                            "Flexiones en pared: 10 reps",
                            "Zancadas estáticas: 8 por pierna",
                            "Remo con botella 1.5L: 12 por brazo",
                            "Plancha frontal: 15 segundos",
                            "Elevaciones de talones: 15 reps",
                            "Descanso 60s entre ejercicios"
                        ]},
                        { name: "Estiramientos", duration: "5 min", exercises: ["Cuerpo completo"] }
                    ]
                },
                friday: {
                    title: "Cardio Suave",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Movilidad articular", "Caminar suave"] },
                        { name: "Principal", duration: "35 min", exercises: ["Bicicleta estática o caminata rápida"] },
                        { name: "Vuelta a la calma", duration: "5 min", exercises: ["Estiramientos de piernas"] }
                    ]
                },
                sunday: {
                    title: "Caminata Larga",
                    duration: "45 min",
                    blocks: [
                        { name: "Completo", duration: "45 min", exercises: ["Caminata continua al aire libre, ritmo moderado"] }
                    ]
                }
            },
            2: {
                monday: {
                    title: "Caminata con Intervalos",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Caminar suave"] },
                        { name: "Principal", duration: "35 min", exercises: ["Alternar: 4 min caminata normal + 1 min caminata rápida"] },
                        { name: "Vuelta a la calma", duration: "5 min", exercises: ["Estiramientos"] }
                    ]
                },
                wednesday: {
                    title: "Fuerza Básica",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Marcha en el sitio", "Rotaciones"] },
                        { name: "Circuito (2 rondas, 50s descanso)", duration: "35 min", exercises: [
                            "Sentadillas asistidas: 12 reps",
                            "Flexiones en pared: 12 reps",
                            "Zancadas estáticas: 10 por pierna",
                            "Remo con botella: 14 por brazo",
                            "Plancha frontal: 20 segundos",
                            "Elevaciones de talones: 18 reps",
                            "Puente de glúteos: 12 reps (NUEVO)"
                        ]},
                        { name: "Estiramientos", duration: "5 min", exercises: ["Cuerpo completo"] }
                    ]
                },
                friday: {
                    title: "Cardio Suave",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Movilidad articular"] },
                        { name: "Principal", duration: "35 min", exercises: ["Bicicleta o caminata rápida", "Intenta mantener ritmo ligeramente más alto"] },
                        { name: "Vuelta a la calma", duration: "5 min", exercises: ["Estiramientos"] }
                    ]
                },
                sunday: {
                    title: "Caminata Larga",
                    duration: "45 min",
                    blocks: [
                        { name: "Completo", duration: "45 min", exercises: ["Buscar recorrido con alguna pendiente suave"] }
                    ]
                }
            },
            3: {
                monday: {
                    title: "Caminata con Intervalos",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Caminar suave"] },
                        { name: "Principal", duration: "35 min", exercises: ["Alternar: 3 min caminata normal + 2 min caminata rápida"] },
                        { name: "Vuelta a la calma", duration: "5 min", exercises: ["Estiramientos"] }
                    ]
                },
                wednesday: {
                    title: "Fuerza Básica",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Movilidad completa"] },
                        { name: "Circuito (2 rondas, 45s descanso)", duration: "35 min", exercises: [
                            "Sentadillas (sin asistencia): 12 reps",
                            "Flexiones inclinadas (manos en mesa): 10 reps",
                            "Zancadas alternas: 10 por pierna",
                            "Remo con 2 botellas: 12 reps",
                            "Plancha frontal: 25 segundos",
                            "Elevaciones de talones: 20 reps",
                            "Puente de glúteos: 15 reps",
                            "Superman: 10 reps (NUEVO)"
                        ]},
                        { name: "Estiramientos", duration: "5 min", exercises: ["Cuerpo completo"] }
                    ]
                },
                friday: {
                    title: "Cardio Moderado",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Movilidad"] },
                        { name: "Principal", duration: "35 min", exercises: ["Bicicleta o caminata rápida", "Respiras más rápido pero puedes hablar"] },
                        { name: "Vuelta a la calma", duration: "5 min", exercises: ["Estiramientos"] }
                    ]
                },
                sunday: {
                    title: "Caminata Larga",
                    duration: "45 min",
                    blocks: [
                        { name: "Completo", duration: "45 min", exercises: ["Aumentar el paso los últimos 15 minutos"] }
                    ]
                }
            },
            4: {
                monday: {
                    title: "Caminata con Intervalos",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Caminar suave"] },
                        { name: "Principal", duration: "35 min", exercises: ["Alternar: 2 min caminata normal + 2 min caminata rápida"] },
                        { name: "Vuelta a la calma", duration: "5 min", exercises: ["Estiramientos"] }
                    ]
                },
                wednesday: {
                    title: "Fuerza Básica",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Movilidad completa"] },
                        { name: "Circuito (3 rondas, 45s descanso)", duration: "35 min", exercises: [
                            "Sentadillas: 12 reps",
                            "Flexiones inclinadas: 12 reps",
                            "Zancadas alternas: 12 por pierna",
                            "Remo con botellas: 14 reps",
                            "Plancha frontal: 30 segundos",
                            "Puente de glúteos: 15 reps",
                            "Superman: 12 reps"
                        ]},
                        { name: "Estiramientos", duration: "5 min", exercises: ["Cuerpo completo"] }
                    ]
                },
                friday: {
                    title: "Cardio Moderado",
                    duration: "45 min",
                    blocks: [
                        { name: "Calentamiento", duration: "5 min", exercises: ["Movilidad"] },
                        { name: "Principal", duration: "35 min", exercises: ["Mantener ritmo constante toda la sesión"] },
                        { name: "Vuelta a la calma", duration: "5 min", exercises: ["Estiramientos"] }
                    ]
                },
                sunday: {
                    title: "Caminata Larga",
                    duration: "45 min",
                    blocks: [
                        { name: "Completo", duration: "45 min", exercises: ["Ritmo moderado-alto durante todo el recorrido"] }
                    ]
                }
            }
        },
        
        // Plan de dieta por semana y día
        diet: {
            1: {
                monday: {
                    desayuno: { food: "Yogur natural + copos de avena + fresas", quantity: "150g yogur + 40g avena + 100g fresas" },
                    almuerzo: { food: "Manzana + nueces", quantity: "1 manzana + 20g nueces" },
                    comida: { food: "Pechuga de pollo a la plancha + arroz integral + judías verdes salteadas", quantity: "150g pollo + 70g arroz + 150g judías" },
                    merienda: { food: "Yogur natural", quantity: "125g" },
                    cena: { food: "Tortilla francesa (2 huevos) + ensalada mixta (lechuga, tomate, zanahoria)", quantity: "2 huevos + ensalada abundante" }
                },
                tuesday: {
                    desayuno: { food: "Tostadas integrales con tomate + AOVE + huevo cocido", quantity: "2 rebanadas + 1 huevo" },
                    almuerzo: { food: "Plátano pequeño", quantity: "1 unidad" },
                    comida: { food: "Lentejas estofadas con zanahoria y puerro", quantity: "80g lentejas + verduras" },
                    merienda: { food: "Queso fresco con miel y nueces", quantity: "80g queso + 10g miel + 15g nueces" },
                    cena: { food: "Merluza al horno con calabacín", quantity: "150g merluza + 200g calabacín" }
                },
                wednesday: {
                    desayuno: { food: "Batido de leche semidesnatada + plátano + avena + canela", quantity: "200ml leche + plátano + 30g avena" },
                    almuerzo: { food: "Tostada integral con pavo", quantity: "1 rebanada + 2 lonchas" },
                    comida: { food: "Pasta integral con atún y salsa de tomate casera", quantity: "70g pasta + 80g atún + tomate" },
                    merienda: { food: "Pera + almendras", quantity: "1 pera + 15g almendras" },
                    cena: { food: "Crema de calabaza + huevo cocido", quantity: "1 bol + 1 huevo" }
                },
                thursday: {
                    desayuno: { food: "Yogur griego natural + arándanos + nueces", quantity: "150g yogur + 80g arándanos + 20g nueces" },
                    almuerzo: { food: "Zanahoria baby", quantity: "100g" },
                    comida: { food: "Salmón a la plancha + arroz integral + espinacas salteadas", quantity: "150g salmón + 60g arroz integral + 100g espinacas" },
                    merienda: { food: "Yogur natural con miel", quantity: "125g yogur + 10g miel" },
                    cena: { food: "Revuelto de pavo con champiñones + ensalada", quantity: "100g pavo + 100g champiñones" }
                },
                friday: {
                    desayuno: { food: "Tostadas integrales con aguacate y tomate", quantity: "2 rebanadas + 1/2 aguacate + tomate" },
                    almuerzo: { food: "Naranja + anacardos", quantity: "1 naranja + 20g anacardos" },
                    comida: { food: "Ternera magra a la plancha + patatas cocidas + pimientos asados", quantity: "150g ternera + 150g patata + pimientos" },
                    merienda: { food: "Batido de leche con cacao puro sin azúcar y plátano", quantity: "200ml leche + cacao + 1/2 plátano" },
                    cena: { food: "Lenguado al vapor con limón + ensalada verde", quantity: "150g lenguado + ensalada" }
                },
                saturday: {
                    desayuno: { food: "Huevos revueltos con tomate + pan integral", quantity: "2 huevos + tomate + 1 rebanada" },
                    almuerzo: { food: "Mandarina", quantity: "2 mandarinas" },
                    comida: { food: "Paella de pollo y verduras (controlada)", quantity: "1 ración moderada" },
                    merienda: { food: "Yogur natural con fresas", quantity: "125g yogur + 80g fresas" },
                    cena: { food: "Pechuga de pavo a la plancha + espárragos", quantity: "120g pavo + 150g espárragos" }
                },
                sunday: {
                    desayuno: { food: "Tostadas integrales con queso fresco y tomate", quantity: "2 rebanadas + 60g queso + tomate" },
                    almuerzo: { food: "Manzana", quantity: "1 unidad" },
                    comida: { food: "🎉 COMIDA LIBRE - Elige lo que te apetezca (ración normal)", quantity: "Sin excesos" },
                    merienda: { food: "Opcional", quantity: "Si tienes hambre" },
                    cena: { food: "Crema de zanahoria + tortilla francesa", quantity: "1 bol + 2 huevos" }
                }
            },
            2: {
                monday: {
                    desayuno: { food: "Queso fresco con miel y fresas", quantity: "100g queso + 15g miel + 80g fresas" },
                    almuerzo: { food: "Yogur natural + nueces", quantity: "125g yogur + 15g nueces" },
                    comida: { food: "Pollo al horno con boniato y pimiento", quantity: "150g pollo + 150g boniato + pimiento" },
                    merienda: { food: "Mandarina", quantity: "2 mandarinas" },
                    cena: { food: "Lubina a la sal con ensalada", quantity: "150g lubina + ensalada" }
                },
                tuesday: {
                    desayuno: { food: "Avena cocida con leche + canela + manzana troceada", quantity: "40g avena + 200ml leche + manzana" },
                    almuerzo: { food: "Tostada integral con tomate y aceite", quantity: "1 rebanada" },
                    comida: { food: "Alubias blancas con verduras (zanahoria, puerro, apio)", quantity: "80g alubias + verduras" },
                    merienda: { food: "Yogur griego natural", quantity: "125g" },
                    cena: { food: "Huevos al plato con jamón serrano", quantity: "2 huevos + 30g jamón" }
                },
                wednesday: {
                    desayuno: { food: "Batido de yogur + plátano + avena", quantity: "150g yogur + 1 plátano + 30g avena" },
                    almuerzo: { food: "Pera + almendras", quantity: "1 pera + 20g almendras" },
                    comida: { food: "Dorada al horno con patatas panaderas y cebolla", quantity: "180g dorada + 120g patata + cebolla" },
                    merienda: { food: "Queso fresco", quantity: "80g" },
                    cena: { food: "Ensalada completa (lechuga, tomate, atún, huevo, maíz)", quantity: "Ensalada abundante" }
                },
                thursday: {
                    desayuno: { food: "Tostadas integrales con pavo y queso fresco", quantity: "2 rebanadas + 2 lonchas + 40g queso" },
                    almuerzo: { food: "Melocotón", quantity: "1 unidad grande" },
                    comida: { food: "Arroz integral salteado con verduras y huevo", quantity: "70g arroz + verduras + 1 huevo" },
                    merienda: { food: "Yogur con arándanos", quantity: "125g yogur + 60g arándanos" },
                    cena: { food: "Pechuga de pollo con champiñones", quantity: "130g pollo + 120g champiñones" }
                },
                friday: {
                    desayuno: { food: "Yogur natural + muesli sin azúcar + fresas", quantity: "150g yogur + 40g muesli + fresas" },
                    almuerzo: { food: "Zanahoria rallada con limón", quantity: "1 zanahoria" },
                    comida: { food: "Espaguetis integrales con gambas y ajo", quantity: "70g pasta + 100g gambas" },
                    merienda: { food: "Plátano", quantity: "1 unidad pequeña" },
                    cena: { food: "Tortilla de espinacas + pan integral", quantity: "2 huevos + 80g espinacas + 1 rebanada" }
                },
                saturday: {
                    desayuno: { food: "Huevos cocidos con tostadas y aguacate", quantity: "2 huevos + 2 tostadas + 1/2 aguacate" },
                    almuerzo: { food: "Manzana", quantity: "1 unidad" },
                    comida: { food: "Estofado de ternera con verduras", quantity: "150g ternera + verduras variadas" },
                    merienda: { food: "Yogur con nueces", quantity: "125g yogur + 15g nueces" },
                    cena: { food: "Sopa de verduras + jamón serrano", quantity: "1 bol + 40g jamón" }
                },
                sunday: {
                    desayuno: { food: "Tortitas de avena con plátano", quantity: "2 tortitas + plátano" },
                    almuerzo: { food: "Fruta de temporada", quantity: "1 pieza" },
                    comida: { food: "🎉 COMIDA LIBRE", quantity: "-" },
                    merienda: { food: "Opcional", quantity: "-" },
                    cena: { food: "Ensalada templada de pollo", quantity: "Ensalada + 100g pollo" }
                }
            },
            3: {
                monday: {
                    desayuno: { food: "Tostadas con tomate, aceite y jamón serrano", quantity: "2 rebanadas + 40g jamón" },
                    almuerzo: { food: "Yogur natural + miel", quantity: "125g yogur + 10g miel" },
                    comida: { food: "Pollo guisado con pimientos y cebolla + arroz", quantity: "150g pollo + verduras + 60g arroz" },
                    merienda: { food: "Naranja", quantity: "1 unidad" },
                    cena: { food: "Rape a la plancha con verduras al vapor", quantity: "150g rape + verduras" }
                },
                tuesday: {
                    desayuno: { food: "Yogur griego + granada + avena", quantity: "150g yogur + granada + 30g avena" },
                    almuerzo: { food: "Tostada con pavo", quantity: "1 rebanada + 2 lonchas" },
                    comida: { food: "Lentejas con arroz y verduras", quantity: "60g lentejas + 40g arroz + verduras" },
                    merienda: { food: "Queso fresco con miel y nueces", quantity: "80g queso + 10g miel + 15g nueces" },
                    cena: { food: "Huevos revueltos con espárragos trigueros", quantity: "2 huevos + 100g espárragos" }
                },
                wednesday: {
                    desayuno: { food: "Batido de leche + fresas + avena", quantity: "200ml leche + 100g fresas + 30g avena" },
                    almuerzo: { food: "Plátano + nueces", quantity: "1 plátano pequeño + 15g nueces" },
                    comida: { food: "Bacalao al horno con pisto manchego", quantity: "150g bacalao + pisto" },
                    merienda: { food: "Yogur natural", quantity: "125g" },
                    cena: { food: "Crema de puerros + pavo a la plancha", quantity: "1 bol + 100g pavo" }
                },
                thursday: {
                    desayuno: { food: "Huevos revueltos con tomate + pan integral", quantity: "2 huevos + 1 rebanada" },
                    almuerzo: { food: "Manzana + almendras", quantity: "1 manzana + 20g almendras" },
                    comida: { food: "Macarrones integrales con carne picada magra y tomate", quantity: "70g pasta + 100g carne + tomate" },
                    merienda: { food: "Mandarina", quantity: "2 mandarinas" },
                    cena: { food: "Sepia a la plancha con ensalada", quantity: "150g sepia + ensalada" }
                },
                friday: {
                    desayuno: { food: "Queso fresco con nueces y pera", quantity: "100g queso + 20g nueces + 1 pera" },
                    almuerzo: { food: "Yogur con frutos rojos", quantity: "125g yogur + frutos rojos" },
                    comida: { food: "Salmón al papillote con patata y cebolla", quantity: "150g salmón + 120g patata + cebolla" },
                    merienda: { food: "Mandarina", quantity: "2 mandarinas" },
                    cena: { food: "Tortilla de calabacín", quantity: "2 huevos + 100g calabacín" }
                },
                saturday: {
                    desayuno: { food: "Tostadas con aguacate y huevo poché", quantity: "2 rebanadas + 1/2 aguacate + 1 huevo" },
                    almuerzo: { food: "Fruta de temporada", quantity: "1 pieza" },
                    comida: { food: "Cocido madrileño ligero (sin tocino excesivo)", quantity: "1 ración controlada" },
                    merienda: { food: "Yogur natural", quantity: "125g" },
                    cena: { food: "Ensalada de tomate con ventresca", quantity: "Tomate + 60g ventresca" }
                },
                sunday: {
                    desayuno: { food: "Yogur con muesli y plátano", quantity: "150g yogur + 40g muesli + plátano" },
                    almuerzo: { food: "Naranja", quantity: "1 unidad" },
                    comida: { food: "🎉 COMIDA LIBRE", quantity: "-" },
                    merienda: { food: "Opcional", quantity: "-" },
                    cena: { food: "Sopa de pollo con fideos", quantity: "1 bol" }
                }
            },
            4: {
                monday: {
                    desayuno: { food: "Avena con leche + canela + arándanos", quantity: "40g avena + 200ml leche + arándanos" },
                    almuerzo: { food: "Tostada con tomate y pavo", quantity: "1 rebanada + 2 lonchas" },
                    comida: { food: "Pechuga de pollo rellena de queso y espinacas + ensalada", quantity: "160g pollo + ensalada" },
                    merienda: { food: "Yogur griego", quantity: "125g" },
                    cena: { food: "Merluza en salsa verde", quantity: "150g merluza" }
                },
                tuesday: {
                    desayuno: { food: "Tostadas integrales con huevo y aguacate", quantity: "2 rebanadas + 1 huevo + 1/2 aguacate" },
                    almuerzo: { food: "Manzana + nueces", quantity: "1 manzana + 20g nueces" },
                    comida: { food: "Alubias pintas con arroz", quantity: "70g alubias + 40g arroz" },
                    merienda: { food: "Plátano", quantity: "1 unidad pequeña" },
                    cena: { food: "Revuelto de ajetes con gambas", quantity: "2 huevos + ajetes + 80g gambas" }
                },
                wednesday: {
                    desayuno: { food: "Batido de yogur + melocotón + avena", quantity: "150g yogur + 1 melocotón + 30g avena" },
                    almuerzo: { food: "Queso fresco", quantity: "60g" },
                    comida: { food: "Atún fresco a la plancha con pimientos del piquillo", quantity: "150g atún + pimientos" },
                    merienda: { food: "Pera + almendras", quantity: "1 pera + 15g almendras" },
                    cena: { food: "Crema de calabacín + huevo cocido", quantity: "1 bol + 1 huevo" }
                },
                thursday: {
                    desayuno: { food: "Yogur natural + fresas + muesli", quantity: "150g yogur + fresas + 40g muesli" },
                    almuerzo: { food: "Zanahoria baby", quantity: "100g" },
                    comida: { food: "Arroz con conejo y verduras", quantity: "70g arroz + 140g conejo + verduras" },
                    merienda: { food: "Yogur con miel", quantity: "125g yogur + 10g miel" },
                    cena: { food: "Emperador a la plancha con ensalada", quantity: "140g emperador + ensalada" }
                },
                friday: {
                    desayuno: { food: "Tostadas con tomate, aceite y jamón", quantity: "2 rebanadas + 40g jamón" },
                    almuerzo: { food: "Naranja", quantity: "1 unidad" },
                    comida: { food: "Fideuá de marisco", quantity: "1 ración controlada" },
                    merienda: { food: "Queso fresco con nueces", quantity: "60g queso + 15g nueces" },
                    cena: { food: "Tortilla de patata (poco aceite) + ensalada", quantity: "1 porción pequeña + ensalada" }
                },
                saturday: {
                    desayuno: { food: "Huevos benedictinos caseros (sin salsa holandesa)", quantity: "2 huevos + jamón + tostada" },
                    almuerzo: { food: "Mandarina", quantity: "2 mandarinas" },
                    comida: { food: "Cordero al horno con patatas", quantity: "130g cordero + 120g patatas" },
                    merienda: { food: "Yogur natural con arándanos", quantity: "125g yogur + arándanos" },
                    cena: { food: "Gazpacho + jamón serrano", quantity: "1 bol + 40g jamón" }
                },
                sunday: {
                    desayuno: { food: "Tortitas de avena con fruta", quantity: "2 tortitas + fruta variada" },
                    almuerzo: { food: "Fruta de temporada", quantity: "1 pieza" },
                    comida: { food: "🎉 COMIDA LIBRE", quantity: "-" },
                    merienda: { food: "Opcional", quantity: "-" },
                    cena: { food: "Ensalada César ligera", quantity: "1 ración" }
                }
            }
        }
    }
};

// Funciones de utilidad para guardar/cargar datos
function saveWeightLog() {
    localStorage.setItem('dietloop_weights', JSON.stringify(weightLog));
}

function addWeight(date, weight, month, week) {
    weightLog.push({ date, weight, month, week });
    saveWeightLog();
}

function getLatestWeight() {
    if (weightLog.length === 0) return userData.initialWeight;
    return weightLog[weightLog.length - 1].weight;
}

function getWeightForDate(date) {
    const entry = weightLog.find(w => w.date === date);
    return entry ? entry.weight : null;
}

// Calcular el día de la semana (1 = lunes, 7 = domingo)
function getDayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    return day === 0 ? 7 : day;
}

// Obtener el nombre del día
function getDayName(dayNum) {
    const days = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return days[dayNum];
}

// Obtener el nombre del día en español
function getDayNameSpanish(dayNum) {
    const days = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return days[dayNum];
}

// Calcular qué semana del mes es una fecha
function getWeekOfMonth(dateStr, monthStartDate) {
    const date = new Date(dateStr);
    const start = new Date(monthStartDate);
    const diffTime = date - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7) + 1;
}

// Exportar para uso global
window.userData = userData;
window.weightLog = weightLog;
window.monthlyGoals = monthlyGoals;
window.monthData = monthData;
window.saveWeightLog = saveWeightLog;
window.addWeight = addWeight;
window.getLatestWeight = getLatestWeight;
window.getWeightForDate = getWeightForDate;
window.getDayOfWeek = getDayOfWeek;
window.getDayName = getDayName;
window.getDayNameSpanish = getDayNameSpanish;
window.getWeekOfMonth = getWeekOfMonth;
