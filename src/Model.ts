export interface TodoObject {
    isCompleted: boolean
    title: string
    contents: string
    responsiblePerson: Person
    assignedPersons: Array<Person>
    deadlineDate: string
}

export class TodoItem {
    public static copy(a: TodoItem, b: TodoItem) {
        b.isCompleted = a.isCompleted
        b.title = a.title
        b.contents = a.contents
        b.responsiblePerson = a.responsiblePerson
        b.assignedPersons = a.assignedPersons
        b.deadlineDate = a.deadlineDate
    }

    title: string
    isCompleted: boolean
    contents: string
    responsiblePerson: Person
    assignedPersons: Array<Person>
    deadlineDate: string

    constructor(v: TodoObject)
    constructor()
    constructor(v?: TodoObject) {
        if (v == null) {
            this.isCompleted = false
            this.title = ""
            this.contents = ""
            this.responsiblePerson = null
            this.assignedPersons = []
            this.deadlineDate = ""
        } else {
            this.isCompleted = v.isCompleted
            this.title = v.title
            this.contents = v.contents
            this.responsiblePerson = v.responsiblePerson
            this.assignedPersons = v.assignedPersons
            this.deadlineDate = v.deadlineDate
        }
    }

    public isValid(): boolean {
        if (this.title.length === 0) return false
        if (this.contents.length === 0) return false
        if (this.responsiblePerson == null) return false
        if (this.assignedPersons.length === 0) return false
        if (this.deadlineDate.length === 0) return false

        return true
    }
}

export interface OneItem {
    name: string
    id: number
}

export class OneItem {
    name: string
    id: number
    constructor(name: string, id: number) {
        this.name = name
        this.id = id
    }
}

export class Person extends OneItem { }

export class Manager {
    static persons: Array<OneItem>
    static initialize() {
        this.persons = []
        this.persons.push(new Person("羽生善治", 1))
        this.persons.push(new Person("廣瀬純", 2))
        this.persons.push(new Person("イチロー", 3))
        this.persons.push(new Person("新井貴浩", 4))
        this.persons.push(new Person("藤井猛", 5))
    }
}
Manager.initialize()