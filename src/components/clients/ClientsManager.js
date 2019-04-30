const remoteURL = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${remoteURL}/clients/${id}`).then(e => e.json())
    },
    getAll() {
        return fetch(`${remoteURL}/clients`).then(e => e.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/clients/${id}`, {
            method: "DELETE"
        }).then(e =>e.json())
    },
    post(newClient) {
        return fetch(`${remoteURL}/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newClient)
        }).then(data => data.json())
    },

    put(editiedClient) {
        return fetch(`${remoteURL}/clients/${editiedClient.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editiedClient)
        })
    }
}