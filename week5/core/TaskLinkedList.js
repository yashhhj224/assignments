import TaskNode from "./TaskNode.js"

class TaskLinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    add(task) {
        const newNode = new TaskNode(task)
        if (!this.head) {
            this.head = newNode
        } else {
            let current = this.head
            while (current.next) current = current.next
            current.next = newNode
        }
        this.length++
    }

    toArray() {
        const arr = []
        let current = this.head
        while (current) {
            arr.push(current.data)
            current = current.next
        }
        return arr
    }

    findById(id) {
        let current = this.head
        while (current) {
            if (current.data.id === id) return current.data
            current = current.next
        }
        return null
    }

    removeById(id) {
        if (!this.head) return
        if (this.head.data.id === id) {
            this.head = this.head.next
            this.length--
            return
        }
        let current = this.head
        while (current.next && current.next.data.id !== id) {
            current = current.next
        }
        if (current.next) {
            current.next = current.next.next
            this.length--
        }
    }

    replaceDataArray(arr) {
        this.head = null
        this.length = 0
        arr.forEach(t => this.add(t))
    }
}

export default TaskLinkedList
