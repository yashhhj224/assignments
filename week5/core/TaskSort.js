class TaskSort {
    static compareByName(a, b) {
        const primary = a.description.localeCompare(b.description);
        if (primary !== 0) return primary;

        const d1 = new Date(a.dueDate);
        const d2 = new Date(b.dueDate);
        return d1 - d2;
    }

    static compareByDate(a, b) {
        const d1 = new Date(a.dueDate);
        const d2 = new Date(b.dueDate);

        const primary = d1 - d2;
        if (primary !== 0) return primary;

        return a.description.localeCompare(b.description);
    }

    static merge(left, right, comparator) {
        const sorted = [];
        while (left.length && right.length) {
            // comparator must return NEGATIVE for a BEFORE b
            if (comparator(left[0], right[0]) < 0) {
                sorted.push(left.shift());
            } else {
                sorted.push(right.shift());
            }
        }
        return [...sorted, ...left, ...right];
    }

    static mergeSort(arr, comparator) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = TaskSort.mergeSort(arr.slice(0, mid), comparator);
        const right = TaskSort.mergeSort(arr.slice(mid), comparator);

        return TaskSort.merge(left, right, comparator);
    }
}

export default TaskSort;
