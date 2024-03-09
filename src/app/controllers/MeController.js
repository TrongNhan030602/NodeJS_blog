const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] me/stored/courses
    storedCourses(req, res, next) {
        let courseQurey = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQurey = courseQurey.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQurey, Course.findDeleted({})])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    deletedCount: deletedCount.filter(
                        (course) => course.deleted,
                    ).length,
                }),
            )
            .catch(next);
    }

    // [GET] me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController(); // Tạo một obj và export ra
