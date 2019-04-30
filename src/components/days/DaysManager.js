const remoteURL = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${remoteURL}/days/${id}`).then(d => d.json())
    },
    getAll() {
        return fetch(`${remoteURL}/days`).then(d => d.json())
    }
}