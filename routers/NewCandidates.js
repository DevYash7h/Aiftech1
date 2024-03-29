const { NewCandidate } = require("../models/NewCandidate");
const express = require("express");
const { Router } = require("express");
const router = express.Router();


//API TO ADD A NewCandidate 
router.post(`/`, async (req, res) => {
    let newcandidate = new NewCandidate({
        FullName: req.body.FullName,
        JobLocation: req.body.JobLocation,
        City: req.body.City,
        Country: req.body.Country,
        Country : req.body.Country ,
        JobTitle: req.body.JobTitle,
        CompanyName: req.body.CompanyName,
        LinkedinLink: req.body.LinkedinLink,
        FacebookLink: req.body.FacebookLink,
        PersonalEmail : req.body.PersonalEmail ,
        ProfessionalEmail : req.body.ProfessionalEmail ,
        PersonalPhoneNumber : req.body.PersonalPhoneNumber ,
        HighestQualification: req.body.HighestQualification ,
        GraduationYear : req.body.GraduationYear ,
        Salary : req.body.Salary ,
        JobDescription: req.body.JobDescription,
        ResumeUpload : req.body.ResumeUpload ,

    });
  
  newcandidate = await newcandidate.save();
  
    if (!newcandidate) return res.status(500).send("New Candidate cannot be created");
  
    res.send(newcandidate);
  });

  router.delete("/:id", (req, res) => {
    NewCandidate.findByIdAndRemove(req.params.id)
      .then((newcandidate) => {
        if (newcandidate) {
          return res
            .status(200)
            .json({ success: true, message: "the New Candidate is deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "New Candidate not found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ succes: false, error: err });
      });
  });


  router.put("/:id", async (req, res) => {
    // this by default update the detal but sen the old one only so new :  true then this will show you updated one !
  
    const newcandidate = await NewCandidate.findByIdAndUpdate(
      req.params.id,
      {
        FullName: req.body.FullName,
        JobLocation: req.body.JobLocation,
        City: req.body.City,
        Country: req.body.Country,
        JobTitle: req.body.JobTitle,
        CompanyName: req.body.CompanyName,
        LinkedinLink: req.body.LinkedinLink,
        FacebookLink: req.body.FacebookLink,
        PersonalEmail : req.body.PersonalEmail ,
        ProfessionalEmail : req.body.ProfessionalEmail ,
        PersonalPhoneNumber : req.body.PersonalPhoneNumber ,
        HighestQualification: req.body.HighestQualification ,
        GraduationYear : req.body.GraduationYear ,
        Salary : req.body.Salary ,
        JobDescription: req.body.JobDescription,
        ResumeUpload : req.body.ResumeUpload 
      },
      { new: true }
    );
  
    if (!newcandidate) return res.status(500).send("the new candidate cannot be updated");
  
    res.send(newcandidate);

    router.get(`/`, async (req, res) => {
        // localhost:3000/api/AI/Products?categories=23456,23964/
        const newcandidatelist = await NewCandidate.find();
        if (!newcandidatelist) {    
          res.status(500).json({ success: false });
        }
        res.send(newcandidatelist);
      });
  });

  router.get(`/`, async  (req,res) => {
    const newcandidatelist = await  NewCandidate.find() ;   // we doent want people to see password of user so we remove that feild  .select('-passwordHash')
    if(!newcandidatelist){
        res.status(401).json({success : false})
    }
     res.send(newcandidatelist);
})

  

module.exports = router;