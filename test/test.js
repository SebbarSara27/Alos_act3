let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.should();
chai.use(chaiHttp);
describe('Test surahs API', () => {
    /**
         * Test the GET surahs
         */
    describe("Test GET  /surah", () => {
        it("It should return all surah", (done) => {//done
            chai.request(server)//req?
                .get("/surahs/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.not.be.eq(0);
                    done();
                });
        });
    });


    /**
         * Test the GET (by id) surahs
         */
    describe("GET /surah", () => {
        it("It should GET a surah by number", (done) => {//done
            
            chai.request(server)
                .get("/surah/" + newspaperId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('number').eq(1);
                    res.body.should.have.property('name');
                    res.body.should.have.property('englishName');
                    res.body.should.have.property('englishNameTranslation');
                    res.body.should.have.property('numberOfAyahs').eq(1);
                    res.body.should.have.property('revelationType');
                    done();
                });
        });

        it("It should NOT GET a surahs by number", (done) => {//done
            const surahsNumber = 114;
            chai.request(server)
                .get("/surahs/" + surahsNumber)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq("The surahs with the provided number does not exist.");
                    done();
                });
        });

    });

 
    /**
     * Test the POST surahs
     */
    describe("POST /surahs", () => {
        
            
        it("It should POST a new surahs", (done) => {//DONE
            const surahs = {

            };
            chai.request(server)
                .post("/surahs")
                .send(surahs)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('number').isInt(),
                        res.body.should.have.property('name').not().isEmpty().trim().escape(),
                        res.body.should.have.property('englishNameTranslation').not().trim().escape(),
                        res.body.should.have.property('numberOfAyahs').isInt(),
                        res.body.should.have.property('revelationType').not().trim().escape(),
                        (req, res) => {
                            let surah = req.body;
                            const errors = validationResult(req);
                            // the test
                            if (!surah.number && !surah.name) {
                                return res.status(400).json("surah not created");

                            }
                            if (!errors.isEmpty()) {
                                return res.status(400).json({
                                    success: false,
                                    errors: errors.array()
                                });
                            }
                            res.status(200).json({
                                success: true,
                                message: 'successfully created',

                            })
                            done();
                        
            
                        }
                    });
                });

            });
      
    });

    /**
     * Test the PUT surahs
     */
    describe("PUT /surahs/:surahsNumber", () => {
        it("It should PUT an existing surahs", (done) => {
            const surahs = {
               
                number: 114,
                name: "سُورَةُ النَّاسِ",
                englishName: "An-Naas",
                englishNameTranslation: "Mankind",
                numberOfAyahs: 6,
                revelationType: "Meccan"
                
            };
            chai.request(server)
                .put("/surahs/" + surahsNumber)
                .send(newspaper)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('number').eq(114);
                    res.body.should.have.property('name').eq("سُورَةُ النَّاسِ");
                    res.body.should.have.property('englishName').eq("An-Naas");
                    res.body.should.have.property('englishNameTranslation').eq("Mankind");
                    res.body.should.have.property('numberOfAyahs').eq(6);
                    res.body.should.have.property('revelationType').eq("Meccan");
                    done();
                });
        });

        it("It should NOT PUT an existing surahs with a name with less than 3 characters", (done) => {
            const number = parseInt(req.params.number)
            let surah = surahs.find(surah => surah.number === number)
            surah.name = req.body.name,
                surah.englishName = req.body.englishName,
                surah.englishNameTranslation = req.body.englishNameTranslation,
                surah.numberOfAyahs = parseInt(req.params.numberOfAyahs),
                surah.revelationType = req.body.revelationType,
                res.status(200).json(surah)
            res.send('surah ${surah.name} was added to our database. ')
            
            chai.request(server)
                .put("/surahs/" + surahs)
                .send(surahs)
                .end((err, res) => {
                    res.should.have.status(400);
                    //res.text.should.be.eq("The name should be at least 3 chars long!");
                    done();
                });
        });
    });


    /**
     * Test the DELETE surahs
     */
    describe("DELETE /surahs/:Number", () => {
        it("It should DELETE an existing surahs", (done) => {
            const surahsNumber = 1;
            chai.request(server)
                .delete("/surahs/" + surahs)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
        it("It should NOT DELETE a surahs that is not in the database", (done) => {
            const surahsNumber = 114;
            chai.request(server)
                .delete("/surahs/" + surahsNumber)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The surahs with the provided Number does not exist.");
                    done();
                });
        });

    });
