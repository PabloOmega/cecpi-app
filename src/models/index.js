// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Video, Step, Unit, Program, Student, Todo, StudentProgram } = initSchema(schema);

export {
  Video,
  Step,
  Unit,
  Program,
  Student,
  Todo,
  StudentProgram
};