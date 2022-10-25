export type User = {
    id: number;
    email: string;
    fullname: string;
    password: string;
    image: string;
    role:String;
  };
export type Children={
    fullname: string,
    image: string,
    email: string,
    class: {
      name: string,
       subjects:Subject[]
    }
  
}
export type Subject={
    subject: {
      id: number,
      name: string
    },
    mark: number,
    teacher: {
      id:number,
      fullname: string,
      image:string,
      email: string
    }
}

type StduentFromTeacherMark= {
  subject: {
    id: number,
    name: string
  },
  mark: number,
  teacher: {
    id: number,
    fullname: string,
    image:string,
    email: string
  }
}

export type Student=[
  {
    id: number,
    fullname: string,
    image:string,
    email: string,
    password: string,
    class: {
      name: string
    },
    parent: {
      id: number,
      fullname: string,
      image: string,
      email: string
    },
    stduentFromTeacherMark: StduentFromTeacherMark[]
  }
]
export type InitialInfo={
  id:number,
  fullname:"string",
  image:"string",
  email:"string"
}
export type Class={
  name:string,
  students: InitialInfo[],
  subjects: Subject["subject"][]
}
export type Teacher=[
  {
    id: number,
    fullname: string,
    image:string
    email: string,
    password: string,
    classes:Class[]
  }
]

  export type StateType = {
    currentUser: User | null,
    currentUserData:any,
    signInErrors: [],
    selectedPerson:Children|null,
    selectedPersonData:Student|[],
    selectedClass:Class|[],
    selectedClassData:any,
    showContent:boolean,
    selectedSubject:null|string,
    subjectData:any,
    getSubjectData:(subject:string)=>void,
    setSelectedSubject:(subject:string)=>void,
    setShowContent:()=>void,
    getDataForClass:(teachingClass:Class)=>void,
    setSelectedClass:(teachingClass:Class)=>void,
    setSelectedPerson:(person:Children)=>void,
    getDataForselectedPerson:(email:String)=>void,
    setErrors:()=>void,
    signInUser:(formData:any,navigate:any)=>void,
    signOutUser:()=>void,
    postMarkToAStudent:(formData:any,name:string)=>void

    
  
  }
  