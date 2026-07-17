const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const studentModel = require("../models/studentModel");

const register = async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            phone,
            gender,
            course,
            year,
            address
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = {
            full_name,
            email,
            password: hashedPassword,
            phone,
            gender,
            course,
            year,
            address
        };

        studentModel.registerStudent(student, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "Student Registered Successfully"
            });
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// 👇 Add this function below register()
const login = (req, res) => {

    const { email, password } = req.body;

    studentModel.findStudentByEmail(email, async (err, result) => {

        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const student = result[0];

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: student.id,
                email: student.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            student: {
                id: student.id,
                full_name: student.full_name,
                email: student.email
            }
        });

    });

};



const getProfile = (req, res) => {

    const studentId = req.student.id;

    studentModel.findStudentById(studentId, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(result[0]);

    });

};



const getAllStudents = (req, res) => {

    studentModel.getAllStudents((err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json(result);

    });

};




const getStudentById = (req, res) => {

    const id = req.params.id;

    studentModel.getStudentById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(result[0]);

    });

};




const updateStudent = (req, res) => {

    const id = req.params.id;

    const {
        full_name,
        email,
        phone,
        gender,
        course,
        year,
        address
    } = req.body;

    const student = {
        full_name,
        email,
        phone,
        gender,
        course,
        year,
        address
    };

    studentModel.updateStudent(id, student, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json({
            message: "Student Updated Successfully"
        });

    });

};





const deleteStudent = (req, res) => {

    const id = req.params.id;

    studentModel.deleteStudent(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student Deleted Successfully"
        });

    });

};




module.exports = {
    register,
    login,
    getProfile,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};