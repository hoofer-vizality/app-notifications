import { React, getModule, getModuleByDisplayName, contextMenu } from "@vizality/webpack"
import { Modal, Icon, Button, SearchBar, Anchor, Divider, Text, Avatar } from "@vizality/components"
import { TextInput, SwitchItem, ButtonItem, Category } from '@vizality/components/settings';

module.exports = class Settings extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            custom_opened: true
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
        </>
    }
}