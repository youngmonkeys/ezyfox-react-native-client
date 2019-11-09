const EzyCommand =  {
    ERROR : "ERROR",
    HANDSHAKE : "HANDSHAKE",
    PING : "PING",
    PONG : "PONG",
    LOGIN : "LOGIN",
    LOGIN_ERROR : "LOGIN_ERROR",
    LOGOUT : "LOGOUT",
    APP_ACCESS : "APP_ACCESS",
    APP_REQUEST : "APP_REQUEST",
    APP_EXIT : "APP_EXIT",
    APP_ACCESS_ERROR : "APP_ACCESS_ERROR",
    APP_REQUEST_ERROR: "APP_REQUEST_ERROR",
    PLUGIN_INFO : "PLUGIN_INFO",
    PLUGIN_REQUEST : "PLUGIN_REQUEST"
}

const EzyEventType = {
    CONNECTION_SUCCESS: "CONNECTION_SUCCESS",
    CONNECTION_FAILURE: "CONNECTION_FAILURE",
    DISCONNECTION : "DISCONNECTION",
    LOST_PING : "LOST_PING",
    TRY_CONNECT : "TRY_CONNECT"
}

const EzyConnectionStatus = {
    NULL: "NULL",
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    DISCONNECTED: "DISCONNECTED",
    FAILURE: "FAILURE",
    RECONNECTING: "RECONNECTING"
}

export default {EzyCommand, EzyEventType, EzyConnectionStatus}