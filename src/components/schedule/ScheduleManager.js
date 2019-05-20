const remoteURL = "http://localhost:8088"

export default {
    getAll() {
        return fetch(`${remoteURL}/clients?_expand=day`).then(d => d.json())
    }
}
