const PROXY_CONFIG = [{
    context: [
        "/api",
        "/token"
    ],
    target: "http://192.168.68.128:8084",
    secure: false
}]

module.exports = PROXY_CONFIG;