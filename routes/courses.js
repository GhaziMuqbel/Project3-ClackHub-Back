const express = require('express')
const router = express.Router()
const courseController = require('../controllers/Courses')

router.post('/newCourse/:instructorid', courseController.addCourse)
//router.put('/:courseId', courseController.addAssignments)
router.put('/addStudent/:id', courseController.addStudent)
router.delete('/deleteCourse/:id', courseController.delete)
router.get('/getassignments/:courseId', courseController.getAllAssignments)
router.get('/getcourses', courseController.getAllCourses)
router.get('/getDetails/:courseId', courseController.getCourseDetails)
module.exports = router
