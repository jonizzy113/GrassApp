const remoteURL = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${remoteURL}/employeeDays/${id}`).then(e => e.json())
    },
    getDay(employeeId) {
        return fetch(`${remoteURL}/employeeDays?employeeId=${employeeId}&&_expand=day`).then(e => e.json())
    },
    getAll() {
        return fetch(`${remoteURL}/employeeDays?_expand=employee&&_expand=day`).then(e => e.json())
    },
    getAll2() {
        return fetch(`${remoteURL}/employeeDays`).then(e => e.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/employeeDays/${id}`, {
            method: "DELETE"
        }).then(e =>e.json())
    },
    post(newEmployeeDay) {
        return fetch(`${remoteURL}/employeeDays`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployeeDay)
        }).then(data => data.json())
    },
}