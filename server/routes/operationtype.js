const express = require('express');
const router = express.Router();
const { OperationType } = require("../models/OperationType");
const axios = require('axios');


router.get("/dojob",(req, res) => {
    const promise = new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'https://backend-staging.epicuramed.it/operationtasks',
        })
        .then(async function (response) {
            let data = response.data;

            let distinctOperationTypes = [...new Map(data.map(item => [item["operationType"]["_id"], item["operationType"]])).values()];

            let distinctDisciplineId = [...new Map(distinctOperationTypes.map(item => [item["discipline"], item["discipline"]])).values()];

            const asyncRes = await Promise.all(distinctDisciplineId.map(async (item) => {

                let disciplineInfo = await axios({
                  method: 'get',
                  url: `https://backend-staging.epicuramed.it/disciplines/${item}`,
                })

	            return disciplineInfo.data;
            }));

            // save distinctOperationTypes on MongoDB

            distinctOperationTypes.forEach((item, i) => {
                const operationType = new OperationType(item);
                operationType.save(function (err) {
                  if (!err) {
                      resolve('saved');
                  }
                });
            });


        })
    });

    promise.then(data => {
        return res.json(data);
    }).catch((err) => {
        console.log(err);
    });

});


module.exports = router;
