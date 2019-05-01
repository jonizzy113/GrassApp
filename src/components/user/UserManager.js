const remoteURL = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${remoteURL}/users/${id}`).then(u => u.json())
    },
    getAll() {
        return fetch(`${remoteURL}/users`).then(u => u.json())
    }
}