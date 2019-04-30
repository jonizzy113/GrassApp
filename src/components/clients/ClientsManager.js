const remoteURL = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${remoteURL}/clients/${id}`).then(e => e.json())
    },
    getAll() {
        return fetch(`${remoteURL}/clients`).then(e => e.json())
    },
}