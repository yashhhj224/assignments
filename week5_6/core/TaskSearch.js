class TaskSearch {
    static binarySearch(sortedTasks, searchValue) {
        let left = 0
        let right = sortedTasks.length - 1
        while (left <= right) {
            const mid = Math.floor((left + right) / 2)
            if (sortedTasks[mid].description === searchValue) return sortedTasks[mid]
            if (sortedTasks[mid].description < searchValue) left = mid + 1
            else right = mid - 1
        }
        return null
    }
}

export default TaskSearch
