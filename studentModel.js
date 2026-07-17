const db = require("../config/db");

const registerStudent = (student, callback) => {
    const sql = `
        INSERT INTO students
        (full_name, email, password, phone, gender, course, year, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            student.full_name,
            student.email,
            student.password,
            student.phone,
            student.gender,
            student.course,
            student.year,
            student.address
        ],
        callback
    );
};

const findStudentByEmail = (email, callback) => {
    const sql = "SELECT * FROM students WHERE email = ?";

    db.query(sql, [email], callback);
};


const findStudentById = (id, callback) => {

    const sql = `
        SELECT id, full_name, email, phone, gender, course, year, address
        FROM students
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};


const getAllStudents = (callback) => {

    const sql = `
        SELECT id, full_name, email, phone, gender, course, year, address
        FROM students
    `;

    db.query(sql, callback);

};


const getStudentById = (id, callback) => {

    const sql = `
        SELECT id, full_name, email, phone, gender, course, year, address
        FROM students
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};



const updateStudent = (id, student, callback) => {

    const sql = `
        UPDATE students
        SET
            full_name = ?,
            email = ?,
            phone = ?,
            gender = ?,
            course = ?,
            year = ?,
            address = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            student.full_name,
            student.email,
            student.phone,
            student.gender,
            student.course,
            student.year,
            student.address,
            id
        ],
        callback
    );

};







const deleteStudent = (id, callback) => {

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], callback);

};








module.exports = {
    registerStudent,
    findStudentByEmail,
    findStudentById,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};