const connection = require('./connection')

function getBirdSightings (userId, db = connection) {
  return db('bird_sightings')
    .join('users', 'bird_sightings.user_id', 'users.id')
    .join('birds', 'bird_sightings.bird_id', 'birds.id')
    .join('colour', 'birds.colour_id', 'colour.id')
    .join('size', 'birds.size_id', 'size.id')
    .where('users.id', userId)
    .select('bird_sightings.user_id as birdUserID',
      'users.username as birdUser',
      'bird_sightings.bird_id as birdSightingID',
      'bird_sightings.latitude as birdLat',
      'bird_sightings.longitude as birdLong',
      'bird_sightings.date_of_sighting as birdDate',
      'bird_sightings.time as birdTime',
      'birds.id as birdId',
      'birds.name as birdName',
      'birds.ignoa as birdIgnoa',
      'birds.description as birdDesc',
      'birds.image as birdImage',
      'birds.found_in as birdFoundIn',
      'birds.sound as birdSound',
      'birds.conservation_status as birdCons',
      'birds.threats as birdThreat',
      'colour.name as birdColourName',
      'colour.hex as birdColourHex',
      'size.name as birdSize',
      'size.height as birdHeight',
      'size.width as birdWidth',
      'birds.size_id as birdSizeId')
}

function addUserSighting (username, latitude, longitude, birdName, db = connection) {
  return db('bird_sightings')
    .insert({
      user_id: newEvent.gardenId,
      bird_id: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
      volunteers_needed: newEvent.volunteersNeeded
    })
    .then(ids => getEventById(ids[0], db))
    .then(event => {
      return {
        ...event,
        gardenId: event.garden_id,
        volunteersNeeded: event.volunteers_needed
      }
    })
}

module.exports = {
  getBirdSightings
}
