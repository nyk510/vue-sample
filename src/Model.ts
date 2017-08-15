export class TodoItem {
    public static copy(a: TodoItem, b: TodoItem) {
        b.title = a.title
        b.contents = a.contents
        b.responsiblePerson = a.responsiblePerson
        b.assignedPersons = a.assignedPersons
        b.deadlineDate = a.deadlineDate
    }

    title: string
    contents: string
    responsiblePerson: Person
    assignedPersons: Array<Person>
    deadlineDate: string

    constructor() {
        this.title = ""
        this.contents = ""
        this.responsiblePerson = null
        this.assignedPersons = []
        this.deadlineDate = ""
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
        this.persons.push(new Person("次郎", 1))
        this.persons.push(new Person("太郎", 2))
        this.persons.push(new Person("イチロー", 3))
        this.persons.push(new Person("新井貴浩", 4))
    }
}
Manager.initialize()