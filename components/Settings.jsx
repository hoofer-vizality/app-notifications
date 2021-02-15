import { React, getModule, getModuleByDisplayName, contextMenu } from "@vizality/webpack"
import { Modal, Icon, Button, SearchBar, Anchor, Divider, Text, Avatar } from "@vizality/components"
import { TextInput, SwitchItem, ButtonItem, Category, SliderInput } from '@vizality/components/settings';

module.exports = class Settings extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            custom_opened: true,
            config_opened: true
        }
    }

    render() {
        
        return <>
            <Category name="Customization" opened={this.state.custom_opened} onChange={()=> this.setState({ custom_opened: !this.state.custom_opened})}>
                <SwitchItem
                note={"Makes the notification toasts slimmer at the cost of hiding the interactive buttons."}
                value={this.props.getSetting("slimToasts", true)}
                onChange={()=> this.props.toggleSetting("slimToasts", true)}
                >Slim Notification Toasts</SwitchItem>
            </Category>
            <Category name="Configuration" opened={this.state.config_opened} onChange={()=> this.setState({ config_opened: !this.state.config_opened})}>
                <SwitchItem
                note={"Notifications will not vanish automatically."}
                value={this.props.getSetting("stickyNotifications", false)}
                onChange={()=> this.props.toggleSetting("stickyNotifications", true)}
                >Sticky Notifications</SwitchItem>
                <SwitchItem
                note={"Longer messages will increase the toast display time."}
                value={this.props.getSetting("wordCountMultiplier", false)}
                onChange={()=> this.props.toggleSetting("wordCountMultiplier", true)}
                >Wordcount Display Multiplier</SwitchItem>
                <SwitchItem
                note={"Notifications will show up during do-not-disturb mode."}
                value={this.props.getSetting("dndNotifications", false)}
                onChange={()=> this.props.toggleSetting("dndNotifications", true)}
                >Ignore Do-Not-Disturb Mode (Not Finished)</SwitchItem>
                <SliderInput
                minValue={0.5}
                maxValue={5}
                stickToMarkers
                markers={[0.5,1,1.25,1.5,2,2.5,3,4,5]}
                initialValue={this.props.getSetting("displayTime", 1)}
                onValueChange={(v)=> this.props.updateSetting("displayTime", v)}
                note="Changes the multiplier for the length of the notification being displayed"
                onMarkerRender={(v)=> `${v}x`}
                >Display Time Multiplayer</SliderInput>
            </Category>
        </>
    }
}