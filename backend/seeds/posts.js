/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    // { id: 1, user_id: 4, img: "prueba.jpeg", caption: "Prueba" },
    // { id: 2, user_id: 4, img: "prueba.jpeg", caption: "Prueba 2" },
    // { id: 3, user_id: 4, img: "prueba.jpeg", caption: "Prueba 3" },
    // { id: 4, user_id: 4, img: "prueba.jpeg", caption: "Prueba 4" },
    // { id: 5, user_id: 4, img: "prueba.jpeg", caption: "Prueba 5" },
    // { id: 6, user_id: 4, img: "prueba.jpeg", caption: "Prueba 6" },
    // { id: 7, user_id: 4, img: "prueba.jpeg", caption: "Prueba 7" },
  ]);
};
