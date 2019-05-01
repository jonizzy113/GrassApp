const remoteURL = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${remoteURL}/employees/${id}`).then(e => e.json())
    },
    getAll() {
        return fetch(`${remoteURL}/employees`).then(e => e.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/employees/${id}`, {
            method: "DELETE"
        }).then(e =>e.json())
    },
    post(newEmployee) {
        return fetch(`${remoteURL}/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }).then(data => data.json())
    },

    put(editiedEmployee) {
        return fetch(`${remoteURL}/employees/${editiedEmployee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editiedEmployee)
        })
    }
}