var express = require('express');
var router = express.Router();
const StudentsValidator = require('../validators/studentsValidator');
const StudentsService = require('../services/studentsService');

const studentsService = new StudentsService();

/* GET ALL on default OR GET students by searchTerm or GET by email*/
router.get('/', async (req, res) => { 
  if (StudentsValidator.isValidSearchStudentsRequest(req)) {
    try {
      const { searchTerm } = req.query;
      let results = {};

      if (searchTerm) {
        results = await studentsService.searchByName(searchTerm);
      } else {
        results = await studentsService.getAllStudents();
      }
      
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid Request' });
  }
});

// GET DETAILS BY FULLNAME (ideally would have ids of each student)
router.get('/:name', async (req, res) => { 
  if (StudentsValidator.isValidDetailsRequest(req)) {
    try {
      const { name } = req.params;
      const results = await studentsService.getStudentWithDetails(name);
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid Request' });
  }
});

module.exports = router;
