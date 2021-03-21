import React from "react";

import { Plugin } from "@vizality/entities";
import { patch, unpatchAll } from "@vizality/patcher";
import { getModule } from "@vizality/webpack";

import HeaderComponent from "./components/HeaderComponent";

const { transitionTo } = getModule("transitionTo");
const { parse } = getModule("parseTopic");

let currentToast;
export default class AppNotifications extends Plugin {
    async start () {
        // styles
        this.injectStyles("style.scss");

        // modules
        const makeTextChatNotification = getModule("makeTextChatNotification");
        const MessageContent = getModule(m => m.type?.displayName == "MessageContent");

        // injectors
        patch("notif-display", makeTextChatNotification, "makeTextChatNotification", (args,res) => {
            if (currentToast) vizality.api.notifications.closeToast(currentToast);

            currentToast = `app-notif-${Date.now()^12345}`;

            vizality.api.notifications.sendToast({
                id: currentToast,
                header: <HeaderComponent avatar={res.icon} text={res.title}/>,
                timeout: this.settings.get("stickyNotifications", false) == true ? null : 5000 * this.settings.get("displayTime", 1) * (this.settings.get("wordCountMultiplier", false) ? Math.max(args[1].content.length/50,1) : 1),
                content: <MessageContent.type message={{...args[1], hasFlag: () => false, isEdited: () => false}} content={parse(args[1].content == "" ? "`[Attachment(s)]`" : args[1].content, true, { channelId: args[0].id })}/>,
                buttons: this.settings.get("slimToasts", true) == false ? [{
                    text: "Jump to Message",
                    size: "small",
                    color: "green",
                    look: "filled",
                    onClick: () => {
                        transitionTo(`/channels/${args[0].guild_id ? args[0].guild_id : `@me`}/${args[1].channel_id}/${args[1].id}`);
                        vizality.api.notifications.closeToast(currentToast);
                    }
                },
                {
                    text: "Close Notification",
                    size: "small",
                    look: "ghost",
                    onClick: () => vizality.api.notifications.closeToast(currentToast)
                }] : null,
                position: "BottomRight"
            })
        });
    }

    stop () {
        unpatchAll("notif-display")
    }
}
