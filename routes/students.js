var express = require('express');
var router = express.Router();
const StudentsValidator = require('../validators/studentsValidator');
const getJson = require('../restClient.js');

/* GET students by searchTerm= */
router.get('/', async (req, res) => { 
  const qs = JSON.stringify(req.query);
  const studentClasses = await getJson('https://gist.githubusercontent.com/edotus/bd63eefb9b4b1eacb641811f9a1a780d/raw/60e04520584f7a436917b0d5be2b6c18f039fadb/students_classes.json');
  res.status(200).json(studentClasses);
  // logger.info(`Get teams qs=${qs}`);
  // if (StudentsValidator.isValidGetRequest(req)) {
  //   try {
  //     let results;
  //     if (displayName) {
  //       results = await teamService.getTeamsByDisplayName(displayName, size, offset);
  //     } else if (searchTerm) {
  //       searchTerm.includes('_') && (searchTerm = searchTerm.split('_').join(' '));
  //       results = await teamService.getTeamsBySearchTerm(searchTerm, size, offset);
  //     } else if (resourceId) {
  //       results = await teamService.getTeamsByResourceId(resourceId, size, offset);
  //     } else {
  //       results = await teamService.getAllTeams(size, offset);
  //     }
  //     logger.info(`Get teams successful, qs=${qs} count=${results.count}`);
  //     res.status(200).json(results);
  //   } catch (error) {
  //     logger.error(`Get teams failed, qs=${qs} error=${JSON.stringify(error)}`);
  //     res.status(500).json({ message: 'Server Error' });
  //   }
  // } else {
  //   logger.error(`Get teams failed, qs=${qs} error=Invalid Request`);
  //   res.status(400).json({ message: 'Invalid Request' });
  // }
});

module.exports = router;
