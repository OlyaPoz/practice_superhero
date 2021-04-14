'use strict';

const generateSuperhero =  key => ({
  nickname: `Superman${key}`,
  real_name: `Clark Kent${key}`,
  origin_description: `he was born Kal-El on the planet Krypton, 
  before being rocketed to Earth as an infant by his scientist 
  father Jor-El, moments before Krypton's destruction${key}`,
   catch_phrase: `“​ Look, up in the sky, it's a bird, it's a plane, it's Superman!”${key}`,
   created_at: new Date(),
   updated_at: new Date(),
})

const generateSuperheroes = (amount = 50) => {
  return new Array(amount > 600 ? 600 : amount)
    .fill(null)
    .map((_, i) => generateSuperhero(i + 1));
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('superheroes', generateSuperheroes(120), {});
  },

  down: async (queryInterface, Sequelize) => {}
};
