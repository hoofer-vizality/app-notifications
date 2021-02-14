import { React, getModule, getModuleByDisplayName, contextMenu } from "@vizality/webpack"
import { Modal, Icon, Button, SearchBar, Anchor, Divider, Text, Avatar } from "@vizality/components"


module.exports = class HeaderComponent extends React.PureComponent {
    constructor(props){
        super(props)
    }

    render() {
        return <>
            <Text style={{"margin-bottom": "5px"}}><Avatar className="an-avatar" src={this.props.avatar} isTyping={false} isMobile={false} status="online" statusTooltip={false} size={Avatar.Sizes.SIZE_16} />{this.props.text}</Text>
        </>
    }
}