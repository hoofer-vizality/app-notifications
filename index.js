import React from 'react';

import { Plugin } from '@vizality/entities';
import { patch, unpatch } from '@vizality/patcher';
import { getModule } from '@vizality/webpack';

const HeaderComponent = require("./components/HeaderComponent");
const Settings = require("./components/Settings");

export default class AppNotifications extends Plugin {
    async start () {
        this.injectStyles('style.scss');
        this.registerSettings(Settings)  
        // modules
        const makeTextChatNotification = getModule(["makeTextChatNotification"], false);
        const MessageContent = getModule(m => m.type?.displayName == "MessageContent", false);
        const transitionTo = getModule(["transitionTo"], false);
        const parseTopic = await getModule(["parseTopic"], true);
        var currentToast;

        // injectors
        patch("notif-display", makeTextChatNotification, "makeTextChatNotification", (args,res) => {
            if (currentToast)
                vizality.api.notices.closeToast(currentToast);

            currentToast = `app-notif-${Date.now()^12345}`;

            var toast = vizality.api.notices.sendToast(currentToast, {
                header: <HeaderComponent avatar={res.icon} text={res.title}/>,
                timeout: this.settings.get("stickyNotifications", false) == true ? null : 5000 * this.settings.get("displayTime", 1) * (this.settings.get("wordCountMultiplier", false) ? Math.max(args[1].content.length/50,1) : 1),
                content: <MessageContent.type message={{...args[1], hasFlag: () => false, isEdited: () => false}} content={parseTopic.parse(args[1].content == "" ? "`[Attachment(s)]`" : args[1].content, true, { channelId: args[0].id })}/>,
                buttons: this.settings.get("slimToasts", true) == false ? [{
                    text: "Jump to Message",
                    size: "small",
                    color: "green",
                    look: "filled",
                    onClick: () => {
                        transitionTo.transitionTo(`/channels/${args[0].guild_id ? args[0].guild_id : `@me`}/${args[1].channel_id}/${args[1].id}`);
                        vizality.api.notices.closeToast(currentToast);
                    }
                },
                {
                    text: "Close Notification",
                    size: "small",
                    look: "ghost",
                    onClick: () => {
                        vizality.api.notices.closeToast(currentToast);
                    }
                }] : null,
                position: "BottomRight"
            })
            return res;
        });
    }

    stop () {
        unpatch("notif-display")
    }
}
