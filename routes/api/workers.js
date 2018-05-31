const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//Load Worker model
const Worker = require('../../models/Worker');

// @route  POST api/workers/addWorker
// @desc   addWorker
// @access Public
router.post('/addWorker', (req, res) => {
    Worker.findOne({
        name: req.body.name,
        birthday: req.body.birthday,
        position: req.body.position,
        salary: req.body.salary
    })
        .then(worker => {
            if (worker) {
                res.json({
                    success: false
                });
            } else {
                const newWorker = new Worker({
                    name: req.body.name,
                    birthday: req.body.birthday,
                    position: req.body.position,
                    salary: req.body.salary
                });
                newWorker.save()
                    .then(worker => {
                        if (worker) {
                            res.json({
                                success: true,
                                worker: worker
                            });
                        } else {
                            return res.status(400).json({ msg: 'Error on the server! Worker has not added' });
                        }
                    })
                    .catch(err => console.log(err));
            }
        })
})

// @route   Update api/workers/:id
// @desc    Update worker
// @access  Public
router.put('/updateWorker/:id', (req, res) => {
    Worker.findOne({
        name: req.body.name,
        birthday: req.body.birthday,
        position: req.body.position,
        salary: req.body.salary
    })
        .then(worker => {
            if (worker)
                return res.json({ success: false })
            else {
                Worker.findById(req.params.id)
                    .then(worker => {
                        worker.name = req.body.name;
                        worker.birthday = req.body.birthday;
                        worker.position = req.body.position;
                        worker.salary = req.body.salary;

                        worker.save().then(worker => {
                            if (worker) {
                                res.json({ success: true });
                                worker.json(worker)
                            } else
                                return res.status(400).json({ msg: 'Error on the server! Worker has not edited' });
                        });
                    })
                    .catch(err => res.status(404).json({ workernotfound: 'No worker found' }));
            }
        })
})

// @route   DELETE api/workers/:id
// @desc    Delete worker
// @access  Public
router.delete('/delWorker/:id', (req, res) => {
    Worker.findById(req.params.id)
        .then(worker => {
            // Delete
            worker.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ workernotfound: 'No worker found' }));
}
);

// @route  GET api/workers/test1
// @desc   Tests workers route
// @access Public
router.get('/test1', (req, res) => res.json({
    msg: "Workers works"
}));

// @route   GET api/workers
// @desc    Get workers
// @access  Public
router.get('/getWorkers', (req, res) => {
    Worker.find()
        .sort({ name: 1 })
        .then(workers => res.json(workers))
        .catch(err => res.status(404).json({ noworkersfound: 'No workers found' }));
});

module.exports = router;


