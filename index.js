import React from 'react';

import { Plugin } from '@vizality/entities';
import { patch, unpatch } from '@vizality/patcher';
import { getModule } from '@vizality/webpack';

const HeaderComponent = require("./components/HeaderComponent");
const Settings = require("./components/Settings");

export default class MentionUtilities extends Plugin {
    async start () {
        this.injectStyles('style.scss');
        this.registerSettings(Settings)  
        // modules
        const makeTextChatNotification = getModule(["makeTextChatNotification"], false);
        const MessageContent = getModule(m => m.type?.displayName == "MessageContent", false);
        const transition = getModule(["transitionTo"], false);
        const parseTopic = await getModule(["parseTopic"], true);
        const parser = parseTopic.parse;

        // injectors
        patch("notif-display", makeTextChatNotification, "makeTextChatNotification", (args,res) => {
            var toastId = `app-notif-${Date.now()^12345}`;
            var toast = vizality.api.notices.sendToast(toastId, {
                header: <HeaderComponent avatar={res.icon} text={res.title}/>,
                timeout: 5000,
                content: <MessageContent.type message={{...args[1], hasFlag: () => false, isEdited: () => false}} content={parser(args[1].content == "" ? "`[Attachment(s)]`" : args[1].content, true, { channelId: args[0].id })}/>,
                buttons:this.settings.get("slimToasts", true) == false ? [{
                    text: "Jump to Message",
                    size: "small",
                    color: "green",
                    look: "filled",
                    onClick: () => {
                        transition.transitionTo(`/channels/${args[0].guild_id ? args[0].guild_id : `@me`}/${args[1].channel_id}/${args[1].id}`);
                        vizality.api.notices.closeToast(toastId);
                    }
                },
                {
                    text: "Close Notification",
                    size: "small",
                    look: "ghost",
                    onClick: () => {
                        vizality.api.notices.closeToast(toastId);
                    }
                }] : null,
                position: "BottomRight"
            })
            console.log(toast);
            return res;
        });
    }

    stop () {
        unpatch("notif-display")
    }
}
