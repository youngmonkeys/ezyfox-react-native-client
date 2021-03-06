import Util from './ezy-util'
import Const from './ezy-constants'
import Entity from './ezy-entities'

class EzyHandshakeHandler {

	handle(data) {
		this.startPing();
		this.handleLogin();
		this.postHandle(data);
	}

	postHandle(data) {
    }

	handleLogin() {
		var loginRequest = this.getLoginRequest();
        this.client.sendRequest(Const.EzyCommand.LOGIN, loginRequest);
    }
    
    getLoginRequest() {
        return ["test", "test", "test", []];
	}
	
	startPing() {
		this.client.startPingSchedule();
	}
}

//=======================================================

class EzyLoginSuccessHandler {
    handle(data) {
        var zoneId = data[0];
        var zoneName = data[1];
        var userId = data[2];
        var username = data[3];
        var responseData = data[4];

        var zone = new Entity.EzyZone(this.client, zoneId, zoneName);
        var user = new Entity.EzyUser(userId, username);
        this.client.me = user;
        this.client.zone = zone;
        this.handleLoginSuccess(responseData);
        Util.EzyLogger.console("user: " + user.name + " logged in successfully");
    }

    handleLoginSuccess(responseData) {
    }
}

class EzyLoginErrorHandler {
    handle(data) {
        this.client.disconnect(401);
        this.handleLoginError(data);
    }

    handleLoginError(data) {
    }
}

//=======================================================

class EzyAppAccessHandler {
    handle(data) {
        var zone = this.client.zone;
        var appManager = zone.appManager;
        var app = this.newApp(zone, data);
        appManager.addApp(app);
        this.postHandle(app, data);
        Util.EzyLogger.console("access app: " + app.name + " successfully");
    }

    newApp(zone, data) {
        var appId = data[0];
        var appName = data[1];
        var app = new Entity.EzyApp(this.client, zone, appId, appName);
        return app;
    }

    postHandle(app, data) {
    }
}

//======================================

class EzyAppExitHandler {
    handle(data) {
        var zone = this.client.zone;
        var appManager = zone.appManager
        var appId = data[0];
        var reasonId = data[1];
        var app = appManager.removeApp(appId);
        if(app) {
            this.postHandle(app, data);
            Util.EzyLogger.console("user exit app: " + app.name + ", reason: " + reasonId);
        }
    }

    postHandle(app, data) {
    }

}

//=======================================================

class EzyAppResponseHandler {
    handle(data) {
        var appId = data[0];
        var responseData = data[1];
        var cmd = responseData[0];
        var commandData = responseData[1];

        var app = this.client.getAppById(appId);
        var handler = app.getDataHandler(cmd);
        if(handler)
            handler(app, commandData);
        else
            Util.EzyLogger.console("app: " + app.name + " has no handler for command: " + cmd);
    }
}

//======================================

class EzyPluginInfoHandler {
    handle(data) {
        var zone = this.client.zone;
        var pluginManager = zone.pluginManager;
        var plugin = this.newPlugin(zone, data);
        pluginManager.addPlugin(plugin);
        this.postHandle(plugin, data);
        Util.EzyLogger.console("request plugin: " + plugin.name + " info successfully");
    }

    newPlugin(zone, data) {
        var pluginId = data[0];
        var pluginName = data[1];
        var plugin = new Entity.EzyPlugin(this.client, zone, pluginId, pluginName);
        return plugin;
    }

    postHandle(plugin, data) {
    }
}

//======================================

class EzyPluginResponseHandler {
    handle(data) {
        var pluginId = data[0];
        var responseData = data[1];
        var cmd = responseData[0];
        var commandData = responseData[1];

        var plugin = this.client.getPluginById(pluginId);
        var handler = plugin.getDataHandler(cmd);
        if(handler)
            handler(plugin, commandData);
        else
            Util.EzyLogger.console("plugin: " + plugin.name + " has no handler for command: " + cmd);
    }
}

//=======================================================

class EzyPongHandler {
    handle(data) {
    }
}

//=======================================================

class EzyDataHandlers {
    constructor(client) {
        this.handlers = {};
        this.client = client;
    }

    addHandler(cmd, handler) {
        handler.client = this.client;
        this.handlers[cmd] = handler;
    }

    getHandler(cmd) {
        var handler = this.handlers[cmd];
        return handler;
    }

    handle(cmd, data) {
        var handler = this.getHandler(cmd);
        if(handler)
            handler.handle(data);
        else
            console.log("has no handler with command: " + cmd);
    }
}

//=======================================================

class EzyAppDataHandlers {

    constructor() {
        this.handlers = {}
    }

    addHandler(cmd, handler) {
        this.handlers[cmd] = handler;
    }

    getHandler(cmd) {
        var handler = this.handlers[cmd];
        return handler;
    }

}

//======================================

class EzyPluginDataHandlers {

    constructor() {
        this.handlers = {}
    }

    addHandler(cmd, handler) {
        this.handlers[cmd] = handler;
    }

    getHandler(cmd) {
        var handler = this.handlers[cmd];
        return handler;
    }

}

//=======================================================

export default { 
    EzyHandshakeHandler,
    EzyLoginSuccessHandler,
    EzyLoginErrorHandler,
    EzyAppAccessHandler,
    EzyAppExitHandler,
    EzyAppResponseHandler,
    EzyPluginInfoHandler,
    EzyPluginResponseHandler,
    EzyPongHandler,
    EzyAppDataHandlers,
    EzyPluginDataHandlers,
    EzyDataHandlers
}