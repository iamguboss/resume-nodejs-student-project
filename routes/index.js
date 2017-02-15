var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/api', function(req, res, next) {
    var data = { data: [{ title: 'ประวัติส่วนตัว', firstname: "นายสุกฤษฏ", lastname: "โหวธีระกุล", sex: "ชาย", birthday: "15 กันยายน 2537", address: "153 ซ.กาญจนาภิเษก008แยก2 แขวงบางแค เขตบางแค กทม. 10160", jobs: "Programmer" }, { title: 'ประวัติการศึกษา', year: ['2543-2548', '2549-2551', '2552-2554'], school: ['โรงเรียนตรีมิตรวิทยา (ปัจจุบันชื่อ โรงเรียนเซนปีเตอร์ธนบุรี)', 'โรงเรียนวัดราชบพิธ'] }, { title: 'ประวัติการอบรม', school: ['codestar'], course: ['Fullstack Javascript', 'Java for Career', '.Net Core'] }] }
    res.json(data)
})

router.get('/api/student', function(req, res, next) {
    Student.find(function(err, docs) {
        if (err) {
            return next(err)
        } else {
            if (docs.length == 0) {
                var data = { code: 404, msg: 'ไม่พบข้อมูล' }
                res.json(data)
            } else {
                var data = { code: 200, msg: 'สำเร็จ', data: docs }
                res.json(data)
            }
        }
    })
})

router.get('/student', function(req, res, next) {
    Student.find(function(err, docs) {
        if (err) return next(err)
        res.render('index-student', { data: docs })
    })
})

router.get('/student/admin', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    Student.find(function(err, docs) {
        if (err) return next(err)
        res.render('admin1-student', { data: docs })
    })
})

router.post('/student/admin/login', function(req, res, next) {
    var username = req.body.username
    var password = req.body.password
    if (username == 'admin' && password == 'admin') {
        res.cookie('username', username).redirect('/student/admin')
    } else {
        res.render('login-student', { status: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' })
    }
})

router.get('/student/admin/logout', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    res.clearCookie('username').redirect('/student')
})

router.get('/student/admin/insertname', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    res.render('form-student')
})

router.post('/student/admin/insertname', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    Student.create(req.body, function(err, docs) {
        if (err) return next(err)
        res.redirect('/student/admin')
    })
})

router.get('/student/admin/insertscore/:id', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    Student.findOne({ id: req.params.id }, function(err, docs) {
        if (err) return next(err)
        res.render('form-score', { data: docs })
    })
})

router.post('/student/admin/insertscore/', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    console.log(req.body)
    if (req.body.score >= 80) {
        Student.update({ id: req.body.id }, { score: req.body.score, grade: 'A' }, function(err, docs) {
            if (err) return next(err)
            res.redirect('/student/admin')
        })
    } else {
        Student.update({ id: req.body.id }, { score: req.body.score, grade: 'F' }, function(err, docs) {
            if (err) return next(err)
            res.redirect('/student/admin')
        })
    }
})

router.get('/student/admin/update/:id', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    Student.findOne({ id: req.params.id }, function(err, docs) {
        if (err) return next(err)
        res.render('form-score-edit', { data: docs })
    })
})

router.post('/student/admin/update', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    if (req.body.score >= 80) {
        Student.update({ id: req.body.id }, { score: req.body.score, grade: 'A' }, function(err, docs) {
            if (err) return next(err)
            res.redirect('/student/admin')
        })
    } else {
        Student.update({ id: req.body.id }, { score: req.body.score, grade: 'F' }, function(err, docs) {
            if (err) return next(err)
            res.redirect('/student/admin')
        })
    }
})

router.get('/student/admin/delete/:id', function(req, res, next) {
    if (req.cookies.username == null || req.cookies.username == undefined) {
        res.render('login-student', { status: null })
    } else {
        next()
    }
}, function(req, res, next) {
    Student.remove({ id: req.params.id }, function(err, docs) {
        if (err) return next(err)
        res.redirect('back')
    })
})


module.exports = router;