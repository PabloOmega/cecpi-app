import { generateClient } from "aws-amplify/api";
import { createStudent, updateStudent, createStudentProgram } from '../src/graphql/mutations';
import { listStudents, getStudent, listStudentPrograms } from "../src/graphql/queries";

const client = generateClient();

export async function payCourse({ userId, name, email, programId, price }) {
    if (price <= 0) {
        let ret = await createOrUpdateStudent(userId, name, email, programId);
        if (ret) return true;
        else return false;
    }
    return false;
}

async function createOrUpdateStudent(userId, name, email, programId) {

    var student = await filterStudents(userId);

    try {
        if (student.length) {
            let ret = await isRegistered(student[0].id, programId);
            if (ret === undefined) return;
            if (ret) {
                console.log("ya esta inscrito");
                return true;
            }
        } else {
            student = await createStudentFunc(userId, name, email);
        }

        await createRelation(student.data ? student.data.createStudent.id : student[0].id, programId);
        return true;

    } catch (err) {
        console.log(err);
        console.log("error al crear el estudiante");
    }

}

async function filterStudents(userId) {

    const variables = {
        filter: {
            userId: {
                eq: userId
            }
        }
    };

    try {
        const studentData = await client.graphql({
            query: listStudents,
            variables: variables
        });
        return studentData.data.listStudents.items;
    } catch (err) {
        console.log('error fetching students');
    }
}

function createStudentFunc(userId, name, email) {
    return client.graphql({
        query: createStudent,
        variables: {
            input: {
                "userId": userId,
                "name": name,
                "email": email,
            }
        },
        authMode: 'userPool'
    });
}

function createRelation(studentId, programId) {
    client.graphql({
        query: createStudentProgram,
        variables: {
            input: {
                "studentId": studentId,
                "programId": programId,
            }
        },
        authMode: 'userPool'
    });
}

export async function isRegistered(studentId, courseId) {

    const variables = {
        filter: {
            studentId: { eq: studentId },
            programId: { eq: courseId }
        }
    };

    try {
        const relationData = await client.graphql({
            query: listStudentPrograms,
            variables: variables
        });
        if (relationData.data.listStudentPrograms.items.length) return true;
        return false;
    } catch (err) {
        console.log(err);
        console.log('error comprobando registrados');
    }
}