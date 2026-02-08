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

// Lista de alimentos prohibidos
const forbiddenFoods = [
    "Brócoli",
    "Garbanzos",
    "Alcachofa",
    "Lombarda",
    "Chocolate",
    "Coliflor",
    "Repollo",
    "Pescadilla",
    "Quinoa",
    "Pepino",
    "Pepinillo",
    "Aceitunas",
    "Kiwi",
    "Membrillo"
];

// Lista de la compra por mes y semana
const shoppingLists = {
    1: {
        1: {
            priceEstimate: "50-68€",
            categories: [
                {
                    name: "Frutas",
                    icon: "🍎",
                    items: [
                        { name: "Manzanas", quantity: "2 unidades", notes: "Lunes y domingo" },
                        { name: "Plátanos", quantity: "3 unidades", notes: "Pequeños/medianos" },
                        { name: "Fresas", quantity: "360g (~3 bandejas)", notes: "Lunes, sábado, semana 2" },
                        { name: "Arándanos", quantity: "80g (1 bandeja)", notes: "Jueves" },
                        { name: "Pera", quantity: "1 unidad", notes: "Miércoles" },
                        { name: "Naranja", quantity: "1 unidad", notes: "Viernes" },
                        { name: "Mandarinas", quantity: "4 unidades", notes: "Sábado" },
                        { name: "Limón", quantity: "1 unidad", notes: "Para el pescado" }
                    ]
                },
                {
                    name: "Verduras",
                    icon: "🥬",
                    items: [
                        { name: "Tomates", quantity: "1 kg (~6-7 uds)", notes: "Ensaladas y cocinar" },
                        { name: "Lechuga", quantity: "1 unidad grande", notes: "Ensaladas" },
                        { name: "Zanahorias", quantity: "600g (~5-6 uds)", notes: "Baby y rallada" },
                        { name: "Calabacín", quantity: "200g (1 mediano)", notes: "Martes cena" },
                        { name: "Calabaza", quantity: "500g", notes: "Crema miércoles" },
                        { name: "Puerros", quantity: "2 unidades", notes: "Lentejas y crema" },
                        { name: "Judías verdes", quantity: "150g", notes: "Lunes comida" },
                        { name: "Espinacas frescas", quantity: "100g", notes: "Jueves comida" },
                        { name: "Champiñones", quantity: "100g", notes: "Jueves cena" },
                        { name: "Pimientos", quantity: "3 unidades", notes: "Asar y paella" },
                        { name: "Espárragos verdes", quantity: "150g", notes: "Sábado cena" },
                        { name: "Aguacate", quantity: "1 unidad", notes: "Viernes desayuno" },
                        { name: "Patatas", quantity: "300g (~2 medianas)", notes: "Viernes comida" },
                        { name: "Cebolla", quantity: "2 unidades", notes: "Para cocinar" },
                        { name: "Ajo", quantity: "1 cabeza", notes: "Para cocinar" }
                    ]
                },
                {
                    name: "Carnes",
                    icon: "🍗",
                    items: [
                        { name: "Pechuga de pollo", quantity: "400g", notes: "Lunes + paella" },
                        { name: "Pechuga de pavo (filete)", quantity: "220g", notes: "Jueves + sábado" },
                        { name: "Pavo en lonchas", quantity: "1 paquete (~100g)", notes: "Tostadas" },
                        { name: "Ternera magra", quantity: "150g", notes: "Viernes comida" }
                    ]
                },
                {
                    name: "Pescados",
                    icon: "🐟",
                    items: [
                        { name: "Merluza (lomos)", quantity: "150g", notes: "Martes cena" },
                        { name: "Salmón (filete)", quantity: "150g", notes: "Jueves comida" },
                        { name: "Lenguado (filete)", quantity: "150g", notes: "Viernes cena" },
                        { name: "Atún en conserva (natural)", quantity: "1 lata (80g)", notes: "Miércoles" }
                    ]
                },
                {
                    name: "Lácteos y Huevos",
                    icon: "🥛",
                    items: [
                        { name: "Huevos", quantity: "1 docena (12 uds)", notes: "Varias recetas" },
                        { name: "Yogur natural", quantity: "4 unidades (125g)", notes: "Lunes, jueves, sábado" },
                        { name: "Yogur griego natural", quantity: "1 unidad (150g)", notes: "Jueves desayuno" },
                        { name: "Leche semidesnatada", quantity: "1 litro", notes: "Batidos" },
                        { name: "Queso fresco", quantity: "250g", notes: "Meriendas" }
                    ]
                },
                {
                    name: "Cereales y Legumbres",
                    icon: "🌾",
                    items: [
                        { name: "Pan integral (rebanadas)", quantity: "1 paquete (~12)", notes: "Tostadas" },
                        { name: "Copos de avena", quantity: "200g", notes: "Desayunos" },
                        { name: "Arroz integral", quantity: "250g", notes: "Lunes, jueves, paella" },
                        { name: "Pasta integral", quantity: "70g", notes: "Miércoles comida" },
                        { name: "Lentejas secas", quantity: "100g", notes: "Martes comida" }
                    ]
                },
                {
                    name: "Frutos Secos",
                    icon: "🥜",
                    items: [
                        { name: "Nueces", quantity: "80g", notes: "Varias meriendas" },
                        { name: "Almendras", quantity: "15g", notes: "Miércoles" },
                        { name: "Anacardos", quantity: "20g", notes: "Viernes" }
                    ]
                },
                {
                    name: "Despensa",
                    icon: "🏪",
                    items: [
                        { name: "Aceite de oliva virgen extra", quantity: "500ml", notes: "Si no tienes" },
                        { name: "Tomate triturado", quantity: "1 bote (400g)", notes: "Pasta y cocinar" },
                        { name: "Miel", quantity: "1 tarro pequeño", notes: "Meriendas y desayunos" },
                        { name: "Cacao puro sin azúcar", quantity: "1 bote pequeño", notes: "Viernes merienda" },
                        { name: "Canela en polvo", quantity: "1 bote", notes: "Batidos" }
                    ]
                }
            ],
            tips: [
                "Compra primero los productos no perecederos (arroz, pasta, legumbres, frutos secos)",
                "El pescado fresco cómpralo a mitad de semana o congela lo que vayas a usar después del miércoles",
                "Las frutas más maduras (plátanos, aguacate) compra algunas verdes para que maduren",
                "Aprovecha ofertas en productos que puedes congelar (pollo, pescado)",
                "La paella del sábado puedes simplificarla según lo que tengas",
                "Si el lenguado es muy caro, sustitúyelo por gallo o rodaballo",
                "Compra más miel ya que sustituye al membrillo en varias meriendas"
            ]
        },
        2: {
            priceEstimate: "48-65€",
            categories: [
                {
                    name: "Frutas",
                    icon: "🍎",
                    items: [
                        { name: "Manzanas", quantity: "2 unidades", notes: "Martes y sábado" },
                        { name: "Plátanos", quantity: "3 unidades", notes: "Desayunos y meriendas" },
                        { name: "Fresas", quantity: "200g", notes: "Lunes y viernes" },
                        { name: "Arándanos", quantity: "60g", notes: "Jueves" },
                        { name: "Peras", quantity: "2 unidades", notes: "Miércoles" },
                        { name: "Melocotón", quantity: "1 unidad grande", notes: "Jueves" },
                        { name: "Mandarinas", quantity: "4 unidades", notes: "Lunes" },
                        { name: "Granada", quantity: "1 unidad", notes: "Opcional" }
                    ]
                },
                {
                    name: "Verduras",
                    icon: "🥬",
                    items: [
                        { name: "Tomates", quantity: "800g", notes: "Ensaladas y tostadas" },
                        { name: "Lechuga", quantity: "1 unidad", notes: "Ensaladas" },
                        { name: "Zanahorias", quantity: "400g", notes: "Ensaladas y snacks" },
                        { name: "Boniato", quantity: "150g", notes: "Lunes comida" },
                        { name: "Pimientos", quantity: "2 unidades", notes: "Lunes" },
                        { name: "Puerro", quantity: "1 unidad", notes: "Alubias" },
                        { name: "Apio", quantity: "2 tallos", notes: "Alubias" },
                        { name: "Patatas", quantity: "250g", notes: "Miércoles" },
                        { name: "Champiñones", quantity: "120g", notes: "Jueves cena" },
                        { name: "Espinacas", quantity: "80g", notes: "Viernes cena" },
                        { name: "Cebolla", quantity: "2 unidades", notes: "Cocinar" },
                        { name: "Ajo", quantity: "1 cabeza", notes: "Cocinar" },
                        { name: "Aguacate", quantity: "1 unidad", notes: "Sábado" }
                    ]
                },
                {
                    name: "Carnes",
                    icon: "🍗",
                    items: [
                        { name: "Pollo (muslos o pechuga)", quantity: "280g", notes: "Lunes + jueves" },
                        { name: "Pavo en lonchas", quantity: "1 paquete", notes: "Tostadas" },
                        { name: "Ternera para estofado", quantity: "150g", notes: "Sábado" },
                        { name: "Jamón serrano", quantity: "70g", notes: "Martes + sábado" }
                    ]
                },
                {
                    name: "Pescados",
                    icon: "🐟",
                    items: [
                        { name: "Lubina", quantity: "150g", notes: "Lunes cena" },
                        { name: "Dorada", quantity: "180g", notes: "Miércoles" },
                        { name: "Gambas", quantity: "100g", notes: "Viernes" },
                        { name: "Atún en conserva", quantity: "1 lata", notes: "Miércoles cena" }
                    ]
                },
                {
                    name: "Lácteos y Huevos",
                    icon: "🥛",
                    items: [
                        { name: "Huevos", quantity: "10 unidades", notes: "Varias recetas" },
                        { name: "Yogur natural", quantity: "5 unidades", notes: "Desayunos y meriendas" },
                        { name: "Yogur griego", quantity: "2 unidades", notes: "Martes y jueves" },
                        { name: "Leche semidesnatada", quantity: "1 litro", notes: "Batidos" },
                        { name: "Queso fresco", quantity: "160g", notes: "Meriendas" }
                    ]
                },
                {
                    name: "Cereales y Legumbres",
                    icon: "🌾",
                    items: [
                        { name: "Pan integral", quantity: "1 paquete", notes: "Tostadas" },
                        { name: "Avena", quantity: "150g", notes: "Desayunos" },
                        { name: "Arroz integral", quantity: "150g", notes: "Jueves" },
                        { name: "Pasta integral", quantity: "70g", notes: "Viernes" },
                        { name: "Alubias blancas", quantity: "80g", notes: "Martes" },
                        { name: "Muesli sin azúcar", quantity: "100g", notes: "Viernes desayuno" }
                    ]
                },
                {
                    name: "Frutos Secos",
                    icon: "🥜",
                    items: [
                        { name: "Nueces", quantity: "60g", notes: "Meriendas" },
                        { name: "Almendras", quantity: "20g", notes: "Miércoles" }
                    ]
                },
                {
                    name: "Despensa",
                    icon: "🏪",
                    items: [
                        { name: "Aceite de oliva", quantity: "Reponer si falta", notes: "" },
                        { name: "Tomate triturado", quantity: "1 bote", notes: "Si se acabó" },
                        { name: "Miel", quantity: "Reponer si falta", notes: "" }
                    ]
                }
            ],
            tips: [
                "Revisa qué te quedó de la semana anterior antes de comprar",
                "El boniato se conserva bien fuera de la nevera en lugar fresco",
                "Las gambas pueden ser congeladas si hay buena oferta",
                "La dorada puede sustituirse por lubina o besugo según precio"
            ]
        },
        3: {
            priceEstimate: "52-70€",
            categories: [
                {
                    name: "Frutas",
                    icon: "🍎",
                    items: [
                        { name: "Manzanas", quantity: "2 unidades", notes: "Jueves" },
                        { name: "Plátanos", quantity: "2 unidades", notes: "Miércoles" },
                        { name: "Fresas", quantity: "100g", notes: "Miércoles" },
                        { name: "Peras", quantity: "2 unidades", notes: "Viernes" },
                        { name: "Naranjas", quantity: "2 unidades", notes: "Lunes y domingo" },
                        { name: "Mandarinas", quantity: "4 unidades", notes: "Jueves y viernes" },
                        { name: "Granada", quantity: "1 unidad", notes: "Martes" }
                    ]
                },
                {
                    name: "Verduras",
                    icon: "🥬",
                    items: [
                        { name: "Tomates", quantity: "800g", notes: "Ensaladas y cocinar" },
                        { name: "Lechuga", quantity: "1 unidad", notes: "Ensaladas" },
                        { name: "Zanahorias", quantity: "400g", notes: "Varios usos" },
                        { name: "Pimientos", quantity: "3 unidades", notes: "Lunes y pisto" },
                        { name: "Calabacín", quantity: "2 unidades", notes: "Pisto y viernes" },
                        { name: "Berenjena", quantity: "1 unidad", notes: "Pisto" },
                        { name: "Puerros", quantity: "2 unidades", notes: "Crema miércoles" },
                        { name: "Espárragos trigueros", quantity: "200g", notes: "Martes" },
                        { name: "Patatas", quantity: "250g", notes: "Viernes" },
                        { name: "Cebolla", quantity: "2 unidades", notes: "Cocinar" },
                        { name: "Ajo", quantity: "1 cabeza", notes: "Cocinar" },
                        { name: "Aguacate", quantity: "1 unidad", notes: "Sábado" }
                    ]
                },
                {
                    name: "Carnes",
                    icon: "🍗",
                    items: [
                        { name: "Pollo", quantity: "250g", notes: "Lunes" },
                        { name: "Pavo (filete)", quantity: "200g", notes: "Miércoles cena" },
                        { name: "Pavo en lonchas", quantity: "1 paquete", notes: "Martes" },
                        { name: "Carne picada magra", quantity: "100g", notes: "Jueves" },
                        { name: "Jamón serrano", quantity: "40g", notes: "Lunes" }
                    ]
                },
                {
                    name: "Pescados",
                    icon: "🐟",
                    items: [
                        { name: "Rape", quantity: "150g", notes: "Lunes cena" },
                        { name: "Bacalao", quantity: "150g", notes: "Miércoles" },
                        { name: "Salmón", quantity: "150g", notes: "Viernes" },
                        { name: "Sepia", quantity: "150g", notes: "Jueves cena" },
                        { name: "Ventresca de atún", quantity: "60g", notes: "Sábado cena" }
                    ]
                },
                {
                    name: "Lácteos y Huevos",
                    icon: "🥛",
                    items: [
                        { name: "Huevos", quantity: "10 unidades", notes: "Varias recetas" },
                        { name: "Yogur natural", quantity: "4 unidades", notes: "Meriendas" },
                        { name: "Yogur griego", quantity: "2 unidades", notes: "Martes y domingo" },
                        { name: "Leche semidesnatada", quantity: "500ml", notes: "Batidos" },
                        { name: "Queso fresco", quantity: "180g", notes: "Viernes y martes" }
                    ]
                },
                {
                    name: "Cereales y Legumbres",
                    icon: "🌾",
                    items: [
                        { name: "Pan integral", quantity: "1 paquete", notes: "Tostadas" },
                        { name: "Avena", quantity: "120g", notes: "Desayunos" },
                        { name: "Arroz integral", quantity: "200g", notes: "Lunes y martes" },
                        { name: "Pasta integral (macarrones)", quantity: "70g", notes: "Jueves" },
                        { name: "Lentejas", quantity: "60g", notes: "Martes" },
                        { name: "Muesli sin azúcar", quantity: "80g", notes: "Domingo" }
                    ]
                },
                {
                    name: "Frutos Secos",
                    icon: "🥜",
                    items: [
                        { name: "Nueces", quantity: "70g", notes: "Varios días" },
                        { name: "Almendras", quantity: "20g", notes: "Jueves" }
                    ]
                },
                {
                    name: "Despensa",
                    icon: "🏪",
                    items: [
                        { name: "Aceite de oliva", quantity: "Reponer si falta", notes: "" },
                        { name: "Tomate triturado", quantity: "2 botes", notes: "Pisto y pasta" },
                        { name: "Miel", quantity: "Reponer si falta", notes: "" },
                        { name: "Fideos", quantity: "50g", notes: "Sopa domingo" }
                    ]
                }
            ],
            tips: [
                "El pisto se puede hacer en cantidad y guardar para varios días",
                "La sepia puede sustituirse por calamar si es más económico",
                "Los espárragos trigueros están de temporada en primavera",
                "La ventresca puede sustituirse por atún normal"
            ]
        },
        4: {
            priceEstimate: "55-75€",
            categories: [
                {
                    name: "Frutas",
                    icon: "🍎",
                    items: [
                        { name: "Manzanas", quantity: "2 unidades", notes: "Martes" },
                        { name: "Plátanos", quantity: "2 unidades", notes: "Martes y domingo" },
                        { name: "Fresas", quantity: "150g", notes: "Jueves" },
                        { name: "Arándanos", quantity: "80g", notes: "Lunes y sábado" },
                        { name: "Peras", quantity: "2 unidades", notes: "Miércoles" },
                        { name: "Naranjas", quantity: "2 unidades", notes: "Viernes" },
                        { name: "Mandarinas", quantity: "4 unidades", notes: "Sábado" },
                        { name: "Melocotón", quantity: "1 unidad", notes: "Miércoles" }
                    ]
                },
                {
                    name: "Verduras",
                    icon: "🥬",
                    items: [
                        { name: "Tomates", quantity: "1 kg", notes: "Ensaladas y gazpacho" },
                        { name: "Lechuga", quantity: "1 unidad", notes: "Ensaladas" },
                        { name: "Zanahorias", quantity: "300g", notes: "Varios usos" },
                        { name: "Calabacín", quantity: "300g", notes: "Crema miércoles" },
                        { name: "Pimientos del piquillo", quantity: "1 bote", notes: "Miércoles" },
                        { name: "Espinacas", quantity: "100g", notes: "Lunes" },
                        { name: "Ajetes", quantity: "1 manojo", notes: "Martes" },
                        { name: "Patatas", quantity: "400g", notes: "Viernes y sábado" },
                        { name: "Cebolla", quantity: "2 unidades", notes: "Cocinar" },
                        { name: "Ajo", quantity: "1 cabeza", notes: "Cocinar" }
                    ]
                },
                {
                    name: "Carnes",
                    icon: "🍗",
                    items: [
                        { name: "Pollo (pechuga)", quantity: "160g", notes: "Lunes" },
                        { name: "Pavo en lonchas", quantity: "1 paquete", notes: "Lunes y jueves" },
                        { name: "Conejo", quantity: "140g", notes: "Jueves" },
                        { name: "Cordero", quantity: "130g", notes: "Sábado" },
                        { name: "Jamón serrano", quantity: "80g", notes: "Sábado" }
                    ]
                },
                {
                    name: "Pescados",
                    icon: "🐟",
                    items: [
                        { name: "Merluza", quantity: "150g", notes: "Lunes cena" },
                        { name: "Atún fresco", quantity: "150g", notes: "Miércoles" },
                        { name: "Emperador/Pez espada", quantity: "140g", notes: "Jueves cena" },
                        { name: "Gambas", quantity: "80g", notes: "Martes" },
                        { name: "Marisco variado", quantity: "200g", notes: "Fideuá viernes" }
                    ]
                },
                {
                    name: "Lácteos y Huevos",
                    icon: "🥛",
                    items: [
                        { name: "Huevos", quantity: "12 unidades", notes: "Varias recetas" },
                        { name: "Yogur natural", quantity: "4 unidades", notes: "Meriendas" },
                        { name: "Yogur griego", quantity: "2 unidades", notes: "Lunes y miércoles" },
                        { name: "Leche semidesnatada", quantity: "500ml", notes: "Batidos" },
                        { name: "Queso fresco", quantity: "120g", notes: "Miércoles y viernes" }
                    ]
                },
                {
                    name: "Cereales y Legumbres",
                    icon: "🌾",
                    items: [
                        { name: "Pan integral", quantity: "1 paquete", notes: "Tostadas" },
                        { name: "Avena", quantity: "120g", notes: "Desayunos" },
                        { name: "Arroz integral", quantity: "150g", notes: "Jueves" },
                        { name: "Alubias pintas", quantity: "70g", notes: "Martes" },
                        { name: "Fideos para fideuá", quantity: "100g", notes: "Viernes" },
                        { name: "Muesli sin azúcar", quantity: "80g", notes: "Jueves" }
                    ]
                },
                {
                    name: "Frutos Secos",
                    icon: "🥜",
                    items: [
                        { name: "Nueces", quantity: "55g", notes: "Martes y viernes" },
                        { name: "Almendras", quantity: "15g", notes: "Miércoles" }
                    ]
                },
                {
                    name: "Despensa",
                    icon: "🏪",
                    items: [
                        { name: "Aceite de oliva", quantity: "Reponer si falta", notes: "" },
                        { name: "Tomate triturado", quantity: "1 bote", notes: "Gazpacho" },
                        { name: "Miel", quantity: "Reponer si falta", notes: "" },
                        { name: "Caldo de pescado", quantity: "1 brick", notes: "Fideuá" }
                    ]
                }
            ],
            tips: [
                "El cordero puede ser costilla o paletilla según preferencia",
                "La fideuá puede hacerse con mejillones y gambas si el marisco es caro",
                "El gazpacho se puede hacer en cantidad para varios días",
                "El conejo puede sustituirse por pollo si es difícil de encontrar",
                "Es la última semana del mes: revisa tu progreso y anota sensaciones"
            ]
        }
    }
};

// Exportar para uso global
window.forbiddenFoods = forbiddenFoods;
window.shoppingLists = shoppingLists;
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
