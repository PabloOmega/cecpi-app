import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";





type EagerVideo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Video, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly path?: string | null;
  readonly description?: string | null;
  readonly poster?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVideo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Video, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly path?: string | null;
  readonly description?: string | null;
  readonly poster?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Video = LazyLoading extends LazyLoadingDisabled ? EagerVideo : LazyVideo

export declare const Video: (new (init: ModelInit<Video>) => Video) & {
  copyOf(source: Video, mutator: (draft: MutableModel<Video>) => MutableModel<Video> | void): Video;
}

type EagerStep = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Step, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly poster?: string | null;
  readonly Video?: Video | null;
  readonly unitID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly stepVideoId?: string | null;
}

type LazyStep = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Step, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly poster?: string | null;
  readonly Video: AsyncItem<Video | undefined>;
  readonly unitID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly stepVideoId?: string | null;
}

export declare type Step = LazyLoading extends LazyLoadingDisabled ? EagerStep : LazyStep

export declare const Step: (new (init: ModelInit<Step>) => Step) & {
  copyOf(source: Step, mutator: (draft: MutableModel<Step>) => MutableModel<Step> | void): Step;
}

type EagerUnit = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Unit, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly poster?: string | null;
  readonly programID: string;
  readonly Steps?: (Step | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUnit = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Unit, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly poster?: string | null;
  readonly programID: string;
  readonly Steps: AsyncCollection<Step>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Unit = LazyLoading extends LazyLoadingDisabled ? EagerUnit : LazyUnit

export declare const Unit: (new (init: ModelInit<Unit>) => Unit) & {
  copyOf(source: Unit, mutator: (draft: MutableModel<Unit>) => MutableModel<Unit> | void): Unit;
}

type EagerProgram = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Program, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly price: number;
  readonly discount?: number | null;
  readonly image?: string | null;
  readonly shortDescription?: string | null;
  readonly students?: (StudentProgram | null)[] | null;
  readonly Units?: (Unit | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProgram = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Program, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly price: number;
  readonly discount?: number | null;
  readonly image?: string | null;
  readonly shortDescription?: string | null;
  readonly students: AsyncCollection<StudentProgram>;
  readonly Units: AsyncCollection<Unit>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Program = LazyLoading extends LazyLoadingDisabled ? EagerProgram : LazyProgram

export declare const Program: (new (init: ModelInit<Program>) => Program) & {
  copyOf(source: Program, mutator: (draft: MutableModel<Program>) => MutableModel<Program> | void): Program;
}

type EagerStudent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Student, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly email: string;
  readonly Programs?: (StudentProgram | null)[] | null;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStudent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Student, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly email: string;
  readonly Programs: AsyncCollection<StudentProgram>;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Student = LazyLoading extends LazyLoadingDisabled ? EagerStudent : LazyStudent

export declare const Student: (new (init: ModelInit<Student>) => Student) & {
  copyOf(source: Student, mutator: (draft: MutableModel<Student>) => MutableModel<Student> | void): Student;
}

type EagerTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

type EagerStudentProgram = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StudentProgram, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly programId?: string | null;
  readonly studentId?: string | null;
  readonly program: Program;
  readonly student: Student;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStudentProgram = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StudentProgram, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly programId?: string | null;
  readonly studentId?: string | null;
  readonly program: AsyncItem<Program>;
  readonly student: AsyncItem<Student>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StudentProgram = LazyLoading extends LazyLoadingDisabled ? EagerStudentProgram : LazyStudentProgram

export declare const StudentProgram: (new (init: ModelInit<StudentProgram>) => StudentProgram) & {
  copyOf(source: StudentProgram, mutator: (draft: MutableModel<StudentProgram>) => MutableModel<StudentProgram> | void): StudentProgram;
}