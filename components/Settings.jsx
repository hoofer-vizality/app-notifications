import React, { useState } from "react";

import { SwitchItem, Category, SliderInput } from "@vizality/components/settings";

export default ({ getSetting, updateSetting, toggleSetting }) => {
    const [customCategory, setCustomCategory] = useState(true)
    const [configCategory, setConfigCategory] = useState(true)
    return <>
        <Category name="Customization" opened={customCategory} onChange={()=> setCustomCategory(!customCategory)}>
            <SwitchItem
            note={"Makes the notification toasts slimmer at the cost of hiding the interactive buttons."}
            value={getSetting("slimToasts", true)}
            onChange={()=> toggleSetting("slimToasts", true)}
            >Slim Notification Toasts</SwitchItem>
        </Category>
        <Category name="Configuration" opened={configCategory} onChange={()=> setConfigCategory(!configCategory)}>
            <SwitchItem
            note={"Notifications will not vanish automatically."}
            value={getSetting("stickyNotifications", false)}
            onChange={()=> toggleSetting("stickyNotifications", true)}
            >Sticky Notifications</SwitchItem>
            <SwitchItem
            note={"Longer messages will increase the toast display time."}
            value={getSetting("wordCountMultiplier", false)}
            onChange={()=> toggleSetting("wordCountMultiplier", true)}
            >Wordcount Display Multiplier</SwitchItem>
            <SwitchItem
            note={"Notifications will show up during do-not-disturb mode."}
            value={getSetting("dndNotifications", false)}
            onChange={()=> toggleSetting("dndNotifications", true)}
            >Ignore Do-Not-Disturb Mode (Not Finished)</SwitchItem>
            <SliderInput
            minValue={0.5}
            maxValue={5}
            stickToMarkers
            markers={[0.5,1,1.25,1.5,2,2.5,3,4,5]}
            initialValue={getSetting("displayTime", 1)}
            onValueChange={(v)=> updateSetting("displayTime", v)}
            note="Changes the multiplier for the length of the notification being displayed"
            onMarkerRender={(v)=> `${v}x`}
            >Display Time Multiplayer</SliderInput>
        </Category>
    </>
}