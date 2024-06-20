const Assignment = require('../models/Assignment')
const Courses = require('../models/Course')
const UploadAssignment = require('../models/UploadAssigment')

const create = async (req, res) => {
  const CourseID = req.params.courseId
  try {
    console.log('creat an assignment' + req.body)
    const assignment = new Assignment(req.body)
    assignment.course = req.params.courseId
    if (req.file) {
      const assign = new UploadAssignment({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer
      })
      const savedAssign = await assign.save()
      assignment.assignfile = savedAssign._id
    }
    await assignment.save()
    // res.send(assignment)
    const updateCourse = await Courses.findById(CourseID)
    updateCourse.Assignments.push(assignment._id)
    updateCourse.save()

    res.status(201).send(assignment)
  } catch (error) {
    res.status(400).send(error)
  }
}

const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: 'Assignment deleted successfully' })
  } catch (error) {
    res.status(400).send(error)
  }
}

// const upload = async (req, res) => {
//   try {
//     const assignment = await Assignment.findById(req.params.id)
//     if (!assignment) {
//       return res.status(404).send('Assignment not found')
//     }

//     const submission = {
//       studentName: req.body.studentName,
//       code: req.body.code
//     }

//     assignment.submissions.push(submission)
//     await assignment.save()
//     res.status(201).send(submission)
//   } catch (error) {
//     res.status(400).send(error)
//   }
// }

const download = (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.fileName)
  res.download(filePath)
}

module.exports = {
  create,

  download,
  delete: deleteAssignment
}
