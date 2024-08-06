const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bikes.db');

const bikes = [
    { name: "Addmotor Arisetan II M-360", image: "images/addmotor_trike.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_over", specs: "Motor: 750Watts Battery: 20AH Range: 130km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/addmotor-arisetan' },
    { name: "Aventon Abound", image: "images/abound.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_through", specs: "Motor: 750Watts Battery: 15AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-abound?_pos=1&_psq=abound&_ss=e&_v=1.0' },
    { name: "Aventon Aventure 2", image: "images/aventure2so.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_over", specs: "Motor: 750Watts Battery: 15AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-aventure-2-step-over?_pos=1&_psq=aven&_ss=e&_v=1.0' },
    { name: "Aventon Aventure 2 ST", image: "images/aventure2st.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_through", specs: "Motor: 750Watts Battery: 15AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-aventure-2-step-over?_pos=1&_psq=aven&_ss=e&_v=1.0' },
    { name: "Aventon Level 2", image: "images/Level2_SO.jpg", terrains: ["pavement", "dirt"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 14AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/copy-of-aventon-level-2-step-through?_pos=1&_sid=0a06855f2&_ss=r' },
    { name: "Aventon Level 2 ST", image: "images/Level2_ST.jpg", terrains: ["pavement", "dirt"], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 14AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/copy-of-aventon-level-2-step-through?_pos=1&_sid=0a06855f2&_ss=r' },
    { name: "Aventon Pace 500", image: "images/pace500_st.jpg", terrains: ["pavement"], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 13AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-pace-500-3-step-thru?_pos=1&_sid=c7960c655&_ss=r' },
    { name: "Aventon Sinch 2", image: "images/sinch2.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 14AH Range: 65km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/aventon-sinch-step-thru?_pos=1&_sid=29dd3ea12&_ss=r' },
  
    { name: "Element E-Circuit", image: "images/ecircuit.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 17.5AH Range: 90km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/element-e-circuit-27-5?_pos=4&_psq=element&_ss=e&_v=1.0' },
    { name: "Element E-Venture", image: "images/eventure.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500Watt Battery: 18.2AH Range: 110km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/element-e-venture-29-mountain-e-bike' },
    { name: "Envo Flex Overland", image: "images/envo_overland.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 500w Battery: 17AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/envo-overlander' },
    { name: "Hey Bike Mars 2.0", image: "images/heybike_mars2.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_through", specs: "Motor: 750w Battery: 12.5AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/mars2-folding-ebike-with-unique-back-rack?_pos=1&_sid=94cff0999&_ss=r' },
    { name: "Hey Bike Ranger S", image: "images/heybike_ranger.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_through", specs: "Motor: 750w Battery: 14AH Range: 90km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/ranger-s-foldable-powerful-ebike-with-88-km-range?_pos=2&_sid=94cff0999&_ss=r' },
    { name: "Hey Bike Tyson", image: "images/heybike_tyson.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_over", specs: "Motor: 750w Battery: 15AH Range: 90km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/tyson-foldable-compact-ebike-in-obsidian-black-or-navy-blue?_pos=3&_sid=94cff0999&_ss=r' },

    { name: "Himiway C5", image: "images/himiway_c5.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_over", specs: "Motor: 750w Battery: 20AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/electric-motorbike-c5' },
    { name: "Himiway A7 Pro", image: "images/himiway_a7pro.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_through", specs: "Motor: 500w Battery: 15AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/urban-electric-commuter-bike-a7-pro' },
    { name: "Himiway C3 Cargo", image: "images/himiway_c3.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_over", specs: "Motor: 750w Battery: 20AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/cargo-ebike-c3' },
    { name: "Himiway Big Dog", image: "images/himiway_bigdog.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "750", frame: "step_through", specs: "Motor: 750w Battery: 20AH Range: 130km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/himiway-big-dog' },
    { name: "Himiway D7", image: "images/himiway_d7.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000w Battery: 20AH Range: 130km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/himiway-d7' },
    { name: "Himiway D5 Pro", image: "images/himiway_d5pro.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500w Battery: 20AH Range: 120km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/himiway-d5-pro' },
    { name: "Himiway D5 Pro ST", image: "images/himiway_d5pro_st.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 500w Battery: 20AH Range: 120km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/himiway-d5-pro' },

    { name: "Niji Tanya", image: "images/nijitanya.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 13AH Range: 50km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/niji-tanya-foldable-hybrid-compact-ebike' },
    { name: "Niji Trike", image: "images/nijitrike.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_through", specs: "Motor: 750Watts Battery: 13AH Range: 50km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/niji-hp-trike' },
    { name: "QuietKat Apex Pro", image: "images/apexpro.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watts Battery: 17.25AH Range: 85km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/quietkat-apex-pro-e-bike' },
    { name: "QuietKat Ranger", image: "images/quietkat_ranger.jpg", terrains: ["dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watts Battery: 13AH Range: 60km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/quietkat-ranger-e-bike' },
    { name: "Silverback 24' Cruiser", image: "images/silverback_24.jpg", terrains: ["pavement"], motor: "500", frame: "step_through", specs: "Motor: 750Watts Battery: 15AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-a5-24-500' },
    { name: "Silverback 26' Fat Tire", image: "images/silverback26fat.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 13AH Range: 60km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-a6ah26f' },
    { name: "Silverback 26' Step Through ", image: "images/silverbackred.jpg", terrains: ["pavement", "dirt",], motor: "500", frame: "step_through", specs: "Motor: 500Watts Battery: 16AH Range: 110km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-a5-26-501' },
    { name: "Silverback City 29'", image: "images/silverback_city_29.jpg", terrains: ["pavement", "dirt"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 13AH/20AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/order-model-a6-29' },
    { name: "Silverback D20F'", image: "images/silverback_d20f.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 13AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-d20f' },
    { name: "Silverback Dual Motor", image: "images/silverback_dual.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watts Battery: 20AH Range: 100km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-ddf2620' },
    { name: "Silverback M600", image: "images/silverback_m600.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_over", specs: "Motor: 500Watt Battery: 16AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-m600' },
    { name: "Silverback Thrill", image: "images/silverback_thrill.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 13AH Range: 80km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/model-a626-sport' },

    { name: "Stromer ST7 ARBR Edition", image: "images/stromer_st7.jpg", terrains: ["pavement"], motor: "1000", frame: "step_over", specs: "Motor: 1000Watts Battery: 30AH Range: 250km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/stromer-st7-arbr-edition' },
    { name: "Stromer S2 Pinion", image: "images/stromer_st2.jpg", terrains: ["pavement"], motor: "750", frame: "step_over", specs: "Motor: 750Watts Battery: 13AH Range: 120km Top Speed :32km/hr", buyURL: 'https://ebikeedmonton.com/products/stromer-s2-pinion' },

    { name: "Trivel E-Azteca Trike", image: "images/trivelskinny.jpg", terrains: ["pavement", "dirt", "gravel"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 14AH Range: 90km Top Speed: 32km/hr", buyURL: 'https://ebikeedmonton.com/products/trivel-e-azteca' },
    { name: "Trivel E-Azteca Trike Fat Tire", image: "images/trivelfat.jpg", terrains: ["pavement", "dirt", "gravel", "snow_ice"], motor: "500", frame: "step_over", specs: "Motor: 500Watts Battery: 14AH Range: 90km Top Speed: 32km/hr", buyURL: 'https://ebikeedmonton.com/products/copy-of-trivel-e-azteca' }

    // Include other bike records here
];

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS bikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image TEXT,
        terrains TEXT,
        motor TEXT,
        frame TEXT,
        specs TEXT,
        buyURL TEXT
    )`);

    const stmt = db.prepare(`INSERT INTO bikes (name, image, terrains, motor, frame, specs, buyURL) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    
    bikes.forEach(bike => {
        stmt.run(bike.name, bike.image, bike.terrains.join(','), bike.motor, bike.frame, bike.specs, bike.buyURL);
    });

    stmt.finalize();
});

db.close();